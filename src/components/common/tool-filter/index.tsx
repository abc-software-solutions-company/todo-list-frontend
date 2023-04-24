/* eslint-disable @typescript-eslint/no-unused-expressions */
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import {
  Collapse,
  FormControl,
  FormControlLabel,
  List,
  ListItemButton,
  MenuItem,
  RadioGroup,
  Select,
  SelectChangeEvent
} from '@mui/material';
import classNames from 'classnames';
import {FC, useState} from 'react';

import Icon from '@/core-ui/icon';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import useMemberOptions from '@/hooks/useMemberOptions';
import useFilter from '@/states/filter/use-filter';
import useTodolist from '@/states/todolist/use-todolist';
import {Priorities, PriorityColors, PriorityIcons} from '@/utils/constant';

import AssigneeIcon from '../assignee-icon';
import BpRadio from '../mui-custom-radio-button';
import style from './style.module.scss';

interface IProps {
  className?: string;
  todolist?: ITodolistResponse;
  myTasks?: ITodolistResponse[];
}

interface StatusIprops {
  id: number;
  name: string;
  color: string;
  backgroundColor: string;
}

const status: StatusIprops[] = [
  {id: 1, name: 'Backlog', color: '#78716C', backgroundColor: '#D6D3D1'},
  {id: 2, name: 'To-Do', color: '#0EA5E9', backgroundColor: '#BAE6FD'},
  {id: 3, name: 'In-progress', color: '#F59E0B', backgroundColor: '#FEF3C7'},
  {id: 4, name: 'In-review', color: '#F43F5E', backgroundColor: '#FBCFE8'},
  {id: 5, name: 'In-QA', color: '#8B5CF6', backgroundColor: '#DDD6FE'},
  {id: 6, name: 'Done', color: '#22C55E', backgroundColor: '#BBF7D0'}
];

