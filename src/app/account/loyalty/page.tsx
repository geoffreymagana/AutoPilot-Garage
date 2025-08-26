
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Gift, Star, Clock } from "lucide-react";

export default function LoyaltyPage() {
    const loyaltyInfo = {
        points: 1250,
        tier: "Gold Member",
        nextTierPoints: 2000,
        nextTier: "Platinum"
    };

    const rewards = [
        { name: "KES 500 Off", points: 1000, available: true },
        { name: "Free Tire Rotation", points: 1500, available: false },
        { name: "10% Off Next Service", points: 2500, available: false },
        { name: "Free Car Wash", points: 500, available: true },
    ];

    const pointHistory = [
        { date: "2024-05-20", activity: "Service INV-0012", points: "+250" },
        { date: "2024-03-15", activity: "Referral Bonus", points: "+500" },
        { date: "2023-11-15", activity: "Service INV-0008", points: "+200" },
        { date: "2023-11-01", activity: "Sign-up Bonus", points: "+300" },
    ];

  return (
    <div className="grid gap-8">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardHeader>
                 <div className="flex justify-between items-start">
                    <div>
                        <CardDescription className="text-primary-foreground/80">{loyaltyInfo.tier}</CardDescription>
                        <CardTitle className="text-4xl">{loyaltyInfo.points.toLocaleString()} Points</CardTitle>
                    </div>
                    <Star className="h-10 w-10 text-yellow-300" />
                 </div>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-primary-foreground/80 mt-2">
                    {loyaltyInfo.nextTierPoints - loyaltyInfo.points} points until {loyaltyInfo.nextTier}
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Available Rewards</CardTitle>
                <CardDescription>Redeem your points for exclusive rewards.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
                {rewards.map(reward => (
                    <Card key={reward.name} className="flex flex-col p-4">
                        <div className="flex items-start justify-between flex-grow">
                            <div>
                                <h4 className="font-semibold">{reward.name}</h4>
                                <p className="text-sm text-muted-foreground">{reward.points} Points</p>
                            </div>
                            <Gift className="h-8 w-8 text-primary/50" />
                        </div>
                        <Button className="w-full mt-4" disabled={!reward.available || loyaltyInfo.points < reward.points}>
                            {loyaltyInfo.points < reward.points ? `Need ${reward.points - loyaltyInfo.points} more` : 'Redeem'}
                        </Button>
                    </Card>
                ))}
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle>Points History</CardTitle>
                <CardDescription>Track your loyalty points activity.</CardDescription>
            </CardHeader>
            <CardContent>
               <ul className="space-y-4">
                {pointHistory.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{item.activity}</p>
                                <p className="text-sm text-muted-foreground flex items-center">
                                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                                    {new Date(item.date).toLocaleDateString('en-KE')}
                                </p>
                            </div>
                            <p className={`font-semibold ${item.points.startsWith('+') ? 'text-green-500' : 'text-destructive'}`}>
                                {item.points}
                            </p>
                        </div>
                         {index < pointHistory.length - 1 && <Separator className="mt-4" />}
                    </li>
                ))}
               </ul>
            </CardContent>
        </Card>
    </div>
  );
}
