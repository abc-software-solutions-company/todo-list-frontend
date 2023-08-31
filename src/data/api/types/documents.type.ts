export interface IUpdateDocument {
  id: string;
  name?: string;
  content?: string;
  favorite?: number;
  isActive?: boolean;
}

export interface IDocumentCreate {
  name: string;
  content?: string;
  parentId?: string;
  todolistId: string;
}
export interface IDocumentAttribute {
  id: string;
  name: string;
  content?: string;
  favorite: number;
  todolistId: string;
  parentId: string;
  children?: IDocumentAttribute[];
}
