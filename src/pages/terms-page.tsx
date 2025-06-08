import { useSettingStore } from "../stores";

import { useEffect } from "react";

export const TermsPage = () => {
  const company = useSettingStore(state => state.systemData);
  const getSystemData = useSettingStore(state => state.getSystemData);
  useEffect(() => {
    getSystemData();
  }, []);
  if (!company) return null;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold">Términos y condiciones</h1>
      <div className="mt-4">
      <p>
        Bienvenido al <strong>Hotel-Oruro</strong>. Al registrarse y ocupar una habitación, usted acepta los siguientes términos y condiciones:
      </p>
      <ul className="pl-6 mt-2 list-disc">
        <li>
          El hotel ofrece tres tipos de habitaciones:
          <ul className="pl-6 list-disc">
            <li><strong>Simple:</strong> Ideal para una sola persona.</li>
            <li><strong>Doble:</strong> Perfecta para dos personas.</li>
            <li><strong>Suit:</strong> Espacio amplio con comodidades adicionales.</li>
          </ul>
        </li>
        <li>
          Las habitaciones tienen cuatro estados posibles:
          <ul className="pl-6 list-disc">
            <li><strong>Disponible:</strong> Lista para ser ocupada.</li>
            <li><strong>Ocupado:</strong> Actualmente en uso por un huésped.</li>
            <li><strong>Limpieza:</strong> En proceso de limpieza antes de ser asignada.</li>
            <li><strong>Mantenimiento:</strong> En reparación o revisión.</li>
          </ul>
        </li>
        <li>El registro de huéspedes se realiza en la recepción. El huésped debe proporcionar información veraz y completa.</li>
        <li>La habitación solo debe ser ocupada por la persona o personas registradas.</li>
        <li>El huésped debe respetar el mobiliario y las instalaciones del hotel durante su estancia.</li>
        <li>El hotel no se hace responsable de objetos personales no declarados al momento del registro.</li>
        <li>Al finalizar la estancia, la habitación debe ser desocupada y devuelta en buen estado.</li>
      </ul>
      <p className="mt-4">
        Gracias por elegirnos. Si tiene alguna pregunta, consulte con nuestro personal de recepción.
      </p>
    </div>
    </div>
  );
}