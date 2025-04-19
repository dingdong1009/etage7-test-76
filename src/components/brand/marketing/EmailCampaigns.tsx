import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  AlertTriangle, 
  CheckCircle, 
  Copy, 
  CreditCard,
  Clock, 
  Edit, 
  Eye, 
  Mail, 
  MailCheck, 
  Plus, 
  Send, 
  Trash2, 
  User, 
  Users
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const mockTemplates = [
  { 
    id: 1, 
    name: "New Collection Announcement", 
    subject: "Introducing our Latest Collection", 
    previewText: "Discover our newest pieces for the upcoming season", 
    content: "<h1>Our New Collection Has Arrived</h1><p>We're excited to introduce our latest designs...</p>", 
    thumbnail: "",
    category: "announcement"
  },
  { 
    id: 2, 
    name: "Seasonal Lookbook", 
    subject: "Explore our SS25 Lookbook", 
    previewText: "See how our new collection comes to life", 
    content: "<h1>Spring/Summer 2025 Lookbook</h1><p>Explore our carefully curated seasonal looks...</p>", 
    thumbnail: "",
    category: "lookbook"
  },
  { 
    id: 3, 
    name: "Exclusive Preview Invitation", 
    subject: "You're Invited: Exclusive Preview Event", 
    previewText: "Be among the first to explore our new collection", 
    content: "<h1>Exclusive Preview Invitation</h1><p>As a valued partner, we'd like to invite you to an exclusive preview...</p>", 
    thumbnail: "",
    category: "event"
  },
  { 
    id: 4, 
    name: "Thank You", 
    subject: "Thank You for Your Interest", 
    previewText: "We appreciate your continued partnership", 
    content: "<h1>Thank You for Your Interest</h1><p>We wanted to express our gratitude for your continued interest in our brand...</p>", 
    thumbnail: "",
    category: "followup"
  },
  { 
    id: 5, 
    name: "Line Sheet Update", 
    subject: "Updated Line Sheet Now Available", 
    previewText: "Access our latest product information", 
    content: "<h1>Updated Line Sheet</h1><p>We've recently updated our line sheet with new products and pricing...</p>", 
    thumbnail: "",
    category: "update"
  },
];

const mockCampaigns = [
  { 
    id: 1, 
    name: "Spring Collection Launch", 
    subject: "Introducing Spring Collection 2025", 
    recipients: 125, 
    sentDate: "2025-02-15", 
    opens: 98, 
    clicks: 45,
    status: "sent" 
  },
  { 
    id: 2, 
    name: "Summer Preview", 
    subject: "Get Ready for Summer 2025", 
    recipients: 150, 
    sentDate: null, 
    opens: null, 
    clicks: null,
    status: "draft" 
  },
  { 
    id: 3, 
    name: "Fashion Week Follow-up", 
    subject: "Thank You for Visiting Our Showroom", 
    recipients: 35, 
    sentDate: "2025-03-15", 
    opens: 30, 
    clicks: 22,
    status: "sent" 
  },
  { 
    id: 4, 
    name: "Exclusive Buyer Preview", 
    subject: "Pre-order Our Limited Edition Pieces", 
    recipients: 25, 
    scheduled: "2025-04-20",
    sentDate: null, 
    opens: null, 
    clicks: null,
    status: "scheduled" 
  },
];

const recipientGroups = [
  { id: 1, name: "All Buyers", count: 150 },
  { id: 2, name: "Following", count: 85 },
  { id: 3, name: "Recent Visitors", count: 65 },
  { id: 4, name: "Cart Abandoners", count: 25 },
  { id: 5, name: "Previous Purchases", count: 40 },
];

