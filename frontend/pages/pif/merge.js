const { PDFDocument, PDFName, PDFArray } = require('pdf-lib');
const fs = require('fs');

async function mergePDFs(filePaths) {
  const mergedPdf = await PDFDocument.create();

  for (const filePath of filePaths) {
    const pdfBytes = await fs.promises.readFile(filePath);
    const pdf = await PDFDocument.load(pdfBytes);

    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  await fs.promises.writeFile('merged.pdf', mergedPdfBytes);
}

// List of PDF file paths to merge
const filePaths = ['file1.pdf', 'file2.pdf', 'file3.pdf'];

// Call the function to merge PDFs
mergePDFs(filePaths)
  .then(() => console.log('PDFs merged successfully'))
  .catch((error) => console.error('Error merging PDFs:', error));