const ToolFilter: FC<IProps> = ({className, todolist, myTasks}) => {
  const {setStatusFilterInList, setStatusFilterInMyTask, setPriorityFilterInList, setAssigneeFilterInList} =
    useFilter();
  const [selectStatus, setSelectStatus] = useState<number>(0);
  const [selectPriority, setSelectPriority] = useState<string>('default');
  const [selectAssignee, setSelectAssignee] = useState<string>('default');
  const [openStatus, setOpenStatus] = useState(false);
  const [openAssignee, setOpenAssignee] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  // const [isFeature, setIsFeature] = useState<any>(false);
  // const {write: isWrite} = useTodolist();
  const {todolist: todoList} = useTodolist();
  const prioList = Object.values(Priorities).reverse();
  const prioColors = Object.values(PriorityColors).reverse();
  const prioIcons = Object.values(PriorityIcons).reverse();

  const temp0: {id: number[]; backgroundColor: string; color: string} = {
    id: [],
    color: '#78716C',
    backgroundColor: '#D6D3D1'
  };
  const temp1: {id: number[]; backgroundColor: string; color: string} = {
    id: [],
    color: '#0EA5E9',
    backgroundColor: '#BAE6FD'
  };
  const temp2: {id: number[]; backgroundColor: string; color: string} = {
    id: [],
    color: '#F59E0B',
    backgroundColor: '#FEF3C7'
  };
  const temp3: {id: number[]; backgroundColor: string; color: string} = {
    id: [],
    color: '#F43F5E',
    backgroundColor: '#FBCFE8'
  };
  const temp4: {id: number[]; backgroundColor: string; color: string} = {
    id: [],
    color: '#8B5CF6',
    backgroundColor: '#DDD6FE'
  };
  const temp5: {id: number[]; backgroundColor: string; color: string} = {
    id: [],
    color: '#22C55E',
    backgroundColor: '#BBF7D0'
  };

  if (myTasks) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    myTasks.forEach(todolist => {
      todolist?.status.forEach(e => {
        const {id, color} = e;
        switch (color) {
          case '#78716C':
            temp0.id.push(id);
            break;
          case '#0EA5E9':
            temp1.id.push(id);
            break;
          case '#F59E0B':
            temp2.id.push(id);
            break;
          case '#F43F5E':
            temp3.id.push(id);
            break;
          case '#8B5CF6':
            temp4.id.push(id);
            break;
          case '#22C55E':
            temp5.id.push(id);
            break;
          default:
            break;
        }
      });
    });
  }
  const assignees: {id: string; name: string; email?: string}[] = [];
  const myTasksStatus: {id: number[]; color: string; backgroundColor: string}[] = [];
  myTasksStatus.push(temp0, temp1, temp2, temp3, temp4, temp5);

  const onOpenPriority = () => {
    setOpenPriority(!openPriority);
  };

  const onOpenStatus = () => {
    setOpenStatus(!openStatus);
  };

  const onOpenAssignee = () => {
    setOpenAssignee(!openAssignee);
  };

  const onChangeStatus = (e: SelectChangeEvent<number>) => {
    const statusNumber = Number(e.target.value);
    setSelectStatus(statusNumber);
    let temp;
    if (todolist) {
      temp = (todolist.status[statusNumber - 1] && todolist.status[statusNumber - 1].id) || 0;
      setStatusFilterInList(temp);
    }

    if (myTasks) {
      temp = (myTasksStatus[statusNumber - 1] && myTasksStatus[statusNumber - 1].id) || [];
      setStatusFilterInMyTask(temp);
    }
  };

  const onChangePriority = (e: SelectChangeEvent<unknown>) => {
    const priorityValue = String(e.target.value);
    setSelectPriority(priorityValue);
    if (todolist) {
      setPriorityFilterInList(priorityValue);
    }
    if (myTasks) {
      setPriorityFilterInList(priorityValue);
    }
  };

  const onChangeAssignee = (e: SelectChangeEvent<unknown>) => {
    const assigneeValue = String(e.target.value);
    setSelectAssignee(assigneeValue);
    if (todolist) {
      setAssigneeFilterInList(assigneeValue);
    }
    if (myTasks) {
      setAssigneeFilterInList(assigneeValue);
    }
  };

  const onReset = () => {
    setSelectStatus(0);
    setSelectPriority('default');
    setSelectAssignee('default');
    setStatusFilterInList(0);
    setPriorityFilterInList('');
    setAssigneeFilterInList('default');
    setOpenAssignee(false);
    setOpenPriority(false);
    setOpenStatus(false);
  };

  // const onChangeIsFeature = (event: SelectChangeEvent<unknown>) => {
  //   const newIsFeature = event.target.value;
  //   console.log(newIsFeature);
  //   setIsFeature(newIsFeature);
  //   if (todolist) {
  //     setFeatureFilterInList(newIsFeature);
  //   }
  //   if (myTasks) {
  //     setFeatureFilterInList(newIsFeature);
  //   }
  // };
  const {options} = useMemberOptions(todoList.members);
  (todoList.tasks || []).map(({assignees: Assigneeitem}) => {
    Assigneeitem[0]?.user?.id && assignees.push(Assigneeitem[0]?.user);
  });
  const newAssigneeList = Array.from(new Set(assignees.map(e => e.id)));
  const assigneeOptions = newAssigneeList.map(e => options.filter(a => a.id == e));
  return (
    <div className={classNames(style['tool-filter'], className)}>
      <div className="filter-icon">
        <Icon name="ico-filter mr-1" size={20} />
        <span>Filter</span>
      </div>

      <Select
        style={{width: 65}}
        variant="standard"
        disableUnderline
        className={style['menu-dropdown']}
        autoWidth
        sx={{'&:hover': {backgroundColor: 'transparent'}, '&:active': {backgroundColor: 'transparent'}}}
      >
        <div className="select-inner scrollbar max-h-[70vh] overflow-y-auto overflow-x-hidden">
          <MenuItem className={`${style['menu-item']} hover:cursor-default`}>
            <div className="menu-header-inner">
              <span className="font-bold">Filter</span>
              <span className="font-medium text-blue-500 hover:cursor-pointer" onClick={onReset}>
                Reset
              </span>
            </div>
          </MenuItem>
          <hr className="mx-[20px] mt-3" />
          <MenuItem className={`${style['menu-item']} menu-item`}>
            <List component="nav" className="list-inner">
              <ListItemButton onClick={onOpenStatus}>
                <span>Status</span>
                {openStatus ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openStatus} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="radio-status-group-label"
                      defaultValue={selectStatus}
                      name="radio-status-group"
                      onChange={onChangeStatus}
                      className="status-radios"
                    >
                      <FormControlLabel
                        key={0}
                        value={0}
                        sx={{color: '#000000', background: '#F1F5F9'}}
                        control={<BpRadio />}
                        label="Not Done"
                        checked={selectStatus == 0}
                      />
                      {status.map(({id, name, color, backgroundColor}) => (
                        <FormControlLabel
                          key={color}
                          value={id}
                          sx={{color, background: backgroundColor}}
                          control={<BpRadio />}
                          label={name}
                          checked={selectStatus == id}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </List>
              </Collapse>
            </List>
            <hr />
          </MenuItem>
          <MenuItem className={`${style['menu-item']} menu-item`}>
            <List component="nav" className="list-inner">
              <ListItemButton onClick={onOpenPriority}>
                <span>Priority</span>
                {openPriority ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openPriority} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="radio-priority-group-label"
                      defaultValue={selectPriority}
                      name="radio-priority-group"
                      onChange={onChangePriority}
                      className="priority-radios"
                    >
                      <FormControlLabel
                        key={0}
                        value={'default'}
                        sx={{color: '#000000'}}
                        control={<BpRadio />}
                        label="Prioritys"
                        checked={selectPriority == 'default'}
                      />
                      {prioList.map((e, index) => (
                        <FormControlLabel
                          key={index}
                          value={e}
                          control={<BpRadio />}
                          label={
                            <>
                              <Icon
                                className="priority-icon mr-1 "
                                name={prioIcons[index]}
                                style={{color: prioColors[index]}}
                              />
                              {e}
                            </>
                          }
                          checked={selectPriority == e}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </List>
              </Collapse>
            </List>
            <hr />
          </MenuItem>
          <MenuItem className={`${style['menu-item']} menu-item`}>
            <List component="nav" className="list-inner">
              <ListItemButton onClick={onOpenAssignee}>
                <span>Assignee</span>
                {openAssignee ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openAssignee} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="radio-assginee-group-label"
                      defaultValue={selectAssignee}
                      name="radio-assginee-group"
                      onChange={onChangeAssignee}
                      className="priority-radios"
                    >
                      <FormControlLabel
                        key={'default'}
                        value={'default'}
                        sx={{color: '#000000'}}
                        control={<BpRadio />}
                        label="Show All"
                        checked={selectAssignee == 'default'}
                      />
                      <FormControlLabel
                        key={'Unassigned'}
                        value={'Unassigned'}
                        sx={{color: '#000000'}}
                        control={<BpRadio />}
                        label="Unassigned"
                        checked={selectAssignee == 'Unassigned'}
                      />
                      {assigneeOptions.map(a => (
                        <FormControlLabel
                          key={a[0].id}
                          value={a[0].id}
                          control={<BpRadio />}
                          label={
                            <>
                              <div className="assignee-user mr-1">
                                <AssigneeIcon name={a[0].name} bg={a[0].bg} />
                              </div>
                              <span>{a[0].name}</span>
                            </>
                          }
                          checked={selectAssignee == a[0].id}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </List>
              </Collapse>
            </List>
          </MenuItem>
        </div>
      </Select>
    </div>
  );
};

export default ToolFilter;
