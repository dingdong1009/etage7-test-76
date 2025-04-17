
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: {
      orders: true,
      messages: true,
      marketing: false,
      system: true
    },
    push: {
      orders: true,
      messages: true,
      marketing: false,
      system: false
    },
    sms: {
      orders: false,
      messages: false,
      marketing: false,
      system: false
    }
  });
  
  const toggleNotification = (category: 'email' | 'push' | 'sms', type: 'orders' | 'messages' | 'marketing' | 'system') => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type]
      }
    }));
  };
  
  const handleSavePreferences = () => {
    // Here you would save the notification preferences to your backend
    toast({
      title: "Preferences updated",
      description: "Your notification preferences have been saved."
    });
  };
  
  return (
    <Card className="border border-gray-200 shadow-none rounded-none">
      <CardContent className="p-6">
        <h2 className="text-xl md:text-2xl uppercase font-light mb-6 tracking-tighter">Notification Preferences</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-light mb-4">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-orders">Order Updates</Label>
                  <p className="text-sm text-gray-500">Receive notifications about order status changes</p>
                </div>
                <Switch 
                  id="email-orders" 
                  checked={notifications.email.orders}
                  onCheckedChange={() => toggleNotification('email', 'orders')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-messages">Message Notifications</Label>
                  <p className="text-sm text-gray-500">Receive email when you get new messages</p>
                </div>
                <Switch 
                  id="email-messages" 
                  checked={notifications.email.messages}
                  onCheckedChange={() => toggleNotification('email', 'messages')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-marketing">Marketing</Label>
                  <p className="text-sm text-gray-500">Receive marketing communications</p>
                </div>
                <Switch 
                  id="email-marketing" 
                  checked={notifications.email.marketing}
                  onCheckedChange={() => toggleNotification('email', 'marketing')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-system">System Updates</Label>
                  <p className="text-sm text-gray-500">Receive important system updates and announcements</p>
                </div>
                <Switch 
                  id="email-system" 
                  checked={notifications.email.system}
                  onCheckedChange={() => toggleNotification('email', 'system')}
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-light mb-4">Push Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-orders">Order Updates</Label>
                  <p className="text-sm text-gray-500">Receive push notifications about order status changes</p>
                </div>
                <Switch 
                  id="push-orders" 
                  checked={notifications.push.orders}
                  onCheckedChange={() => toggleNotification('push', 'orders')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-messages">Message Notifications</Label>
                  <p className="text-sm text-gray-500">Receive push notifications for new messages</p>
                </div>
                <Switch 
                  id="push-messages" 
                  checked={notifications.push.messages}
                  onCheckedChange={() => toggleNotification('push', 'messages')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-marketing">Marketing</Label>
                  <p className="text-sm text-gray-500">Receive marketing push notifications</p>
                </div>
                <Switch 
                  id="push-marketing" 
                  checked={notifications.push.marketing}
                  onCheckedChange={() => toggleNotification('push', 'marketing')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-system">System Updates</Label>
                  <p className="text-sm text-gray-500">Receive push notifications for system updates</p>
                </div>
                <Switch 
                  id="push-system" 
                  checked={notifications.push.system}
                  onCheckedChange={() => toggleNotification('push', 'system')}
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-light mb-4">SMS Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-orders">Order Updates</Label>
                  <p className="text-sm text-gray-500">Receive SMS notifications about order status changes</p>
                </div>
                <Switch 
                  id="sms-orders" 
                  checked={notifications.sms.orders}
                  onCheckedChange={() => toggleNotification('sms', 'orders')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-messages">Message Notifications</Label>
                  <p className="text-sm text-gray-500">Receive SMS notifications for new messages</p>
                </div>
                <Switch 
                  id="sms-messages" 
                  checked={notifications.sms.messages}
                  onCheckedChange={() => toggleNotification('sms', 'messages')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-marketing">Marketing</Label>
                  <p className="text-sm text-gray-500">Receive marketing SMS notifications</p>
                </div>
                <Switch 
                  id="sms-marketing" 
                  checked={notifications.sms.marketing}
                  onCheckedChange={() => toggleNotification('sms', 'marketing')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-system">System Updates</Label>
                  <p className="text-sm text-gray-500">Receive SMS notifications for system updates</p>
                </div>
                <Switch 
                  id="sms-system" 
                  checked={notifications.sms.system}
                  onCheckedChange={() => toggleNotification('sms', 'system')}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-right">
          <Button 
            className="rounded-none bg-black text-white hover:bg-gray-800 text-xs font-light"
            onClick={handleSavePreferences}
          >
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
