
import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

interface ActionButtonsProps {
  className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardBody className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Button as="button" variant="solid" className="bg-[#2563EB] text-white hover:bg-[#1E40AF] h-16">
            <Link to="/registro">
              <span className="mr-2 text-lg">📝</span>
              <span>Registrar Huésped</span>
            </Link>
          </Button>
          <Button as="button" variant="solid" className="border-[#3B82F6] text-[#3B82F6] hover:bg-[#EFF6FF] h-16">
            <Link to="/habitaciones">
              <span className="mr-2 text-lg">🏨</span>
              <span>Ver Habitaciones</span>
            </Link>
          </Button>
          <Button as="button" variant="solid" className="border-[#9CA3AF] text-[#666666] hover:bg-gray-50 h-16">
            <Link to="/huespedes">
              <span className="mr-2 text-lg">📊</span>
              <span>Ver Reportes</span>
            </Link>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ActionButtons;
