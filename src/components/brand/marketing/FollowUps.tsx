
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Check, 
  Clock, 
  Edit, 
  Eye,
  Loader2,
  MailCheck, 
  MessagesSquare,
  PencilLine, 
  Plus,
  RefreshCw, 
  Send,
  Trash2, 
  User 
} from "lucide-react";

// Mock follow-up data
const mockFollowUps = [
  { 
    id: 1, 
    title: "Paris Fashion Week Follow-up", 
    recipient: "Galeries Lafayette",
    recipientEmail: "buyer@gl.com",
    message: "Thank you for visiting our showroom during Paris Fashion Week...", 
    status: "sent", 
    sentAt: "2025-03-15 14:30",
    readAt: "2025-03-15 16:45",
    template: "Event Follow-up"
  },
  { 
    id: 2, 
    title: "Summer Collection Inquiry", 
    recipient: "Selfridges",
    recipientEmail: "buyer@selfridges.com",
    message: "Following up on your interest in our Summer Collection...", 
    status: "scheduled", 
    scheduledFor: "2025-03-25 09:00",
    template: "General Follow-up"
  },
  { 
    id: 3, 
    title: "Sample Request Follow-up", 
    recipient: "Neiman Marcus",
    recipientEmail: "buyer@neimanmarcus.com",
    message: "I wanted to follow up on the samples you requested last week...", 
    status: "draft", 
    updatedAt: "2025-03-16 18:20",
    template: "Sample Request"
  },
  { 
    id: 4, 
    title: "Line Sheet Overview", 
    recipient: "Harrods",
    recipientEmail: "buyer@harrods.com",
    message: "As discussed during our meeting, here's an overview of our line sheet...", 
    status: "sent", 
    sentAt: "2025-03-10 11:15",
    readAt: null,
    template: "Product Information"
  },
];

// Mock templates
const followUpTemplates = [
  { id: 1, name: "Event Follow-up", content: "Thank you for meeting with us at [Event Name]. We enjoyed discussing our collection with you and wanted to follow up on the pieces you expressed interest in." },
  { id: 2, name: "Sample Request", content: "I'm writing to follow up on the sample request you made for [Product Name]. We've arranged for the samples to be sent and would like to confirm the delivery details." },
  { id: 3, name: "General Follow-up", content: "It was a pleasure speaking with you about our latest collection. I wanted to follow up and see if you had any additional questions or if you'd like to schedule another meeting." },
  { id: 4, name: "Product Information", content: "As promised, I'm sending over additional information about the products you were interested in. Please find attached the detailed specifications and pricing information." },
];

