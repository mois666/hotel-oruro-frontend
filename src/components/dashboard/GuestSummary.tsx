
import React from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Guest } from '../../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Correctly import the Spanish locale

interface GuestSummaryProps {
  guests: Guest[];
  className?: string;
}

const GuestSummary: React.FC<GuestSummaryProps> = ({ guests, className }) => {
  const recentGuests = guests.slice(0, 5);
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row justify-between items-center">
        <h1 className="text-xl font-bold">Huéspedes Recientes</h1>
        <span className="text-lg font-bold">{guests.length} total</span>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {recentGuests.map((guest) => (
            <div key={guest.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex justify-center items-center w-10 h-10 font-medium rounded-full bg-default-500 text-default-50">
                  {guest.firstName.charAt(0)}{guest.lastName.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{guest.firstName} {guest.lastName}</p>
                  <p className="text-xs text-default-500">Habitación {guest.roomNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium">{format(new Date(guest.checkIn), 'dd/MM/yyyy', { locale: es })}</p>
                <p className="text-xs text-default-500">al {format(new Date(guest.checkOut), 'dd/MM/yyyy', { locale: es })}</p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default GuestSummary;
