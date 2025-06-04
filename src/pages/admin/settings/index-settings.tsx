import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Input,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  Textarea,
} from "@nextui-org/react";

import { useEffect, useState } from "react";

import { useSettingStore } from "../../../stores/settings/settings.store";
import { useAuthStore } from "../../../stores";
import { FaEdit, FaPenAlt, FaTimes } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { userStore } from "../../../stores/users/users.store";

export const SettingsPage = () => {
  const token = useAuthStore((state) => state.token);
  const [currentLogo, setCurrentLogo] = useState("");
  const settings = useSettingStore((state) => state.setting);
  const getSettings = useSettingStore((state) => state.getSettings);


  const [image, setImage] = useState<File>();
  const [preImage, setPreImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateSetting = useSettingStore((state) => state.updatedSetting);

//user
const users = userStore((state) => state.users);
const getUsers = userStore((state) => state.getUsers);

const handleFetchUser = async () => {
  if (users.length === 0) {
    await getUsers(token!);
  }
};




  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImage(file);
    const preview = URL.createObjectURL(file);
    setPreImage(preview);
    if (preview) {
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    //console.log(currentLogo);
  };

  const handleFetchSettings = async () => {
    if (settings.length === 0) {
      await getSettings(1, token!);
    }
  };
  useEffect(() => { 
    handleFetchSettings();
    handleFetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const logo = image ? currentLogo : settings[0].logo;
    const form = e.target as HTMLFormElement;
    const settingName = form.settingName?.value || "";
    const description = form.description?.value || "";
    const header = form.header?.value || "";
    const contact = form.contacts?.value || "";
    const support = form.support?.value || "";
    const social = form.social?.value || "";
    const footer = form.footer?.value || "";

    await updateSetting(
      1,
      settingName,
      logo,
      description,
      header,
      contact,
      support,
      social,
      footer,
      token!
    );

    setIsLoading(false);
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
                  <h2 className="text-xl font-bold">Gestión de Usuarios</h2>
                  <Table aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn>Nombre</TableColumn>
                      <TableColumn>Correo</TableColumn>
                      <TableColumn>Rol</TableColumn>
                      <TableColumn>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {users.map((user, index) => (
                        <TableRow key={index}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell className="flex gap-2">
                          <Button variant="bordered" size="sm" color="primary" isIconOnly startContent={<FaEdit />} > </Button>
                          <Button variant="bordered" size="sm" color="danger" isIconOnly startContent={<FaTrash />} > </Button>
                        </TableCell>
                      </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
