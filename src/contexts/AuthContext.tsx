
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "sales_manager" | "brand" | "buyer";
  approval_status: "pending" | "approved" | "rejected";
  company_name?: string;
  phone?: string;
  description?: string;
  inviter_id?: string;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  isLoading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data as UserProfile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  useEffect(() => {
    const setupAuth = async () => {
      setIsLoading(true);
      
      // Set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, newSession) => {
          setSession(newSession);
          setUser(newSession?.user ?? null);
          
          // When auth state changes, fetch profile if user exists
          if (newSession?.user) {
            setTimeout(() => {
              refreshProfile();
            }, 0);
          } else {
            setProfile(null);
          }
        }
      );

      // Check for existing session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Fetch profile for existing user
      if (currentSession?.user) {
        await refreshProfile();
      }
      
      setIsLoading(false);

      return () => {
        subscription.unsubscribe();
      };
    };

    setupAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, profile, isLoading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
