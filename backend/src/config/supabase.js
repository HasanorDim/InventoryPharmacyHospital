import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    // auth: {
    //   flowType: "pkce", // Use PKCE flow
    // },
    auth: {
      flowType: "pkce", // Use PKCE flow
      persistSession: false, // 🔑 Must be true
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export default supabase;
