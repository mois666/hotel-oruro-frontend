import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Correctly import the Spanish locale
import { parseDate } from "@internationalized/date";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";


import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import { CalendarIcon } from "lucide-react";
import { Guest, Room, RoomType } from "../../types";
import { rooms } from "../../data/mockData";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  DatePicker,
  DateRangePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";

const formSchema = z.object({
  documentId: z.string().min(5, "El CI/DNI debe tener al menos 5 caracteres"),
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  phone: z.string().min(7, "El número de teléfono debe tener al menos 7 caracteres"),
  roomType: z.enum([RoomType.SIMPLE, RoomType.DOUBLE, RoomType.SUITE]),
  roomNumber: z.string().min(1, "Debe seleccionar una habitación"),
  checkIn: z.date(),
  checkOut: z.date(),
  discount: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface GuestRegistrationFormProps {
  onSubmitSuccess?: () => void;
}

const GuestRegistrationForm: React.FC<GuestRegistrationFormProps> = ({
  onSubmitSuccess,
}) => {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [total, setTotal] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentId: "",
      firstName: "",
      lastName: "",
      phone: "",
      roomType: RoomType.SIMPLE,
      roomNumber: "",
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
      discount: "0",
    },
  });

  const roomType = form.watch("roomType");
  const checkIn = form.watch("checkIn");
  const checkOut = form.watch("checkOut");
  const roomNumber = form.watch("roomNumber");
  const discount = form.watch("discount");

  // Filter available rooms whenever room type changes
  React.useEffect(() => {
    if (roomType) {
      const filtered = rooms.filter((room) => room.type === roomType);
      setAvailableRooms(filtered);
    }
  }, [roomType]);

  // Calculate total whenever relevant fields change
  React.useEffect(() => {
    if (roomNumber && checkIn && checkOut) {
      const selectedRoom = rooms.find(
        (r) => r.number.toString() === roomNumber
      );
      if (selectedRoom) {
        const pricePerNight = selectedRoom.price;
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalBeforeDiscount = pricePerNight * diffDays;
        const discountAmount = parseInt(discount || "0", 10);
        const finalTotal = totalBeforeDiscount * (1 - discountAmount / 100);
        setTotal(finalTotal);
      }
    }
  }, [roomNumber, checkIn, checkOut, discount]);

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    toast.success("Reserva registrada con éxito!", {
      description: `${data.firstName} ${data.lastName} - Habitación ${data.roomNumber}`,
    });

    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Registro de Cliente</CardTitle>
        <CardDescription>
          Ingrese los datos del huésped para crear una nueva reserva
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="documentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CI/DNI</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678" {...field} />
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
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <Input placeholder="555-1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Carlos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                      <Input placeholder="Pérez Gómez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Select
                isRequired
                className="w-full"
                defaultSelectedKeys={["simple"]}
                label="Tipo de habitación"
                placeholder="Tipo de habitación"
              >
                <SelectItem key={"simple"}>Simple</SelectItem>
                <SelectItem key={"double"}>Doble</SelectItem>
                <SelectItem key={"suite"}>Suite</SelectItem>
              </Select>
              <Select
                isRequired
                className="w-full"
                defaultSelectedKeys={["simple"]}
                label="Habitación"
                placeholder="Habitación"
              >
                <SelectItem key={"simple"}>#101 - Piso 1</SelectItem>
                <SelectItem key={"double"}>#202 - Piso 2</SelectItem>
                <SelectItem key={"suite"}>#303 - Piso 3</SelectItem>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha Inicio</FormLabel>
                    <div className="flex flex-wrap gap-4 w-full md:flex-nowrap">
                      <DatePicker
                        isRequired
                        className="max-w-[284px]"
                        label="Birth date"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha Fin</FormLabel>
                    <div className="flex flex-wrap gap-4 w-full md:flex-nowrap">
                      <DatePicker
                        isRequired
                        className="max-w-[284px]"
                        label="Birth date"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descuento (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col">
                <span className="mb-2 text-sm font-medium">Sub Total</span>
                <div className="px-3 py-2 h-10 font-semibold rounded-md border border-input bg-background text-foreground">
                  {total.toFixed(2)} Bs
                </div>
              </div>
            </div>

            <CardFooter className="px-0 pt-6">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80"
              >
                REGISTRAR RESERVA
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GuestRegistrationForm;
