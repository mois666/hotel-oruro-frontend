import { useState } from "react";
import {
  DynamicBreadcrumbs,
  FormModal,
} from "../../../components";
import RoomGrid from "../../../components/rooms/RoomGrid";
import { Room } from "../../../types";
import { rooms as mockRooms } from "../../../data/mockData";
import { ModalRooms } from "../../../components/rooms/modal-rooms";
import { Tab, Tabs } from "@nextui-org/react";
import { RoomsManage } from "./roms-manage";

export const IndexRooms = () => {
  const [rooms] = useState<Room[]>(mockRooms);
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
        <h1 className="text-3xl font-bold">Gestión de Habitaciones</h1>
        <Tabs aria-label="Options">
          <Tab key="all" title="Vista de todas las habitaciones por piso">
            <div className="rounded-lg shadow-sm">
              <RoomGrid rooms={rooms} onRoomClick={handleRoomClick} />
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
