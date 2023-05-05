import {IInitialState} from './types';

const initialState: IInitialState = {
  statusFilterInList: 0,
  statusFilterInMytask: [],
  priorityFilterInList: '',
  priorityFilterInMytask: [],
  featureFilterInList: false,
  featureFilterInMytask: [],
  assigneeFilterInList: '',
  assigneeFilterInMytask: [],
  filterTasks: []
};

export default initialState;
