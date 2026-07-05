import { createClient } from '@supabase/supabase-js';
import siteConfig from '@generated/docusaurus.config';

const supabaseUrl = siteConfig.customFields.supabaseUrl as string;
const supabaseAnonKey = siteConfig.customFields.supabaseAnonKey as string;

// Only initialize if keys are present (prevents crash if user hasn't set them up yet)
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
