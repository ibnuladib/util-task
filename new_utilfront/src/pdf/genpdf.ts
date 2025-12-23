import jsPDF from "jspdf";

interface Bill{
    units: number;
    ratePerUnit: number;
    base: number;
    vatPercentage: number;
    vatAmount: number;
    serviceCharge: number;
    totalAmount: number;
}

export const generateBillPDF = (bill: Bill) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Utility Bill", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Units: ${bill.units}`, 20, 40);
  doc.text(`Rate per Unit: $${bill.ratePerUnit.toFixed(2)}`, 20, 50);
  doc.text(`Base: $${bill.base.toFixed(2)}`, 20, 60);
  doc.text(`VAT (${bill.vatPercentage}%): $${bill.vatAmount.toFixed(2)}`, 20, 70);
  doc.text(`Service Charge: $${bill.serviceCharge.toFixed(2)}`, 20, 80);
  doc.text(`Total Amount: $${bill.totalAmount.toFixed(2)}`, 20, 90);

  doc.save(`Utility_Bill_${new Date().toISOString()}.pdf`);
};