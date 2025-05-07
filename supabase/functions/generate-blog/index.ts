
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers for browser compatibility
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

    // Extract potential topics from content (simple implementation)
    const topics = extractTopics(content);
    const firstSentence = content.split('.')[0].trim();
    const title = generateTitle(firstSentence, topics);
    
    // Generate the blog post (simulated AI output)
    const blogPost = generateBlogPost(content, title, topics, source);
    
    // Calculate SEO score (simple implementation)
    const seoScore = calculateSeoScore(blogPost);

    return new Response(
      JSON.stringify({ 
        title,
        content: blogPost,
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

// Simple function to extract potential topics from content
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

// Generate a title based on content analysis
function generateTitle(firstSentence: string, topics: string[]): string {
  const titleTemplates = [
    "How [Topic] Is Transforming [Industry]",
    "The Ultimate Guide to [Topic]: Strategies for Success",
    "[Number] Ways [Topic] Can Revolutionize Your Business",
    "Why [Topic] Matters More Than Ever in [Current Year]",
    "The Future of [Topic]: Trends and Predictions"
  ];
  
  if (topics.length === 0) {
    // Extract key phrases from first sentence
    const words = firstSentence.split(' ');
    const keyPhrase = words.slice(0, Math.min(5, words.length)).join(' ');
    return `The Complete Guide to ${keyPhrase}`;
  }
  
  const mainTopic = topics[0].charAt(0).toUpperCase() + topics[0].slice(1);
  
  // Select a template and fill it in
  const template = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
  
  return template
    .replace('[Topic]', mainTopic)
    .replace('[Industry]', 'the Digital Landscape')
    .replace('[Number]', '5')
    .replace('[Current Year]', '2025');
}

// Generate a blog post (simulated AI)
function generateBlogPost(content: string, title: string, topics: string[], source: string): string {
  const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
  
  let blogPost = `<h1>${title}</h1>

<h2>Introduction</h2>
<p>${paragraphs[0] || "In today's rapidly evolving digital landscape, staying ahead of technological trends isn't just advantageous—it's essential."}</p>
<p>As professionals across industries seek to maximize efficiency without compromising quality, new approaches and strategies have emerged as powerful solutions to common challenges.</p>

<h2>Understanding the Context</h2>
<p>${paragraphs.length > 1 ? paragraphs[1] : "When we examine the current state of the industry, several key factors emerge that warrant careful consideration and analysis."}</p>
<p>To fully appreciate the implications, we need to consider historical context alongside emerging trends and technologies that are reshaping expectations and possibilities.</p>

<h2>Key Insights</h2>
<ul>
${topics.map(topic => `<li>The impact of ${topic} on productivity and innovation</li>`).join('\n')}
<li>How leading organizations are implementing these strategies</li>
<li>Measuring success and ROI in practical terms</li>
</ul>

<h2>Strategic Applications</h2>
<p>For professionals looking to implement these insights, consider the following approaches:</p>
<ol>
<li>Start with small, measurable pilot projects</li>
<li>Focus on areas with highest potential impact</li>
<li>Establish clear metrics for success</li>
<li>Iterate based on feedback and results</li>
</ol>

<h2>Industry Perspective</h2>
<p>${paragraphs.length > 2 ? paragraphs[2] : "Experts across the industry have noted significant shifts in how organizations approach these challenges."} The consensus points toward a more integrated, strategic approach that balances innovation with practical implementation.</p>

<h2>Looking Forward</h2>
<p>As we look to the future, several trends are likely to shape the evolution of this space:</p>
<ul>
<li>Increased automation and AI integration</li>
<li>Greater emphasis on data-driven decision making</li>
<li>More collaborative approaches to problem-solving</li>
</ul>

<h2>Conclusion</h2>
<p>The landscape continues to evolve rapidly, and staying informed about best practices and emerging trends is essential for long-term success. By thoughtfully implementing the strategies outlined above, organizations can position themselves at the forefront of innovation while delivering measurable results.</p>`;

  return blogPost;
}

// Calculate an SEO score based on simple heuristics
function calculateSeoScore(content: string): number {
  const wordCount = content.split(/\s+/).length;
  const headingCount = (content.match(/<h[1-3][^>]*>/g) || []).length;
  const paragraphCount = (content.match(/<p>/g) || []).length;
  const listCount = (content.match(/<[ou]l>/g) || []).length;
  
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
  
  // Randomize slightly to simulate variations (±10 points)
  score += Math.floor(Math.random() * 20) - 10;
  
  // Ensure score stays within bounds
  return Math.max(50, Math.min(98, score));
}
