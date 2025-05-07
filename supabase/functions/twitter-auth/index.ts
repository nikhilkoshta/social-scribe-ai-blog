
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const clientId = Deno.env.get("TWITTER_CLIENT_ID");
const clientSecret = Deno.env.get("TWITTER_CLIENT_SECRET");
const redirectUri = Deno.env.get("TWITTER_REDIRECT_URI");

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
      // Generate a random state value for security
      const state = crypto.randomUUID();
      const oauthUrl = new URL('https://twitter.com/i/oauth2/authorize');
      
      oauthUrl.searchParams.append('response_type', 'code');
      oauthUrl.searchParams.append('client_id', clientId!);
      oauthUrl.searchParams.append('redirect_uri', redirectUri!);
      oauthUrl.searchParams.append('scope', 'tweet.read users.read offline.access');
      oauthUrl.searchParams.append('state', state);
      
      return new Response(
        JSON.stringify({ url: oauthUrl.toString(), state }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } 
    
    if (mode === 'token' && code) {
      // Exchange code for token
      const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
        },
        body: new URLSearchParams({
          'code': code,
          'grant_type': 'authorization_code',
          'redirect_uri': redirectUri!,
          'code_verifier': 'challenge'
        })
      });
      
      const tokenData = await tokenResponse.json();
      
      // Get user data using the access token
      const userResponse = await fetch('https://api.twitter.com/2/users/me?user.fields=profile_image_url,name,username', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      });
      
      const userData = await userResponse.json();
      
      // Return combined token and user data
      return new Response(
        JSON.stringify({ 
          token: tokenData,
          user: userData.data,
          provider: 'twitter'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: 'Invalid request parameters' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in twitter-auth:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
