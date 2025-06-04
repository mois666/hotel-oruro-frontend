import { useEffect, useState } from "react";
import { DynamicTable, FormModal } from "../../../components"
import { AlertDelete } from "../../../components/ui/alert-delete"
import { useAuthStore, useRoomStore } from "../../../stores";
import { useNavigate } from "react-router-dom";
import { RoomStatus, RoomType } from "../../../types";

export const RoomsManage = () => {
    const token = useAuthStore(state => state.token);
    
        const [selectedRowData, setSelectedRowData] = useState<Record<string, any> | null>(null);
        const [isEditing, setIsEditing] = useState<boolean>(false);
        const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    
        /* Eliminando  */
        const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
        const [deleteRowId, setDeleteRowId] = useState<number | null>(null);
        /* customers */
        const roomsManage = useRoomStore((state) => state.rooms);
        const getRooms = useRoomStore((state) => state.getRooms);
        const createRoom = useRoomStore((state) => state.createRoom);
        const updateRoom = useRoomStore((state) => state.updateRoom);
        const deleteRoom = useRoomStore((state) => state.deleteRoom);
    
        const navigate = useNavigate();
        const handleFetchRooms = async () => {
            if (roomsManage.length === 0) {
                await getRooms(token!);
            }
        }
        useEffect(() => {
            handleFetchRooms();
    
            if (deleteCountdown !== null && deleteCountdown > 0) {
                const timer = setTimeout(() => {
                    setDeleteCountdown(deleteCountdown - 1);
                }, 1000);
                return () => clearTimeout(timer); // Limpia el temporizador
            } else if (deleteCountdown === 0) {
                handleConfirmDelete(); // Elimina permanentemente cuando llega a 0
            }
        }, [deleteCountdown]);
        
        console.log(roomsManage);
        
    
        const headers = [
            { name: '#', uid: 'number' },
            { name: 'TIPO', uid: 'type' },
            { name: 'ESTADO', uid: 'status' },
            { name: 'PISO', uid: 'floor' },
            { name: 'PRECIO', uid: 'price' },
            { name: 'ACCIONES', uid: 'actions-ed' }
        ];
        const fields = [
            { name: 'number', label: 'Número', type: 'number', placeholder: 'Número de la habitación' },
            { name: 'type', label: 'Tipo', type: 'select', placeholder: 'Tipo de habitación', options: Object.values(RoomType).map((type) => ({ value: type, label: type })) },
            { name: 'status', label: 'Estado', type: 'select', placeholder: 'Estado de la habitación', options: [
                { value: RoomStatus.AVAILABLE, label: 'Disponible' },
                { value: RoomStatus.OCCUPIED, label: 'Ocupada' },
                { value: RoomStatus.CLEANING, label: 'Limpieza' },
                { value: RoomStatus.MAINTENANCE, label: 'Mantenimiento' },
            ] },
            { name: 'floor', label: 'Piso', type: 'number', placeholder: 'Piso de la habitación' },
            { name: 'price', label: 'Precio', type: 'number', placeholder: 'Precio de la habitación' },
        ];
        const handleFormSubmit = async (formData: Record<string, any>) => {
    
            if (isEditing) {
                await updateRoom(selectedRowData?.id!, formData as [], token!);
            } else {
                await createRoom(formData as [], token!);
            }
            setIsModalOpen(false); // Cerrar el modal
            //console.log(formData)
        };
        //Define controles para abrir el modal de agregar rol
        // Función para abrir el modal con datos vacíos (creación)
        const handleNewCategoryClick = () => {
            setSelectedRowData(null);  // Limpiar los datos
            setIsEditing(false);       // No estamos editando, estamos creando
            setIsModalOpen(true);      // Abrir el modal
        };
        // Función para abrir el modal con datos de un cliente seleccionado (edición)
        const handleEditClick = (rowData: Record<string, any>) => {
            //console.log(rowData);
            setSelectedRowData(rowData);  // Cargar datos del cliente seleccionado
            setIsEditing(true);           // Estamos en modo edición
            setIsModalOpen(true);         // Abrir el modal
        };
        /* Eliminando  */
        // Función para iniciar el contador de eliminación
        const handleDeleteClick = (id: number) => {
            //console.log(id);
            setDeleteRowId(id);
            setDeleteCountdown(10); // Inicia el temporizador de 10 segundos
        };
    
        // Función para cancelar la eliminación
        const handleCancelDelete = () => {
            setDeleteRowId(null);
            setDeleteCountdown(null); // Resetea el temporizador
        };
    
        // Función para realizar la eliminación definitiva
        const handleConfirmDelete = async () => {
            //setRows(rows.filter(row => row.id !== deleteRowId)); // Elimina el registro de los datos
            //await deleteRoom(deleteRowId!, token!); // Elimina el registro de la base de datos
            if (deleteRowId) {
                await deleteRoom(deleteRowId, token!);
                setDeleteRowId(null);
                setDeleteCountdown(null); // Resetea el temporizador
            }
        };
        // Redirigir al hacer clic en "Ver"
        const handleViewClick = (id: number) => {
            navigate(`/admin/rooms/${id}`); // Redirigir a la página con el ID del usuario
        };
    return (
        <>
        <FormModal
              fields={fields}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleFormSubmit}
              initialValues={selectedRowData || {}}  // Pasar los valores seleccionados o vacío si es nuevo
            />
            <h2>Habitaciones</h2>
            <DynamicTable stringSearch={'number'} onCreate={handleNewCategoryClick} data={roomsManage} columns={headers} onEdit={handleEditClick} onDelete={handleDeleteClick} onView={handleViewClick} />
            {deleteRowId != null ? (
              <AlertDelete handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} deleteCountdown={deleteCountdown} message={'¿Estás seguro de querer eliminar el cliente?'} />

            ) : ('')}
        </>
    )
}