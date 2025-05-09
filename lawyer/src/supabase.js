import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tgusmcywrtrxznunczgb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndXNtY3l3cnRyeHpudW5jemdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3OTk2NDAsImV4cCI6MjA2MjM3NTY0MH0.iNEedBu5CE2eGdIjMSW1SbrxmeEIUfRI19VtOVm_f9c'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase