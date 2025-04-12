
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

// Message interface for type safety
interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const Messages = () => {
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "Fashion Brand Inc.",
      content: "Hello! Thank you for your interest in our collection. How can we assist you today?",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: "2",
      sender: "You",
      content: "Hi there! I'd like to inquire about your minimum order quantities for the summer collection.",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: "3",
      sender: "Fashion Brand Inc.",
      content: "Our minimum order quantity is 20 pieces per style. For the summer collection, we also offer a mixed order option with a minimum of 30 pieces across different styles.",
      timestamp: "10:35 AM",
      isOwn: false
    },
  ]);

  const [contacts] = useState([
    { id: "1", name: "Fashion Brand Inc.", unread: 0, lastMessage: "10:35 AM" },
    { id: "2", name: "Luxury Accessories", unread: 3, lastMessage: "Yesterday" },
    { id: "3", name: "Sustainable Clothing", unread: 0, lastMessage: "Apr 2" },
    { id: "4", name: "Designer Shoes", unread: 1, lastMessage: "Mar 28" },
    { id: "5", name: "Casual Apparel", unread: 0, lastMessage: "Mar 15" }
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">MESSAGES</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contacts list - hidden on mobile for simplicity */}
        <div className="hidden md:block">
          <Card className="h-[600px] overflow-hidden border border-gray-200 rounded-none">
            <div className="p-3 border-b border-gray-200">
              <input 
                type="text" 
                placeholder="Search conversations" 
                className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
            <div className="overflow-auto h-[calc(600px-48px)]">
              {contacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex justify-between transition-colors ${
                    contact.id === "1" ? "bg-gray-50" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-xs text-gray-500">Last message preview...</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{contact.lastMessage}</p>
                    {contact.unread > 0 && (
                      <span className="inline-block bg-black text-white text-xs rounded-full px-2 py-0.5 mt-1">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Chat area */}
        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col border border-gray-200 rounded-none">
            <div className="p-3 border-b border-gray-200">
              <p className="font-medium">Fashion Brand Inc.</p>
            </div>
            
            {/* Messages container */}
            <div className="flex-grow p-4 overflow-auto space-y-4">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 ${
                        message.isOwn 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">No messages yet</p>
                </div>
              )}
            </div>
            
            {/* Message input */}
            <div className="p-3 border-t border-gray-200">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-grow border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
                <Button size="icon" className="bg-black hover:bg-gray-800 text-white">
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
