import { useEffect, useState } from "react";
import { Room } from "../../types";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Select, SelectItem } from "@nextui-org/react";
import { toast } from "sonner";
import { useAuthStore, useClientStore, useRoomStore } from "../../stores";


export const GuestRegistrationForm = () => {
  function formatDate(date: any) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  const token = useAuthStore((state) => state.token);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const getRooms = useRoomStore((state) => state.getRooms);
  const createClient = useClientStore((state) => state.createClient);
  let today = new Date();

  //const [dateStart, setDateStart] = useState(today.toISOString().split('T')[0]);
  const [dateStart, setDateStart] = useState(formatDate(today.toDateString()));
  /* today + 1 day */
  const [dateEnd, setDateEnd] = useState( formatDate(today.setDate(today.getDate() + 1)));

  const handleDateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateStart(formatDate(e.target.value));
    const date = new Date(e.target.value);
    setDateEnd(formatDate(date.setDate(date.getDate() + 1)));
  };
  const formData = {
    documentId: "",
    phone: "",
    firstName: "",
    lastName: "",
    checkIn: dateStart,
    checkOut: dateEnd,
    discount: 0,
    total: total,
    roomType: "",
    room: ""
  };

  const handleSelectRoom = async () => {
    const rooms = await getRooms(token!)
    /* Fileter available rooms */
    const availableRooms = rooms.filter((room) => room.status === "available");
    setAvailableRooms(availableRooms)
    /* Fileter available types */
    const availableTypes = availableRooms.map((room) => room.type);
    setAvailableTypes([...new Set(availableTypes)])
    /* Calculate total */
    const total = availableRooms.reduce((acc, room) => acc + room.price, 0);
    setTotal(total)
  };
  useEffect(() => {
    handleSelectRoom();
  }, []);

  console.log("availableRooms", availableRooms);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Validacion */
    if (!formData.documentId || !formData.phone || !formData.firstName || !formData.lastName || !formData.roomType || !formData.room) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    let data = {
      'room_id': formData.room,
      'ci': formData.documentId,
      'phone': formData.phone,
      'name': formData.firstName,
      'last_name': formData.lastName,
      'start_date': formData.checkIn,
      'end_date': formData.checkOut,
      'discount': formData.discount,
      'total': formData.total,
    }

    createClient(data as any, token!);
    
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h3>Registro de Cliente</h3>
        <p>
          Ingrese los datos del huésped para crear una nueva reserva
        </p>
      </CardHeader>
      <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="documentId">CI/DNI</label>
                <Input isRequired type="text" id="documentId" name="documentId" onChange={(e) => formData.documentId = e.target.value} />
              </div>
              

              <div className="flex flex-col gap-2">
                <label htmlFor="phone">Celular</label>
                <Input isRequired type="text" id="phone" name="phone" onChange={(e) => formData.phone = e.target.value} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName">Nombres</label>
                <Input isRequired type="text" id="firstName" name="firstName" onChange={(e) => formData.firstName = e.target.value} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="lastName">Apellidos</label>
                <Input isRequired type="text" id="lastName" name="lastName" onChange={(e) => formData.lastName = e.target.value} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Select
                isRequired
                id="roomType"
                name="roomType"
                className="w-full"
                label="Tipo de habitación"
                placeholder="Tipo de habitación"
                onChange={(e) => formData.roomType = e.target.value}
              >
                {availableTypes.map((type) => (
                  <SelectItem key={type}>{type}</SelectItem>
                ))}
              </Select>
              <Select
                id="room"
                name="room"
                isRequired
                className="w-full"
                label="Habitación"
                placeholder="Habitación"
                onChange={(e) => formData.room = e.target.value}
              >
                {availableRooms.map((room) => (
                  <SelectItem key={room.id}>{"#"+room.number+" - Piso "+room.floor}</SelectItem>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="checkIn">Fecha Inicio</label>
                <Input 
                isRequired 
                type="date" 
                id="checkIn" 
                name="checkIn"
                onChange={(e) => handleDateStartChange(e)}
                defaultValue={dateStart}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="checkOut">Fecha Fin</label>
                <Input 
                isRequired 
                type="date" 
                id="checkOut" 
                name="checkOut" 
                onChange={(e) => setDateEnd(e.target.value)}
                value={dateEnd}
                />
              </div>

            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="discount">Descuento (%)</label>
                <Input type="number" id="discount" name="discount" />
              </div>

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
      </CardBody>
    </Card>
  );
};
