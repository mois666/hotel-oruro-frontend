
import { Navigate, Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { useAuthStore } from "../../stores"
import { CircularProgress, Divider, Image } from "@nextui-org/react"
export const AuhtLayout = () => {

  const authStatus = useAuthStore(state => state.authStatus);
  const checkAuthStatus = useAuthStore(state => state.checkAuthStatus);

  if (authStatus === 'pending') {
    checkAuthStatus();
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p>Cargando...</p>
        <CircularProgress />
      </div>
    )
  }
  if (authStatus === 'auth') {
    //TODO:: ASIGNAR ROLES Y PERMISOS
    return <Navigate to='/admin' />
  }

  return (
    <>
      <Toaster
        position="top-center"
        richColors
        closeButton
        style={{
          position: 'absolute',
        }}
      />
      <div className='flex h-screen'>
        <div className='flex flex-col flex-1 justify-center items-center p-6'>
          <div className='absolute top-0 right-0 bottom-0 left-0 z-0 md:hidden'>
            <Image
              className='w-full h-full'
              src='https://nextui.org/gradients/docs-right.png'
              alt='gradient'
            />
          </div>
          <Outlet />
        </div>

        <div className='hidden my-10 md:block'>
          <Divider orientation='vertical' />
        </div>

        <div className='flex hidden relative flex-1 justify-center items-center p-6 md:flex'>
          <div className='absolute top-0 right-0 bottom-0 left-0 z-0'>
            <Image
              className='w-full h-full'
              src='https://nextui.org/gradients/docs-right.png'
              alt='gradient'
            />
          </div>

          <div className='z-10'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST2whUe0PoOjsDMBVMtKvkWDevIWbahsnfjg&s" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
