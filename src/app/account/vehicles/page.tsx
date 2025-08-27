
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MyVehiclesPage() {
    const vehicles = [
        {
            make: "Toyota",
            model: "Fourth-gen Toyota Land Cruiser Prado",
            year: "2018",
            licensePlate: "KDA 123B",
            imageUrl: "/images/vehicles/toyota prado.webp",
            lastService: "2024-05-20"
        }
    ];

  return (
      <div>
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">My Vehicles</h1>
                <p className="text-muted-foreground">Manage your vehicles and view their service history.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Vehicle
            </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
        {vehicles.map((vehicle, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative h-48 w-full">
                <Image src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{vehicle.make} {vehicle.model} ({vehicle.year})</CardTitle>
              <CardDescription>{vehicle.licensePlate}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Last Service: {new Date(vehicle.lastService).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <div className="flex gap-4 mt-4">
                <Button variant="outline" asChild>
                    <Link href="/account/service-history">View History</Link>
                </Button>
                 <Button asChild>
                    <Link href="/booking">Book Service</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
         {vehicles.length === 0 && (
          <Card className="flex flex-col items-center justify-center p-12 text-center col-span-full">
            <Car className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">No Vehicles Found</h3>
            <p className="text-muted-foreground mt-2 mb-4">Add your vehicle to get started with booking services.</p>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Vehicle
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
