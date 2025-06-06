import { useEffect, useState } from "react";
import {
  DynamicBreadcrumbs,
} from "../../../components";
import RoomGrid from "../../../components/rooms/RoomGrid";
import { Room } from "../../../types";
//import { rooms as mockRooms } from "../../../data/mockData";
import { ModalRooms } from "../../../components/rooms/modal-rooms";
import { Button, Skeleton, Tab, Tabs } from "@nextui-org/react";
import { RoomsManage } from "./roms-manage";
import { useAuthStore } from "../../../stores";
import { useRoomStore } from "../../../stores/rooms/rooms.store";
import { FaArrowRotateRight } from "react-icons/fa6";

export const IndexRooms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useAuthStore(state => state.token);
  const roomsStore = useRoomStore(state => state.rooms);
  const getRooms = useRoomStore(state => state.getRooms);

  const [rooms] = useState<Room[]>( isLoading ? [] : roomsStore);

  const handleFetchRooms = async () => {
    setIsLoading(true);
    await getRooms(token!);
    setIsLoading(false);
  }
  useEffect(() => {
    handleFetchRooms();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getRooms(token!);
    setIsLoading(false);
  }, [token]);



  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleCloseDialog = () => {
    setSelectedRoom(null);
  };
  /* manage rooms */


  return (
    <>
      <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-2">
        <DynamicBreadcrumbs />
        <div className="flex items-center justify-between">


          <h1 className="text-3xl font-bold">Gestión de Habitaciones</h1>
          {/* Boton refrescar */}
          <Button
            onPress={() => window.location.reload()}
            className="primary"
            variant="bordered"

          >
            <FaArrowRotateRight className="mr-2 w-4 h-4" />
            Refrescar
          </Button>
        </div>

        <Tabs aria-label="Options">
          <Tab key="all" title="Vista de todas las habitaciones por piso">
            <div className="rounded-lg shadow-sm">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Skeleton className="w-full h-64" />
                </div>
              ) : (
                <RoomGrid rooms={rooms} onRoomClick={handleRoomClick} />
              )}
            </div>
          </Tab>
          <Tab key="register" title="Registrar Habitación">
            <RoomsManage />
          </Tab>

        </Tabs>

      </div>

      {selectedRoom && (
        <ModalRooms
          isOpen={!!selectedRoom}
          onClose={handleCloseDialog}
          room={selectedRoom}
        />
      )}
    </>
  );
};
