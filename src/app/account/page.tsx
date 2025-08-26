
"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Wrench,
  Star,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

type Appointment = {
  id: string;
  serviceTypes: string[];
  appointmentDate: string;
  status: string;
  services: { name: string, vehicle?: string }[];
};

export default function AccountDashboardPage() {
    const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
    const [vehicleStatus, setVehicleStatus] = useState<any[]>([]);

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('confirmedAppointments') || '[]');
        const formattedAppointments = storedAppointments.map((appt: any) => ({
            ...appt,
            services: appt.services.map((s: any) => ({...s, vehicle: "Toyota Prado - KDA 123B" }))
        }))
        setUpcomingAppointments(formattedAppointments);

        setVehicleStatus([
            {
                vehicle: "Toyota Prado - KDA 123B",
                status: "In Progress",
                stage: "Transmission Fluid Change",
                progress: 60
            }
        ])
    }, [])

  return (
    <div className="grid gap-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                {upcomingAppointments.length > 0 && (
                    <p className="text-xs text-muted-foreground truncate">
                        Next: {upcomingAppointments[0].serviceTypes.join(', ')} on {new Date(upcomingAppointments[0].appointmentDate).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })}
                    </p>
                )}
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{vehicleStatus.length}</div>
                <p className="text-xs text-muted-foreground">
                {vehicleStatus[0]?.vehicle} is {vehicleStatus[0]?.status.toLowerCase()}
                </p>
            </CardContent>
            </Card>
             <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-muted-foreground">
                KES 250 off your next service
                </p>
            </CardContent>
            </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
             <Card>
                <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>
                        Manage your scheduled services.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   {upcomingAppointments.length > 0 ? (
                     upcomingAppointments.map((appt, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-secondary">
                           <div className="flex-1 overflow-hidden">
                            <p className="font-semibold truncate">{appt.serviceTypes.join(', ')}</p>
                            <p className="text-sm text-muted-foreground">{appt.services[0]?.vehicle || 'Vehicle details unavailable'}</p>
                            <p className="text-sm text-muted-foreground">{new Date(appt.appointmentDate).toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                           </div>
                           <Button variant="outline" size="sm" asChild className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive">
                             <Link href={`/account/booking/${appt.id}`}>Manage</Link>
                           </Button>
                        </div>
                     ))
                   ) : (
                    <div className="text-center text-muted-foreground py-8">
                        <p>You have no upcoming appointments.</p>
                         <Button asChild className="mt-4">
                            <Link href="/account/booking">Book a Service</Link>
                        </Button>
                    </div>
                   )}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Vehicle Service Status</CardTitle>
                    <CardDescription>
                        Real-time tracking of your active jobs.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   {vehicleStatus.length > 0 ? (
                     vehicleStatus.map((job, index) => (
                        <div key={index} className="p-4 rounded-lg bg-secondary">
                           <div className="flex items-center justify-between mb-2">
                             <p className="font-semibold">{job.vehicle}</p>
                             <div className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">{job.status}</div>
                           </div>
                           <p className="text-sm text-muted-foreground mb-4">{job.stage}</p>
                           <Link href="#" className="text-sm font-medium text-primary hover:underline flex items-center">
                             View Details & Photos
                           </Link>
                        </div>
                     ))
                   ) : (
                    <div className="text-center text-muted-foreground py-8">
                        <p>No active services at the moment.</p>
                    </div>
                   )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
