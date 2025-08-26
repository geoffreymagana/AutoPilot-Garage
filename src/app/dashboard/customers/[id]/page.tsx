

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Mail, Phone, Car, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const mockCustomer = {
    id: "cus-1",
    name: "Alex Mwangi",
    email: "alex.m@example.com",
    phone: "0712 345 678",
    avatar: "https://i.pravatar.cc/150?u=a2",
    since: "2023-01-15",
    vehicles: [
        {
            make: "Toyota",
            model: "Prado",
            year: "2018",
            licensePlate: "KDA 123B",
            lastService: "2024-07-25"
        }
    ],
    serviceHistory: [
        { invoiceId: "INV-0015", date: "2024-07-25", services: "Brake Pad & Rotor Replacement", total: "12,000", status: "Paid" },
        { invoiceId: "INV-0010", date: "2024-02-10", services: "Full Synthetic Oil Change", total: "7,000", status: "Paid" },
        { invoiceId: "INV-0004", date: "2023-08-01", services: "Pre-Purchase Inspection", total: "8,000", status: "Paid" },
    ]
};

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch customer data based on params.id
  const customer = mockCustomer;

  return (
    <div className="grid gap-8">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                <Link href="/dashboard/customers">
                    <ChevronLeft className="h-4 w-4" />
                </Link>
            </Button>
            <h1 className="text-2xl font-bold font-headline">Customer Details</h1>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={customer.avatar} alt={customer.name} />
                                <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{customer.name}</CardTitle>
                                <CardDescription>Customer since {new Date(customer.since).toLocaleDateString('en-KE')}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{customer.email}</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{customer.phone}</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex-row justify-between items-center">
                        <CardTitle className="text-lg">Vehicles</CardTitle>
                        <Button variant="ghost" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        {customer.vehicles.map(vehicle => (
                            <div key={vehicle.licensePlate} className="flex items-center gap-3 p-3 rounded-md bg-secondary">
                                <Car className="h-5 w-5 text-muted-foreground"/>
                                <div>
                                    <p className="font-semibold">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
                                    <p className="text-xs text-muted-foreground">{vehicle.licensePlate}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Service History</CardTitle>
                        <CardDescription>A record of all services for {customer.name}.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Services</TableHead>
                                    <TableHead className="text-right">Total (KES)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customer.serviceHistory.map(item => (
                                    <TableRow key={item.invoiceId}>
                                        <TableCell className="font-medium">
                                            <Link href={`/dashboard/appointments/${item.invoiceId}`} className="text-primary hover:underline">
                                                {item.invoiceId}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{new Date(item.date).toLocaleDateString('en-KE')}</TableCell>
                                        <TableCell>{item.services}</TableCell>
                                        <TableCell className="text-right">{item.total}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                         </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}