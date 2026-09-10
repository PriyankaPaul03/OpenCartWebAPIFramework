
import * as XLSX from 'xlsx';

export class ExcelHelper{

    static readExcel(filepath:string, sheetname?:string): Record<string, string>[]{

        const workbook = XLSX.readFile(filepath);
        const worksheet = workbook.Sheets[ sheetname || workbook.SheetNames[0]];
        return XLSX.utils.sheet_to_json<Record<string, string>>(worksheet);

    }

}