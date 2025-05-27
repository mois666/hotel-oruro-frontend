
import { Toaster } from "sonner";
import { Button, CircularProgress, Input, Link, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

import { BurguerButton } from "./burguer-button";
/* import { NotificationsDropdown } from "./notifications-dropdown"; */
import { UserDropdown } from "./user-dropdown";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore, useSettingStore } from "../../stores";
import { DarkModeSwitch } from "./darkmodeswitch";
import { FaCircleQuestion } from "react-icons/fa6";
import { RiMegaphoneFill } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { useEffect } from "react";


export const NavbarLayout = () => {
  //const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const authStatus = useAuthStore(state => state.authStatus);
  const checkAuthStatus = useAuthStore(state => state.checkAuthStatus);
  const company = useSettingStore(state => state.systemData);
  const { logo, name } = company as any;
  const getSystemData = useSettingStore(state => state.getSystemData);
  useEffect(() => {
    getSystemData();
  }, []);

  if (authStatus === 'pending') {
    checkAuthStatus();
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p>Cargando...</p>
        <CircularProgress />
      </div>
    )
  }
  /* if (authStatus === 'not-auth') {
    return <Navigate to='/' />
  } */

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        style={{
          position: 'absolute',
        }}
      />
      {/* overflow-x-hidden */}
      <div className="flex overflow-y-auto overflow-x-hidden relative flex-col flex-1">
        <Navbar
          isBordered
          className="w-full"
          classNames={{
            wrapper: "w-full max-w-full",
          }}

        >
          <NavbarContent className="md:hidden">
            {
              window.location.pathname.includes('/admin') && (
                <BurguerButton />
              )
            }
            <NavbarBrand className="hidden md:flex">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
              <p className="font-bold uppercase text-inherit">{name}</p>
            </NavbarBrand>
            {
              !window.location.pathname.includes('/admin') && (
                <NavbarContent className="" justify="start">
                  <NavbarBrand className="cursor-pointer" onClick={() => navigate('/')}>
                    <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
                    <p className="font-bold uppercase text-inherit">{name}</p>
                  </NavbarBrand>
                </NavbarContent>
              )
            }
          </NavbarContent>
          {
            !window.location.pathname.includes('/admin') && (
              <NavbarContent className="max-md:hidden" justify="start">
                <NavbarBrand className="gap-2 cursor-pointer hover:opacity-80" onClick={() => navigate('/')}>
                  <img src={logo ?? `https://picsum.photos/seed/${Math.random()}/200/300`} alt="Logo" className="w-10 h-10 rounded-full" />
                  <p className="font-bold uppercase text-inherit">{name ?? ''}</p>
                </NavbarBrand>
              </NavbarContent>
            )
          }
          <NavbarContent className="w-full">
            <Input
              startContent={<IoMdSearch />}
              isClearable
              className="w-full"
              classNames={{
                input: "w-full",
                mainWrapper: "w-full",
              }}
              placeholder="Buscar..."
            />
          </NavbarContent>

          <NavbarContent
            justify="end"
            className="w-fit data-[justify=end]:flex-grow-0"
          >
            <div className="flex gap-2 items-center max-md:hidden">
              <RiMegaphoneFill className="text-default-500" size={20} />
              <span>Feedback?</span>
            </div>

            {/* <NotificationsDropdown /> */}


            <div className="max-md:hidden">
              <FaCircleQuestion className="text-default-500" size={20} />
            </div>

            <NavbarContent className="max-md:hidden" key='switch'>
              <DarkModeSwitch />
            </NavbarContent>

            <NavbarContent className="max-md:hidden">
              {
                authStatus === 'auth' ? <UserDropdown /> : <Button as={Link} href="/login" variant="flat">Iniciar sesión</Button>
              }

            </NavbarContent>
          </NavbarContent>
        </Navbar>

        <Outlet />
      </div>
    </>
  );
};
