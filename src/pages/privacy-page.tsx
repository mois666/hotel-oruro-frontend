import { useSettingStore } from "../stores";
import { useEffect } from "react";

export const PrivacyPage = () => {
  const company = useSettingStore(state => state.systemData);
  const getSystemData = useSettingStore(state => state.getSystemData);
  useEffect(() => {
    getSystemData();
  }, []);
  if (!company) return null;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold">Política de privacidad</h1>
      <div className="mt-4">
        <p>
          En <strong>Hotel-Oruro</strong> nos comprometemos a proteger la privacidad de nuestros huéspedes. Esta política explica cómo recopilamos, usamos y protegemos su información personal.
        </p>
  
        <ul className="pl-6 mt-2 list-disc">
          <li>
            <strong>Recopilación de información:</strong> Solo recopilamos la información necesaria para su registro y estadía, como nombre completo, documento de identidad, datos de contacto y detalles de su reserva.
          </li>
          <li>
            <strong>Uso de la información:</strong> La información recopilada se utiliza exclusivamente para gestionar su estadía y mejorar la calidad de nuestros servicios.
          </li>
          <li>
            <strong>Protección de datos:</strong> Tomamos medidas de seguridad para garantizar la confidencialidad y protección de sus datos personales.
          </li>
          <li>
            <strong>Compartir información:</strong> No compartimos su información personal con terceros, excepto cuando sea requerido por ley o por razones de seguridad.
          </li>
          <li>
            <strong>Acceso y actualización:</strong> Usted tiene derecho a solicitar acceso o actualización de su información personal durante su estancia.
          </li>
        </ul>
  
        <p className="mt-4">
          Al registrarse y utilizar nuestros servicios, usted acepta esta política de privacidad. Si tiene preguntas o inquietudes, por favor contáctenos en la recepción.
        </p>
      </div>
    </div>
  );
  
}

