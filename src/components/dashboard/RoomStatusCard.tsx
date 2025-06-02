
import React from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Room, RoomStatus } from '../../types';
import { cn } from '../../lib/utils';

interface RoomStatusCardProps {
  rooms: Room[];
  className?: string;
}

const statusColorMap = {
  [RoomStatus.AVAILABLE]: 'bg-green-100 text-success',
  [RoomStatus.OCCUPIED]: 'bg-red-100 text-danger',
  [RoomStatus.CLEANING]: 'bg-amber-100 text-warning',
  [RoomStatus.MAINTENANCE]: 'bg-gray-100 text-primary',
};

const statusLabels = {
  [RoomStatus.AVAILABLE]: 'Disponible',
  [RoomStatus.OCCUPIED]: 'Ocupada',
  [RoomStatus.CLEANING]: 'Limpieza',
  [RoomStatus.MAINTENANCE]: 'Mantenimiento',
};

const RoomStatusCard: React.FC<RoomStatusCardProps> = ({ rooms, className }) => {
  const statusCounts = {
    [RoomStatus.AVAILABLE]: rooms.filter(r => r.status === RoomStatus.AVAILABLE).length,
    [RoomStatus.OCCUPIED]: rooms.filter(r => r.status === RoomStatus.OCCUPIED).length,
    [RoomStatus.CLEANING]: rooms.filter(r => r.status === RoomStatus.CLEANING).length,
    [RoomStatus.MAINTENANCE]: rooms.filter(r => r.status === RoomStatus.MAINTENANCE).length,
  };
  
  const totalRooms = rooms.length;
  const occupancyRate = Math.round((statusCounts[RoomStatus.OCCUPIED] / totalRooms) * 100);
  
  return (
    <Card className={className}>
      <CardHeader>
        <h1 className="text-xl font-bold">Estado de las Habitaciones</h1>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div 
              key={status} 
              className={cn(
                "flex justify-between items-center p-4 rounded-lg",
                statusColorMap[status as RoomStatus]
              )}
            >
              <span className="font-medium">{statusLabels[status as RoomStatus]}</span>
              <span className="text-2xl font-bold">{count}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Tasa de ocupación</span>
            <span className="text-sm font-medium">{occupancyRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${occupancyRate}%` }}></div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default RoomStatusCard;
