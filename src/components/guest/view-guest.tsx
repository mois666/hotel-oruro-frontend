import { useParams } from "react-router-dom";
import { useAuthStore, useClientStore } from "../../stores";
import { useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { Button } from "@nextui-org/react";
import { DynamicBreadcrumbs } from "../ui/dynamic-breadcrumbs";

export const ViewGuest = () => {
    const { id } = useParams();
    const token = useAuthStore((state) => state.token);

    const data = useClientStore((state) => state.client);
    const getClient = useClientStore((state) => state.getClient);

    useEffect(() => {
        if (id) {
            getClient(Number(id), token!);
        }
    }, [id]);


    const receiptRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = () => {
        html2canvas(receiptRef.current as HTMLElement).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("recibo_hotel_oruro.pdf");
        });
    };
    const handlePrint = () => {
        window.print();
    };

    console.log(data);

    return (
        <div className="flex flex-col">
            <DynamicBreadcrumbs />
            <div className="flex gap-4 mb-4">
                <Button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onPress={handlePrint}
                >
                    Imprimir Recibo
                </Button>


                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={handleDownloadPDF}
                >
                    Descargar PDF
                </button>
            </div>

            {/* Recibo */}
            <div
                ref={receiptRef}
                className="border p-6 shadow-md w-full max-w-lg bg-white"
            >
                <h2 className="text-center text-2xl font-bold mb-4">
                    Hotel Oruro - Recibo de Administración
                </h2>
                <div className="mb-2">
                    <strong>Nombre:</strong> {data.name} {data.last_name}
                </div>
                <div className="mb-2">
                    <strong>CI:</strong> {data.ci}
                </div>
                <div className="mb-2">
                    <strong>Teléfono:</strong> {data.phone}
                </div>
                {/* <div className="mb-2">
                    <strong>Habitación:</strong> {'# '+data.number}
                </div>
                <div className="mb-2">
                    <strong>Tipo de Habitación:</strong> {data.type}
                </div> */}
                <div className="mb-2">
                    <strong>Fecha de Ingreso:</strong> {data.start_date}
                </div>
                <div className="mb-2">
                    <strong>Fecha de Salida:</strong> {data.end_date}
                </div>
                <div className="mb-2">
                    <strong>Descuento:</strong> {data.discount} Bs
                </div>
                <div className="mb-2">
                    <strong>Total:</strong> {data.total} Bs
                </div>
                <div className="text-center mt-4">
                    <em>¡Gracias por su preferencia!</em>
                </div>
            </div>

        </div>
    );
}