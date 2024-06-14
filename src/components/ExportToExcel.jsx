import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const ExportToExcel = ({ data, fileName }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, `${fileName}.xlsx`);
  };

  return (
    <button className='px-10 py-1 border rounded bg-green-500 text-white' onClick={exportToExcel}>
      Export to Excel
    </button>
  );
};

export default ExportToExcel;
