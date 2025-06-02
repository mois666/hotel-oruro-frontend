
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
          <Button as="button" variant="solid" className="border-[##9CA3AF] text-[#0a0a0a] hover:bg-[#2563EB] h-16">
            <Link to="/admin/registro">
              <span className="mr-2 text-lg">📝</span>
              <span>Registrar Huésped</span>
            </Link>
          </Button>
          <Button as="button" variant="solid" className="border-[##9CA3AF] text-[#0a0a0a] hover:bg-[#2563EB] h-16">
            <Link to="/admin/habitaciones">
              <span className="mr-2 text-lg">🏨</span>
              <span>Ver Habitaciones</span>
            </Link>
          </Button>
          <Button as="button" variant="solid" className="border-[##9CA3AF] text-[#0a0a0a] hover:bg-[#2563EB] h-16">
            <Link to="/admin/huespedes">
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
