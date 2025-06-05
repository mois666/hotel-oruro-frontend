import { useEffect, useState } from "react";
//import { guests as mockGuests } from "../../../data/mockData";
//import { Guest } from "../../../types";
import GuestList from "../../../components/guest/GuestList";
import { Button } from "../../../components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, useClientStore } from "../../../stores";
import { Spinner } from "@nextui-org/react";
import { AlertDelete } from "../../../components";

const GuestsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const clients = useClientStore((state) => state.clients);
  const getCustomers = useClientStore((state) => state.getClients);
  const deleteCustomer = useClientStore((state) => state.deleteClient);

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
  /* Eliminando  */
  const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
  const [deleteRowId, setDeleteRowId] = useState<number | null>(null);

  useEffect(() => {
    handleFetchCustomers();

    if (deleteCountdown !== null && deleteCountdown > 0) {
      const timer = setTimeout(() => {
        setDeleteCountdown(deleteCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer); // Limpia el temporizador
    } else if (deleteCountdown === 0) {
      handleConfirmDelete(); // Elimina permanentemente cuando llega a 0
    }
  }, [deleteCountdown]);

  const handleDeleteGuest = (id: string) => {
    /* setGuests(guests.filter((guest) => guest.id !== id)); */
    setDeleteRowId(Number(id));
    setDeleteCountdown(10);
  };
  /* Eliminando  */
  // Función para iniciar el contador de eliminación
  

  // Función para cancelar la eliminación
  const handleCancelDelete = () => {
    setDeleteRowId(null);
    setDeleteCountdown(null); // Resetea el temporizador
  };

  // Función para realizar la eliminación definitiva
  const handleConfirmDelete = async () => {
    //setRows(rows.filter(row => row.id !== deleteRowId)); // Elimina el registro de los datos
    //await deleteRole(deleteRowId!, token!); // Elimina el registro de la base de datos
    if (deleteRowId) {
      await deleteCustomer(deleteRowId, token!);
      setDeleteRowId(null);
      setDeleteCountdown(null); // Resetea el temporizador
    }
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
          />
        )}
      </div>

      {deleteRowId != null ? (
        <AlertDelete handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} deleteCountdown={deleteCountdown} message={'¿Estás seguro de querer eliminar el cliente?'} />

      ) : ('')}
    </div>
  );
};

export default GuestsPage;
