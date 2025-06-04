import { useEffect, useState } from "react";
//import { guests as mockGuests } from "../../../data/mockData";
import { Guest } from "../../../types";
import GuestList from "../../../components/guest/GuestList";
import { Button } from "../../../components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, useClientStore } from "../../../stores";
import { Spinner } from "@nextui-org/react";

const GuestsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const clients = useClientStore((state) => state.clients);
  const getCustomers = useClientStore((state) => state.getClients);

  const handleFetchCustomers = async () => {
    setIsLoading(true);
    if (clients.length === 0) {
      await getCustomers(token!);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    handleFetchCustomers();
  }, []);
  console.log(clients);

  const [guests, setGuests] = useState<Guest[]>(clients);

  const handleDeleteGuest = (id: string) => {
    setGuests(guests.filter((guest) => guest.id !== id));
  };

  const handleEditGuest = (guest: Guest) => {
    // In a real app, this would open an edit form
    console.log("Editing guest:", guest);
  };

  const handleAddGuest = () => {
    navigate("/registro");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Huéspedes</h1>
        <Button
          onClick={handleAddGuest}
          className="bg-hotel-blue hover:bg-hotel-darkBlue"
        >
          <PlusCircle className="mr-2 w-4 h-4" />
          Registrar Huésped
        </Button>
      </div>

      <div className="p-6 rounded-lg shadow-sm dark:bg-hotel-darkCard">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <GuestList
            guests={clients}
            onDelete={handleDeleteGuest}
            onEdit={handleEditGuest}
          />
        )}
      </div>
    </div>
  );
};

export default GuestsPage;
