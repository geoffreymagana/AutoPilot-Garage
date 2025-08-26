
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme("theme:account");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  
  return (
    <div className="grid gap-8 max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Manage your display and theme preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="theme-switcher" className="font-medium">Theme</Label>
                        <p className="text-sm text-muted-foreground">Switch between light and dark mode.</p>
                    </div>
                    <Button onClick={toggleTheme} variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive communications from us.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive updates via your email address.</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                </div>
                 <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="sms-notifications" className="font-medium">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get important alerts on your mobile phone.</p>
                    </div>
                    <Switch id="sms-notifications" defaultChecked />
                </div>
                 <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="whatsapp-notifications" className="font-medium">WhatsApp Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get service updates and offers on WhatsApp.</p>
                    </div>
                    <Switch id="whatsapp-notifications" />
                </div>
                 <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Enable browser notifications for real-time alerts.</p>
                    </div>
                    <Switch id="push-notifications" />
                </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <Button variant="outline">Change Password</Button>
               <Button variant="outline">Enable Two-Factor Authentication</Button>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription className="text-destructive">
                    Permanently delete your account and all associated data. This action is irreversible.
                </CardDescription>
            </CardHeader>
            <CardContent>
               <Button variant="destructive">Delete My Account</Button>
            </CardContent>
        </Card>
    </div>
  );
}
