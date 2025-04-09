
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react";

const BrandMessages = () => {
  const [message, setMessage] = useState("");

  // Sample contacts data
  const contacts = [
    { id: 1, name: "Support Team", lastMessage: "How can we help you today?", time: "10:23 AM", unread: 2 },
    { id: 2, name: "Sales Department", lastMessage: "Your last inquiry about pricing...", time: "Yesterday", unread: 0 },
    { id: 3, name: "Design Team", lastMessage: "The new layout looks great!", time: "Monday", unread: 0 },
    { id: 4, name: "John (Customer Service)", lastMessage: "I've forwarded your request to...", time: "Apr 2", unread: 0 }
  ];

  // Sample messages data
  const sampleMessages = [
    { id: 1, sender: "Support Team", content: "Hello! How can we help you today?", time: "10:23 AM", incoming: true },
    { id: 2, sender: "Me", content: "I have a question about the latest feature update.", time: "10:24 AM", incoming: false },
    { id: 3, sender: "Support Team", content: "Of course! What would you like to know about the update?", time: "10:26 AM", incoming: true },
    { id: 4, sender: "Me", content: "I'm wondering how to access the new analytics dashboard.", time: "10:28 AM", incoming: false },
    { id: 5, sender: "Support Team", content: "Great question! You can find the new analytics dashboard by clicking on the 'Reports' tab in your main menu, then selecting 'Analytics Dashboard'.", time: "10:30 AM", incoming: true }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Messages</h1>
      
      <Card className="border border-gray-200 h-[80vh]">
        <div className="flex h-full">
          {/* Contacts sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col h-full">
            <div className="p-3 border-b border-gray-200">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input 
                  type="search" 
                  placeholder="Search contacts..." 
                  className="w-full rounded-md border border-gray-200 pl-8 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1">
              {contacts.map((contact) => (
                <div 
                  key={contact.id}
                  className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${contact.id === 1 ? 'bg-black-50' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{contact.name}</h3>
                    <span className="text-xs text-gray-500">{contact.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                  {contact.unread > 0 && (
                    <div className="flex justify-end mt-1">
                      <span className="bg-black-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {contact.unread}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat area */}
          <div className="hidden md:flex flex-col flex-1 h-full">
            {/* Chat header */}
            <div className="p-3 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-black-100 rounded-full flex items-center justify-center text-blue-800 font-medium">
                  ST
                </div>
                <h3 className="font-medium">Support Team</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded-full">
                  <Phone size={18} />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-full">
                  <Video size={18} />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-full">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {sampleMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.incoming ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.incoming 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-black-500 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.incoming ? 'text-gray-500' : 'text-blue-100'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message input */}
            <CardContent className="p-3 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <button 
                  type="button" 
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Paperclip size={18} />
                </button>
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..." 
                  className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
                <button 
                  type="submit" 
                  className={`p-2 rounded-full ${
                    message.trim() ? 'bg-black-500 text-white' : 'bg-gray-100 text-gray-400'
                  }`}
                  disabled={!message.trim()}
                >
                  <Send size={18} />
                </button>
              </form>
            </CardContent>
          </div>
          
          {/* Empty state for mobile view */}
          <div className="flex flex-col items-center justify-center flex-1 md:hidden p-4 text-center">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Send size={24} className="text-gray-400" />
            </div>
            <h3 className="font-medium">Your Messages</h3>
            <p className="text-sm text-gray-500 max-w-[250px] mt-2">
              Select a conversation or start a new one to begin messaging
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BrandMessages;
