
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function AdminProfilePage() {
    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704c" />
                        <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl">Mike L.</CardTitle>
                        <CardDescription>Manage your profile and settings.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form className="space-y-8">
                     <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" defaultValue="Mike L." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="mike@autopilot.co.ke" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" defaultValue="Lead Mechanic" disabled />
                    </div>
                    <Separator />
                     <div className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
