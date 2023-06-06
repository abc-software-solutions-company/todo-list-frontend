import {useDispatch, useSelector} from 'react-redux';

import {ITaskResponse} from '@/data/api/types/task.type';
import {Priorities} from '@/utils/constant';

import {RootState} from '../store';
import useTodolist from '../todolist/use-todolist';
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
    filterTasks,
    nameFilter
  } = filterState;
  const {actions} = filterSlice;
  const {statusList} = useTodolist();
  const dispatch = useDispatch();
  const setStatusFilterInList = (value: number) => dispatch(actions.setStatusFilterInList(value));
  const setCurrentStatus = (value: number) => dispatch(actions.setCurrentStatus(value));
  const setStatusFilterInMyTask = (value: number[]) => dispatch(actions.setStatusFilterInMyTask(value));
  const setCurrentPriority = (value: string) => dispatch(actions.setCurrentPriority(value));
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
    const revStatusList = Object.values(statusList).reverse();
    const prioritiesList = Object.values(Priorities).reverse();
    const prioritieValue = prioritiesList.includes(priorityFilterInList) ? priorityFilterInList : '';

    return filterList?.filter(e => {
      if (!isKanban) {
        if (assigneeFilterInList == 'Unassigned' && statusFilterInList == 0 && prioritieValue)
          return e.assignees.length == 0 && e.priority == prioritieValue && !(e.statusId == revStatusList[0].id);
        if (assigneeFilterInList != 'default' && statusFilterInList == 0 && prioritieValue)
          return (
            e.assignees[0]?.userId == assigneeFilterInList &&
            e.priority == prioritieValue &&
            !(e.statusId == revStatusList[0].id)
          );
        if (assigneeFilterInList == 'Unassigned' && statusFilterInList == 0)
          return e.assignees.length == 0 && !(e.statusId == revStatusList[0].id);
        if (assigneeFilterInList != 'default' && statusFilterInList == 0)
          return e.assignees[0]?.userId == assigneeFilterInList && !(e.statusId == revStatusList[0].id);
        if (prioritieValue && statusFilterInList == 0)
          return e.priority == prioritieValue && !(e.statusId == revStatusList[0].id);
        if (assigneeFilterInList == 'Unassigned' && statusFilterInList && prioritieValue)
          return e.assignees.length == 0 && e.statusId == statusFilterInList && e.priority == prioritieValue;
        if (assigneeFilterInList != 'default' && statusFilterInList && prioritieValue)
          return (
            e.assignees[0]?.userId == assigneeFilterInList &&
            e.statusId == statusFilterInList &&
            e.priority == prioritieValue
          );
        if (assigneeFilterInList == 'Unassigned' && prioritieValue)
          return e.assignees.length == 0 && e.priority == prioritieValue;
        if (prioritieValue && assigneeFilterInList != 'default')
          return e.priority == prioritieValue && e.assignees[0]?.userId == assigneeFilterInList;
        if (assigneeFilterInList == 'Unassigned' && statusFilterInList)
          return e.assignees.length == 0 && e.statusId == statusFilterInList;
        if (assigneeFilterInList != 'default' && statusFilterInList)
          return e.assignees[0]?.userId == assigneeFilterInList && e.statusId == statusFilterInList;
        if (prioritieValue && statusFilterInList)
          return e.priority == prioritieValue && e.statusId == statusFilterInList;
        if (prioritieValue) return e.priority == prioritieValue;
        if (statusFilterInList) return e.statusId == statusFilterInList;
        if (assigneeFilterInList == 'Unassigned') {
          return e.assignees.length == 0;
        } else if (assigneeFilterInList != 'default') {
          return e.assignees[0]?.userId == assigneeFilterInList;
        }
        return !(e.statusId == revStatusList[0].id);
      } else {
        if (assigneeFilterInList == 'Unassigned' && statusFilterInList && prioritieValue)
          return e.assignees.length == 0 && e.statusId == statusFilterInList && e.priority == prioritieValue;
        if (assigneeFilterInList != 'default' && statusFilterInList && prioritieValue)
          return (
            e.assignees[0]?.userId == assigneeFilterInList &&
            e.statusId == statusFilterInList &&
            e.priority == prioritieValue
          );
        if (assigneeFilterInList == 'Unassigned' && prioritieValue)
          return e.assignees.length == 0 && e.priority == prioritieValue;
        if (prioritieValue && assigneeFilterInList != 'default')
          return e.priority == prioritieValue && e.assignees[0]?.userId == assigneeFilterInList;
        if (assigneeFilterInList == 'Unassigned' && statusFilterInList)
          return e.assignees.length == 0 && e.statusId == statusFilterInList;
        if (assigneeFilterInList != 'default' && statusFilterInList)
          return e.assignees[0]?.userId == assigneeFilterInList && e.statusId == statusFilterInList;
        if (prioritieValue && statusFilterInList)
          return e.priority == prioritieValue && e.statusId == statusFilterInList;
        if (prioritieValue) return e.priority == prioritieValue;
        if (statusFilterInList) return e.statusId == statusFilterInList;
        if (assigneeFilterInList == 'Unassigned') {
          return e.assignees.length == 0;
        } else if (assigneeFilterInList != 'default') {
          return e.assignees[0]?.userId == assigneeFilterInList;
        }
        return e;
      }
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
    getFilterdTasks,
    getFilterTaskByName,
    setNameFilterTask,
    nameFilter
  };
}
