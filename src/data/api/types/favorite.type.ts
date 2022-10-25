export interface IFavoriteCreate {
  todolistId: string;
}
export interface IFavoriteUpdate extends IFavoriteCreate {
  isActive: boolean;
}
export interface IFavoriteResponse extends IFavoriteUpdate {
  userId: string;
}
