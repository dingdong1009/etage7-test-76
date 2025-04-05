
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
  const { toast } = useToast();

  async function refreshProfile() {
    if (!user) return;

    try {
      console.log("Refreshing profile for user:", user.id);
      
      // First try with short timeout
      setTimeout(async () => {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (error) {
            console.error("Initial profile fetch error:", error);
            
            if (error.code === 'PGRST116') {
              console.log("Initial RLS policy may be preventing profile access, will retry with longer delay");
              // If permission error, retry after longer delay
              setTimeout(async () => {
                try {
                  const { data: retryData, error: retryError } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();
                    
                  if (!retryError && retryData) {
                    console.log("Profile fetch successful on final retry:", retryData);
                    setProfile(retryData as UserProfile);
                  } else {
                    console.error("Profile fetch failed on final retry:", retryError);
                  }
                } catch (finalError) {
                  console.error("Final profile fetch attempt failed:", finalError);
                }
              }, 2000); // Longer 2 second delay for final retry
            }
          } else if (data) {
            console.log("Profile fetched successfully on initial try:", data);
            setProfile(data as UserProfile);
          }
        } catch (innerError) {
          console.error("Error in profile refresh (inner):", innerError);
        }
      }, 500); // Initial 500ms delay
    } catch (error) {
      console.error("Error setting up refreshProfile:", error);
    }
  }

  useEffect(() => {
    let mounted = true;
    
    // This function sets up a subscription to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        console.log("Auth state changed, event:", _event);
        
        if (!mounted) return;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (!currentSession) {
          setProfile(null);
        }
      }
    );

    // Initial auth check
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial auth check, session:", currentSession ? "exists" : "null");
      
      if (!mounted) return;
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        refreshProfile().finally(() => {
          if (mounted) setIsLoading(false);
        });
      } else {
        if (mounted) setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

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
      
      // Refresh profile immediately after sign in using progressive delays
      if (data.user) {
        // Multiple retries with increasing delays to account for potential RLS delays
        setTimeout(() => refreshProfile(), 300);
        setTimeout(() => refreshProfile(), 1000);
        setTimeout(() => refreshProfile(), 2000);
      }
      
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
