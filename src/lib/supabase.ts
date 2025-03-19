
import { createClient } from '@supabase/supabase-js';

// Real Supabase credentials
export const SUPABASE_URL = 'https://jufkihpszuolzsreecrs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1ZmtpaHBzenVvbHpzcmVlY3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNDEyMDIsImV4cCI6MjAyMjgxNzIwMn0.Y01Qh1lN7HjzeVapI1IZxqJXU5lglF_vrpW3W6RXtEg';

// Create a more resilient fetch function with timeout and retries
const customFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  // Maximum number of retries
  const MAX_RETRIES = 3;
  const TIMEOUT_MS = 20000; // Increase timeout to 20 seconds
  let retries = 0;
  let lastError;

  // If we're running in a browser environment, check network status first
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    throw new Error('You are currently offline. Please check your internet connection.');
  }

  while (retries < MAX_RETRIES) {
    try {
      console.log(`Fetch attempt ${retries + 1} for ${typeof input === 'string' ? input : 'request'}`);
      
      const controller = new AbortController();
      // Set timeout
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
      
      // Add a custom signal to the init object if it doesn't already have one
      const modifiedInit = {
        ...init,
        signal: init?.signal || controller.signal,
        mode: 'cors' as RequestMode,
        credentials: 'omit' as RequestCredentials,
        headers: {
          ...init?.headers,
          'X-Client-Info': 'supabase-js-client',
          'Cache-Control': 'no-cache, no-store', // Prevent caching issues
        }
      };
      
      const response = await fetch(input, modifiedInit);
      clearTimeout(timeoutId);
      
      console.log(`Fetch successful: ${response.status} ${response.statusText}`);
      
      // If successful, return the response
      return response;
    } catch (error: any) {
      lastError = error;
      console.warn(`Fetch attempt ${retries + 1} failed:`, error);
      retries++;
      
      // If abort error (timeout), provide clearer message
      if (error.name === 'AbortError') {
        lastError = new Error('Request timed out. The server took too long to respond.');
      }
      
      // Wait before retrying (exponential backoff with shorter delays)
      if (retries < MAX_RETRIES) {
        const baseDelay = Math.min(1000 * Math.pow(1.5, retries), 5000); // Reduced delay
        // Add random jitter (±10%)
        const jitter = baseDelay * 0.1 * (Math.random() * 2 - 1);
        const delay = baseDelay + jitter;
        console.log(`Retrying in ${Math.round(delay)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // If all retries failed, throw the last error with a clearer message
  console.error('All fetch attempts failed:', lastError);
  throw new Error(`Connection error: Failed to connect to Supabase after ${MAX_RETRIES} attempts. Please check your connection and try again.`);
};

// Create a Supabase client with the credentials and improved fetch
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
    global: {
      fetch: customFetch,
      headers: {
        'X-Client-Info': 'supabase-js-client',
      }
    },
    db: {
      schema: 'public',
    },
    // Reduce the request timeout
    realtime: {
      params: {
        eventsPerSecond: 5
      }
    }
  }
);

// Function to create a new client with updated credentials
export const updateSupabaseClient = (url: string, key: string) => {
  console.log(`Creating new Supabase client with URL: ${url.substring(0, 15)}... and key: ${key.substring(0, 5)}...`);
  
  return createClient(url, key, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
    global: {
      fetch: customFetch,
      headers: {
        'X-Client-Info': 'supabase-js-client',
      }
    }
  });
};

// Set isSupabaseConfigured to true since we're using hardcoded credentials
export const isSupabaseConfigured = true;

// Define sample investor profile for demo account
export const DEMO_INVESTOR = {
  id: 'demo-user-id',
  email: 'demo@example.com',
  name: 'Demo Investor',
  investment_focus: 'Technology',
  investment_range: '$50K - $200K (Angel)',
};

// Define database types to use with Supabase
export type Tables = {
  investors: {
    id: string;
    email: string;
    name: string;
    investment_focus: string;
    investment_range: string;
    created_at: string;
  };
  startups: {
    id: string;
    name: string;
    industry: string;
    stage: string;
    description: string;
    website: string;
    founders: string;
    team_size: string;
    founded_date: string;
    target_market: string;
    problem_solved: string;
    usp: string;
    traction: string;
    key_metrics: string;
    previous_funding: string;
    funding_required: string;
    valuation: string;
    use_of_funds: string;
    roadmap: string;
    exit_strategy: string;
    created_at: string;
    document_path?: string;
  };
}
