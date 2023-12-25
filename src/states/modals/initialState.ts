import {IInitialState} from './types';


export const isOpenModal = {
  createDocument: false,
  updateDocument: false,
  createList: false,
  createTask: false,
  deleteTask: false,
  deleteList: false,
  settings: false,
  shareList: false,
  shareTask: false,
  updateUser: false,
  updateTask: false,
  testModal: false
};

const initialState: IInitialState = {
  selectedTask: undefined,
  selectedTodolist: undefined,
  selectedStatusId: undefined,
  isOpenModal
};

export default initialState;
