import { useEffect, useState } from "react";
import { Room } from "../../types";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Select, SelectItem } from "@nextui-org/react";
import { useAuthStore, useClientStore, useRoomStore } from "../../stores";
import { useNavigate } from "react-router-dom";


export const GuestRegistrationForm = () => {
  const navigate = useNavigate();
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
  const [total, setTotal] = useState(0);
  const getRooms = useRoomStore((state) => state.getRooms);
  const createClient = useClientStore((state) => state.createClient);
  let today = new Date();

  //const [dateStart, setDateStart] = useState(today.toISOString().split('T')[0]);
  const [dateStart, setDateStart] = useState(formatDate(today.toDateString()));
  /* today + 1 day */
  const [dateEnd, setDateEnd] = useState(formatDate(today.setDate(today.getDate() + 1)));

  const [roomTypeSelect, setRoomTypeSelect] = useState("");

  const handleDateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateStart(formatDate(e.target.value));
    const date = new Date(e.target.value);
    setDateEnd(formatDate(date.setDate(date.getDate() + 1)));
  };
  const [formData, setFormData] = useState({
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
  });

  const handleSelectRoom = async () => {
    const rooms = await getRooms(token!)
    /* Fileter available rooms */
    const availableRooms0 = rooms.filter((room) => room.status === "available");
    setAvailableRooms(availableRooms0)
  };
  useEffect(() => {
    handleSelectRoom();
  }, []);

  //console.log("availableRooms", availableRooms);
  /* Calculate total */
  const onChangeTypeRoom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    const room = availableRooms.find((room) => room.id === Number(type));
    setRoomTypeSelect(room?.type || "");
    setTotal(room?.price || 0);
    
    
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, discount: Number(e.target.value) });
    const discount = Number(e.target.value);
    const total = formData.total - (formData.total * discount / 100);
    setFormData({ ...formData, total: total });
    setTotal(total);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Validacion */
    /* if (!formData.documentId || !formData.phone || !formData.firstName || !formData.lastName || !formData.roomType || !formData.room) {
      toast.error('Todos los campos son obligatorios');
      return;
    } */

    let data = {
      'room_id': formData.room,
      'ci': formData.documentId,
      'phone': formData.phone,
      'name': formData.firstName,
      'last_name': formData.lastName,
      'start_date': formData.checkIn,
      'end_date': formData.checkOut,
      'discount': formData.discount,
      'total': total,
    }
    createClient(data as any, token!);
    navigate("/admin/huespedes");
    
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
              <Input isRequired type="text" id="documentId" name="documentId" onChange={(e) => setFormData({ ...formData, documentId: e.target.value })} />
            </div>


            <div className="flex flex-col gap-2">
              <label htmlFor="phone">Celular</label>
              <Input isRequired type="text" id="phone" name="phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName">Nombres</label>
              <Input isRequired type="text" id="firstName" name="firstName" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastName">Apellidos</label>
              <Input isRequired type="text" id="lastName" name="lastName" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Select
              id="room"
              name="room"
              isRequired
              className="w-full"
              label="Habitación"
              placeholder="Habitación"
              onChange={(e) => {
                onChangeTypeRoom(e);
                setFormData({ ...formData, room: e.target.value });
              }}
            >
              {availableRooms.map((room) => (
                <SelectItem key={room.id}>{"#" + room.number + " - Piso " + room.floor}</SelectItem>
              ))}
            </Select>
            <Input
              isRequired
              id="roomType"
              name="roomType"
              className="w-full"
              label="Tipo de Habitación"
              placeholder="Tipo de Habitación"
              isReadOnly
              value={roomTypeSelect}
              onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
            />

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
              <Input type="number" id="discount" name="discount" onChange={(e) => handleDiscountChange(e)} />
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
              className="text-white w-full bg-primary hover:bg-primary/80"
            >
              REGISTRAR RESERVA
            </Button>
          </CardFooter>
        </form>
      </CardBody>
    </Card>
  );
};
