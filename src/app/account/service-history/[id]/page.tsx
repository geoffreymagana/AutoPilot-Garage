
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Printer, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch this data based on the params.id
  const serviceDetails = {
    invoiceId: "INV-0012",
    date: "2024-05-20",
    vehicle: "Toyota Prado - KDA 123B",
    status: "Completed & Paid",
    items: [
      { description: "Full Synthetic Oil Change (5L)", quantity: 1, unitPrice: 5500, total: 5500 },
      { description: "Premium Oil Filter", quantity: 1, unitPrice: 1500, total: 1500 },
      { description: "Tire Rotation & Balancing", quantity: 1, unitPrice: 2500, total: 2500 },
      { description: "Labor Charges", quantity: 1, unitPrice: 1000, total: 1000 },
    ],
    subtotal: 10500,
    vat: 1680,
    total: 12180,
    notes: "Customer reported slight vibrations at high speed. Balancing has resolved the issue. All fluids topped up. Vehicle washed and sanitized."
  };

  return (
    <div>
        <Link href="/account/service-history" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Service History
        </Link>

      <Card>
        <CardHeader className="bg-secondary/50">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
              <CardTitle className="text-2xl">Service Invoice: {serviceDetails.invoiceId}</CardTitle>
              <CardDescription>Date: {new Date(serviceDetails.date).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
                <Button variant="outline"><Printer className="mr-2" /> Print</Button>
                <Button><Download className="mr-2" /> Download PDF</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-2">Vehicle Details</h3>
              <p className="text-muted-foreground">{serviceDetails.vehicle}</p>
            </div>
            <div className="sm:text-right">
              <h3 className="font-semibold mb-2">Status</h3>
              <p className="text-muted-foreground">{serviceDetails.status}</p>
            </div>
          </div>

          <h3 className="font-semibold mb-4">Services & Parts</h3>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Description</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-right">Unit Price (KES)</TableHead>
                  <TableHead className="text-right">Total (KES)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceDetails.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.description}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.unitPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{item.total.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end mt-6">
            <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>KES {serviceDetails.subtotal.toLocaleString()}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT (16%)</span>
                    <span>KES {serviceDetails.vat.toLocaleString()}</span>
                </div>
                <Separator />
                 <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>KES {serviceDetails.total.toLocaleString()}</span>
                </div>
            </div>
          </div>
          
          <Separator className="my-8" />

          <div>
            <h3 className="font-semibold mb-2">Mechanic's Notes</h3>
            <p className="text-muted-foreground text-sm">{serviceDetails.notes}</p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
