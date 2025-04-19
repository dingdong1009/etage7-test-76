
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Filter, User, Users, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BrandMessages = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredContacts = contacts.filter(contact => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return contact.unread > 0;
    if (activeTab === "support") return contact.name.includes("Support") || contact.name.includes("Service");
    if (activeTab === "sales") return contact.name.includes("Sales");
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
      <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">MESSAGES</h1>
      
      <div className="border-t border-gray-200 mb-6"></div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
          <TabsTrigger 
            value="messages" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            Messages
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="archived" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            Archived
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <Card className="border border-gray-200 shadow-none rounded-none overflow-hidden">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-base font-light text-gray-900">
                  Conversations
                </CardTitle>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="h-8 rounded-none text-xs font-light gap-2">
                    <Filter className="h-3.5 w-3.5" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>

            <div className="grid md:grid-cols-3 h-[calc(80vh-200px)]">
              {/* Contact List - Hidden on mobile when chat is open */}
              <div className="border-r border-gray-100">
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
                      <TabsTrigger value="unread" className="text-xs">UNREAD</TabsTrigger>
                      <TabsTrigger value="support" className="text-xs">SUPPORT</TabsTrigger>
                      <TabsTrigger value="sales" className="text-xs">SALES</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
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
              
              {/* Chat Window */}
              <div className="md:col-span-2">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>ST</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-sm">Support Team</h3>
                      <span className="text-xs text-gray-500">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Video size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="p-4 overflow-y-auto h-[calc(80vh-320px)] bg-gray-50/30">
                  <div className="space-y-6">
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
                
                {/* Message Input */}
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

        <TabsContent value="notifications">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-light text-gray-900">Notifications</CardTitle>
                <Button variant="outline" size="sm" className="h-8 rounded-none text-xs font-light">
                  Mark all as read
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-gray-100">
              {[
                { id: 1, title: "New message from Support Team", description: "How can we help you today?", time: "10:23 AM", read: false, type: "message" },
                { id: 2, title: "Order status update", description: "Your order #12345 has been shipped", time: "Yesterday", read: true, type: "order" },
                { id: 3, title: "Product approval", description: "Your new product has been approved", time: "Apr 10", read: true, type: "product" }
              ].map((notification) => (
                <div key={notification.id} className={`p-4 ${!notification.read ? 'bg-gray-50' : ''}`}>
                  <div className="flex gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      notification.type === 'message' ? 'bg-gray-100' : 
                      notification.type === 'order' ? 'bg-accent-mint/20' :
                      'bg-soft-orange/20'
                    }`}>
                      {notification.type === 'message' ? <Users size={16} /> : 
                       notification.type === 'order' ? <Bell size={16} /> : 
                       <User size={16} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>{notification.title}</h3>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-base font-light text-gray-900">Archived Messages</CardTitle>
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
    </div>
  );
};

export default BrandMessages;

// The Archive icon component is missing from our imports, so let's define it here
const Archive = ({ size = 24, className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="6" x="3" y="3" rx="1" />
      <path d="m3 9 1.5 9.5a1 1 0 0 0 1 .5h13a1 1 0 0 0 1-.5L21 9" />
      <path d="m9 15 3 3 3-3" />
      <path d="M10 12h4" />
    </svg>
  );
};
