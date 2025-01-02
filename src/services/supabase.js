import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "URL";

const supabaseKey ="YOUR-KEY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
