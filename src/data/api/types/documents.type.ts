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
