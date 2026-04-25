import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project details
const supabaseUrl = 'https://krtnxexgaeljtmixarzp.supabase.co'
const supabaseKey = 'sb_publishable_mHRy3GJGFE8LkgPxwTLG_Q_Y_euPGjP'

export const supabase = createClient(supabaseUrl, supabaseKey)