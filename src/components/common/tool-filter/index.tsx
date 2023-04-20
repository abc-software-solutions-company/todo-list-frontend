import {ExpandLess, ExpandMore} from '@mui/icons-material';
import {
  Collapse,
  FormControl,
  FormControlLabel,
  List,
  ListItemButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent
} from '@mui/material';
import classNames from 'classnames';
import {FC, useState} from 'react';

import Icon from '@/core-ui/icon';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import useFilter from '@/states/filter/use-filter';
import {Priorities, PriorityColors, PriorityIcons} from '@/utils/constant';

// import useTodolist from '@/states/todolist/use-todolist';
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
  const {setStatusFilterInList, setStatusFilterInMyTask, setPriorityFilterInList} = useFilter();
  const [selectStatus, setSelectStatus] = useState<number>(0);
  const [selectPriority, setSelectPriority] = useState<string>('');
  const [openStatus, setOpenStatus] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  // const [isFeature, setIsFeature] = useState<any>(false);
  // const {write: isWrite} = useTodolist();

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

  const myTasksStatus: {id: number[]; color: string; backgroundColor: string}[] = [];
  myTasksStatus.push(temp0, temp1, temp2, temp3, temp4, temp5);

  const onOpenPriority = () => {
    setOpenPriority(!openPriority);
  };

  const onOpenStatus = () => {
    setOpenStatus(!openStatus);
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

  const onReset = () => {
    setSelectStatus(0);
    setSelectPriority('default');
    setStatusFilterInList(0);
    setPriorityFilterInList('');
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

  return (
    <div className={classNames(style['tool-filter'], className)}>
      <div className="filter-icon">
        <Icon name="ico-filter mr-1" size={20} />
        <span>Filter</span>
      </div>

      <Select className={style['menu-dropdown']} autoWidth>
        <MenuItem className={style['menu-item']}>
          <div className="menu-header-inner">
            <span>Filter</span>
            <span onClick={onReset}>Reset</span>
          </div>
          <hr />
        </MenuItem>
        <MenuItem className={`${style['menu-item']} menu-item`}>
          <List component="nav">
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
                      control={<Radio />}
                      label="Not Done"
                      checked={selectStatus == 0}
                    />
                    {status.map(({id, name, color, backgroundColor}) => (
                      <FormControlLabel
                        key={color}
                        value={id}
                        sx={{color, background: backgroundColor}}
                        control={<Radio />}
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
          <List component="nav">
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
                      control={<Radio />}
                      label="Prioritys"
                      checked={selectPriority == 'default'}
                    />
                    {prioList.map((e, index) => (
                      <FormControlLabel
                        key={index}
                        value={e}
                        control={<Radio />}
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
      </Select>
    </div>
  );
};

export default ToolFilter;
