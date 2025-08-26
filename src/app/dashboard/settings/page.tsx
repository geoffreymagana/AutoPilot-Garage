
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

export default function AdminSettingsPage() {
  const { theme, setTheme } = useTheme("theme:admin");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="grid gap-8 max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Manage your dashboard display preferences.</CardDescription>
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
                <CardDescription>Manage how you receive internal notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive summaries and alerts via email.</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                </div>
                 <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="push-notifications" className="font-medium">Desktop Notifications</Label>
                        <p className="text-sm text-muted-foreground">Enable browser notifications for real-time job alerts.</p>
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
            </CardContent>
        </Card>
    </div>
  );
}
