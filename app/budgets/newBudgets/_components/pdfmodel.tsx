/* eslint-disable @typescript-eslint/no-explicit-any */

import { jsPDF } from "jspdf";
import "jspdf-autotable";

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
  discountPercentage: number;
  budgetTotal: number;
  observation?: string;
}

export const generatePdf = (data: PdfGeneratorProps) => {
  const doc = new jsPDF();

  // Add client information
  doc.setFontSize(18);
  doc.text("Orçamento", 14, 22);
  doc.setFontSize(12);
  doc.text(`Cliente: ${data.clientInfo.name}`, 14, 30);
  doc.text(`Email: ${data.clientInfo.email}`, 14, 38);
  doc.text(`CPF: ${data.clientInfo.document}`, 14, 46);
  doc.text(`Telefone: ${data.clientInfo.phone}`, 14, 54);

  // Add products table
  doc.autoTable({
    startY: 70,
    head: [["Código", "Nome", "Valor (UN)", "Quantidade", "Total"]],
    body: data.products.map((product) => [
      product.name,
      product.value.toFixed(2),
      product.quantity,
      product.valueTotal.toFixed(2),
    ]),
  });

  // Add services table
  const servicesStartY = (doc as any).lastAutoTable.finalY + 10;
  doc.autoTable({
    startY: servicesStartY,
    head: [["Código", "Nome", "Valor (UN)", "Quantidade", "Total"]],
    body: data.services.map((service) => [
      service.code,
      service.name,
      service.value.toFixed(2),
      service.quantity,
      service.valueTotal.toFixed(2),
    ]),
  });

  // Add total and discount
  const totalStartY = (doc as any).lastAutoTable.finalY + 10;
  doc.text(`Desconto: ${data.discountPercentage}%`, 14, totalStartY);
  doc.text(`Total: R$ ${data.budgetTotal.toFixed(2)}`, 14, totalStartY + 8);

  // Add observation if exists
  if (data.observation) {
    doc.text("Observação:", 14, totalStartY + 16);
    doc.text(data.observation, 14, totalStartY + 24);
  }

  return doc;
};
