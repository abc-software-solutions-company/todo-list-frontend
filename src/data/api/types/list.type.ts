// Type for request payload data

export interface IListCreate {
  name: string;
}

export interface IList extends IListCreate {
  id: string;
  userId: string;
  isActive: boolean;
}

export interface IListUpdate {
  id: string;
  name?: string;
  isActive?: boolean;
  isDone?: boolean;
}

// Type for response data

export type IListCreateResponse = IList;

export interface IListUpdateResponse extends IList {
  isDone: boolean;
}
