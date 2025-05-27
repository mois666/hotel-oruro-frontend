
import { useEffect, useState } from "react";
import { AlertDelete, DynamicBreadcrumbs, DynamicTable, FormModal } from "../../../components"
import { useNavigate } from "react-router-dom";
import RoomGrid from "../../../components/rooms/RoomGrid";
import { Room } from "../../../types";
import { rooms as mockRooms } from '../../../data/mockData';


export const IndexRooms = () => {
    
   
    const [rooms] = useState<Room[]>(mockRooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
  };
  
  const handleCloseDialog = () => {
    setSelectedRoom(null);
  };
    
   
    return (
        <>
            <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
                <DynamicBreadcrumbs />
                <h2>Habitaciones</h2>
                <h1 className="text-3xl font-bold">Gestión de Habitaciones</h1>
      
      <div className="bg-white rounded-lg shadow-sm">
        <RoomGrid rooms={rooms} onRoomClick={handleRoomClick} />
      </div>
      
      
            </div>
        </>
    )
}
