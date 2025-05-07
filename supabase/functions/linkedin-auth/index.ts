
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const clientId = Deno.env.get("LINKEDIN_CLIENT_ID");
const clientSecret = Deno.env.get("LINKEDIN_CLIENT_SECRET");
const redirectUri = Deno.env.get("LINKEDIN_REDIRECT_URI");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { code, mode } = await req.json();
    
    if (mode === 'authorize') {
      // Generate authorization URL for LinkedIn OAuth
      const state = crypto.randomUUID();
      const oauthUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
      
      oauthUrl.searchParams.append('response_type', 'code');
      oauthUrl.searchParams.append('client_id', clientId!);
      oauthUrl.searchParams.append('redirect_uri', redirectUri!);
      oauthUrl.searchParams.append('scope', 'r_liteprofile r_emailaddress w_member_social');
      oauthUrl.searchParams.append('state', state);
      
      return new Response(
        JSON.stringify({ url: oauthUrl.toString(), state }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } 
    
    if (mode === 'token' && code) {
      // Exchange code for token
      const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'grant_type': 'authorization_code',
          'code': code,
          'redirect_uri': redirectUri!,
          'client_id': clientId!,
          'client_secret': clientSecret!
        })
      });
      
      const tokenData = await tokenResponse.json();
      
      // Get user profile data
      const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      });
      
      const profileData = await profileResponse.json();
      
      // Get user email address
      const emailResponse = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      });
      
      const emailData = await emailResponse.json();
      const email = emailData.elements?.[0]?.['handle~']?.emailAddress;
      
      // Return combined token and user data
      return new Response(
        JSON.stringify({ 
          token: tokenData,
          user: {
            ...profileData,
            email
          },
          provider: 'linkedin'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: 'Invalid request parameters' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in linkedin-auth:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
