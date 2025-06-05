import { useParams } from "react-router-dom";
import { useAuthStore, useClientStore } from "../../stores";
import { useEffect } from "react";

export const ViewGuest = () => {
    const { id } = useParams();
    const token = useAuthStore((state) => state.token);

    const client = useClientStore((state) => state.client);
    const getClient = useClientStore((state) => state.getClient);
    
    useEffect(() => {
        if (id) {
            getClient(Number(id), token!);
        }
    }, [id]);
    
    
    return (
        <div>
            <h1>Detalle de huésped</h1>
            <p>{client.name}</p>
            <p>{client.lastName}</p>
            <p>{client.email}</p>
            <p>{client.phone}</p>
            <p>{client.address}</p>
            <p>{client.city}</p>
            <p>{client.state}</p>
            <p>{client.zipCode}</p>
            <p>{client.country}</p>
            <p>{client.companyId}</p>
            
        </div>
    );
}