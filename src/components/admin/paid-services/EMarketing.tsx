
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search, Plus, Calendar, Mail, Send, Clock, Edit, Eye, MessageSquare,
  BarChart3, Copy, FileText
} from "lucide-react";
import { EmailTemplate, EmailCampaign } from "@/types/services/paidServices";

// Mock data for email templates
const mockTemplates: EmailTemplate[] = [
  {
    id: "template-1",
    name: "New Collection Announcement",
    description: "Template for announcing new fashion collections",
    subject: "Introducing our Latest Collection: [Season] [Year]",
    content: "<p>Dear [Customer],</p><p>We're excited to announce our latest collection...</p>",
    previewImage: "/placeholder.svg",
    category: "announcement",
    createdAt: "2024-02-15T10:30:00Z"
  },
  {
    id: "template-2",
    name: "Seasonal Sale",
    description: "Template for seasonal sales and promotions",
    subject: "[Season] Sale: Up to 50% Off",
    content: "<p>Hello [Customer],</p><p>Our [Season] sale is now live with...</p>",
    previewImage: "/placeholder.svg",
    category: "promotion",
    createdAt: "2024-01-20T14:45:00Z"
  },
  {
    id: "template-3",
    name: "Fashion Industry Newsletter",
    description: "Monthly newsletter with fashion industry updates",
    subject: "[Month] Fashion Industry Insights",
    content: "<p>Hello [Subscriber],</p><p>Here's what's happening in the fashion world...</p>",
    previewImage: "/placeholder.svg",
    category: "newsletter",
    createdAt: "2024-03-05T09:15:00Z"
  },
  {
    id: "template-4",
    name: "Fashion Show Invitation",
    description: "Template for fashion show and event invitations",
    subject: "You're Invited: [Event Name]",
    content: "<p>Dear [Attendee],</p><p>We're pleased to invite you to our exclusive...</p>",
    previewImage: "/placeholder.svg",
    category: "event",
    createdAt: "2024-02-28T11:00:00Z"
  }
];

// Mock data for email campaigns
const mockCampaigns: EmailCampaign[] = [
  {
    id: "campaign-1",
    name: "Spring Collection Launch",
    description: "Announcement of the Spring 2024 collection",
    templateId: "template-1",
    recipients: 2500,
    opened: 1800,
    clicked: 950,
    sentAt: "2024-03-01T10:00:00Z",
    status: "sent",
    createdAt: "2024-02-25T14:30:00Z"
  },
  {
    id: "campaign-2",
    name: "Summer Sale Preview",
    description: "Early access to Summer sales for loyal customers",
    templateId: "template-2",
    recipients: 1500,
    opened: 1200,
    clicked: 780,
    sentAt: "2024-04-05T09:00:00Z",
    status: "sent",
    createdAt: "2024-04-01T11:45:00Z"
  },
  {
    id: "campaign-3",
    name: "April Fashion Newsletter",
    description: "Monthly newsletter for April 2024",
    templateId: "template-3",
    recipients: 3000,
    opened: 0,
    clicked: 0,
    scheduledFor: "2024-04-25T08:00:00Z",
    status: "scheduled",
    createdAt: "2024-04-10T16:20:00Z"
  },
  {
    id: "campaign-4",
    name: "Summer Fashion Show",
    description: "Invitation to exclusive Summer Fashion Show",
    templateId: "template-4",
    recipients: 500,
    opened: 0,
    clicked: 0,
    status: "draft",
    createdAt: "2024-04-15T13:10:00Z"
  }
];

