export interface Tab {
	path: string;
	tabName?: string;
	fullPath?: string;
	defaultTab?: string;
	children?: {[name: string]: Tab};
	title?: string;
	logoPath?: string;
}

export interface ExcelResponse {
	range: string;
	majorDimension: string;
	values: string[][];
}
