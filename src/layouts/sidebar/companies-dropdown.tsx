//"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import { useAuthStore, useSettingStore } from "../../stores";
import { useEffect } from "react";


export const CompaniesDropdown = () => {
  const token = useAuthStore(state => state.token);
  const company = useSettingStore(state => state.systemData);
  const { logo, name } = company as any;

  const getSystemData = useSettingStore(state => state.getSystemData);
  //const getShops = useShopsStore(state => state.getShops);
  useEffect(() => {
    //getShops(token as string);
    getSystemData();
  }, []);
  console.log(company);

  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex gap-2 items-center">
          {/* Logo image */}
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-4">
            <h3 className="m-0 -mb-4 text-xl font-medium uppercase whitespace-nowrap text-default-900">
              {name}
            </h3>
            <span className="text-xs font-medium text-default-500">
              Oruro, Bolivia
            </span>
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Avatar Actions">
        <DropdownSection title="Tiendas">
            <DropdownItem
              key="1"
              startContent={<FaHome />}
              description=""
              classNames={{
                base: "py-4",
                title: "text-base font-semibold",
              }}
              
            >

              sheopname
            </DropdownItem>

          {/* <DropdownItem
            key="1"
            startContent={<FaHome />}
            description="Página de bienvenida"
            classNames={{

              base: "py-4",
              title: "text-base font-semibold",
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            Pantalla de inicio
          </DropdownItem>
          <DropdownItem
            key="2"
            startContent={<FaCreativeCommons />}
            description="Landing page de la empresa"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
            href="https://culking.com"
            target="_blank"
          >
            Culking
          </DropdownItem> */}
          {/* <DropdownItem
            key="3"
            startContent={<FaCreativeCommons />}
            description="Brooklyn, NY"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Twitter
          </DropdownItem>
          <DropdownItem
            key="4"
            startContent={<FaCreativeCommons />}
            description="Palo Alto, CA"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Acme Co.
          </DropdownItem> */}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
