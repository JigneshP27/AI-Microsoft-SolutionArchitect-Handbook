import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useLocation } from '@docusaurus/router';

// This is the global wrapper for Docusaurus
export default function Root({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- View Tracking Logic ---
  useEffect(() => {
    if (supabase && session) {
      // Send the view event to the database
      supabase.from('page_views').insert([
        {
          user_id: session.user.id,
          user_email: session.user.email,
          page_url: location.pathname,
          viewed_at: new Date().toISOString()
        }
      ]).then(({ error }) => {
        if (error) console.error("Error tracking view:", error);
      });
    }
  }, [location.pathname, session]);

  // --- Render Logic ---

  // 1. Bypass mode: If user hasn't set up Supabase keys yet, let them view the site!
  if (!supabase) {
    return (
      <>
        <div style={{ background: '#f59e0b', color: '#000', padding: '10px', textAlign: 'center' }}>
          <strong>Admin Warning:</strong> Supabase keys are missing from environment variables. Authentication is temporarily bypassed.
        </div>
        {children}
      </>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f172a', color: '#fff' }}>
        Loading Auth...
      </div>
    );
  }

  // 2. Auth mode: Not logged in
  if (!session) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f172a', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>AI Architect Handbook</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Please log in to view the documentation.</p>
        
        <button 
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
          style={{ background: '#333', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', marginBottom: '10px', width: '250px', fontSize: '1rem' }}
        >
          Login with GitHub
        </button>
        
        <button 
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
          style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', width: '250px', fontSize: '1rem' }}
        >
          Login with Google
        </button>
      </div>
    );
  }

  // 3. Authenticated mode
  return (
    <>
      {children}
      <button 
        onClick={() => supabase.auth.signOut()}
        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, background: '#ef4444', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
      >
        Sign Out
      </button>
    </>
  );
}
