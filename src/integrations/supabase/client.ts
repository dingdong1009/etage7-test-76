// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://klgpjmevkewfnesjfhfq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsZ3BqbWV2a2V3Zm5lc2pmaGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNDIxNDgsImV4cCI6MjA1OTcxODE0OH0.en_WvoaHYtqpxtzBQjwG1OImHb35Z8o4Z0XaAlnTV3o";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);