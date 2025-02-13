/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import QRCode from "qrcode";
import crypto from "crypto";
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface PdfGeneratorProps {
  clientInfo: {
    name: string;
    email: string;
    document: string;
    phone: string;
    expirationDate: string;
  };
  products: Array<{
    code: string;
    name: string;
    value: number;
    quantity: number;
    valueTotal: number;
  }>;
  services: Array<{
    code: string;
    name: string;
    value: number;
    quantity: number;
    valueTotal: number;
  }>;
  seller: string;
  discountPercentage: number;
  budgetTotal: number;
  observation?: string;
}

export const generatePdf = async (data: PdfGeneratorProps) => {
  const doc = new jsPDF();
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;

  // Add company logo
  const logoPath = "/logo.png"; // Logo in the public folder
  doc.addImage(logoPath, "PNG", margin, margin, 50, 20);

  // Generate QR code
  const qrCodeData = `https://www.google.com/${crypto.randomBytes(16).toString("hex")}`;
  const qrCodeDataUrl = await QRCode.toDataURL(qrCodeData);
  doc.addImage(qrCodeDataUrl, "PNG", pageWidth - margin - 39, margin, 40, 40);
  const qrCodeToBase64 = qrCodeDataUrl.split(",")[1];

  // Add client information
  doc.setFontSize(12);

  const clientInfoY = 60;
  // const clientInfoWidth = pageWidth - 2 * margin

  doc.setFont("Roboto", "normal");
  doc.text(`Cliente: ${data.clientInfo.name}`, margin, clientInfoY);
  doc.text(
    `Telefone: ${data.clientInfo.phone}`,
    pageWidth - margin,
    clientInfoY,
    { align: "right" },
  );

  doc.text(`Documento: ${data.clientInfo.document}`, margin, clientInfoY + 5);
  doc.text(
    `Email: ${data.clientInfo.email}`,
    pageWidth - margin,
    clientInfoY + 5,
    { align: "right" },
  );

  doc.text(`Vendedor: ${data.seller}`, margin, clientInfoY + 10);
  doc.text(
    `Validade: ${data.clientInfo.expirationDate}`,
    pageWidth - margin,
    clientInfoY + 10,
    { align: "right" },
  );

  // Add products and services table
  doc.autoTable({
    startY: clientInfoY + 30,
    head: [["Código", "Nome", "Valor (UN)", "Quantidade", "Total"]],
    body: [
      ...data.products.map((product) => [
        product.code,
        product.name,
        product.value.toFixed(2),
        product.quantity,
        product.valueTotal.toFixed(2),
      ]),
      ...data.services.map((service) => [
        service.code,
        service.name,
        service.value.toFixed(2),
        service.quantity,
        service.valueTotal.toFixed(2),
      ]),
    ],
    margin: { left: margin, right: margin },
    columnStyles: {
      0: { halign: "center" },
      1: { halign: "center" },
      2: { halign: "center" },
      3: { halign: "center" },
      4: { halign: "center" },
    },
    headStyles: { halign: "center" },
  });

  // Add total and discount as a table
  doc.autoTable({
    startY: (doc as any).lastAutoTable.finalY + 10,
    head: [["Descrição", "Valor"]],
    body: [
      [
        "Subtotal",
        `R$ ${(data.budgetTotal / (1 - data.discountPercentage / 100)).toFixed(2)}`,
      ],
      ["Desconto", `${data.discountPercentage}%`],
      ["Total", `R$ ${data.budgetTotal.toFixed(2)}`],
    ],
    styles: { fillColor: [255, 255, 255] },
    headStyles: { fillColor: [200, 200, 200], halign: "center" },
    columnStyles: {
      0: { halign: "center" },
      1: { halign: "center" },
    },
    margin: { left: margin, right: margin },
  });

  // Add observation if exists
  if (data.observation) {
    const finalY = (doc as any).lastAutoTable.finalY;
    doc.setDrawColor(0);
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, finalY + 10, pageWidth - 2 * margin, 30, "F");
    doc.setFontSize(12);
    doc.text("Observação:", margin + 5, finalY + 20);
    doc.setFontSize(10);
    doc.text(data.observation, margin + 5, finalY + 30, {
      maxWidth: pageWidth - 2 * margin - 10,
    });
  }

  // Add footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.text("Orçamento gerado por Orçametro LTDA", margin, pageHeight - 10);
  const sha256 = crypto
    .createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");
  doc.text(sha256, pageWidth - margin, pageHeight - 10, { align: "right" });

  return {
    doc,
    qrCodeToBase64,
  };
};
