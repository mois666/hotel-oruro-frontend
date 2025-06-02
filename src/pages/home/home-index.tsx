import { DynamicBreadcrumbs } from "../../components";
import ActionButtons from "../../components/dashboard/ActionButtons";
import { StatCard } from "../../components/dashboard/StatCard";
import { financialMetrics } from "../../data/mockData";
import { guests } from "../../data/mockData";
import { rooms } from "../../data/mockData";
import RoomStatusCard from "../../components/dashboard/RoomStatusCard";
import OccupancyChart from "../../components/dashboard/OccupancyChart";
import GuestSummary from "../../components/dashboard/GuestSummary";

export const HomeIndex = () => {
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
        <RoomStatusCard rooms={rooms} />
      </div>
      <GuestSummary guests={guests} />
    </div>
  );
};
export default HomeIndex;
