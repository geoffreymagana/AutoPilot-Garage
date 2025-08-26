

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const initialInventoryItems = [
    {
        partName: "Full Synthetic Oil 5W-30 (5L)",
        partNumber: "OIL-SYN-5W30-5L",
        stock: 25,
        price: 4200,
        supplier: "Total Kenya",
    },
    {
        partName: "Premium Oil Filter",
        partNumber: "FIL-PREM-001",
        stock: 40,
        price: 1200,
        supplier: "Bosch Auto Parts",
    },
    {
        partName: "Ceramic Brake Pads (Front)",
        partNumber: "BRK-CER-F-T4",
        stock: 15,
        price: 6500,
        supplier: "AutoXpress",
    },
    {
        partName: "Air Filter",
        partNumber: "FIL-AIR-T2",
        stock: 5,
        price: 1800,
        supplier: "Bosch Auto Parts",
    },
    {
        partName: "Wiper Blades (Pair)",
        partNumber: "WPR-STD-22",
        stock: 0,
        price: 1500,
        supplier: "AutoXpress",
    },
];

const stockHistory = [
    { date: "2024-07-20", action: "Purchase Order", change: "+50", stock: 50 },
    { date: "2024-07-22", action: "Work Order #124", change: "-1", stock: 49 },
    { date: "2024-07-23", action: "Work Order #128", change: "-1", stock: 48 },
    { date: "2024-07-25", action: "Stock Adjustment", change: "-1", stock: 47 },
];

export default function InventoryPage() {
    const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
    const [selectedItem, setSelectedItem] = useState<typeof initialInventoryItems[0] | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);
    const { toast } = useToast();

    const getStatus = (stock: number) => {
        if (stock === 0) return "Out of Stock";
        if (stock <= 5) return "Low Stock";
        return "In Stock";
    };

    const handleEdit = (item: typeof initialInventoryItems[0]) => {
        setSelectedItem(item);
        setIsEditModalOpen(true);
    };

    const handleHistory = (item: typeof initialInventoryItems[0]) => {
        setSelectedItem(item);
        setIsHistoryModalOpen(true);
    };
    
    const handleReorder = (item: typeof initialInventoryItems[0]) => {
        setSelectedItem(item);
        setIsReorderModalOpen(true);
    };

    const handleSaveEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedStock = Number(formData.get('stock'));
        const updatedPrice = Number(formData.get('price'));

        if (selectedItem) {
            setInventoryItems(prev => prev.map(item =>
                item.partNumber === selectedItem.partNumber
                    ? { ...item, stock: updatedStock, price: updatedPrice }
                    : item
            ));
            toast({ title: "Item Updated", description: `${selectedItem.partName} has been updated.` });
        }
        setIsEditModalOpen(false);
        setSelectedItem(null);
    };
    
    const handleConfirmReorder = () => {
         if (selectedItem) {
            toast({ title: "Purchase Order Created", description: `A PO has been sent to ${selectedItem.supplier} for ${selectedItem.partName}.` });
        }
        setIsReorderModalOpen(false);
        setSelectedItem(null);
    };


  return (
    <>
        <Card>
            <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>Track and manage your auto parts and supplies.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Part Name</TableHead>
                            <TableHead>Part Number</TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead className="text-center">Stock</TableHead>
                            <TableHead className="text-right">Price (KES)</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inventoryItems.map(item => (
                            <TableRow key={item.partNumber}>
                                <TableCell className="font-medium">{item.partName}</TableCell>
                                <TableCell>{item.partNumber}</TableCell>
                                <TableCell>{item.supplier}</TableCell>
                                <TableCell className="text-center">{item.stock}</TableCell>
                                <TableCell className="text-right">{item.price.toLocaleString()}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={
                                        getStatus(item.stock) === "In Stock" ? "default" :
                                        getStatus(item.stock) === "Low Stock" ? "secondary" : "destructive"
                                    } className={
                                        getStatus(item.stock) === "In Stock" ? "bg-green-500/20 text-green-500" :
                                        getStatus(item.stock) === "Low Stock" ? "bg-orange-500/20 text-orange-500" : ""
                                    }>
                                        {getStatus(item.stock)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => handleEdit(item)}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleReorder(item)}>Re-order</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleHistory(item)}>View History</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit: {selectedItem?.partName}</DialogTitle>
                </DialogHeader>
                <form id="edit-item-form" onSubmit={handleSaveEdit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stock" className="text-right">Stock</Label>
                            <Input id="stock" name="stock" type="number" defaultValue={selectedItem?.stock} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Price (KES)</Label>
                            <Input id="price" name="price" type="number" defaultValue={selectedItem?.price} className="col-span-3" />
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                    <Button type="submit" form="edit-item-form">Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* History Modal */}
        <Dialog open={isHistoryModalOpen} onOpenChange={setIsHistoryModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Stock History: {selectedItem?.partName}</DialogTitle>
                    <DialogDescription>Part No: {selectedItem?.partNumber}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <ul className="space-y-4">
                        {stockHistory.map((entry, index) => (
                             <li key={index}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{entry.action}</p>
                                        <p className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                         <p className={`font-semibold ${entry.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{entry.change}</p>
                                         <p className="text-xs text-muted-foreground">Stock: {entry.stock}</p>
                                    </div>
                                </div>
                                {index < stockHistory.length - 1 && <Separator className="mt-4"/>}
                            </li>
                        ))}
                    </ul>
                </div>
                 <DialogFooter>
                    <Button onClick={() => setIsHistoryModalOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        
        {/* Re-order Modal */}
         <Dialog open={isReorderModalOpen} onOpenChange={setIsReorderModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Re-order</DialogTitle>
                    <DialogDescription>Create a purchase order for {selectedItem?.partName}?</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p><strong>Part:</strong> {selectedItem?.partName}</p>
                    <p><strong>Supplier:</strong> {selectedItem?.supplier}</p>
                    <div className="mt-4">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" type="number" defaultValue="50" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsReorderModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirmReorder}>Create Purchase Order</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  );
}