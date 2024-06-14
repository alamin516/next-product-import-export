import { useState } from 'react';
import * as XLSX from 'xlsx';

const ImportFromExcel = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImportClick = () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      try {
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        console.log('Parsed data:', data);
        onFileUpload(data);
      } catch (error) {
        console.error('Error parsing file:', error);
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="border px-4 py-2">
      <div className="flex space-x-4 items-center">
        <label className="inline-block bg-blue-500 text-white px-4 py-2 cursor-pointer rounded">
          Select File
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <button
          onClick={handleImportClick}
          className={`bg-green-500 text-white px-4 py-2 rounded`}
          disabled={!file}
        >
          Import Data
        </button>
      </div>
    </div>
  );
};

export default ImportFromExcel;
