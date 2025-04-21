
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Loader2, AlertCircle } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  text: string;
  isBot: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput("");
    setIsLoading(true);
    setApiError(null);
    
    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message: userMessage }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message);
      }

      // Always use the response from the edge function if available
      if (data && data.response) {
        setMessages(prev => [...prev, { 
          text: data.response,
          isBot: true 
        }]);
        
        // If there was an error but we still got a response, show a toast
        if (data.error) {
          console.warn('Edge function warning:', data.error);
          
          // Check if it's an OpenAI or Perplexity quota error
          if (data.error.includes('429') || data.error.includes('quota') || data.error.includes('limit')) {
            setApiError("The AI assistant is currently unavailable due to usage limits. Please try again later or contact the administrator.");
          } else if (data.error.includes('No AI service configured')) {
            setApiError("The AI assistant is not properly configured. Please contact the administrator to set up API keys.");
          } else {
            toast({
              title: "Warning",
              description: "The AI assistant is experiencing some issues, but is still trying to help.",
              variant: "default",
            });
          }
        }
      } else {
        // This should rarely happen now, but just in case
        throw new Error('No response received from chat service');
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add fallback bot response when API fails completely
      setMessages(prev => [...prev, { 
        text: "I'm sorry, I couldn't process your request right now. Please try again later.",
        isBot: true 
      }]);
      
      setApiError("Failed to connect to the chat service. Please try again later.");
      
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 p-0"
        >
          <MessageCircle />
        </Button>
      ) : (
        <Card className="w-[320px] h-[400px] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle className="text-lg">Chat Support</CardTitle>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4 space-y-4">
            {apiError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  {apiError}
                </AlertDescription>
              </Alert>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-2 ${
                    message.isBot
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t">
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="min-h-[60px] resize-none pr-10"
                rows={2}
                disabled={isLoading}
              />
              {isLoading && (
                <div className="absolute right-2 bottom-2">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ChatBot;
