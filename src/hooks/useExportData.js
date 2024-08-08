import * as XLSX from "xlsx";

const useExportData = () => {

  const exportToExcel = (filteredData, name) => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${name}.xlsx`);
  };

  return { exportToExcel }
}
export default useExportData