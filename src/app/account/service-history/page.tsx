

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

export default function ServiceHistoryPage() {
  const serviceHistory = [
    {
      invoiceId: "INV-0012",
      date: "2024-05-20",
      vehicle: "Toyota Prado - KDA 123B",
      services: ["Full Synthetic Oil Change", "Tire Rotation"],
      total: "10,500",
      status: "Paid",
    },
    {
      invoiceId: "INV-0008",
      date: "2023-11-15",
      vehicle: "Toyota Prado - KDA 123B",
      services: ["Brake Pad Replacement"],
      total: "15,000",
      status: "Paid",
    },
     {
      invoiceId: "INV-0005",
      date: "2023-05-10",
      vehicle: "Toyota Prado - KDA 123B",
      services: ["Standard Oil Change", "AC System Service"],
      total: "11,000",
      status: "Paid",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service History</CardTitle>
        <CardDescription>
          A complete record of all maintenance and repairs for your vehicles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Services Rendered</TableHead>
              <TableHead className="text-right">Amount (KES)</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceHistory.map((item) => (
              <TableRow key={item.invoiceId}>
                <TableCell className="font-medium">
                  <Link href={`/account/service-history/${item.invoiceId}`} className="text-primary hover:underline">
                    {item.invoiceId}
                  </Link>
                </TableCell>
                <TableCell>{new Date(item.date).toLocaleDateString('en-KE')}</TableCell>
                <TableCell>{item.vehicle}</TableCell>
                <TableCell>{item.services.join(', ')}</TableCell>
                <TableCell className="text-right">{item.total}</TableCell>
                <TableCell className="text-center">
                    <Badge variant={item.status === 'Paid' ? 'default' : 'destructive'} className="bg-green-500/20 text-green-500">{item.status}</Badge>
                </TableCell>
                 <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download Invoice</span>
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
