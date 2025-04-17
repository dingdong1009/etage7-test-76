
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye, Code, Image, Type, AlignLeft, List, ListOrdered, Link } from "lucide-react";

// Placeholder email template HTML
const mockHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #000000;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-weight: 300;
    }
    .content {
      padding: 20px;
    }
    .product {
      margin-bottom: 20px;
      text-align: center;
    }
    .product img {
      max-width: 100%;
      height: auto;
      margin-bottom: 10px;
    }
    .btn {
      display: inline-block;
      background-color: #000000;
      color: #ffffff;
      padding: 10px 20px;
      text-decoration: none;
      margin-top: 10px;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #666666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>BRAND NAME</h1>
    </div>
    <div class="content">
      <h2 style="font-weight: 300; text-align: center;">New Collection Available Now</h2>
      <p>Hello [Customer Name],</p>
      <p>We're excited to introduce our latest collection, featuring elegant designs perfect for the upcoming season.</p>
      
      <div class="product">
        <img src="https://via.placeholder.com/600x400" alt="Product Image">
        <h3 style="font-weight: 300;">Product Name</h3>
        <p>$299.00</p>
        <a href="#" class="btn">Shop Now</a>
      </div>
      
      <p>We hope you enjoy our new collection. For any questions, please contact our customer service.</p>
      <p>Best regards,<br>The Brand Team</p>
    </div>
    <div class="footer">
      <p>© 2023 Brand Name. All rights reserved.</p>
      <p><a href="#">Unsubscribe</a> | <a href="#">View in Browser</a></p>
    </div>
  </div>
</body>
</html>
`;

const EmailEditor = () => {
  const [view, setView] = useState<"design" | "code" | "preview">("design");
  const [htmlContent, setHtmlContent] = useState(mockHtml);

  return (
    <div className="border border-gray-200">
      <div className="bg-gray-50 p-2 border-b border-gray-200">
        <Tabs defaultValue="design" value={view} onValueChange={(v) => setView(v as "design" | "code" | "preview")}>
          <TabsList className="bg-transparent">
            <TabsTrigger value="design" className="text-xs font-light data-[state=active]:bg-white rounded-sm">
              <Type className="h-4 w-4 mr-2" strokeWidth={1.5} />
              Design
            </TabsTrigger>
            <TabsTrigger value="code" className="text-xs font-light data-[state=active]:bg-white rounded-sm">
              <Code className="h-4 w-4 mr-2" strokeWidth={1.5} />
              HTML
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs font-light data-[state=active]:bg-white rounded-sm">
              <Eye className="h-4 w-4 mr-2" strokeWidth={1.5} />
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {view === "design" && (
        <div>
          <div className="bg-white p-2 border-b border-gray-200 flex gap-1">
            <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
              <Type className="h-4 w-4 mr-1" strokeWidth={1.5} />
              Text
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
              <Image className="h-4 w-4 mr-1" strokeWidth={1.5} />
              Image
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
              <AlignLeft className="h-4 w-4 mr-1" strokeWidth={1.5} />
              Section
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
              <List className="h-4 w-4 mr-1" strokeWidth={1.5} />
              List
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
              <Link className="h-4 w-4 mr-1" strokeWidth={1.5} />
              Button
            </Button>
          </div>
          <div className="h-[500px] overflow-auto bg-white p-4">
            <div className="border border-dashed border-gray-300 h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Image className="h-12 w-12 mx-auto mb-2" strokeWidth={1} />
                <p className="text-sm">Drag and drop elements to design your email</p>
                <p className="text-xs mt-2">Or select a template to get started</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {view === "code" && (
        <div className="h-[540px] overflow-auto bg-gray-900 p-4 font-mono text-gray-200 text-sm">
          <pre className="whitespace-pre-wrap">{htmlContent}</pre>
        </div>
      )}
      
      {view === "preview" && (
        <div className="h-[540px] overflow-auto bg-white p-4">
          <iframe 
            srcDoc={htmlContent}
            title="Email Preview"
            className="w-full h-full border-0"
            sandbox="allow-same-origin"
          />
        </div>
      )}
    </div>
  );
};

export default EmailEditor;
