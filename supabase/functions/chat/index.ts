
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    const openAIKey = Deno.env.get('OPENAI_API_KEY')

    if (!openAIKey) {
      console.error('OPENAI_API_KEY is not set in environment variables')
      return new Response(
        JSON.stringify({ 
          error: 'API key not configured', 
          response: "I'm sorry, I can't connect to my AI service right now. Please check your API key configuration." 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { 
              role: 'system', 
              content: 'You are a helpful assistant for a college alumni platform. Be friendly and concise. Your responses should be informative but brief, ideally 1-2 sentences.'
            },
            { role: 'user', content: message }
          ],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('OpenAI API error:', errorData)
        
        let errorMessage = "I'm experiencing some technical difficulties right now. Please try again later."
        
        // Check for quota exceeded error
        if (errorData.error && errorData.error.code === "insufficient_quota") {
          errorMessage = "I'm sorry, the AI service is currently unavailable due to usage limits. Please contact the administrator to update the OpenAI API subscription."
        }
        
        return new Response(
          JSON.stringify({ 
            response: errorMessage,
            error: `OpenAI API returned an error: ${response.status}`
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        )
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      return new Response(
        JSON.stringify({ response: aiResponse }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    } catch (openAIError) {
      console.error('OpenAI API communication error:', openAIError)
      
      // Return a fallback response for OpenAI-specific errors
      return new Response(
        JSON.stringify({ 
          response: "I'm having trouble connecting to my brain right now. Please try again in a moment.",
          error: openAIError.message 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }
  } catch (error) {
    console.error('Error in chat function:', error)
    
    // Return a fallback response for general errors
    return new Response(
      JSON.stringify({ 
        response: "Sorry, I couldn't understand your message. Please try again.",
        error: error.message 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  }
})
