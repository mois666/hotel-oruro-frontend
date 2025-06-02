
import React from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { floor: '1° Piso', occupied: 8, available: 4 },
  { floor: '2° Piso', occupied: 5, available: 7 },
  { floor: '3° Piso', occupied: 3, available: 9 },
];

interface OccupancyChartProps {
  className?: string;
}

const OccupancyChart: React.FC<OccupancyChartProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <h1 className="text-xl font-bold">Ocupación por Piso</h1>
      </CardHeader>
      <CardBody className="pt-0">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray ="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="floor" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="occupied" name="Ocupadas" fill="#3B82F6" />
            <Bar dataKey="available" name="Disponibles" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default OccupancyChart;
