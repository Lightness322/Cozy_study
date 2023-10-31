import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://trwdfqhnrkbonnnljnus.supabase.co"

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2RmcWhucmtib25ubmxqbnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU1Nzk5NTEsImV4cCI6MjAxMTE1NTk1MX0.z19N3Tci0Og8IRw7Pi26r0FjULbjCTIJRRzfxPb1G6k"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
