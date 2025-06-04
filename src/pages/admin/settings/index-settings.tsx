import {
  Button,
  Card,
  CardBody,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";

import { useEffect, useState } from "react";

import { useAuthStore } from "../../../stores";
import { userStore } from "../../../stores/users/users.store";
import { useNavigate } from "react-router-dom";
import { AlertDelete, DynamicTable, FormModal } from "../../../components";

export const SettingsPage = () => {
  const token = useAuthStore(state => state.token);
      const [selectedRowData, setSelectedRowData] = useState<Record<string, any> | null>(null);
      const [isEditing, setIsEditing] = useState<boolean>(false);
      const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
      const [rows, setRows] = useState<Record<string, any>[]>([]);
      /* User data */
      const users = userStore(state => state.users);
      const getUsers = userStore(state => state.getUsers);
      /* Insert user */
      const createUser = userStore(state => state.createUser);
      /* Update user */
      const updateUser = userStore(state => state.updateUser);
      /* Delete user */
      const deleteUser = userStore(state => state.deleteUser);
  
  
      /* Eliminando  */
      const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null);
      const [deleteRowId, setDeleteRowId] = useState<number | null>(null);
  
      const navigate = useNavigate();
      /* Get users */
      const handleGetUsers = async () => {
          await getUsers(token!);
      }
  
  
      useEffect(() => {
          handleGetUsers();
  
          if (deleteCountdown !== null && deleteCountdown > 0) {
              const timer = setTimeout(() => {
                  setDeleteCountdown(deleteCountdown - 1);
              }, 1000);
              return () => clearTimeout(timer); // Limpia el temporizador
          } else if (deleteCountdown === 0) {
              handleConfirmDelete(); // Elimina permanentemente cuando llega a 0
          }
      }, [deleteCountdown]);
  
      const headers = [
          { name: 'AVATAR', uid: 'avatar' },
          { name: 'NOMBRE', uid: 'name' },
          { name: 'APELLIDO', uid: 'last_name' },
          { name: 'ROL', uid: 'role' },
          { name: 'EMAIL', uid: 'email' },
          { name: 'ESTADO', uid: 'status' },
          { name: 'ACCIONES', uid: 'actions' }
      ];
      const fields = [
          { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre'},
          { name: 'last_name', label: 'Apellido', type: 'text', placeholder: 'Apellido' },
          { name: 'email', label: 'Email', type: 'email', placeholder: 'Email' },
          { name: 'avatar', label: 'Avatar', type: 'file', placeholder: 'Avatar' },
          { name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
          { name: 'role', label: 'Rol', type: 'select', options: [{value: 'admin', label: 'admin'}, {value: 'recepcionista', label: 'recepcionista'}], placeholder: 'Rol' },
          { name: 'status', label: 'Estado', type: 'select', options: [{value: 'activo', label: 'activo'}, {value: 'inactivo', label: 'inactivo'}], placeholder: 'Estado' },
      ];
      const handleFormSubmit = async (formData: Record<string, any>) => {
  
          if (isEditing) {
              await updateUser(selectedRowData?.id, formData, token!);
          } else {
              await createUser(formData as [], token!);
          }
          //setIsModalOpen(false); // Cerrar el modal
      };
      //Define controles para abrir el modal de agregar rol
      // Función para abrir el modal con datos vacíos (creación)
      const handleNewClientClick = () => {
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
          setRows(rows.filter(row => row.id !== deleteRowId)); // Elimina el registro de los datos
          await deleteUser(deleteRowId!, token!); // Elimina el registro de la base de datos
          setDeleteRowId(null);
          setDeleteCountdown(null); // Resetea el temporizador
      };
      // Redirigir al hacer clic en "Ver"
      const handleViewClick = (id: number) => {
          navigate(`/admin/users/${id}`); // Redirigir a la página con el ID del usuario
      };
  return (
    <div className="px-4">
      <div className="">
        <div className="mx-4 w-full">
          <h1 className="text-xl font-bold">Ajustes</h1>
          <Tabs aria-label="Tabs variants" variant="underlined">
            <Tab key="Tarifas y Descuentos" title="Tarifas y Descuentos">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardBody className="gap-2">
                    <h2 className="text-xl font-bold">Tarifas de Habitaciones</h2>
                    <form>
                      <p className="mb-2 text-sm">Habitacion Simple(Bs/noche)</p>
                      <Input type="text" />
                      <p className="mb-2 text-sm">Habitacion Doble(Bs/noche)</p>
                      <Input type="text" />
                      <p className="mb-2 text-sm">Suite(Bs/noche)</p>
                      <Input type="text" />
                      <Button className="mt-4 w-full border-[##9CA3AF] text-[#0a0a0a] hover:bg-[#2563EB] " type="submit" >
                        Guardar Cambios
                      </Button>
                    </form>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody className="gap-2">
                    <h2 className="text-xl font-bold">Configuración de Descuentos</h2>
                    <form>
                      <p className="mb-2 text-sm">Descuento Estándar (%)</p>
                      <Input type="text" />
                      <p className="mb-2 text-sm">Descuento para Grupos (%)</p>
                      <Input type="text" />
                      <p className="mb-2 text-sm">Descuento Estancia Prolongada (%)</p>
                      <Input type="text" />
                      <Button className="mt-4 w-full border-[##9CA3AF] text-[#0a0a0a] hover:bg-[#2563EB] " type="submit">
                        Guardar Cambios
                      </Button>
                    </form>
                  </CardBody>
                </Card>
              </div>
            </Tab>

            <Tab key="Gestión de Usuarios" title="Gestión de Usuarios">
              <Card>
                <CardBody>
                  <FormModal
                                  fields={fields}
                                  isOpen={isModalOpen}
                                  onClose={() => setIsModalOpen(false)}
                                  onSubmit={handleFormSubmit}
                                  initialValues={selectedRowData || {}}  // Pasar los valores seleccionados o vacío si es nuevo
                              />
                  <h2 className="text-xl font-bold">Gestión de Usuarios</h2>
                  <DynamicTable stringSearch={'name'} onCreate={handleNewClientClick} data={users} columns={headers} onEdit={handleEditClick} onDelete={handleDeleteClick} onView={handleViewClick} />
                  {deleteRowId != null ? (
                    <AlertDelete handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} deleteCountdown={deleteCountdown} message={"¿Estás seguro de querer eliminar este usuario?"} />
                  ) : ('')}
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
