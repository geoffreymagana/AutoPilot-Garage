
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, CreditCard, Landmark, Loader2, Phone } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function CheckoutPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const [appointmentDetails, setAppointmentDetails] = React.useState<any>(null);
    const [selectedPayment, setSelectedPayment] = React.useState<string | null>(null);

    React.useEffect(() => {
        const details = localStorage.getItem('pendingAppointment');
        if (details) {
            setAppointmentDetails(JSON.parse(details));
        } else {
            // No pending appointment, redirect back
            router.replace('/account/booking');
        }
    }, [router]);

    const handlePayment = () => {
        setIsLoading(true);

        // Simulate payment processing
        setTimeout(() => {
            const existingAppointments = JSON.parse(localStorage.getItem('confirmedAppointments') || '[]');
            
            const appointmentIndex = existingAppointments.findIndex((appt: any) => appt.id === appointmentDetails.id);

            if (appointmentIndex > -1) {
                // This is an existing "Pay Later" appointment being paid for
                existingAppointments[appointmentIndex] = {
                    ...existingAppointments[appointmentIndex],
                    paymentOption: 'payNow', // or some other indicator that it's paid
                    status: 'Confirmed'
                };
            } else {
                // This is a new appointment being paid for immediately
                const confirmedAppointment = { ...appointmentDetails, status: 'Confirmed', paymentOption: 'payNow' };
                existingAppointments.push(confirmedAppointment);
            }
            
            localStorage.setItem('confirmedAppointments', JSON.stringify(existingAppointments));
            localStorage.removeItem('pendingAppointment');
            
            toast({
                title: "Payment Successful!",
                description: "Your appointment is confirmed. We will contact you shortly.",
            });

            router.replace('/account');
            setIsLoading(false);
        }, 2000);
    }

    if (!appointmentDetails) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    const paymentMethods = [
        { id: "card", name: "Credit/Debit Card", details: "Visa, Mastercard", icon: <CreditCard className="mr-4" /> },
        { id: "mpesa", name: "M-PESA", details: "Pay with M-PESA", icon: <Phone className="mr-4" /> },
        { id: "bank", name: "Bank Transfer", details: "Pay from your bank", icon: <Landmark className="mr-4" /> },
    ]

    return (
        <div className="max-w-2xl mx-auto">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4"/> Back
            </Button>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                        <CardDescription>
                            Confirm your appointment and service details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="font-semibold">Services</p>
                            <ul className="text-sm text-muted-foreground">
                                {appointmentDetails.services.map((service: any) => (
                                    <li key={service.name}>{service.name}</li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <p className="font-semibold">Appointment Date</p>
                            <p className="text-sm text-muted-foreground">{new Date(appointmentDetails.appointmentDate).toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-secondary flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>KES {new Intl.NumberFormat('en-US').format(appointmentDetails.total)}</span>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>
                            Choose how you'd like to pay.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <RadioGroup onValueChange={setSelectedPayment} value={selectedPayment || ""}>
                            {paymentMethods.map(method => (
                                <Label key={method.id} htmlFor={method.id} className={cn("flex items-center p-4 rounded-md border-2 border-transparent cursor-pointer transition-colors", selectedPayment === method.id ? "border-primary bg-primary/5" : "border-border")}>
                                     <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                                     {method.icon}
                                     <div className="grid gap-0.5">
                                         <p className="font-semibold">{method.name}</p>
                                         <p className="text-xs text-muted-foreground">{method.details}</p>
                                     </div>
                                 </Label>
                            ))}
                        </RadioGroup>
                        <Separator className="my-4"/>
                         <Button onClick={handlePayment} className="w-full" disabled={isLoading || !selectedPayment}>
                           {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            Pay KES {new Intl.NumberFormat('en-US').format(appointmentDetails.total)}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
