
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Download } from "lucide-react";

export default function PaymentsPage() {
    const paymentHistory = [
        { id: "PAY-0123", date: "2024-05-21", amount: "12,180", method: "M-PESA", status: "Completed", invoice: "INV-0012" },
        { id: "PAY-0119", date: "2023-11-16", amount: "15,000", method: "Card", status: "Completed", invoice: "INV-0008" },
        { id: "PAY-0103", date: "2023-05-11", amount: "11,000", method: "Bank Transfer", status: "Completed", invoice: "INV-0005" },
    ];
    
  return (
    <div className="grid gap-8">
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Manage your saved payment methods.</CardDescription>
                    </div>
                    <Button>
                        <PlusCircle className="mr-2" /> Add Method
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">M-PESA</p>
                            <p className="text-sm text-muted-foreground">+254 7** *** **8</p>
                        </div>
                        <Badge variant="default" className="bg-primary/20 text-primary">Primary</Badge>
                    </Card>
                    <Card className="p-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">Visa</p>
                            <p className="text-sm text-muted-foreground">**** **** **** 4242</p>
                        </div>
                        <Button variant="link" className="text-xs p-0 h-auto">Set as primary</Button>
                    </Card>
                </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Review your past transactions.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount (KES)</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{new Date(item.date).toLocaleDateString('en-KE')}</TableCell>
                        <TableCell>{item.invoice}</TableCell>
                        <TableCell>{item.method}</TableCell>
                        <TableCell className="text-right">{item.amount}</TableCell>
                        <TableCell className="text-center">
                            <Badge variant="default" className="bg-green-500/20 text-green-500">{item.status}</Badge>
                        </TableCell>
                         <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download Receipt</span>
                            </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
