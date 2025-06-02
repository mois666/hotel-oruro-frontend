import { Button, Input, Textarea } from "@nextui-org/react";

import { useEffect, useState } from "react";

import { useSettingStore } from "../../../stores/settings/settings.store";
import { useAuthStore } from "../../../stores";


export const SettingsPage = () => {
  const token = useAuthStore(state => state.token);
  const [currentLogo, setCurrentLogo] = useState('');
  const settings = useSettingStore(state => state.setting);
  const getSettings = useSettingStore(state => state.getSettings);

  const [image, setImage] = useState<File>();
  const [preImage, setPreImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  


  const updateSetting = useSettingStore(state => state.updatedSetting)
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImage(file);
    const preview = URL.createObjectURL(file);
    setPreImage(preview)
    if(preview){
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentLogo(reader.result as string);
        
      }
      reader.readAsDataURL(file);
    }
    //console.log(currentLogo);

  }

  const handleFetchSettings = async () => {
    if (settings.length === 0) {
      await getSettings(1, token!);
    }

  }
  useEffect(() => {

    handleFetchSettings();

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
    <div className="px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mx-auto w-full max-w-md md:col-span-2">
          {
            settings.map((setting) => (

              <form key={setting.id} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="settingName"
                      className="block text-sm font-medium text-gray-700"

                    >
                      Nombre del sistema:
                    </label>
                    <Input
                      type="text"
                      id="settingName"
                      name="settingName"
                      className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      defaultValue={setting.name}
                    />
                  </div>

                  <div className='flex flex-col gap-2 md:flex-row'>
                    <div className="flex gap-2 items-center">
                      <label
                        htmlFor="logo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Logo:
                      </label>
                      <Input type="file" id="logo" className="hidden" onChange={handleImage} name="logo" accept="image/*" />
                      <label
                        htmlFor="logo"
                        className="px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Seleccionar archivo
                      </label>
                    </div>
                    <div className="mt-1">
                      <img src={preImage ? preImage : setting?.logo ? setting.logo : 'https://via.placeholder.com/200x200'} alt="Imagen del carrusel" className="object-cover w-20 h-20" />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Descripción:
                    </label>
                    <Textarea
                      type="text"
                      id="description"
                      name="description"
                      className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      defaultValue={setting.description}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="header"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Encabezado:
                    </label>
                    <Textarea
                      id="header"
                      name="header"
                      className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      defaultValue={setting.header}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contacts"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contactos:
                    </label>
                    <Input
                      type="text"
                      id="contacts"
                      name="contacts"
                      defaultValue={setting.contact}
                      className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="support"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Soporte:
                    </label>
                    <Input
                      type="text"
                      id="support"
                      name="support"
                      defaultValue={setting.support}
                      className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="social"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Social:
                    </label>
                    <Textarea
                      id="social"
                      name="social"
                      defaultValue={setting.social}
                      className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="footer"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Footer:
                    </label>
                    <Textarea
                      id="footer"
                      name="footer"
                      defaultValue={setting.footer}
                      className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="pt-5">
                    <Button isLoading={isLoading} isDisabled={isLoading} color="primary" type="submit">
                      Actualizar
                    </Button>
                  </div>
                </div>

              </form>
            ))
          }


        </div>

      </div>
    </div>

  );
};
