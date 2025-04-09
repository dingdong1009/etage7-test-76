
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

const SalesMessages = () => {
  const [activeChat, setActiveChat] = useState(1);
  
  // Sample message data
  const chats = [
    { id: 1, name: "Luxury Brands Inc.", unread: 2, lastMessage: "Can we schedule a call tomorrow?", time: "10:42 AM" },
    { id: 2, name: "Fashion Forward Co.", unread: 0, lastMessage: "Thanks for the update!", time: "Yesterday" },
    { id: 3, name: "Elegant Styles Ltd.", unread: 1, lastMessage: "We need to discuss the new contract terms.", time: "2 days ago" },
    { id: 4, name: "Heritage Designs", unread: 0, lastMessage: "Please send the latest catalog.", time: "1 week ago" }
  ];
  
  const messages = [
    { id: 1, senderId: "client", content: "Hello! I have some questions about your premium services.", time: "10:30 AM" },
    { id: 2, senderId: "me", content: "Hi there! I'd be happy to help. What would you like to know?", time: "10:35 AM" },
    { id: 3, senderId: "client", content: "We're considering upgrading our plan. Can you tell me more about the premium features?", time: "10:38 AM" },
    { id: 4, senderId: "me", content: "Absolutely! The premium plan includes priority support, advanced analytics, and custom branding options.", time: "10:40 AM" },
    { id: 5, senderId: "client", content: "That sounds great. Can we schedule a call tomorrow to discuss the details?", time: "10:42 AM" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat List */}
        <Card className="border border-gray-200 lg:col-span-1">
          <CardHeader className="flex flex-col space-y-2 pb-2">
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search conversations..."
                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {chats.map((chat) => (
                <div 
                  key={chat.id} 
                  className={`p-3 cursor-pointer hover:bg-gray-50 ${activeChat === chat.id ? 'bg-gray-50' : ''}`}
                  onClick={() => setActiveChat(chat.id)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500 truncate max-w-[180px]">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-black rounded-full">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Chat Window */}
        <Card className="border border-gray-200 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <div>
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">{chats.find(c => c.id === activeChat)?.name}</CardTitle>
              <p className="text-xs text-gray-500">Online now</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                </svg>
              </button>
              <button className="p-1 rounded hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col h-[400px]">
            <div className="flex-1 overflow-auto py-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.senderId === "me" 
                        ? "bg-black text-white" 
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className={`text-xs ${message.senderId === "me" ? "text-blue-100" : "text-gray-500"} block text-right mt-1`}>{message.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 border border-gray-200 rounded-l px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="bg-black text-white px-4 rounded-r">
                  Send
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesMessages;
