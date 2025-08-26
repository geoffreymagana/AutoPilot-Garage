
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

const appointments = [
    {
        id: "APP-4829",
        customer: "Brenda Chepkoech",
        date: "2024-07-25",
        services: "Full Synthetic Oil Change",
        payment: "Paid",
        total: "7,000",
    },
    {
        id: "APP-4828",
        customer: "Alex Mwangi",
        date: "2024-07-25",
        services: "Brake Pad & Rotor Replacement",
        payment: "Postpay",
        total: "12,000",
    },
    {
        id: "APP-4827",
        customer: "Mary Wambui",
        date: "2024-07-24",
        services: "Tire Rotation & Balancing, AC System Service",
        payment: "Paid",
        total: "9,000",
    },
    {
        id: "APP-4826",
        customer: "David Ochieng",
        date: "2024-07-23",
        services: "Computerized Engine Diagnostics",
        payment: "Paid",
        total: "5,000",
    },
     {
        id: "APP-4825",
        customer: "James Karanja",
        date: "2024-07-22",
        services: "Standard Oil Change",
        payment: "Postpay",
        total: "4,500",
    },
];


export default function AppointmentsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>All Appointments</CardTitle>
                <CardDescription>View and manage all customer appointments.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Services</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead className="text-right">Total (KES)</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appointments.length > 0 ? (
                            appointments.map((appt) => (
                                <TableRow key={appt.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/dashboard/appointments/${appt.id}`} className="text-primary hover:underline">
                                            {appt.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{appt.customer}</TableCell>
                                    <TableCell>{new Date(appt.date).toLocaleDateString('en-KE')}</TableCell>
                                    <TableCell className="max-w-xs truncate">{appt.services}</TableCell>
                                    <TableCell>
                                        <Badge variant={appt.payment === 'Paid' ? "default" : "secondary"}>
                                            {appt.payment}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{appt.total}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Assign Technician</DropdownMenuItem>
                                                <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No appointments found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
