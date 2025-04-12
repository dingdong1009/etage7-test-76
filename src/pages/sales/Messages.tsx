
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, PaperclipIcon, ChevronLeft } from "lucide-react";

// Mock data for demonstration
const mockContacts = [
  { id: 1, name: "Jane Cooper", role: "Brand", avatar: null, lastMessage: "Hi there! When can we discuss the new collection?", timestamp: "10:32 AM", unread: 3 },
  { id: 2, name: "Cody Fisher", role: "Buyer", avatar: null, lastMessage: "I'd like to place an order for the summer collection.", timestamp: "Yesterday", unread: 0 },
  { id: 3, name: "Esther Howard", role: "Brand", avatar: null, lastMessage: "Can you review our latest product submission?", timestamp: "Yesterday", unread: 1 },
  { id: 4, name: "Cameron Williamson", role: "Buyer", avatar: null, lastMessage: "Thanks for your help with the order!", timestamp: "Mon", unread: 0 },
  { id: 5, name: "Brooklyn Simmons", role: "Brand", avatar: null, lastMessage: "When is the next brand showcase event?", timestamp: "Sun", unread: 0 },
  { id: 6, name: "Leslie Alexander", role: "Buyer", avatar: null, lastMessage: "Is there a discount for bulk orders?", timestamp: "Aug 25", unread: 0 },
];

// Mock messages for a conversation
const mockMessages = [
  { id: 1, sender: "them", content: "Hello, I have some questions about becoming a retailer for your brand.", timestamp: "10:24 AM" },
  { id: 2, sender: "me", content: "Hi there! I'd be happy to help. What information do you need?", timestamp: "10:26 AM" },
  { id: 3, sender: "them", content: "I'd like to know about your minimum order quantities and pricing structure.", timestamp: "10:28 AM" },
  { id: 4, sender: "them", content: "Also, what's the lead time for shipping?", timestamp: "10:28 AM" },
  { id: 5, sender: "me", content: "Our minimum order is $2,000 for the first order, and $1,000 for reorders. We offer tiered pricing based on volume, starting at wholesale +50%.", timestamp: "10:30 AM" },
  { id: 6, sender: "me", content: "Regarding shipping, we typically ship within 3-5 business days for in-stock items. Custom orders may take 2-3 weeks.", timestamp: "10:31 AM" },
  { id: 7, sender: "them", content: "That works for us. Can you send over a catalog and line sheet?", timestamp: "10:32 AM" },
];

const SalesMessages = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<number | null>(1); // Initially select the first contact
  const [newMessage, setNewMessage] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);
  
  const filteredContacts = mockContacts
    .filter(contact => {
      if (activeTab === "all") return true;
      if (activeTab === "brands") return contact.role === "Brand";
      if (activeTab === "buyers") return contact.role === "Buyer";
      if (activeTab === "unread") return contact.unread > 0;
      return true;
    })
    .filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to an API
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-light tracking-tighter">Messages</h1>
      
      <Card className="border-gray-200 shadow-none overflow-hidden">
        <div className="grid md:grid-cols-3 h-[calc(80vh-100px)]">
          {/* Contact List - Hidden on mobile when chat is open */}
          <div className={`border-r border-gray-100 ${showMobileChat ? 'hidden md:block' : 'block'}`}>
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search messages..."
                  className="pl-9 border-gray-200 bg-gray-50/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs 
                value={activeTab}
                onValueChange={setActiveTab}
                className="mt-4"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all" className="text-xs">ALL</TabsTrigger>
                  <TabsTrigger value="brands" className="text-xs">BRANDS</TabsTrigger>
                  <TabsTrigger value="buyers" className="text-xs">BUYERS</TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs">UNREAD</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="overflow-y-auto h-[calc(80vh-170px)]">
              {filteredContacts.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No conversations found
                </div>
              ) : (
                filteredContacts.map(contact => (
                  <div 
                    key={contact.id}
                    className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors ${selectedContact === contact.id ? 'bg-gray-50' : ''}`}
                    onClick={() => {
                      setSelectedContact(contact.id);
                      setShowMobileChat(true);
                    }}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={contact.avatar || undefined} />
                      <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-500">{contact.timestamp}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                        {contact.unread > 0 && (
                          <Badge className="bg-black text-white ml-1">{contact.unread}</Badge>
                        )}
                      </div>
                      <div className="mt-1">
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">{contact.role}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Chat Window */}
          <div className={`md:col-span-2 ${!showMobileChat ? 'hidden md:block' : 'block'}`}>
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setShowMobileChat(false)}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockContacts.find(c => c.id === selectedContact)?.avatar || undefined} />
                      <AvatarFallback>
                        {getInitials(mockContacts.find(c => c.id === selectedContact)?.name || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-sm">
                        {mockContacts.find(c => c.id === selectedContact)?.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {mockContacts.find(c => c.id === selectedContact)?.role}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="p-4 overflow-y-auto h-[calc(80vh-220px)] bg-gray-50/30">
                  <div className="space-y-4">
                    {mockMessages.map(message => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-xs md:max-w-md rounded-md p-3 ${
                            message.sender === 'me' 
                              ? 'bg-black text-white' 
                              : 'bg-white border border-gray-200'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className={`text-xs mt-1 block text-right ${message.sender === 'me' ? 'text-gray-300' : 'text-gray-500'}`}>
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <PaperclipIcon className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="border-gray-200"
                    />
                    <Button 
                      variant="black" 
                      size="icon"
                      className="flex-shrink-0"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SalesMessages;
