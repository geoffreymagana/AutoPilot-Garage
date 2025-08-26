

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const customers = [
    {
        id: "cus-1",
        name: "Alex Mwangi",
        email: "alex.m@example.com",
        phone: "0712 345 678",
        totalSpent: "45,500",
        lastVisit: "2024-07-25",
        avatar: "https://i.pravatar.cc/150?u=a2",
    },
    {
        id: "cus-2",
        name: "Brenda Chepkoech",
        email: "brenda.c@example.com",
        phone: "0723 456 789",
        totalSpent: "28,000",
        lastVisit: "2024-07-25",
        avatar: "https://i.pravatar.cc/150?u=a3",
    },
    {
        id: "cus-3",
        name: "Mary Wambui",
        email: "mary.w@example.com",
        phone: "0734 567 890",
        totalSpent: "62,300",
        lastVisit: "2024-07-24",
        avatar: "https://i.pravatar.cc/150?u=a4",
    },
    {
        id: "cus-4",
        name: "David Ochieng",
        email: "david.o@example.com",
        phone: "0745 678 901",
        totalSpent: "15,000",
        lastVisit: "2024-07-23",
         avatar: "https://i.pravatar.cc/150?u=a5",
    },
    {
        id: "cus-5",
        name: "James Karanja",
        email: "james.k@example.com",
        phone: "0756 789 012",
        totalSpent: "89,000",
        lastVisit: "2024-07-22",
         avatar: "https://i.pravatar.cc/150?u=a6",
    },
];

export default function CustomersPage() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Customer Added",
        description: "The new customer has been added successfully.",
    });
    setOpen(false);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
            <CardTitle>Customer Management</CardTitle>
            <CardDescription>View and manage all your customers.</CardDescription>
        </div>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2"/> Add New Customer</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new customer.
                    </DialogDescription>
                </DialogHeader>
                 <form id="add-customer-form" onSubmit={handleAddCustomer}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" placeholder="e.g. Juma Otieno" className="col-span-3" required/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" type="email" placeholder="juma@example.com" className="col-span-3" required/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">Phone</Label>
                            <Input id="phone" type="tel" placeholder="0712345678" className="col-span-3" required/>
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button type="submit" form="add-customer-form">Add Customer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
         <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead className="text-right">Total Spent (KES)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {customers.map((customer) => (
                    <TableRow key={customer.email}>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={customer.avatar} alt={customer.name} />
                                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{customer.name}</p>
                                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                                </div>
                            </div>
                        </TableCell>
                         <TableCell>{customer.phone}</TableCell>
                        <TableCell>{new Date(customer.lastVisit).toLocaleDateString('en-KE')}</TableCell>
                        <TableCell className="text-right">{customer.totalSpent}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="outline" size="sm" asChild>
                               <Link href={`/dashboard/customers/${customer.id}`}>View Details</Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
         </Table>
      </CardContent>
    </Card>
  );
}