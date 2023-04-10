export interface IGetDocuments {
  id: string;
  name: string;
  content: string;
  favorite: boolean;
  parentId: string;
  todolistId: string;
  children: IGetDocuments[];
}

export interface IUpdateDocument {
  id: string;
  name: string;
  content: string;
  favorite: boolean;
}
export interface IDocumentCreate {
  name: string;
  content?: string;
  favorite?: boolean;
  parentId?: string;
  todolistId: string;
}
export interface IDocumentResponse {
  id: string;
  name: string;
  content?: string;
  favorite?: boolean;
  parentId?: string;
  todolistId: string;
}
