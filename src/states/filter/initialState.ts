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
  currentStatus: 0,
  currentPriority: 'default',
  currentType: '',
  currentAssignee: 'default',
  filterTasks: [],
  nameFilter: ''
};

export default initialState;
