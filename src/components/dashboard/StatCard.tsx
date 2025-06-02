
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <h1 className="text-lg font-medium">{title}</h1>
        {icon && <div className="w-4 h-4">{icon}</div>}
      </CardHeader>
      <CardBody>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="mt-1 text-xs">{description}</p>}
        {trend && (
          <div className="flex items-center mt-1">
            <span
              className={`text-xs ${
                trend.isPositive ? 'text-success' : 'text-danger'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </span>
            <span className="ml-1">del mes anterior</span>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
