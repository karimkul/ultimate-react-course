import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://sokqzffmbrlkbokdzjoa.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNva3F6ZmZtYnJsa2Jva2R6am9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NTg0MTAsImV4cCI6MjA1NjQzNDQxMH0.VAgApfxjUMClFXxSSPph6LdTgKtO0CYny8GQ8Arxqgk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
