import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";


import { Room, RoomStatus, RoomType } from "../../types";
const statusLabels: Record<RoomStatus, string> = {
  [RoomStatus.AVAILABLE]: "Disponible",
  [RoomStatus.OCCUPIED]: "Ocupada",
  [RoomStatus.CLEANING]: "Limpieza",
  [RoomStatus.MAINTENANCE]: "Mantenimiento",
};
interface ModalRoomsProps {
  isOpen: boolean;
  onClose: () => void;
  room: {};
}

export const ModalRooms = ({
  isOpen,
  onClose,
  room,
}: ModalRoomsProps) => {
  console.log(room);

  return(
  <>
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalContent>
      <ModalHeader>Habitación #{room.number}</ModalHeader>
      <ModalBody>
        <p>{room.type} - Piso {room.floor}</p>
        <div className="flex flex-row gap-2">
          <b>Estado:</b> <p>{statusLabels[room.status]}</p>
        </div>
        <div className="flex flex-row gap-2">
          <b>Precio:</b> <p>{room.price}</p>
        </div>
        <div className="flex flex-row gap-2">
          <b>Capacidad:</b> <p>{room.capacity}</p>
        </div>
        
      </ModalBody>
      <ModalFooter>
        <Button color="default" onPress={onClose}>
          Cerrar
        </Button>
        {/* Editar Habitacion */}
        <Button color="primary" onPress={() => {}}>
          Editar Habitación
        </Button>
      </ModalFooter>
    </ModalContent>
    
  </Modal>
  </>  
  )
};