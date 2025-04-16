import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Filter, User, Users, Bell, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewConversationDialog } from "@/components/buyer/messages/NewConversationDialog";
import { Archive } from "@/components/buyer/messages/Icons";
import { toast } from "sonner";

const BuyerMessages = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);

  // Sample contacts data
  const contacts = [
    { id: 1, name: "Brand Studio A", lastMessage: "Yes, we can provide samples for that collection.", time: "10:23 AM", unread: 2 },
    { id: 2, name: "Fashion House B", lastMessage: "What's your timeline for this order?", time: "Yesterday", unread: 0 },
    { id: 3, name: "Designer C", lastMessage: "The prices for this collection start at...", time: "Monday", unread: 0 },
    { id: 4, name: "Atelier D", lastMessage: "We've sent the quote to your email.", time: "Apr 2", unread: 0 }
  ];

  // Sample messages data
  const sampleMessages = [
    { id: 1, sender: "Brand Studio A", content: "Hello! How can we help you today?", time: "10:23 AM", incoming: true },
    { id: 2, sender: "Me", content: "I'm interested in your Spring 2025 collection.", time: "10:24 AM", incoming: false },
    { id: 3, sender: "Brand Studio A", content: "Great! We have several pieces available for wholesale. Are you looking for anything specific?", time: "10:26 AM", incoming: true },
    { id: 4, sender: "Me", content: "I'd like to know the pricing for the linen blazers and if you offer samples.", time: "10:28 AM", incoming: false },
    { id: 5, sender: "Brand Studio A", content: "We can definitely provide pricing for the linen blazers. Our wholesale pricing starts at $120 per unit with a minimum order of 10 pieces. And yes, we do offer samples for a small fee that will be credited to your order if you proceed.", time: "10:30 AM", incoming: true }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleStartConversation = () => {
    setIsNewConversationOpen(true);
  };

  const filteredContacts = contacts.filter(contact => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return contact.unread > 0;
    if (activeTab === "quotes") return contact.lastMessage.toLowerCase().includes("quote") || contact.lastMessage.toLowerCase().includes("price");
    if (activeTab === "samples") return contact.lastMessage.toLowerCase().includes("sample");
    return true;
  }).filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">MESSAGES</h1>
      
      <Tabs defaultValue="messages" className="w-full">
      <div className="border-t border-gray-200 mb-6">
        <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
          <TabsTrigger 
            value="messages" 
            className="text-xs font-normal uppercase data-[state=active]:border-b-2 data-[state=active]:border-black px-6 py-2 data-[state=active]:shadow-none"
          >
            Messages
          </TabsTrigger>
          <TabsTrigger 
            value="archived" 
            className="text-xs font-normal uppercase data-[state=active]:border-b-2 data-[state=active]:border-black px-6 py-2 data-[state=active]:shadow-none"
          >
            Archived
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="messages" className="mt-0">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search messages..." className="pl-9 border-gray-200 bg-gray-50/50" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-0" >
              <TabsList className="grid bg-white border w-full grid-cols-4">
              <TabsTrigger value="all" className="text-sm">ALL</TabsTrigger>
              <TabsTrigger value="unread" className="text-sm">UNREAD</TabsTrigger>
              <TabsTrigger value="quotes" className="text-sm">QUOTES</TabsTrigger>
              <TabsTrigger value="samples" className="text-sm">SAMPLES</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button 
          onClick={handleStartConversation}
          className="bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-none"
        >
          <Plus size={16} className="mr-2" /> New Conversation
        </Button>

        </div>
      </div>
      </TabsContent>

        <TabsContent value="messages">
          <Card className="border border-gray-200 shadow-none rounded-none overflow-hidden">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  Conversations
                </CardTitle>
              </div>
            </CardHeader>

            <div className="grid md:grid-cols-3 h-[calc(80vh-200px)]">
              <div className="border-r border-gray-100">
                <div className="overflow-y-auto h-[calc(80vh-270px)]">
                  {filteredContacts.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      No conversations found
                    </div>
                  ) : (
                    filteredContacts.map(contact => (
                      <div 
                        key={contact.id}
                        className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                            <span className="text-xs text-gray-500">{contact.time}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                            {contact.unread > 0 && (
                              <Badge className="bg-black text-white ml-1">{contact.unread}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>BS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-sm">Brand Studio A</h3>
                      <span className="text-xs text-gray-500">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 overflow-y-auto h-[calc(80vh-320px)] bg-gray-50/30">
                  <div className="space-y-4">
                    {sampleMessages.map(message => (
                      <div 
                        key={message.id}
                        className={`flex ${message.incoming ? 'justify-start' : 'justify-end'}`}
                      >
                        <div 
                          className={`max-w-xs md:max-w-md rounded-md p-3 ${
                            message.incoming 
                              ? 'bg-white border border-gray-200' 
                              : 'bg-black text-white'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className={`text-xs mt-1 block text-right ${message.incoming ? 'text-gray-500' : 'text-gray-300'}`}>
                            {message.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-100">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0 h-10 w-10"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..." 
                      className="border-gray-200"
                    />
                    <Button 
                      type="submit" 
                      className={`flex-shrink-0 bg-black hover:bg-gray-800 text-white ${!message.trim() && 'opacity-50'}`}
                      disabled={!message.trim()}
                    >
                      <Send size={16} className="mr-2" />
                      Send
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-lg font-medium flex items-center gap-2">Archived Messages</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center text-gray-500">
              <div className="py-12">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Archive size={20} className="text-gray-500" />
                </div>
                <h3 className="text-base font-medium mb-2">No archived messages</h3>
                <p className="text-sm">When you archive messages, they will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <NewConversationDialog 
        open={isNewConversationOpen} 
        onOpenChange={setIsNewConversationOpen}
      />
    </div>
  );
};

export default BuyerMessages;
