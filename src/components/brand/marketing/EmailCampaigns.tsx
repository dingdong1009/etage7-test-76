
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, Users, Calendar, Clock, AlertCircle, Send, Edit, Trash2, ChevronDown, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import EmailEditor from "@/components/brand/marketing/EmailEditor";

// Mock data for campaigns
const mockCampaigns = [
  { 
    id: 1, 
    name: "Spring Collection Launch", 
    status: "sent", 
    audience: "All Followers", 
    recipients: 145, 
    openRate: "32%", 
    clickRate: "8%",
    date: "2023-03-15" 
  },
  { 
    id: 2, 
    name: "Summer Pre-order Opportunity", 
    status: "scheduled", 
    audience: "Previous Buyers", 
    recipients: 87, 
    openRate: "N/A", 
    clickRate: "N/A",
    date: "2023-05-01" 
  },
  { 
    id: 3, 
    name: "Limited Edition Collection", 
    status: "draft", 
    audience: "VIP Buyers", 
    recipients: "Est. 35", 
    openRate: "N/A", 
    clickRate: "N/A",
    date: "N/A" 
  },
  { 
    id: 4, 
    name: "Fashion Week Preview", 
    status: "draft", 
    audience: "Press & Buyers", 
    recipients: "Est. 85", 
    openRate: "N/A", 
    clickRate: "N/A",
    date: "N/A" 
  }
];

// Mock data for audience segments
const mockAudiences = [
  { id: 1, name: "All Followers", count: 145 },
  { id: 2, name: "Previous Buyers", count: 87 },
  { id: 3, name: "VIP Buyers", count: 35 },
  { id: 4, name: "Cart Abandoners", count: 28 },
  { id: 5, name: "Product Page Visitors", count: 110 },
  { id: 6, name: "Press & Buyers", count: 85 }
];

// Mock data for templates
const mockTemplates = [
  { id: 1, name: "Product Launch", type: "marketing" },
  { id: 2, name: "Collection Announcement", type: "marketing" },
  { id: 3, name: "Product Restock", type: "transactional" },
  { id: 4, name: "Follow-up", type: "follow-up" },
  { id: 5, name: "Cart Abandonment", type: "follow-up" }
];

