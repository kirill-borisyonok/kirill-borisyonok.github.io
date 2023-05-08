import { ExcelResponse } from '@tattoo-manager/shared/interfaces/common.interfaces';

export class GoogleSheetMapper {
  public static getExcelDataMap(data: ExcelResponse): Record<string, string>[] {
    const titles = data.values[0];
    return data.values.map((item) =>
      titles.reduce((acc, el, index) => ({ ...acc, [el]: item[index] }), {})
    );
  }
}
