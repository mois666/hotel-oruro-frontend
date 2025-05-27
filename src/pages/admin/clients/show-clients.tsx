import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DynamicBreadcrumbs } from "../../../components";
import { useAuthStore, useClientStore } from "../../../stores";
export const ShowClients = () => {
    const { id } = useParams();
    const token = useAuthStore(state => state.token);
    const client = useClientStore(state => state.client);
    const getClient = useClientStore(state => state.getClient);

    const handleGetClient = () => {
        if (id && token) {
            getClient(Number(id), token);
        }
    }

    useEffect(() => {
        handleGetClient();
    }, []);

    

    return (
        <div className="my-2 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <DynamicBreadcrumbs />
            <div className="flex flex-col">
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">ID: </h3>
                    <p>{client?.id}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">CI/NIT: </h3>
                    <p>{client?.cinit}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Nombre: </h3>
                    <p>{client?.name}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Correo: </h3>
                    <p>{client?.email}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Teléfono: </h3>
                    <p>{client?.phone}</p>
                </div>  
                <div className="flex flex-wrap gap-2">
                    <h3 className="text-lg font-medium">Dirección: </h3>
                    <p>{client?.address}</p>
                </div>
                
            </div>

        </div>
    )
}
