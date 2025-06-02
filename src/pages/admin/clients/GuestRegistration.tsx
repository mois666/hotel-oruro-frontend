

import { useState } from 'react';
import GuestList from '../../../components/guest/GuestList';
import { Guest } from '../../../types';
import { guests as mockGuests } from '../../../data/mockData';
import GuestRegistrationForm from '../../../components/guest/GuestRegistrationForm';

const GuestRegistration = () => {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  
  const handleDeleteGuest = (id: string) => {
    setGuests(guests.filter(guest => guest.id !== id));
  };
  
  const handleEditGuest = (guest: Guest) => {
    // In a real app, this would open an edit form
    console.log('Editing guest:', guest);
  };
  
  
  
  return (
    <div className="space-y-8 dark:bg-hotel-darkCard">
      <h1 className="text-3xl font-bold">Registro de Huéspedes</h1>
      
      <GuestRegistrationForm />
      
    </div>
  );
};

export default GuestRegistration;
