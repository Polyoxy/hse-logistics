export interface Document {
  id: string;
  userId: string;
  name: string;
  type: string;
  size: number;
  url: string;
  createdAt: Date | { toDate: () => Date };
}
