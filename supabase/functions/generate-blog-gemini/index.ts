
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

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
    const { content, source } = await req.json();

    if (!content) {
      return new Response(
        JSON.stringify({ error: 'Content is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Extract potential topics from content
    const topics = extractTopics(content);
    const firstSentence = content.split('.')[0].trim();
    
    // Generate blog post with Gemini API
    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Please convert the following ${source} post into a well-structured blog post with HTML formatting. 
                Add proper headings (h1, h2), paragraphs, lists, and other formatting as needed.
                Expand on the content to make it more comprehensive.
                Original content: ${content}
                
                The blog post should have the following structure:
                1. A catchy title (wrapped in h1 tags)
                2. An introduction section (with h2)
                3. 2-3 main content sections with appropriate headings (h2)
                4. Lists where appropriate (ul or ol)
                5. A conclusion section (with h2)
                
                IMPORTANT: Return only the formatted HTML content of the blog post with no additional commentary.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192
        }
      })
    });

    const geminiData = await geminiResponse.json();
    
    if (!geminiData.candidates || !geminiData.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API');
    }
    
    const blogContent = geminiData.candidates[0].content.parts[0].text;
    
    // Extract title from blog content
    let title = firstSentence;
    const h1Match = blogContent.match(/<h1>(.*?)<\/h1>/);
    if (h1Match && h1Match[1]) {
      title = h1Match[1];
    }
    
    // Calculate SEO score
    const seoScore = calculateSeoScore(blogContent);

    return new Response(
      JSON.stringify({ 
        title,
        content: blogContent,
        seo_score: seoScore,
        topics
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error generating blog post:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

// Function to extract potential topics from content
function extractTopics(content: string): string[] {
  // Extract hashtags
  const hashtags = content.match(/#[a-zA-Z0-9]+/g) || [];
  const hashtagTopics = hashtags.map(tag => tag.replace('#', ''));
  
  // If no hashtags, extract common nouns (simplified approach)
  if (hashtagTopics.length === 0) {
    const words = content.split(/\s+/);
    const potentialTopics = words.filter(word => 
      word.length > 4 && 
      !['about', 'after', 'again', 'below', 'could', 'every', 'first', 'found', 'great', 'house', 'large', 'learn', 'never', 'other', 'place', 'small', 'study', 'their', 'there', 'these', 'thing', 'think', 'three', 'water', 'where', 'which', 'world', 'would', 'write'].includes(word.toLowerCase())
    ).slice(0, 3);
    
    return potentialTopics;
  }
  
  return hashtagTopics;
}

// Calculate an SEO score based on simple heuristics
function calculateSeoScore(content: string): number {
  const wordCount = content.split(/\s+/).length;
  const headingCount = (content.match(/<h[1-3][^>]*>/g) || []).length;
  const paragraphCount = (content.match(/<p>/g) || []).length;
  const listCount = (content.match(/<[ou]l>/g) || []).length;
  const imageCount = (content.match(/<img/g) || []).length;
  
  // Simple scoring algorithm
  let score = 0;
  
  // Word count (30 points max)
  if (wordCount > 300) score += 10;
  if (wordCount > 500) score += 10;
  if (wordCount > 800) score += 10;
  
  // Structure (40 points max)
  score += Math.min(headingCount * 5, 20); // 20 points max for headings
  score += Math.min(paragraphCount * 2, 10); // 10 points max for paragraphs
  score += Math.min(listCount * 5, 10); // 10 points max for lists
  score += Math.min(imageCount * 5, 10); // 10 points max for images
  
  // Randomize slightly to simulate variations (±10 points)
  score += Math.floor(Math.random() * 20) - 10;
  
  // Ensure score stays within bounds
  return Math.max(50, Math.min(98, score));
}
