import { DynamicBreadcrumbs } from "../../components";
import ActionButtons from "../../components/dashboard/ActionButtons";
import { StatCard } from "../../components/dashboard/StatCard";
//import { financialMetrics } from "../../data/mockData";
//import { guests } from "../../data/mockData";
//import { rooms } from "../../data/mockData";
import RoomStatusCard from "../../components/dashboard/RoomStatusCard";
import OccupancyChart from "../../components/dashboard/OccupancyChart";
import GuestSummary from "../../components/dashboard/GuestSummary";
import { useEffect, useState } from "react";
import { useAuthStore, useRoomStore } from "../../stores";
import { useClientStore } from "../../stores/clients/clients.store";
import { Spinner } from "@nextui-org/react";
import { format } from "date-fns";
import { RoomStatus } from "../../types";

export const HomeIndex = () => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useAuthStore(state => state.token);
  const guests = useClientStore(state => state.clients);
  const getGuests = useClientStore(state => state.getClients);
  const roomsStore = useRoomStore(state => state.rooms);
  const getRooms = useRoomStore(state => state.getRooms);

  const [financialMetrics, setFinancialMetrics] = useState({
    todayRevenue: 0,
    weekRevenue: 0,
    monthRevenue: 0,
    totalRevenue: 0,
    occupancyRate: 0, // percentage
  });


  const handleFetchGuests = async () => {
    setIsLoading(true);
    await getGuests(token!);
    
    setIsLoading(false);
  }

  const handleFetchRooms = async () => {
    setIsLoading(true);
    await getRooms(token!);
    setIsLoading(false);
  }

  useEffect(() => {
    handleFetchGuests();
    handleFetchRooms();
    

  }, []);

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const week = format(new Date(new Date().setDate(new Date().getDate() - 7)), 'yyyy-MM-dd');
    const month = format(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd');
    const totalRooms = roomsStore.length;
    const statusCounts = {
      [RoomStatus.AVAILABLE]: roomsStore.filter(r => r.status === RoomStatus.AVAILABLE).length,
      [RoomStatus.OCCUPIED]: roomsStore.filter(r => r.status === RoomStatus.OCCUPIED).length,
      [RoomStatus.CLEANING]: roomsStore.filter(r => r.status === RoomStatus.CLEANING).length,
      [RoomStatus.MAINTENANCE]: roomsStore.filter(r => r.status === RoomStatus.MAINTENANCE).length,
    };
    const occupancyRate = Math.round((statusCounts[RoomStatus.OCCUPIED] / totalRooms) * 100);
    setFinancialMetrics({
      todayRevenue: guests.filter(guest => format(guest.checkIn, 'yyyy-MM-dd') === today).reduce((total, guest) => total + guest.total, 0),
      weekRevenue: guests.filter(guest => format(guest.checkIn, 'yyyy-MM-dd') >= week).reduce((total, guest) => total + guest.total, 0),
      monthRevenue: guests.filter(guest => format(guest.checkIn, 'yyyy-MM-dd') >= month).reduce((total, guest) => total + guest.total, 0),
      totalRevenue: guests.reduce((total, guest) => total + guest.total, 0),
      occupancyRate: occupancyRate,
    });
  }, [guests, roomsStore]);

  console.log("guests", guests);

  return (
    <div className="space-y-6">
      <DynamicBreadcrumbs />
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Ingresos del Día"
          value={`${financialMetrics.todayRevenue} Bs`}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Ingresos del Mes"
          value={`${financialMetrics.monthRevenue} Bs`}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard title="Huéspedes Actuales" value={guests.length} />
        <StatCard
          title="Tasa de Ocupación"
          value={`${financialMetrics.occupancyRate}%`}
          trend={{ value: 8, isPositive: true }}
        />
      </div>
      <ActionButtons />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OccupancyChart />
        <RoomStatusCard rooms={roomsStore} />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        <GuestSummary guests={guests} />
      )}
    </div>
  );
};
export default HomeIndex;
