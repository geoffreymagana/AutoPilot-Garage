
"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Wrench, Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { serviceCategories } from "@/lib/services"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const bookingFormSchema = z.object({
  serviceTypes: z.array(z.string()).min(1, {message: "Please select at least one service."}),
  appointmentDate: z.date({ required_error: "An appointment date is required." }),
  additionalInfo: z.string().optional(),
  paymentOption: z.enum(["payNow", "payLater"], {
    required_error: "You need to select a payment option.",
  }),
})

type BookingFormValues = z.infer<typeof bookingFormSchema>

export default function AccountBookingPage() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const { toast } = useToast()

    const initialService = searchParams.get('service')
    
    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            serviceTypes: initialService ? [initialService] : [],
            additionalInfo: "",
        },
    })

    React.useEffect(() => {
        const serviceName = searchParams.get('service')
        if (serviceName && !form.getValues('serviceTypes').includes(serviceName)) {
            form.setValue('serviceTypes', [...form.getValues('serviceTypes'), serviceName])
        }
    }, [searchParams, form])

    function onSubmit(data: BookingFormValues) {
        console.log(data)

        // Save to local storage
        const newAppointment = {
            id: `APP-${Date.now()}`,
            ...data,
            services: allServices.filter(s => data.serviceTypes.includes(s.name)),
            total: totalCost,
            status: data.paymentOption === 'payNow' ? 'Pending Payment' : 'Confirmed'
        };

        if (data.paymentOption === 'payNow') {
            localStorage.setItem('pendingAppointment', JSON.stringify(newAppointment));
            router.push('/account/checkout');
        } else {
            const existingAppointments = JSON.parse(localStorage.getItem('confirmedAppointments') || '[]');
            localStorage.setItem('confirmedAppointments', JSON.stringify([...existingAppointments, newAppointment]));
            
            toast({
                title: "Booking Submitted!",
                description: "We've received your request. Your appointment is confirmed.",
                className: "bg-background text-foreground"
            })
            form.reset()
            router.push('/account');
        }
    }
    
    const allServices = serviceCategories.flatMap(cat => cat.services);
    const selectedServices = allServices.filter(s => form.watch('serviceTypes')?.includes(s.name));
    const totalCost = selectedServices.reduce((acc, service) => acc + Number(service.price), 0);

    return (
        <Card className="max-w-4xl mx-auto">
        <CardHeader>
            <CardTitle>Book a New Service</CardTitle>
            <CardDescription>Your personal and vehicle details are pre-filled. Just select a service and date.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                    <h3 className="font-semibold text-lg">Service Details</h3>
                     <FormField
                      control={form.control}
                      name="serviceTypes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type(s)</FormLabel>
                           <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn("w-full md:w-[50%] justify-between",!field.value?.length && "text-muted-foreground")}
                                >
                                  <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
                                    <Wrench className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                    {field.value?.length > 0 ? (
                                        field.value.map(val => (
                                            <Badge key={val} variant="secondary" className="rounded-sm">
                                                {val}
                                            </Badge>
                                        ))
                                    ) : "Select services"}
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
                                                        const currentValues = field.value || [];
                                                        const newValue = currentValues.includes(service.name)
                                                            ? currentValues.filter(v => v !== service.name)
                                                            : [...currentValues, service.name];
                                                        form.setValue("serviceTypes", newValue, { shouldValidate: true })
                                                    }}
                                                >
                                                     <Check className={cn("mr-2 h-4 w-4", field.value?.includes(service.name) ? "opacity-100" : "opacity-0")}/>
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

                    {selectedServices.length > 0 && (
                      <Card className="bg-secondary">
                        <CardHeader>
                          <CardTitle className="text-lg">Selected Services</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {selectedServices.map(service => (
                             <div key={service.name} className="flex justify-between items-center">
                               <div>
                                 <p className="font-medium">{service.name}</p>
                                 <p className="text-sm text-muted-foreground">KES {new Intl.NumberFormat('en-US').format(Number(service.price))}</p>
                               </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                                    const newValue = form.getValues("serviceTypes")?.filter(v => v !== service.name) || [];
                                    form.setValue("serviceTypes", newValue, { shouldValidate: true });
                                }}>
                                    <X className="h-4 w-4" />
                                </Button>
                             </div>
                           ))}
                           <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                            <span>Total</span>
                            <span>KES {new Intl.NumberFormat('en-US').format(totalCost)}</span>
                           </div>
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

                <FormField
                  control={form.control}
                  name="paymentOption"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Option</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col sm:flex-row gap-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="payNow" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Pay Now (Online)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="payLater" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Pay After Service
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Submitting..." : "Request Appointment"}
                </Button>
            </form>
            </Form>
        </CardContent>
      </Card>
    );
}

