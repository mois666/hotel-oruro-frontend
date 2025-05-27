import {
  Avatar,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
//import React, { useCallback } from "react";
import { useAuthStore } from "../../stores";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useNavigate } from "react-router-dom";
//import { useRouter } from "next/navigation";
//import { deleteAuthCookie } from "../../actions/auth.action";

export const UserDropdown = () => {
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  /* const router = useRouter();

  const handleLogout = useCallback(async () => {
    await deleteAuthCookie();
    router.replace("/login");
  }, [router]); */
  //console.log(user);

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as='button'
            color='secondary'
            size='md'
            src="https://cdn.vectorstock.com/i/1000v/15/12/call-center-agent-flat-icon-vector-14991512.jpg"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label='User menu actions'
        onAction={(actionKey) => console.log({ actionKey })}>
        <DropdownItem
            href={user?.roles[0] === 'admin' ? '/admin' : '/home'}
          
          key='profile'
          className='flex flex-col justify-start items-start w-full'>
          <p>{ user?.name }</p>
          <p>
         
          </p>
          <Chip
            size="sm"
            variant="flat"
            color={user?.roles[0] === 'admin' ? 'success' : 'warning'}
          >
            <span className="text-xs capitalize">{user?.roles}</span>
          </Chip>
        </DropdownItem>
        <DropdownItem key='home' onPress={() => navigate('/')}>Mis tiendas</DropdownItem>
        <DropdownItem
          key='logout'
          color='danger'
          className='text-danger'
          onPress={logout}>
          Cerrar sesión
          
        </DropdownItem>
        <DropdownItem key='help_and_feedback'>
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