const FollowUps = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [isNewFollowUpOpen, setIsNewFollowUpOpen] = useState(false);
  const [isViewFollowUpOpen, setIsViewFollowUpOpen] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState<any | null>(null);
  
  const handleCreateFollowUp = () => {
    toast({
      title: "Follow-up Created",
      description: "Your follow-up has been scheduled.",
    });
    setIsNewFollowUpOpen(false);
  };
  
  const viewFollowUp = (followUp) => {
    setSelectedFollowUp(followUp);
    setIsViewFollowUpOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-light">Follow-up Messages</h2>
          <p className="text-sm text-gray-500">Create and manage personalized follow-up messages to buyers</p>
        </div>
        <Button 
          className="bg-black text-white hover:bg-gray-800 rounded-none text-xs font-light"
          onClick={() => setIsNewFollowUpOpen(true)}
        >
          <Plus className="w-3 h-3 mr-1" strokeWidth={1.5} />
          New Follow-up
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-transparent p-0 mb-4 border-b w-full flex justify-start space-x-4 h-auto">
          <TabsTrigger 
            value="active"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light"
          >
            Active
          </TabsTrigger>
          <TabsTrigger 
            value="sent"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light"
          >
            Sent
          </TabsTrigger>
          <TabsTrigger 
            value="drafts"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light"
          >
            Drafts
          </TabsTrigger>
          <TabsTrigger 
            value="templates"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light"
          >
            Templates
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {mockFollowUps
            .filter(f => f.status === "scheduled")
            .map((followUp) => (
              <Card key={followUp.id} className="border-gray-100 shadow-none rounded-none hover:shadow-sm transition-shadow">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-base font-light">{followUp.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <User size={12} /> 
                        {followUp.recipient}
                      </CardDescription>
                    </div>
                    <Badge className="bg-gray-100 text-gray-700 rounded-sm text-xs font-light flex items-center gap-1 h-6">
                      <Clock size={12} />
                      Scheduled
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-4 py-2">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar size={12} strokeWidth={1.5} />
                    <span>Scheduled for {followUp.scheduledFor}</span>
                  </div>
                  <div className="mt-2 text-sm line-clamp-2 text-gray-600">
                    {followUp.message}
                  </div>
                </CardContent>
                <CardFooter className="px-4 py-3 flex justify-end space-x-2 border-t border-gray-50">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs rounded-none font-light"
                    onClick={() => viewFollowUp(followUp)}
                  >
                    <Eye className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs rounded-none font-light"
                  >
                    <Edit className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs rounded-none font-light"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Reschedule
                  </Button>
                </CardFooter>
              </Card>
            ))}
          
          {mockFollowUps.filter(f => f.status === "scheduled").length === 0 && (
            <div className="text-center py-8">
              <Clock className="mx-auto h-10 w-10 text-gray-300 mb-2" strokeWidth={1} />
              <h3 className="text-lg font-light mb-1">No Scheduled Follow-ups</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                You don't have any follow-ups scheduled. Create a new follow-up to stay in touch with your buyers.
              </p>
              <Button 
                className="mt-4 bg-black text-white hover:bg-gray-800 rounded-none text-xs font-light"
                onClick={() => setIsNewFollowUpOpen(true)}
              >
                <Plus className="w-3 h-3 mr-1" strokeWidth={1.5} />
                New Follow-up
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sent" className="space-y-4">
          {mockFollowUps
            .filter(f => f.status === "sent")
            .map((followUp) => (
              <Card key={followUp.id} className="border-gray-100 shadow-none rounded-none hover:shadow-sm transition-shadow">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-base font-light">{followUp.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <User size={12} /> 
                        {followUp.recipient}
                      </CardDescription>
                    </div>
                    <Badge className={`rounded-sm text-xs font-light flex items-center gap-1 h-6 ${
                      followUp.readAt ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {followUp.readAt ? <Check size={12} /> : <MailCheck size={12} />}
                      {followUp.readAt ? 'Read' : 'Sent'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-4 py-2">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar size={12} strokeWidth={1.5} />
                    <span>Sent {followUp.sentAt}</span>
                    {followUp.readAt && (
                      <>
                        <span className="mx-1">•</span>
                        <span>Read {followUp.readAt}</span>
                      </>
                    )}
                  </div>
                  <div className="mt-2 text-sm line-clamp-2 text-gray-600">
                    {followUp.message}
                  </div>
                </CardContent>
                <CardFooter className="px-4 py-3 flex justify-end space-x-2 border-t border-gray-50">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs rounded-none font-light"
                    onClick={() => viewFollowUp(followUp)}
                  >
                    <Eye className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs rounded-none font-light"
                  >
                    <MessagesSquare className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Follow-up Again
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        
        <TabsContent value="drafts" className="space-y-4">
          {mockFollowUps
            .filter(f => f.status === "draft")
            .map((followUp) => (
              <Card key={followUp.id} className="border-gray-100 shadow-none rounded-none hover:shadow-sm transition-shadow">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-base font-light">{followUp.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <User size={12} /> 
                        {followUp.recipient}
                      </CardDescription>
                    </div>
                    <Badge className="bg-gray-100 text-gray-500 rounded-sm text-xs font-light flex items-center gap-1 h-6">
                      <PencilLine size={12} />
                      Draft
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-4 py-2">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock size={12} strokeWidth={1.5} />
                    <span>Last updated {followUp.updatedAt}</span>
                  </div>
                  <div className="mt-2 text-sm line-clamp-2 text-gray-600">
                    {followUp.message}
                  </div>
                </CardContent>
                <CardFooter className="px-4 py-3 flex justify-end space-x-2 border-t border-gray-50">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs rounded-none font-light"
                  >
                    <Edit className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs rounded-none font-light"
                  >
                    <Clock className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Schedule
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-black text-white hover:bg-gray-800 text-xs rounded-none font-light"
                  >
                    <Send className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Send Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {mockFollowUps.filter(f => f.status === "draft").length === 0 && (
              <div className="text-center py-8">
                <PencilLine className="mx-auto h-10 w-10 text-gray-300 mb-2" strokeWidth={1} />
                <h3 className="text-lg font-light mb-1">No Draft Follow-ups</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  You don't have any drafts saved. Create a new follow-up and save it as a draft to continue working on it later.
                </p>
                <Button 
                  className="mt-4 bg-black text-white hover:bg-gray-800 rounded-none text-xs font-light"
                  onClick={() => setIsNewFollowUpOpen(true)}
                >
                  <Plus className="w-3 h-3 mr-1" strokeWidth={1.5} />
                  New Follow-up
                </Button>
              </div>
            )}
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {followUpTemplates.map((template) => (
              <Card key={template.id} className="border-gray-100 shadow-none rounded-none hover:shadow-sm transition-shadow">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base font-light">{template.name}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 py-2">
                  <div className="text-sm line-clamp-3 text-gray-600">
                    {template.content}
                  </div>
                </CardContent>
                <CardFooter className="px-4 py-3 flex justify-end space-x-2 border-t border-gray-50">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs rounded-none font-light"
                  >
                    <Eye className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Preview
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs rounded-none font-light"
                  >
                    <Edit className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs rounded-none font-light"
                    onClick={() => {
                      setIsNewFollowUpOpen(true);
                    }}
                  >
                    <Send className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Use
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {/* Add New Template */}
            <Card className="border-dashed border-gray-200 shadow-none rounded-none hover:shadow-sm transition-shadow cursor-pointer flex flex-col items-center justify-center p-8 bg-gray-50">
              <Plus size={24} className="text-gray-400 mb-2" strokeWidth={1} />
              <p className="text-sm font-light text-gray-500">Create New Template</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* New Follow-up Dialog */}
      <Dialog open={isNewFollowUpOpen} onOpenChange={setIsNewFollowUpOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-none">
          <DialogHeader>
            <DialogTitle className="text-lg font-light">Create New Follow-up</DialogTitle>
            <DialogDescription>
              Send a personalized follow-up message to a buyer
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-xs font-light">Title</Label>
              <Input id="title" placeholder="e.g. Paris Fashion Week Follow-up" className="rounded-none border-gray-200" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="recipient" className="text-xs font-light">Recipient</Label>
              <Select>
                <SelectTrigger className="rounded-none border-gray-200">
                  <SelectValue placeholder="Select a buyer" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="gl">Galeries Lafayette</SelectItem>
                  <SelectItem value="selfridges">Selfridges</SelectItem>
                  <SelectItem value="nm">Neiman Marcus</SelectItem>
                  <SelectItem value="harrods">Harrods</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="template" className="text-xs font-light">Template</Label>
              <Select>
                <SelectTrigger className="rounded-none border-gray-200">
                  <SelectValue placeholder="Select a template (optional)" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {followUpTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id.toString()}>
                      {template.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="none">No Template (Blank)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="message" className="text-xs font-light">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Enter your follow-up message" 
                className="rounded-none border-gray-200 min-h-[150px]" 
                defaultValue="Hello,

Thank you for your interest in our collection. I wanted to follow up on our recent conversation and see if you had any questions or if you'd like additional information.

Best regards,"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="schedule" />
              <Label htmlFor="schedule" className="text-xs font-light">Schedule for later</Label>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs rounded-none font-light"
            >
              Save as Draft
            </Button>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs rounded-none font-light"
              >
                <Clock className="w-3 h-3 mr-1" strokeWidth={1.5} />
                Schedule
              </Button>
              <Button 
                size="sm" 
                className="bg-black text-white hover:bg-gray-800 text-xs rounded-none font-light"
                onClick={handleCreateFollowUp}
              >
                <Send className="w-3 h-3 mr-1" strokeWidth={1.5} />
                Send Now
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Follow-up Dialog */}
      <Dialog open={isViewFollowUpOpen} onOpenChange={setIsViewFollowUpOpen}>
        {selectedFollowUp && (
          <DialogContent className="sm:max-w-[600px] rounded-none">
            <DialogHeader>
              <DialogTitle className="text-lg font-light">{selectedFollowUp.title}</DialogTitle>
              <DialogDescription className="flex justify-between">
                <span>To: {selectedFollowUp.recipient} ({selectedFollowUp.recipientEmail})</span>
                <Badge 
                  className={`rounded-sm text-xs font-light ${
                    selectedFollowUp.status === "sent" 
                      ? (selectedFollowUp.readAt ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-500')
                      : selectedFollowUp.status === "scheduled" 
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {selectedFollowUp.status === "sent" 
                    ? (selectedFollowUp.readAt ? 'Read' : 'Sent') 
                    : selectedFollowUp.status === "scheduled"
                      ? 'Scheduled'
                      : 'Draft'}
                </Badge>
              </DialogDescription>
            </DialogHeader>
            
            <div className="pt-2 pb-4">
              {selectedFollowUp.status === "sent" && (
                <div className="mb-4 text-xs text-gray-500 flex items-center space-x-2">
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" strokeWidth={1.5} />
                    <span>Sent: {selectedFollowUp.sentAt}</span>
                  </div>
                  {selectedFollowUp.readAt && (
                    <div className="flex items-center">
                      <Check size={12} className="mr-1" strokeWidth={1.5} />
                      <span>Read: {selectedFollowUp.readAt}</span>
                    </div>
                  )}
                </div>
              )}
              
              {selectedFollowUp.status === "scheduled" && (
                <div className="mb-4 text-xs text-gray-500 flex items-center">
                  <Clock size={12} className="mr-1" strokeWidth={1.5} />
                  <span>Scheduled for: {selectedFollowUp.scheduledFor}</span>
                </div>
              )}
              
              <div className="border border-gray-200 rounded-none p-4 min-h-[200px] whitespace-pre-wrap text-sm">
                {selectedFollowUp.message}
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs rounded-none font-light"
                onClick={() => setIsViewFollowUpOpen(false)}
              >
                Close
              </Button>
              
              {selectedFollowUp.status === "sent" && (
                <Button 
                  size="sm" 
                  className="bg-black text-white hover:bg-gray-800 text-xs rounded-none font-light"
                >
                  <MessagesSquare className="w-3 h-3 mr-1" strokeWidth={1.5} />
                  Follow-up Again
                </Button>
              )}
              
              {selectedFollowUp.status === "scheduled" && (
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs rounded-none font-light"
                  >
                    <Edit className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-black text-white hover:bg-gray-800 text-xs rounded-none font-light"
                  >
                    <Send className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Send Now
                  </Button>
                </div>
              )}
              
              {selectedFollowUp.status === "draft" && (
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs rounded-none font-light"
                  >
                    <Edit className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-black text-white hover:bg-gray-800 text-xs rounded-none font-light"
                  >
                    <Send className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Send Now
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default FollowUps;
