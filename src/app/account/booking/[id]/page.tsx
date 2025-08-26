
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, Car, Info, Loader2, DollarSign, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { toast } = useToast();
    const [appointment, setAppointment] = React.useState<any>(null);

    React.useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('confirmedAppointments') || '[]');
        const currentAppointment = storedAppointments.find((appt: any) => appt.id === params.id);
        if (currentAppointment) {
            setAppointment(currentAppointment);
        }
    }, [params.id]);

    const handleCancelAppointment = () => {
        const storedAppointments = JSON.parse(localStorage.getItem('confirmedAppointments') || '[]');
        const updatedAppointments = storedAppointments.filter((appt: any) => appt.id !== params.id);
        localStorage.setItem('confirmedAppointments', JSON.stringify(updatedAppointments));
        toast({
            title: "Appointment Cancelled",
            description: "Your appointment has been successfully cancelled.",
        });
        router.push("/account");
    };

    const handlePayNow = () => {
        localStorage.setItem('pendingAppointment', JSON.stringify(appointment));
        router.push('/account/checkout');
    }

    if (!appointment) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4"/> Back to Dashboard
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle>Appointment Details</CardTitle>
                    <CardDescription>Booking ID: {appointment.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center">
                        <Calendar className="mr-4 text-muted-foreground"/>
                        <div>
                            <p className="font-semibold">Appointment Date</p>
                            <p>{new Date(appointment.appointmentDate).toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                     <div className="flex items-center">
                        <Car className="mr-4 text-muted-foreground"/>
                        <div>
                            <p className="font-semibold">Vehicle</p>
                            <p>Toyota Prado - KDA 123B</p>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <p className="font-semibold">Selected Services</p>
                        <ul className="list-disc list-inside pl-2 space-y-1">
                            {appointment.services.map((service: any) => (
                                <li key={service.name} className="flex justify-between">
                                    <span>{service.name}</span>
                                    <span>KES {new Intl.NumberFormat('en-US').format(Number(service.price))}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {appointment.additionalInfo && (
                        <div className="flex items-start">
                           <Info className="mr-4 mt-1 text-muted-foreground"/>
                           <div>
                               <p className="font-semibold">Additional Information</p>
                               <p className="text-sm text-muted-foreground">{appointment.additionalInfo}</p>
                           </div>
                       </div>
                    )}
                    <Separator/>
                     <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total Cost</span>
                        <span>KES {new Intl.NumberFormat('en-US').format(appointment.total)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Payment Status</span>
                        <Badge variant={appointment.status === 'Confirmed' ? 'default' : 'secondary'}>
                            {appointment.paymentOption === 'payLater' ? 'Postpay' : 'Paid'}
                        </Badge>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 className="mr-2"/> Cancel Appointment
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently cancel your appointment.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                                <AlertDialogAction onClick={handleCancelAppointment}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    {appointment.paymentOption === 'payLater' && (
                        <Button onClick={handlePayNow}>
                            <DollarSign className="mr-2"/> Pay Now
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}
