import {useDispatch, useSelector} from 'react-redux';

import {ITaskResponse} from '@/data/api/types/task.type';
import {Priorities} from '@/utils/constant';

import {RootState} from '../store';
import filterSlice from './slice';

export default function useFilter() {
  const filterState = useSelector((root: RootState) => root.filter);
  const {
    statusFilterInList,
    statusFilterInMytask,
    priorityFilterInList,
    priorityFilterInMytask,
    featureFilterInList,
    featureFilterInMytask,
    assigneeFilterInList,
    assigneeFilterInMytask,
    currentAssignee,
    currentPriority,
    currentStatus,
    currentType,
    filterTasks,
    nameFilter
  } = filterState;
  const {actions} = filterSlice;
  const dispatch = useDispatch();
  const setStatusFilterInList = (value: number) => dispatch(actions.setStatusFilterInList(value));
  const setCurrentStatus = (value: number) => dispatch(actions.setCurrentStatus(value));
  const setStatusFilterInMyTask = (value: number[]) => dispatch(actions.setStatusFilterInMyTask(value));
  const setCurrentPriority = (value: string) => dispatch(actions.setCurrentPriority(value));
  const setCurrentType = (value: string) => dispatch(actions.setCurrentType(value));
  const setPriorityFilterInList = (value: string) => dispatch(actions.setPriorityFilterInList(value));
  const setPriorityFilterInMyTask = (value: string[]) => dispatch(actions.setPriorityFilterInMyTask(value));
  const setCurrentAssignee = (value: string) => dispatch(actions.setCurrentAssignee(value));
  const setAssigneeFilterInList = (value: string) => dispatch(actions.setAssigneeFilterInList(value));
  const setAssigneeFilterInMyTask = (value: string[]) => dispatch(actions.setAssigneeFilterInMyTask(value));
  const setFeatureFilterInList = (value: boolean | undefined | string) =>
    dispatch(actions.setFeatureFilterInList(value));
  const setFeatureFilterInMyTask = (value: boolean[] | undefined | string) =>
    dispatch(actions.setFeatureFilterInMyTask(value));
  const setFilterTasks = (value: ITaskResponse[]) => dispatch(actions.setFilterTasks(value));
  const getFilterdTasks = (filterList: ITaskResponse[], isKanban: boolean) => {
    const prioritiesList = Object.values(Priorities).reverse();
    const prioritieValue = prioritiesList.includes(priorityFilterInList) ? priorityFilterInList : '';

    return filterList?.filter(task => {
      const checkType = task.type === currentType;
      const checkStatus = task.statusId == statusFilterInList;
      const checkPriority = task.priority == prioritieValue;
      const checkUnassigned = task.assignees.length == 0;
      const checkAssigned = task.assignees[0]?.userId == assigneeFilterInList;

      if (!isKanban) {
        // list
        // four conditions
        if (currentType && statusFilterInList && prioritieValue && assigneeFilterInList == 'Unassigned') {
          return checkType && checkStatus && checkPriority && checkUnassigned;
        }

        if (currentType && statusFilterInList && prioritieValue && assigneeFilterInList !== 'default') {
          return checkType && checkStatus && checkPriority && checkAssigned;
        }

        // thress conditions
        if (currentType && statusFilterInList && prioritieValue) {
          return checkType && checkStatus && checkPriority;
        }
        if (currentType && statusFilterInList && assigneeFilterInList == 'Unassigned') {
          return checkType && checkStatus && checkUnassigned;
        }
        if (currentType && statusFilterInList && assigneeFilterInList !== 'default') {
          return checkType && checkStatus && checkAssigned;
        }

        if (statusFilterInList && prioritieValue && assigneeFilterInList == 'Unassigned') {
          return checkStatus && checkPriority && checkUnassigned;
        }
        if (statusFilterInList && prioritieValue && assigneeFilterInList !== 'default') {
          return checkStatus && checkPriority && checkAssigned;
        }

        // two conditions
        if (currentType && statusFilterInList) return checkType && checkStatus;
        if (currentType && prioritieValue) return checkType && checkPriority;
        if (currentType && assigneeFilterInList == 'Unassigned') return checkType && checkUnassigned;
        if (currentType && assigneeFilterInList !== 'default') return checkType && checkAssigned;

        if (statusFilterInList && prioritieValue) return checkStatus && checkPriority;
        if (statusFilterInList && assigneeFilterInList == 'Unassigned') return checkStatus && checkUnassigned;
        if (statusFilterInList && assigneeFilterInList !== 'default') return checkStatus && checkAssigned;

        if (prioritieValue && assigneeFilterInList == 'Unassigned') return checkPriority && checkUnassigned;
        if (prioritieValue && assigneeFilterInList !== 'default') return checkPriority && checkAssigned;

        // one condition
        if (currentType) return checkType;
        if (statusFilterInList) return checkStatus;
        if (prioritieValue) return checkPriority;
        if (assigneeFilterInList == 'Unassigned') return checkUnassigned;
        if (assigneeFilterInList !== 'default') return checkAssigned;
      } else {
        // thress conditions
        if (currentType && prioritieValue && assigneeFilterInList == 'Unassigned') {
          return checkType && checkPriority && checkUnassigned;
        }
        if (currentType && prioritieValue && assigneeFilterInList !== 'default') {
          return checkType && checkPriority && checkAssigned;
        }

        // two conditions
        if (currentType && prioritieValue) return checkType && checkPriority;
        if (currentType && assigneeFilterInList == 'Unassigned') return checkType && checkUnassigned;
        if (currentType && assigneeFilterInList !== 'default') return checkType && checkAssigned;

        if (prioritieValue && assigneeFilterInList == 'Unassigned') return checkPriority && checkUnassigned;
        if (prioritieValue && assigneeFilterInList !== 'default') return checkPriority && checkAssigned;

        // only one condition
        if (currentType) return checkType;
        if (prioritieValue) return checkPriority;
        if (assigneeFilterInList == 'Unassigned') return checkUnassigned;
        if (assigneeFilterInList !== 'default') return checkAssigned;
      }

      return true;
    });
  };
  const getFilterTaskByName = () => dispatch(actions.getFilterTaskByName());
  const setNameFilterTask = (value: string) => dispatch(actions.setNameFilterTask(value));

  return {
    statusFilterInList,
    statusFilterInMytask,
    setStatusFilterInList,
    setStatusFilterInMyTask,
    setCurrentPriority,
    setCurrentStatus,
    setCurrentAssignee,
    setCurrentType,
    priorityFilterInList,
    priorityFilterInMytask,
    setPriorityFilterInList,
    setPriorityFilterInMyTask,
    setFeatureFilterInList,
    setFeatureFilterInMyTask,
    featureFilterInList,
    featureFilterInMytask,
    setAssigneeFilterInList,
    setAssigneeFilterInMyTask,
    assigneeFilterInList,
    assigneeFilterInMytask,
    filterTasks,
    setFilterTasks,
    currentAssignee,
    currentPriority,
    currentStatus,
    currentType,
    getFilterdTasks,
    getFilterTaskByName,
    setNameFilterTask,
    nameFilter
  };
}