const EMarketing = () => {
  const [templates] = useState<EmailTemplate[]>(mockTemplates);
  const [campaigns] = useState<EmailCampaign[]>(mockCampaigns);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("campaigns");
  
  // Helper function to get template by ID
  const getTemplateById = (id: string) => {
    return templates.find(t => t.id === id);
  };
  
  // Calculate email statistics
  const totalRecipients = campaigns.reduce((sum, campaign) => sum + campaign.recipients, 0);
  const totalOpened = campaigns.reduce((sum, campaign) => sum + campaign.opened, 0);
  const totalClicked = campaigns.reduce((sum, campaign) => sum + campaign.clicked, 0);
  
  const openRate = totalRecipients > 0 ? (totalOpened / totalRecipients * 100).toFixed(1) : "0.0";
  const clickRate = totalOpened > 0 ? (totalClicked / totalOpened * 100).toFixed(1) : "0.0";
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal tracking-tighter uppercase">eMarketing Management</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <TabsList>
            <TabsTrigger value="campaigns" className="text-xs font-normal uppercase border-r border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-r data-[state=active]:border-white">
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white">
              Email Templates
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs font-normal uppercase border-l border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-l data-[state=active]:border-white">
              Analytics
            </TabsTrigger>
          </TabsList>
          </div>
          <Button className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase" onClick={() => setActiveTab("templates")}>
            <Plus size={16} />
            {activeTab === "campaigns" ? "New Campaign" : "New Template"}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="campaigns" value={activeTab} onValueChange={setActiveTab}>
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Recipients</p>
                    <p className="text-2xl font-light mt-1">{totalRecipients.toLocaleString()}</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Open Rate</p>
                    <p className="text-2xl font-light mt-1">{openRate}%</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Click Rate</p>
                    <p className="text-2xl font-light mt-1">{clickRate}%</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center">
                    <Send className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <TabsContent value="campaigns">
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-lg font-normal uppercase text-gray-900">
                  Email Campaigns ({campaigns.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-normal text-xs uppercase">Campaign Name</TableHead>
                      <TableHead className="font-normal text-xs uppercase">Template</TableHead>
                      <TableHead className="font-normal text-xs uppercase">Recipients</TableHead>
                      <TableHead className="font-normal text-xs uppercase">Open Rate</TableHead>
                      <TableHead className="font-normal text-xs uppercase">Status</TableHead>
                      <TableHead className="font-normal text-xs uppercase">Date</TableHead>
                      <TableHead className="text-right font-normal text-xs uppercase">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => {
                      const template = getTemplateById(campaign.templateId);
                      const openRate = campaign.recipients > 0 
                        ? (campaign.opened / campaign.recipients * 100).toFixed(1)
                        : "0.0";
                        
                      return (
                        <TableRow key={campaign.id} className="border-t border-gray-100">
                          <TableCell className="font-light">{campaign.name}</TableCell>
                          <TableCell className="font-light">{template?.name || "Unknown Template"}</TableCell>
                          <TableCell className="font-light">{campaign.recipients.toLocaleString()}</TableCell>
                          <TableCell>
                            {campaign.status === "sent" ? `${openRate}%` : "-"}
                          </TableCell>
                          <TableCell>
                            {campaign.status === "sent" && (
                              <Badge variant="outline" className="bg-accent-mint text-gray-800 capitalize border-gray-200">
                                Sent
                              </Badge>
                            )}
                            {campaign.status === "scheduled" && (
                              <Badge variant="outline" className="bg-accent-yellow text-gray-800 capitalize border-gray-200">
                                Scheduled
                              </Badge>
                            )}
                            {campaign.status === "draft" && (
                              <Badge variant="outline" className="bg-gray-100 text-gray-800 capitalize border-gray-200">
                                Draft
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="font-light">
                            {campaign.sentAt 
                              ? new Date(campaign.sentAt).toLocaleDateString()
                              : campaign.scheduledFor
                                ? new Date(campaign.scheduledFor).toLocaleDateString()
                                : "-"}
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200">
                              <Eye className="h-4 w-4" strokeWidth={1.5} />
                            </Button>
                            {campaign.status !== "sent" && (
                              <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200">
                                <Edit className="h-4 w-4" strokeWidth={1.5} />
                              </Button>
                            )}

                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="border border-gray-200 shadow-none rounded-lg overflow-hidden">
                  <div className="h-[160px] bg-gray-100 flex items-center justify-center">
                    <img 
                      src={template.previewImage} 
                      alt={template.name} 
                      className="max-h-full object-contain"
                    />
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base font-medium">{template.name}</CardTitle>
                      <Badge variant="secondary" className="capitalize">
                        {template.category}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-sm text-gray-500">
                    <div className="flex gap-2 items-center">
                      <Calendar className="h-4 w-4" />
                      <span>Created {new Date(template.createdAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                  <div className="px-4 pb-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" /> Preview
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </div>
                </Card>
              ))}
              
              <Card className="border border-gray-200 shadow-none rounded-lg border-dashed flex flex-col items-center justify-center p-6 h-full min-h-[320px]">
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Create New Template</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Design beautiful email templates for your campaigns
                </p>
                <Button>Create Template</Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-lg font-medium text-gray-900">
                  Campaign Performance
                </CardTitle>
                <CardDescription>
                  Analytics overview of sent campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {campaigns
                    .filter(c => c.status === "sent")
                    .map(campaign => {
                      const openRate = campaign.recipients > 0 
                        ? (campaign.opened / campaign.recipients * 100).toFixed(1)
                        : "0.0";
                      const clickRate = campaign.opened > 0
                        ? (campaign.clicked / campaign.opened * 100).toFixed(1)
                        : "0.0";
                        
                      return (
                        <div key={campaign.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium">{campaign.name}</h3>
                              <p className="text-sm text-gray-500">{campaign.description}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                              Sent: {new Date(campaign.sentAt!).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Recipients</p>
                              <p className="font-medium">{campaign.recipients.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Opened</p>
                              <p className="font-medium">{campaign.opened.toLocaleString()} ({openRate}%)</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Clicks</p>
                              <p className="font-medium">{campaign.clicked.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Click Rate</p>
                              <p className="font-medium">{clickRate}%</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-accent-mint h-full" 
                                style={{ width: `${openRate}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  
                  {campaigns.filter(c => c.status === "sent").length === 0 && (
                    <div className="text-center py-12">
                      <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                        <BarChart3 className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium">No Analytics Available</h3>
                      <p className="text-sm text-gray-500 mt-2">
                        Send your first campaign to start collecting analytics
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-lg font-medium text-gray-900">
                  Upcoming Scheduled Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {campaigns
                    .filter(c => c.status === "scheduled")
                    .map(campaign => (
                      <div key={campaign.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center mr-4">
                            <Clock className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">{campaign.name}</h3>
                            <p className="text-sm text-gray-500">
                              {campaign.recipients.toLocaleString()} recipients
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {new Date(campaign.scheduledFor!).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(campaign.scheduledFor!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                  {campaigns.filter(c => c.status === "scheduled").length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-sm text-gray-500">
                        No scheduled campaigns
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default EMarketing;
