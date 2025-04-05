import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Session, User } from "@supabase/supabase-js";
import { Tables } from "@/integrations/supabase/types";

type UserRole = "admin" | "sales_manager" | "brand" | "buyer";
type ApprovalStatus = "pending" | "approved" | "rejected";

type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  company_name: string | null;
  description: string | null;
  role: UserRole;
  approval_status: ApprovalStatus;
  created_at: string;
  updated_at: string;
};

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<UserProfile> & { full_name: string }) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileRefreshAttempts, setProfileRefreshAttempts] = useState(0);
  const { toast } = useToast();

  async function refreshProfile() {
    if (!user) {
      console.log("Cannot refresh profile: No user logged in");
      return;
    }

    try {
      console.log("Refreshing profile for user:", user.id);
      setProfileRefreshAttempts(prev => prev + 1);
      
      console.log("Fetching profile data from database for user:", user.id);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Profile fetch error:", error);
        if (profileRefreshAttempts > 2) {
          console.log("Multiple attempts failed, trying to create a default profile");
          try {
            const { error: insertError } = await supabase
              .from("profiles")
              .insert({
                id: user.id,
                email: user.email || "",
                full_name: user.user_metadata?.full_name || "User",
                role: user.user_metadata?.role || "buyer",
                approval_status: "pending"
              });
              
            if (insertError) {
              console.error("Error creating default profile:", insertError);
            } else {
              const { data: newProfile, error: fetchError } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();
                
              if (!fetchError && newProfile) {
                console.log("New profile created and fetched:", newProfile);
                setProfile(newProfile as UserProfile);
              }
            }
          } catch (innerError) {
            console.error("Error creating default profile:", innerError);
          }
        }
      } else if (data) {
        console.log("Profile fetched successfully:", data);
        setProfile(data as UserProfile);
      } else {
        console.log("No profile found for user, creating one");
        try {
          const { error: insertError } = await supabase
            .from("profiles")
            .insert({
              id: user.id,
              email: user.email || "",
              full_name: user.user_metadata?.full_name || "User",
              role: user.user_metadata?.role || "buyer",
              approval_status: "pending"
            });
            
          if (insertError) {
            console.error("Error creating default profile:", insertError);
          } else {
            const { data: newProfile, error: fetchError } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", user.id)
              .single();
              
            if (!fetchError && newProfile) {
              console.log("New profile created and fetched:", newProfile);
              setProfile(newProfile as UserProfile);
            }
          }
        } catch (innerError) {
          console.error("Error in profile creation:", innerError);
        }
      }
    } catch (error) {
      console.error("Error in refreshProfile:", error);
    }
  }

  useEffect(() => {
    let mounted = true;
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed, event:", event);
        
        if (!mounted) return;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          setProfileRefreshAttempts(0);
        }
        
        if (currentSession?.user) {
          console.log("User is authenticated in auth change, fetching profile");
          
          if (profile && profile.id !== currentSession.user.id) {
            setProfile(null);
          }
          
          if (mounted) {
            try {
              const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", currentSession.user.id)
                .single();
                
              if (!error && data && mounted) {
                setProfile(data as UserProfile);
                console.log("Profile loaded during auth change:", data);
              } else if (mounted) {
                setTimeout(() => {
                  if (mounted) refreshProfile();
                }, 500);
              }
            } catch (error) {
              console.error("Error in auth change profile fetch:", error);
            }
          }
        } else {
          setProfile(null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial auth check, session:", currentSession ? "exists" : "null");
      
      if (!mounted) return;
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        console.log("Found existing session, fetching profile");
        supabase
          .from("profiles")
          .select("*")
          .eq("id", currentSession.user.id)
          .single()
          .then(({ data, error }) => {
            if (!error && data && mounted) {
              setProfile(data as UserProfile);
              console.log("Profile loaded during initial check:", data);
            } else if (mounted) {
              setTimeout(() => {
                if (mounted) refreshProfile();
              }, 500);
            }
          })
          .catch(error => {
            console.error("Error in initial profile fetch:", error);
          })
          .finally(() => {
            if (mounted) setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let retryTimeout: NodeJS.Timeout | null = null;
    
    if (user && !profile && !isLoading && profileRefreshAttempts < 5) {
      console.log(`Auto retry profile fetch (attempt ${profileRefreshAttempts + 1})`);
      retryTimeout = setTimeout(() => {
        refreshProfile();
      }, 1000); // Retry after 1 second
    }
    
    return () => {
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [user, profile, isLoading, profileRefreshAttempts]);

  async function signUp(email: string, password: string, userData: Partial<UserProfile> & { full_name: string }) {
    try {
      console.log("Starting sign up process with data:", { email, userData });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            role: userData.role || "buyer"
          }
        }
      });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      if (data.user) {
        console.log("User created successfully, now creating profile");
        
        const approvalStatus: ApprovalStatus = "pending";
        const userRole: UserRole = (userData.role || "buyer") as UserRole;
        
        const profileData = {
          id: data.user.id,
          email,
          full_name: userData.full_name,
          phone: userData.phone || null,
          company_name: userData.company_name || null,
          description: userData.description || null,
          role: userRole,
          approval_status: approvalStatus,
        };

        console.log("Profile data to insert:", profileData);

        const { error: profileError } = await supabase
          .from("profiles")
          .insert(profileData);

        if (profileError) {
          console.error("Profile creation error:", profileError);
          console.error("Profile creation error details:", JSON.stringify(profileError, null, 2));
          toast({
            title: "Profile creation failed",
            description: `Error: ${profileError.message} (${profileError.code})`,
            variant: "destructive",
          });
          
          throw profileError;
        }
        
        toast({
          title: "Registration successful",
          description: "Your account has been created and is pending approval.",
        });
      }
    } catch (error: any) {
      console.error("Error in signUp:", error);
      throw error;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      console.log("Attempting sign in for:", email);
      setProfile(null);
      setProfileRefreshAttempts(0);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      console.log("Sign in successful, session created");
      
      if (data.user) {
        try {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();
            
          if (!profileError && profileData) {
            console.log("Profile loaded immediately after login:", profileData);
            setProfile(profileData as UserProfile);
          } else {
            console.log("Could not load profile immediately, will retry");
          }
        } catch (profileFetchError) {
          console.error("Error fetching profile after login:", profileFetchError);
        }
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      console.error("Error in signIn:", error);
      throw error;
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      setProfile(null);
      setUser(null);
      setSession(null);
      setProfileRefreshAttempts(0);
    } catch (error: any) {
      console.error("Error in signOut:", error);
      throw error;
    }
  }

  const value: AuthContextType = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