const EmailCampaigns = () => {
  const [campaignTab, setCampaignTab] = useState("campaigns");
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [selectedRecipientGroup, setSelectedRecipientGroup] = useState<number | null>(null);
  const [creditsRemaining, setCreditsRemaining] = useState(1);
  const [showCreditDialog, setShowCreditDialog] = useState(false);
  const [emailContent, setEmailContent] = useState('');

  const handleSendCampaign = () => {
    if (creditsRemaining < 1) {
      setShowCreditDialog(true);
      return;
    }
    
    // Mock sending campaign
    setCreditsRemaining(prev => prev - 1);
    toast({
      title: "Campaign Sent",
      description: "Your email campaign has been sent to the selected recipients.",
    });
    setIsNewCampaignOpen(false);
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your email campaign draft has been saved.",
    });
    setIsNewCampaignOpen(false);
  };
  
  const handleSchedule = () => {
    if (creditsRemaining < 1) {
      setShowCreditDialog(true);
      return;
    }
    
    toast({
      title: "Campaign Scheduled",
      description: "Your email campaign has been scheduled.",
    });
    setIsNewCampaignOpen(false);
  };
  
  const handleBuyCredits = () => {
    // Mock buying credits
    toast({
      title: "Credits Purchased",
      description: "Your account has been credited with 5 email credits.",
    });
    setCreditsRemaining(prev => prev + 5);
    setShowCreditDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Card className="bg-gray-50 border-gray-100 shadow-none rounded-none w-full md:w-auto">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-light">Email Credits Remaining</p>
              <p className="text-2xl font-light">{creditsRemaining}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs rounded-none border-gray-200"
              onClick={() => setShowCreditDialog(true)}
            >
              <CreditCard className="w-3 h-3 mr-1" strokeWidth={1} />
              Buy Credits
            </Button>
          </CardContent>
        </Card>
        
        <Button 
          className="bg-black text-white hover:bg-gray-800 rounded-none text-xs font-light"
          onClick={() => setIsNewCampaignOpen(true)}
        >
          <Plus className="w-3 h-3 mr-1" strokeWidth={1.5} />
          New Campaign
        </Button>
      </div>
      
      <Tabs value={campaignTab} onValueChange={setCampaignTab} className="w-full">
        <TabsList className="bg-transparent p-0 mb-4 border-b w-full flex justify-start space-x-4 h-auto">
          <TabsTrigger 
            value="campaigns"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light"
          >
            Your Campaigns
          </TabsTrigger>
          <TabsTrigger 
            value="templates"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light"
          >
            Email Templates
          </TabsTrigger>
          <TabsTrigger 
            value="recipients"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light"
          >
            Recipient Groups
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {mockCampaigns.map((campaign) => (
              <Card key={campaign.id} className="border-gray-100 shadow-none rounded-none hover:shadow-sm transition-shadow">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-light">{campaign.name}</CardTitle>
                    <Badge 
                      className={`
                        rounded-sm font-light text-xs px-2
                        ${campaign.status === 'sent' ? 'bg-gray-100 text-gray-700' : ''}
                        ${campaign.status === 'draft' ? 'bg-gray-100 text-gray-600' : ''}
                        ${campaign.status === 'scheduled' ? 'bg-gray-100 text-gray-700' : ''}
                      `}
                    >
                      {campaign.status === 'sent' && <MailCheck className="w-3 h-3 mr-1" strokeWidth={1.5} />}
                      {campaign.status === 'draft' && <Edit className="w-3 h-3 mr-1" strokeWidth={1.5} />}
                      {campaign.status === 'scheduled' && <Clock className="w-3 h-3 mr-1" strokeWidth={1.5} />}
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">{campaign.subject}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 py-2">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Recipients</p>
                      <p className="font-light">{campaign.recipients}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">
                        {campaign.status === 'sent' ? 'Sent Date' : 
                         campaign.status === 'scheduled' ? 'Scheduled' : 'Last Updated'}
                      </p>
                      <p className="font-light">
                        {campaign.status === 'sent' ? campaign.sentDate :
                         campaign.status === 'scheduled' ? campaign.scheduled : 'Today'}
                      </p>
                    </div>
                    {campaign.status === 'sent' && (
                      <>
                        <div>
                          <p className="text-gray-500 text-xs">Opens</p>
                          <p className="font-light">{campaign.opens} ({Math.round((campaign.opens / campaign.recipients) * 100)}%)</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Clicks</p>
                          <p className="font-light">{campaign.clicks} ({Math.round((campaign.clicks / campaign.recipients) * 100)}%)</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="px-4 py-3 flex justify-end space-x-2 border-t border-gray-50">
                  {campaign.status === 'draft' && (
                    <>
                      <Button 
                        variant="ghost" 
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
                    </>
                  )}
                  {campaign.status === 'scheduled' && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-xs rounded-none font-light"
                      >
                        <Edit className="w-3 h-3 mr-1" strokeWidth={1.5} />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs rounded-none font-light text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {campaign.status === 'sent' && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-xs rounded-none font-light"
                      >
                        <Eye className="w-3 h-3 mr-1" strokeWidth={1.5} />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs rounded-none font-light"
                      >
                        <Copy className="w-3 h-3 mr-1" strokeWidth={1.5} />
                        Duplicate
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTemplates.map((template) => (
              <Card key={template.id} className="border-gray-100 shadow-none rounded-none hover:shadow-sm transition-shadow cursor-pointer">
                <div className="aspect-video bg-gray-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Mail size={24} strokeWidth={1} />
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-light">{template.name}</CardTitle>
                    <Badge className="bg-gray-100 text-gray-700 rounded-sm text-xs font-light">
                      {template.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs truncate">{template.subject}</CardDescription>
                </CardHeader>
                <CardFooter className="px-4 py-3 border-t border-gray-50 flex justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs rounded-none font-light"
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setIsNewCampaignOpen(true);
                    }}
                  >
                    <Send className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Use Template
                  </Button>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-8 h-8 p-0 rounded-none"
                    >
                      <Eye className="w-3 h-3" strokeWidth={1.5} />
                      <span className="sr-only">Preview</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-8 h-8 p-0 rounded-none"
                    >
                      <Edit className="w-3 h-3" strokeWidth={1.5} />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed border-gray-200 shadow-none rounded-none hover:shadow-sm transition-shadow cursor-pointer flex flex-col items-center justify-center aspect-[3/2] bg-gray-50">
              <Plus size={16} className="text-gray-400 mb-2" strokeWidth={1} />
              <p className="text-sm font-light text-gray-500">Create New Template</p>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recipients" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {recipientGroups.map((group) => (
              <Card key={group.id} className="border-gray-100 shadow-none rounded-none hover:shadow-sm transition-shadow">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                      <CardTitle className="text-base font-light">{group.name}</CardTitle>
                    </div>
                    <Badge className="bg-gray-100 text-gray-700 rounded-sm text-xs font-light">
                      {group.count} recipients
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className="px-4 py-3 flex justify-end space-x-2 border-t border-gray-50">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs rounded-none font-light"
                  >
                    <Eye className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    View Recipients
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs rounded-none font-light"
                    onClick={() => {
                      setSelectedRecipientGroup(group.id);
                      setIsNewCampaignOpen(true);
                    }}
                  >
                    <Send className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Send Email
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed border-gray-200 shadow-none rounded-none hover:shadow-sm transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <Plus size={16} className="text-gray-400 mb-2" strokeWidth={1} />
                <p className="text-sm font-light text-gray-500">Create New Recipient Group</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isNewCampaignOpen} onOpenChange={setIsNewCampaignOpen}>
        <DialogContent className="sm:max-w-[700px] rounded-none p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-lg font-light">Create New Campaign</DialogTitle>
            <DialogDescription>
              Craft your email campaign and select your recipient audience
            </DialogDescription>
          </DialogHeader>
          
          <div className="px-6 py-4 border-y border-gray-100">
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name" className="text-xs font-light">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="e.g. Spring Collection Announcement" className="rounded-none border-gray-200" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs font-light">Email Subject</Label>
                  <Input id="subject" placeholder="Enter subject line" className="rounded-none border-gray-200" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preview-text" className="text-xs font-light">Preview Text</Label>
                  <Input id="preview-text" placeholder="Brief preview text that appears in recipient's inbox" className="rounded-none border-gray-200" />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs font-light">Template</Label>
                  <Select defaultValue={selectedTemplate?.toString() || ""}>
                    <SelectTrigger className="rounded-none border-gray-200">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      {mockTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="none">No Template (Blank)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs font-light">Recipients</Label>
                  <Select defaultValue={selectedRecipientGroup?.toString() || ""}>
                    <SelectTrigger className="rounded-none border-gray-200">
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      {recipientGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id.toString()}>
                          {group.name} ({group.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-light">Email Content</Label>
                  <div className="min-h-[200px] bg-white border border-gray-200 rounded-none">
                    <ReactQuill
                      theme="snow"
                      value={emailContent}
                      onChange={setEmailContent}
                      className="h-[150px]"
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, false] }],
                          ['bold', 'italic', 'underline'],
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          ['link', 'clean']
                        ]
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="schedule" />
                <Label htmlFor="schedule" className="text-xs font-light">Schedule for later</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter className="p-6 pt-4">
            <div className="flex justify-between items-center w-full">
              <div className="text-xs text-gray-500">
                <span className="font-medium">{creditsRemaining}</span> email credits remaining
              </div>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs rounded-none font-light"
                  onClick={handleSaveDraft}
                >
                  Save as Draft
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs rounded-none font-light"
                  onClick={handleSchedule}
                >
                  <Clock className="w-3 h-3 mr-1" strokeWidth={1.5} />
                  Schedule
                </Button>
                <Button 
                  size="sm" 
                  className="bg-black text-white hover:bg-gray-800 text-xs rounded-none font-light"
                  onClick={handleSendCampaign}
                >
                  <Send className="w-3 h-3 mr-1" strokeWidth={1.5} />
                  Send Now
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showCreditDialog} onOpenChange={setShowCreditDialog}>
        <DialogContent className="sm:max-w-[400px] rounded-none">
          <DialogHeader>
            <DialogTitle className="text-lg font-light">Buy Email Credits</DialogTitle>
            <DialogDescription>
              You need credits to send email campaigns to buyers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-2">
                <Card className="border-gray-200 shadow-none rounded-none p-4 text-center cursor-pointer hover:border-black transition-colors">
                  <p className="text-lg font-light">5</p>
                  <p className="text-xs text-gray-500">credits</p>
                  <p className="text-sm font-medium mt-2">€25</p>
                </Card>
                <Card className="border-gray-200 shadow-none rounded-none p-4 text-center cursor-pointer hover:border-black transition-colors border-black">
                  <p className="text-lg font-light">10</p>
                  <p className="text-xs text-gray-500">credits</p>
                  <p className="text-sm font-medium mt-2">€45</p>
                  <Badge className="mt-1 text-[10px] bg-gray-100 text-gray-700 font-light">BEST VALUE</Badge>
                </Card>
                <Card className="border-gray-200 shadow-none rounded-none p-4 text-center cursor-pointer hover:border-black transition-colors">
                  <p className="text-lg font-light">20</p>
                  <p className="text-xs text-gray-500">credits</p>
                  <p className="text-sm font-medium mt-2">€80</p>
                </Card>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs font-light">Payment Method</Label>
                <Select defaultValue="card">
                  <SelectTrigger className="rounded-none border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="card">Credit Card (Ending in 4242)</SelectItem>
                    <SelectItem value="new-card">Add New Card</SelectItem>
                    <SelectItem value="invoice">Request Invoice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs rounded-none font-light"
              onClick={() => setShowCreditDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              className="bg-black text-white hover:bg-gray-800 text-xs rounded-none font-light"
              onClick={handleBuyCredits}
            >
              <CreditCard className="w-3 h-3 mr-1" strokeWidth={1.5} />
              Complete Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailCampaigns;
