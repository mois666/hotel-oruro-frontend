
import React, { useState } from 'react';

import { cn } from '../../lib/utils';
import { Card, CardBody, CardHeader, Tab, Tabs } from '@nextui-org/react';
import { Room, RoomStatus, RoomType } from '../../types';

interface RoomGridProps {
  rooms: Room[];
  onRoomClick?: (room: Room) => void;
}

const statusColors: Record<RoomStatus, string> = {
  [RoomStatus.AVAILABLE]: 'bg-green-100 text-green-700 border-green-300',
  [RoomStatus.OCCUPIED]: 'bg-red-100 text-red-700 border-red-300',
  [RoomStatus.CLEANING]: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  [RoomStatus.MAINTENANCE]: 'bg-gray-100 text-gray-700 border-gray-300',
};

const statusLabels: Record<RoomStatus, string> = {
  [RoomStatus.AVAILABLE]: 'Disponible',
  [RoomStatus.OCCUPIED]: 'Ocupada',
  [RoomStatus.CLEANING]: 'Limpieza',
  [RoomStatus.MAINTENANCE]: 'Mantenimiento',
};

const typeIcons: Record<RoomType, string> = {
  [RoomType.SIMPLE]: '🛏️',
  [RoomType.DOUBLE]: '🛌',
  [RoomType.SUITE]: '👑',
};

const RoomCard: React.FC<{ room: Room; onClick?: (room: Room) => void }> = ({ 
  room,
  onClick 
}) => {
  return (
    <div
      className={cn(
        'border rounded-md p-4 cursor-pointer transition-all hover:shadow-md',
        statusColors[room.status]
      )}
      onClick={() => onClick?.(room)}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-lg font-bold">#{room.number}</span>
        <span className="text-lg">{typeIcons[room.type]}</span>
      </div>
      <div className="mb-1 text-sm">{room.type}</div>
      <div className="text-xs font-medium">{statusLabels[room.status]}</div>
      <div className="mt-2 text-sm font-bold">{room.price} Bs/noche</div>
    </div>
  );
};

const RoomGrid: React.FC<RoomGridProps> = ({ rooms, onRoomClick }) => {
  const [activeFloor, setActiveFloor] = useState<string>('all');
  
  const floorNumbers = Array.from(new Set(rooms.map((room) => room.floor.toString()))).sort();
  
  const filteredRooms = activeFloor === 'all'
    ? rooms
    : rooms.filter((room) => room.floor.toString() === activeFloor);
  
  return (
    <Card>
      <CardHeader>
        <h1>Mapa de Habitaciones</h1>
        <p>Vista de todas las habitaciones por piso</p>
      </CardHeader>
      <CardBody>
        <Tabs aria-label="Tabs variants" value={activeFloor} onValueChange={setActiveFloor}>
          <Tab value="all">Todos</Tab>
            {floorNumbers.map((floor) => (
              <Tab key={floor} value={floor}>
                Piso {floor}
              </Tab>
            ))}
          
          <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} onClick={onRoomClick} />
            ))}
          </div>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default RoomGrid;
