import jsPDF from 'jspdf';
import { read, utils } from 'xlsx';

export interface ExportOptions {
  filename: string;
  sheetName?: string;
}

export class ExportService {
  static exportToCSV<T extends Record<string, any>>(
    data: T[],
    options: ExportOptions
  ): void {
    const headers = Object.keys(data[0] || {});
    const csv = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          if (value === null || value === undefined) return '';
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          }
          return value;
        }).join(',')
      ),
    ].join('\n');

    this.downloadFile(csv, `${options.filename}.csv`, 'text/csv');
  }

  static exportToExcel<T extends Record<string, any>>(
    data: T[],
    options: ExportOptions
  ): void {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, options.sheetName || 'Sheet1');
    utils.writeFile(workbook, `${options.filename}.xlsx`);
  }

  static exportToPDF(
    data: { title: string; content: string },
    options: ExportOptions
  ): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFontSize(16);
    doc.text(data.title, pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(11);
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;

    const textLines = doc.splitTextToSize(data.content, maxWidth);
    doc.text(textLines, margin, 40);

    doc.save(`${options.filename}.pdf`);
  }

  private static downloadFile(
    content: string,
    filename: string,
    type: string
  ): void {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
