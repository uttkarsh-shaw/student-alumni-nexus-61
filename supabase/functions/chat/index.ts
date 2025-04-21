
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
    
    // Try to use Perplexity API key first
    const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY')
    const openAIKey = Deno.env.get('OPENAI_API_KEY')
    
    console.log(`API Keys available: Perplexity: ${perplexityKey ? 'Yes' : 'No'}, OpenAI: ${openAIKey ? 'Yes' : 'No'}`)
    
    // Diagnostic - confirm we received a message
    console.log(`Processing message: ${message ? 'Message received' : 'No message received'}`)
    
    // Status tracking for debugging
    let apiStatus = {
      perplexityTried: false,
      perplexityError: null,
      openAITried: false,
      openAIError: null
    }
    
    // Determine which API to use (prefer Perplexity, fallback to OpenAI)
    if (perplexityKey) {
      try {
        apiStatus.perplexityTried = true
        console.log('Attempting Perplexity API request...')
        
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${perplexityKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [
              { 
                role: 'system', 
                content: 'You are a helpful assistant for a college alumni platform. Be friendly and concise. Your responses should be informative but brief, ideally 1-2 sentences.'
              },
              { role: 'user', content: message }
            ],
            temperature: 0.2,
            max_tokens: 150,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error('Perplexity API error details:', JSON.stringify(errorData))
          
          // Check for specific Perplexity error codes
          let statusCode = response.status
          let errorMessage = ''
          
          if (statusCode === 429) {
            errorMessage = 'Perplexity rate limit exceeded'
          } else if (statusCode === 401 || statusCode === 403) {
            errorMessage = 'Perplexity authentication error'
          } else {
            errorMessage = `Perplexity API error: ${statusCode}`
          }
          
          apiStatus.perplexityError = errorMessage
          throw new Error(errorMessage)
        }

        const data = await response.json()
        const aiResponse = data.choices[0].message.content
        console.log('Perplexity API request successful')

        return new Response(
          JSON.stringify({ response: aiResponse, provider: 'perplexity' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
      } catch (perplexityError) {
        console.error('Perplexity API communication error:', perplexityError)
        
        if (!apiStatus.perplexityError) {
          apiStatus.perplexityError = perplexityError.message
        }
        
        // If Perplexity fails, try OpenAI as fallback if available
        if (openAIKey) {
          console.log('Falling back to OpenAI...')
        } else {
          return new Response(
            JSON.stringify({ 
              response: "I'm having trouble connecting to my AI service right now. Please try again in a moment.",
              error: perplexityError.message,
              diagnostics: apiStatus
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
          )
        }
      }
    }
    
    // If Perplexity key is not available or it failed, try OpenAI if we have a key
    if (openAIKey) {
      try {
        apiStatus.openAITried = true
        console.log('Attempting OpenAI API request...')
        
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
          console.error('OpenAI API error details:', JSON.stringify(errorData))
          
          let errorMessage = "I'm experiencing some technical difficulties right now. Please try again later."
          
          // Check for specific OpenAI error codes
          if (errorData.error) {
            if (errorData.error.code === "insufficient_quota") {
              errorMessage = "I'm sorry, the AI service is currently unavailable due to usage limits. Please contact the administrator to update the OpenAI API subscription."
              apiStatus.openAIError = "OpenAI quota exceeded"
            } else if (errorData.error.code === "invalid_api_key") {
              errorMessage = "There's an issue with the AI service configuration. Please contact the administrator."
              apiStatus.openAIError = "OpenAI invalid API key"
            } else {
              apiStatus.openAIError = `OpenAI error: ${errorData.error.code || errorData.error.type}`
            }
          }
          
          return new Response(
            JSON.stringify({ 
              response: errorMessage,
              error: `OpenAI API returned an error: ${response.status}`,
              diagnostics: apiStatus
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
          )
        }

        const data = await response.json()
        const aiResponse = data.choices[0].message.content
        console.log('OpenAI API request successful')

        return new Response(
          JSON.stringify({ response: aiResponse, provider: 'openai' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
      } catch (openAIError) {
        console.error('OpenAI API communication error:', openAIError)
        apiStatus.openAIError = openAIError.message
        
        // Return a fallback response for OpenAI-specific errors
        return new Response(
          JSON.stringify({ 
            response: "I'm having trouble connecting to my brain right now. Please try again in a moment.",
            error: openAIError.message,
            diagnostics: apiStatus
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        )
      }
    }
    
    // If we reach here, no API keys are available or both APIs failed
    return new Response(
      JSON.stringify({ 
        error: 'No AI service configured or all services failed', 
        response: "I'm sorry, I can't connect to any AI service right now. Please check API key configuration.",
        diagnostics: apiStatus
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
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
