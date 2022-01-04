export interface PageModel {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface NewsModel {
  id: number;
  messageName: string;
  url?: string;
  createdAt: string;
  createdByDeptName: string;
}