const EmailCampaigns = () => {
  const [campaignView, setCampaignView] = useState<"list" | "create" | "followUp">("list");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [campaignName, setCampaignName] = useState("");
  const [campaignSubject, setCampaignSubject] = useState("");
  const [selectedAudience, setSelectedAudience] = useState<number | null>(null);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  
  // Credits info - would come from user data in real app
  const creditsInfo = { available: 1, used: 0, total: 1 };

  const handleCreateNew = (type: "campaign" | "followUp") => {
    setCampaignView(type === "campaign" ? "create" : "followUp");
    setCampaignName("");
    setCampaignSubject("");
    setSelectedTemplate(null);
    setSelectedAudience(null);
  };

  const handleSelectCampaign = (id: number) => {
    setSelectedCampaign(id);
    setCampaignView("create"); // In a real app, would load the campaign data
  };

  return (
    <div className="space-y-6">
      {campaignView === "list" ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-light">Email Campaigns</h2>
            <div className="flex gap-2">
              <Button 
                className="rounded-none text-xs font-light bg-black text-white hover:bg-gray-800"
                onClick={() => handleCreateNew("campaign")}
              >
                <Plus className="mr-2 h-4 w-4" strokeWidth={1} />
                New Campaign
              </Button>
              <Button 
                variant="outline" 
                className="rounded-none text-xs font-light"
                onClick={() => handleCreateNew("followUp")}
              >
                <Calendar className="mr-2 h-4 w-4" strokeWidth={1} />
                Schedule Follow-up
              </Button>
            </div>
          </div>
          
          {/* Credits information */}
          <Card className="border border-gray-100 rounded-none shadow-none bg-gray-50">
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                <div>
                  <h3 className="text-lg font-light mb-1">Email Credits</h3>
                  <p className="text-sm text-gray-600">You have {creditsInfo.available} free email credits available</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="text-center px-4 py-2 border-r border-gray-200">
                    <p className="text-sm text-gray-600">Available</p>
                    <p className="text-xl font-light">{creditsInfo.available}</p>
                  </div>
                  <div className="text-center px-4 py-2">
                    <p className="text-sm text-gray-600">Used</p>
                    <p className="text-xl font-light">{creditsInfo.used}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="rounded-none text-xs ml-2"
                  >
                    <CreditCard className="mr-2 h-4 w-4" strokeWidth={1} />
                    Buy Credits
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign list */}
          <Card className="border border-gray-100 rounded-none shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-light">Your Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-light">Campaign Name</TableHead>
                    <TableHead className="font-light">Status</TableHead>
                    <TableHead className="font-light">Audience</TableHead>
                    <TableHead className="font-light">Recipients</TableHead>
                    <TableHead className="font-light">Open Rate</TableHead>
                    <TableHead className="font-light">Click Rate</TableHead>
                    <TableHead className="font-light">Date</TableHead>
                    <TableHead className="font-light text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">
                        <button 
                          className="text-left hover:underline"
                          onClick={() => handleSelectCampaign(campaign.id)}
                        >
                          {campaign.name}
                        </button>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`
                            rounded-sm text-xs 
                            ${campaign.status === 'sent' ? 'bg-accent-mint text-gray-800' : ''}
                            ${campaign.status === 'scheduled' ? 'bg-gray-200 text-gray-800' : ''}
                            ${campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}
                          `}
                        >
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.audience}</TableCell>
                      <TableCell>{campaign.recipients}</TableCell>
                      <TableCell>{campaign.openRate}</TableCell>
                      <TableCell>{campaign.clickRate}</TableCell>
                      <TableCell>{campaign.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Edit className="h-4 w-4" strokeWidth={1} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                            <Trash2 className="h-4 w-4" strokeWidth={1} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : campaignView === "create" ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-light">
              {selectedCampaign ? 'Edit Campaign' : 'Create New Campaign'}
            </h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="rounded-none text-xs font-light"
                onClick={() => setCampaignView("list")}
              >
                Cancel
              </Button>
              <Button 
                className="rounded-none text-xs font-light bg-black text-white hover:bg-gray-800"
                onClick={() => setShowScheduleDialog(true)}
              >
                <Send className="mr-2 h-4 w-4" strokeWidth={1} />
                Send Campaign
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              <Card className="border border-gray-100 rounded-none shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-light">Campaign Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-light">Campaign Name</Label>
                    <Input 
                      id="name" 
                      value={campaignName} 
                      onChange={(e) => setCampaignName(e.target.value)} 
                      className="rounded-none"
                      placeholder="e.g. Spring Collection Launch"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-light">Email Subject</Label>
                    <Input 
                      id="subject" 
                      value={campaignSubject} 
                      onChange={(e) => setCampaignSubject(e.target.value)} 
                      className="rounded-none"
                      placeholder="e.g. Introducing our Spring Collection"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-light">Audience</Label>
                    <Select onValueChange={(value) => setSelectedAudience(parseInt(value))}>
                      <SelectTrigger className="rounded-none">
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        {mockAudiences.map((audience) => (
                          <SelectItem key={audience.id} value={audience.id.toString()}>
                            {audience.name} ({audience.count})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full rounded-none text-xs font-light"
                      onClick={() => setShowTemplateDialog(true)}
                    >
                      {selectedTemplate ? 'Change Template' : 'Select Template'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-100 rounded-none shadow-none bg-gray-50">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                      <div className="text-sm text-gray-600">
                        This will use 1 email credit
                      </div>
                    </div>
                    <Badge className="bg-black rounded-sm text-xs">
                      {creditsInfo.available} credits left
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="border border-gray-100 rounded-none shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-light">Email Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <EmailEditor />
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Template selection dialog */}
          <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
            <DialogContent className="sm:max-w-[600px] rounded-none">
              <DialogHeader>
                <DialogTitle className="text-xl font-light">Select Email Template</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                {mockTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className={`border cursor-pointer transition-colors hover:border-black ${
                      selectedTemplate === template.id ? 'border-black bg-gray-50' : 'border-gray-100'
                    } rounded-none shadow-none`}
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setShowTemplateDialog(false);
                    }}
                  >
                    <CardContent className="pt-6 pb-6">
                      <h3 className="text-lg font-light mb-2">{template.name}</h3>
                      <p className="text-xs text-gray-500 uppercase">{template.type}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowTemplateDialog(false)}
                  className="rounded-none text-xs font-light"
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Schedule dialog */}
          <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
            <DialogContent className="sm:max-w-[500px] rounded-none">
              <DialogHeader>
                <DialogTitle className="text-xl font-light">Schedule Campaign</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-light">Send immediately</Label>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-light">Schedule date</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="date" className="rounded-none" />
                    <Input type="time" className="rounded-none" />
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="confirm" />
                    <Label htmlFor="confirm" className="text-sm font-light">
                      I understand this will use 1 email credit
                    </Label>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowScheduleDialog(false)}
                  className="rounded-none text-xs font-light w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  className="rounded-none text-xs font-light bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
                  onClick={() => {
                    setShowScheduleDialog(false);
                    setCampaignView("list");
                  }}
                >
                  Confirm & Send
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-light">Schedule Follow-up</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="rounded-none text-xs font-light"
                onClick={() => setCampaignView("list")}
              >
                Cancel
              </Button>
              <Button 
                className="rounded-none text-xs font-light bg-black text-white hover:bg-gray-800"
              >
                <Clock className="mr-2 h-4 w-4" strokeWidth={1} />
                Schedule Follow-up
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              <Card className="border border-gray-100 rounded-none shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-light">Follow-up Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-light">Follow-up Name</Label>
                    <Input 
                      id="name" 
                      className="rounded-none"
                      placeholder="e.g. Cart Abandonment Follow-up"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-light">Email Subject</Label>
                    <Input 
                      id="subject" 
                      className="rounded-none"
                      placeholder="e.g. Still interested in these items?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-light">Trigger Event</Label>
                    <Select>
                      <SelectTrigger className="rounded-none">
                        <SelectValue placeholder="Select trigger event" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="cart_abandoned">Cart Abandoned</SelectItem>
                        <SelectItem value="product_viewed">Product Viewed</SelectItem>
                        <SelectItem value="profile_visit">Profile Visited</SelectItem>
                        <SelectItem value="product_liked">Product Liked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-light">Wait Time</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        type="number" 
                        placeholder="1" 
                        className="rounded-none" 
                      />
                      <Select defaultValue="days">
                        <SelectTrigger className="rounded-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="days">Days</SelectItem>
                          <SelectItem value="weeks">Weeks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full rounded-none text-xs font-light"
                      onClick={() => setShowTemplateDialog(true)}
                    >
                      Select Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-100 rounded-none shadow-none bg-gray-50">
                <CardContent className="pt-6 pb-6">
                  <div className="text-sm">
                    <p className="mb-2">
                      <strong>Note:</strong> Follow-ups are automatically sent based on triggers and don't consume credits until sent.
                    </p>
                    <p>Each sent email will use 1 credit from your account.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="border border-gray-100 rounded-none shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-light">Email Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <EmailEditor />
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailCampaigns;
