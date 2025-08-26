
"use client";

import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Printer, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AppointmentDetailPage({ params }: { params: { id: string } }) {
  const workOrderRef = useRef<HTMLDivElement>(null);

  // In a real app, you would fetch this data based on the params.id
  const appointmentDetails = {
    id: params.id,
    date: "2024-07-25",
    vehicle: "Toyota Prado - KDA 123B",
    customer: "Alex Mwangi",
    customerContact: "alex.m@example.com",
    status: "Confirmed",
    payment: "Postpay",
    assignedTo: "Michael Otieno",
    items: [
      { description: "Brake Pad & Rotor Replacement (Front)", quantity: 1, unitPrice: 8000, total: 8000 },
      { description: "Labor Charges", quantity: 2, unitPrice: 2000, total: 4000 },
    ],
    subtotal: 12000,
    vat: 1920,
    total: 13920,
    notes: "Customer reported grinding noise when braking. Front pads were worn to 2mm. Rotors resurfaced."
  };

  const handlePrint = () => {
    const node = workOrderRef.current;
    if (node) {
      const printWindow = window.open('', '_blank');
      printWindow?.document.write('<html><head><title>Work Order</title>');
      // You would link to your stylesheet here
      printWindow?.document.write('<link rel="stylesheet" href="/globals.css" type="text/css" />');
      printWindow?.document.write('</head><body>');
      printWindow?.document.write(node.innerHTML);
      printWindow?.document.write('</body></html>');
      printWindow?.document.close();
      printWindow?.focus();
      // Use a timeout to ensure styles are loaded before printing
      setTimeout(() => {
        printWindow?.print();
        printWindow?.close();
      }, 500);
    }
  };

  const handleDownload = () => {
    const input = workOrderRef.current;
    if (input) {
      const clonedNode = input.cloneNode(true) as HTMLElement;
      document.body.appendChild(clonedNode);

      // Force light theme for PDF rendering
      clonedNode.classList.remove('dark');
      clonedNode.classList.add('light');
      
      html2canvas(clonedNode, { 
        scale: 2,
        backgroundColor: '#ffffff' // Explicitly set white background
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        
        let width = pdfWidth - 20; // Margins
        let height = width / ratio;
        
        if (height > pdfHeight - 20) {
            height = pdfHeight - 20; // Margins
            width = height * ratio;
        }

        const x = (pdfWidth - width) / 2;
        const y = 10; // Top margin

        pdf.addImage(imgData, 'PNG', x, y, width, height);
        pdf.save(`work-order-${appointmentDetails.id}.pdf`);
        document.body.removeChild(clonedNode);
      });
    }
  };

  return (
    <div className="printable-area">
        <div className="flex justify-between items-center mb-4 non-printable">
             <Link href="/dashboard/appointments" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Appointments
            </Link>
             <div className="flex gap-2">
                <Button onClick={handleDownload}><Download className="mr-2" /> Download PDF</Button>
            </div>
        </div>
      <Card ref={workOrderRef} className="work-order-card">
        <CardHeader className="bg-secondary/50">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
              <CardTitle className="text-2xl">Work Order: {appointmentDetails.id}</CardTitle>
              <CardDescription>Date: {new Date(appointmentDetails.date).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-2">Customer Details</h3>
              <p className="text-muted-foreground">{appointmentDetails.customer}</p>
              <p className="text-muted-foreground text-sm">{appointmentDetails.customerContact}</p>
            </div>
             <div>
              <h3 className="font-semibold mb-2">Vehicle Details</h3>
              <p className="text-muted-foreground">{appointmentDetails.vehicle}</p>
            </div>
            <div className="sm:text-left">
              <h3 className="font-semibold mb-2">Status</h3>
              <Badge>{appointmentDetails.status}</Badge>
            </div>
          </div>

          <h3 className="font-semibold mb-4">Services Requested</h3>
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
                {appointmentDetails.items.map((item, index) => (
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
                    <span>KES {appointmentDetails.subtotal.toLocaleString()}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT (16%)</span>
                    <span>KES {appointmentDetails.vat.toLocaleString()}</span>
                </div>
                <Separator />
                 <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>KES {appointmentDetails.total.toLocaleString()}</span>
                </div>
            </div>
          </div>
          
          <Separator className="my-8" />

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
                <h3 className="font-semibold mb-2">Assigned Technician</h3>
                <p className="text-muted-foreground text-sm">{appointmentDetails.assignedTo}</p>
            </div>
            <div>
                <h3 className="font-semibold mb-2">Customer Notes</h3>
                <p className="text-muted-foreground text-sm">{appointmentDetails.notes}</p>
            </div>
          </div>

        </CardContent>
      </Card>
      <style jsx global>{`
        @media print {
            body * {
                visibility: hidden;
            }
            .printable-area, .printable-area * {
                visibility: visible;
            }
            .printable-area {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
            }
            .non-printable {
                display: none;
            }
            .work-order-card {
                border: none;
                box-shadow: none;
            }
        }
      `}</style>
    </div>
  );
}
