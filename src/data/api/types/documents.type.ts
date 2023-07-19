export interface IDocumentAttribute {
  id: string;
  name: string;
  content: string;
  parentId: string;
  isActive?: boolean;
  favorite: boolean;
  todolistId: string;
  children: IDocumentAttribute[];
}
export type IUpdateDocument = Omit<IDocumentAttribute, 'id' | 'parentId' | 'todolistId' | 'children'>;
export type IDocumentCreate = Omit<IDocumentAttribute, 'id' | 'isActive' | 'favorite' | 'children'>;
// export interface IUpdateDocument {
//   id: string;
//   name?: string;
//   content?: string;
//   favorite?: boolean;
//   isActive?: boolean;
// }

// export interface IDocumentCreate {
//   name: string;
//   content?: string;
//   parentId?: string;
//   todolistId: string;
// }
// export interface IDocumentAttribute {
//   id: string;
//   name: string;
//   content?: string;
//   favorite?: boolean;
//   parentId?: string;
//   todolistId: string;
// }
