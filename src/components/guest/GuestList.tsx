
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Guest, RoomType } from '../../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Correctly import the Spanish locale
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { FaEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface GuestListProps {
  guests: Guest[];
  onDelete?: (id: string) => void;
}

const GuestList: React.FC<GuestListProps> = ({
  guests,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>('all');
  const [floorFilter, setFloorFilter] = useState<string>('all');

  const filteredGuests = guests.filter((guest) => {
    const matchesRoomType = roomTypeFilter === 'all' || guest.roomType === roomTypeFilter;
    const matchesFloor = floorFilter === 'all' || guest.floor.toString() === floorFilter;
    return matchesRoomType && matchesFloor;
  });

  const uniqueFloors = Array.from(new Set(guests.map((guest) => guest.floor))).sort();

  const handleDelete = (id: string) => {
    onDelete?.(id);
    //toast.success('Huésped eliminado con éxito');
  };

  const handleView = (guest: Guest) => {
    navigate(`/admin/huespedes/${guest.id}`);
  };

  return (
    <div className="space-y-4 dark:bg-hotel-darkCard">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-xl font-semibold">Lista de Huéspedes</h2>
        
        <div className="flex flex-wrap gap-4">
          <div className="w-40">
            <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Hab." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value={RoomType.SIMPLE}>Simple</SelectItem>
                <SelectItem value={RoomType.DOUBLE}>Doble</SelectItem>
                <SelectItem value={RoomType.SUITE}>Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-40">
            <Select value={floorFilter} onValueChange={setFloorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Piso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {uniqueFloors.map((floor) => (
                  <SelectItem key={floor} value={floor.toString()}>
                    Piso {floor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Nombres</TableHead>
              <TableHead>N° Habitación</TableHead>
              <TableHead>Piso</TableHead>
              <TableHead>Entrada</TableHead>
              <TableHead>Salida</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.length > 0 ? (
              filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell className="font-medium">{guest.roomType}</TableCell>
                  <TableCell>{`${guest.firstName} ${guest.lastName}`}</TableCell>
                  <TableCell>{guest.roomNumber}</TableCell>
                  <TableCell>{guest.floor}</TableCell>
                  <TableCell>{format(new Date(guest.checkIn), 'dd/MM/yyyy', { locale: es })}</TableCell>
                  <TableCell>{format(new Date(guest.checkOut), 'dd/MM/yyyy', { locale: es })}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(guest)}>
                          <FaEye className="mr-2 w-4 h-4" />
                          <span>Detalle</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(guest.id)}
                        >
                          <Trash2 className="mr-2 w-4 h-4" />
                          <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron huéspedes.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GuestList;
