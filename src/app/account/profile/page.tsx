
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://i.pravatar.cc/150?u=demo" />
                        <AvatarFallback>DU</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl">Demo User</CardTitle>
                        <CardDescription>Manage your personal and contact information.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form className="space-y-8">
                     <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" defaultValue="Demo User" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="demo@email.com" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="0712345678" />
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
