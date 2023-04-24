export interface IGetDocuments {
  id: string;
  name: string;
  content: string;
  parentId: string;
  favorite: boolean;
  todolistId: string;
  children: IGetDocuments[];
}

export interface IUpdateDocument {
  id: string;
  name?: string;
  content?: string;
  favorite?: boolean;
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
  favorite?: boolean;
  parentId?: string;
  todolistId: string;
}
