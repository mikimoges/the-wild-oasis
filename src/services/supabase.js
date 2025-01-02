import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wlzeuufmlymogunryrzu.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsemV1dWZtbHltb2d1bnJ5cnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MTQwODcsImV4cCI6MjA0ODI5MDA4N30.o-cElvmx9-xcNk29AWgsxo4fmTGLa5EXSB4e9TbEnmg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
