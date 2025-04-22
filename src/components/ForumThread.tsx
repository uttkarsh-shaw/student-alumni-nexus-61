
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ThreadProps {
  title: string;
  description: string;
  author: string;
  date: string;
  replies?: Reply[];
}

interface Reply {
  author: string;
  content: string;
  date: string;
  isAlumni: boolean;
}

const ForumThread = ({ title, description, author, date, replies = [] }: ThreadProps) => {
  const [replyContent, setReplyContent] = useState("");
  const [threadReplies, setThreadReplies] = useState<Reply[]>(replies);
  const [showReplies, setShowReplies] = useState(false);
  
  const handleReply = () => {
    if (!replyContent.trim()) return;
    
    // In a real app, we would send this to an API
    const newReply: Reply = {
      author: "Current User (Alumni)",
      content: replyContent,
      date: new Date().toLocaleDateString(),
      isAlumni: true
    };
    
    setThreadReplies([...threadReplies, newReply]);
    setReplyContent("");
    
    // Simulate sending notification to student
    toast({
      title: "Reply posted",
      description: "The student has been notified of your response.",
    });
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Posted by {author} on {date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="outline" 
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? "Hide Replies" : `View Replies (${threadReplies.length})`}
          </Button>
        </div>
        
        {showReplies && (
          <div className="mt-6 space-y-4">
            {threadReplies.length > 0 ? (
              threadReplies.map((reply, index) => (
                <div key={index} className={`p-4 rounded-lg ${reply.isAlumni ? "bg-blue-50 dark:bg-navy-700" : "bg-gray-50 dark:bg-navy-800"}`}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{reply.author} {reply.isAlumni && "(Alumni)"}</span>
                    <span className="text-sm text-gray-500">{reply.date}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{reply.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No replies yet. Be the first to reply!</p>
            )}
            
            <div className="mt-4">
              <textarea
                className="w-full border rounded-md p-3 mb-2"
                rows={3}
                placeholder="Write your reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              ></textarea>
              <Button 
                onClick={handleReply}
                disabled={!replyContent.trim()}
              >
                Post Reply
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ForumThread;
