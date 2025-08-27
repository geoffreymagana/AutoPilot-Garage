
"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Car, User, Mail, Phone, Wrench, Check, ChevronsUpDown } from "lucide-react"
import { useSearchParams } from 'next/navigation'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { serviceCategories } from "@/lib/services"

const vehicleMakes = ["Toyota", "Honda", "Ford", "Nissan", "BMW", "Mercedes-Benz", "Volkswagen", "Hyundai", "Kia", "Subaru", "Isuzu"]
const currentYear = new Date().getFullYear()
const vehicleYears = Array.from({ length: 45 }, (_, i) => (currentYear - i).toString())

const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  vehicleMake: z.string().min(2, { message: "Vehicle make is required." }),
  vehicleModel: z.string().min(1, { message: "Vehicle model is required." }),
  vehicleYear: z.string().min(4, { message: "Please enter a valid year." }),
  serviceType: z.string({ required_error: "Please select a service type." }),
  appointmentDate: z.date({ required_error: "An appointment date is required." }),
  additionalInfo: z.string().optional(),
})

type BookingFormValues = z.infer<typeof bookingFormSchema>

function ComboboxFormField({ form, name, label, placeholder, items }: { form: any, name: "vehicleMake" | "vehicleYear", label: string, placeholder: string, items: string[] }) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(form.getValues(name) || "")

  React.useEffect(() => {
    setInputValue(form.getValues(name) || "");
  }, [form, name, form.watch(name)]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value || placeholder}
                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command>
                 <CommandInput 
                    placeholder={`Search ${label.toLowerCase()}...`}
                    value={inputValue}
                    onValueChange={(search) => {
                      setInputValue(search)
                       if (!items.some(item => item.toLowerCase() === search.toLowerCase())) {
                          form.setValue(name, search, { shouldValidate: true })
                       }
                    }}
                  />
                <CommandList>
                  <CommandEmpty>
                    No {label.toLowerCase()} found.
                    <Button variant="ghost" className="h-auto p-1 mt-1" onClick={() => {
                        form.setValue(name, inputValue, { shouldValidate: true })
                        setOpen(false)
                    }}>
                      Use "{inputValue}"
                    </Button>
                  </CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        value={item}
                        key={item}
                        onSelect={() => {
                          form.setValue(name, item, { shouldValidate: true })
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            item === field.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}


function BookingPageContent() {
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const initialService = searchParams.get('service') || ""
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      serviceType: initialService,
      additionalInfo: "",
    },
  })

  React.useEffect(() => {
    const serviceName = searchParams.get('service')
    if (serviceName) {
        form.setValue('serviceType', serviceName)
    }
  }, [searchParams, form])

  function onSubmit(data: BookingFormValues) {
    console.log(data)
    toast({
      title: "Booking Submitted!",
      description: "We've received your appointment request. We will contact you shortly to confirm.",
      className: "bg-background text-foreground"
    })
    form.reset()
  }
  
  const allServices = serviceCategories.flatMap(cat => cat.services);
  const selectedService = allServices.find(s => s.name === form.watch('serviceType'));

  return (
    <div className="container mx-auto px-4 sm:px-8 py-16 sm:py-24">
       <div className="text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">Book Your Service</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Schedule your appointment with us online. It's fast, easy, and convenient.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto mt-12">
        <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="font-semibold text-lg">Your Information</h3>
                         <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                    <User className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="e.g. Juma Otieno" {...field} className="pl-10" />
                                </div>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                  <div className="relative flex items-center">
                                      <Mail className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                      <Input type="email" placeholder="e.g. juma@example.com" {...field} className="pl-10"/>
                                  </div>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                  <div className="relative flex items-center">
                                      <Phone className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                      <Input placeholder="e.g. 0712345678" {...field} className="pl-10"/>
                                  </div>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                        />
                    </div>
                   
                    <div className="space-y-6">
                      <h3 className="font-semibold text-lg">Vehicle Information</h3>
                      <ComboboxFormField
                        form={form}
                        name="vehicleMake"
                        label="Vehicle Make"
                        placeholder="Select make"
                        items={vehicleMakes}
                      />
                       <div className="grid grid-cols-2 gap-4">
                            <FormField
                            control={form.control}
                            name="vehicleModel"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Model</FormLabel>
                                <FormControl>
                                    <div className="relative flex items-center">
                                        <Car className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="e.g. Prado" {...field} className="pl-10" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                             <ComboboxFormField
                                form={form}
                                name="vehicleYear"
                                label="Year"
                                placeholder="Select year"
                                items={vehicleYears}
                              />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="font-semibold text-lg">Service Details</h3>
                     <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type</FormLabel>
                           <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn("w-full justify-between",!field.value && "text-muted-foreground")}
                                >
                                  <div className="flex items-center">
                                    <Wrench className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                    {field.value ? field.value : "Select a service"}
                                  </div>
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 max-h-[300px] overflow-y-auto">
                               <Command>
                                <CommandInput placeholder="Search service..." />
                                <CommandList>
                                  <CommandEmpty>No service found.</CommandEmpty>
                                  <CommandGroup>
                                    {serviceCategories.map(category => (
                                        <React.Fragment key={category.category}>
                                            <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{category.category}</div>
                                            {category.services.map(service => (
                                                <CommandItem
                                                    value={service.name}
                                                    key={service.name}
                                                    onSelect={() => {
                                                        form.setValue("serviceType", service.name, { shouldValidate: true })
                                                    }}
                                                >
                                                     <Check className={cn("mr-2 h-4 w-4", service.name === field.value ? "opacity-100" : "opacity-0")}/>
                                                    {service.name}
                                                </CommandItem>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedService && (
                      <Card className="bg-secondary">
                        <CardHeader>
                          <CardTitle className="text-lg">{selectedService.name}</CardTitle>
                          <CardDescription>
                            <span className="text-2xl font-bold text-primary">
                                {selectedService.from ? 'from ' : ''}KES {new Intl.NumberFormat('en-US').format(Number(selectedService.price))}
                            </span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {selectedService.details.map((detail) => (
                              <li key={detail} className="flex items-start">
                                <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-1" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                </div>
                
                 <div className="space-y-6">
                    <h3 className="font-semibold text-lg">Scheduling</h3>
                    <FormField
                        control={form.control}
                        name="appointmentDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Preferred Appointment Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full sm:w-[280px] justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Additional Information (optional)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Tell us about any specific issues, noises, or concerns you have with your vehicle." {...field} />
                        </FormControl>
                        <FormDescription>
                            The more details you provide, the better we can prepare for your appointment.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Submitting..." : "Request Appointment"}
                </Button>
            </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function BookingPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <BookingPageContent />
    </React.Suspense>
  )
}
