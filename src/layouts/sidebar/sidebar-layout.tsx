
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout-context";

import { FaBox, FaHouse, FaStore, FaUsers } from 'react-icons/fa6'
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useAuthStore } from "../../stores";
import { TbCategoryPlus } from "react-icons/tb";
import { FaCog } from "react-icons/fa";

export const SidebarLayout = () => {
  const { id } = useParams();
  const pathname = useLocation().pathname;
  const { collapsed, setCollapsed } = useSidebarContext();
  const authStatus = useAuthStore(state => state.authStatus);
  if (authStatus === 'not-auth') {
    return <Navigate to='/' />
  }

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>

            <SidebarMenu title="Menu">
              <SidebarItem
                title="Inicio"
                icon={<FaHouse className="text-default-500" size={20} />}
                isActive={pathname === "/admin"}
                href="/admin"
              />
              {/* Inventory */}
              <SidebarItem
                isActive={pathname === "/admin/registro" || pathname === "/admin/registro/input"}
                title="Registro"
                icon={<FaBox className="text-default-500" size={20} />}
                href="/admin/registro"
              />
              <SidebarItem
                title="Huéspedes" // @ts-ignore-line spellcheck
                isActive={pathname === "/admin/huespedes" || pathname === `/admin/huespedes/${id}`}
                icon={<FaUsers className="text-default-500" size={20} />}
                href="/admin/huespedes"
              />
              {/* <SidebarItem
                isActive={pathname === "/admin/users" || pathname === `/admin/users/${id}`}
                title="Usuarios"
                icon={<FaUsers className="text-default-500" size={20} />}
                href="/admin/users"
              /> */}
               <SidebarItem
                isActive={pathname === "/admin/habitaciones" || pathname === `/admin/habitaciones/${id}`}
                title="Habitaciones"
                icon={<FaStore className="text-default-500" size={20} />}
                href="/admin/habitaciones"
              />

              {/* @ts-ignore-line spellcheck */}
              <SidebarItem
                isActive={pathname === "/admin/ajustes" || pathname === `/admin/ajustes/${id}`}
                title="Ajustes"
                icon={<FaCog className="text-default-500" size={20} />}
                href="/admin/ajustes"
              />
              
              {/* Orders */}
              {/* <SidebarItem
                isActive={pathname === "/admin/orders"}
                title="Ventas"
                icon={<FaBox className="text-default-500" size={20} />}
                href="/admin/orders"
              /> */}

            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};

