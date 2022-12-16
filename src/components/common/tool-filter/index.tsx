import {MenuItem, Select, SelectChangeEvent, SxProps, Theme} from '@mui/material';
import classNames from 'classnames';
import {FC, useState} from 'react';

import Icon from '@/core-ui/icon';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import useFilter from '@/states/filter/use-filter';

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
}

const status: StatusIprops[] = [
  {id: 1, name: 'Backlog', color: '#78716C'},
  {id: 2, name: 'To-Do', color: '#0EA5E9'},
  {id: 3, name: 'In-progress', color: '#F59E0B'},
  {id: 4, name: 'In-review', color: '#F43F5E'},
  {id: 5, name: 'In-QA', color: '#8B5CF6'},
  {id: 6, name: 'Done', color: '#22C55E'}
];

const ToolFilter: FC<IProps> = ({className, todolist, myTasks}) => {
  const {setStatusFilterInList, setStatusFilterInMyTask} = useFilter();
  const [select, setSelect] = useState<number>(0);

  const temp0: {id: number[]; name: string; color: string} = {id: [], name: 'Backlog', color: '#78716C'};
  const temp1: {id: number[]; name: string; color: string} = {id: [], name: 'To-Do', color: '#0EA5E9'};
  const temp2: {id: number[]; name: string; color: string} = {id: [], name: 'In-progress', color: '#F59E0B'};
  const temp3: {id: number[]; name: string; color: string} = {id: [], name: 'In-review', color: '#F43F5E'};
  const temp4: {id: number[]; name: string; color: string} = {id: [], name: 'In-QA', color: '#8B5CF6'};
  const temp5: {id: number[]; name: string; color: string} = {id: [], name: 'Done', color: '#22C55E'};

  if (myTasks) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    myTasks.forEach(todolist => {
      todolist.status.forEach(e => {
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

  const myTasksStatus: {id: number[]; name: string; color: string}[] = [];
  myTasksStatus.push(temp0, temp1, temp2, temp3, temp4, temp5);

  const onChange = (e: SelectChangeEvent<number>) => {
    const number = Number(e.target.value);
    setSelect(number);

    let temp;
    if (todolist) {
      temp = (todolist.status[number - 1] && todolist.status[number - 1].id) || 0;
      setStatusFilterInList(temp);
    }

    if (myTasks) {
      temp = (myTasksStatus[number - 1] && myTasksStatus[number - 1].id) || [];
      setStatusFilterInMyTask(temp);
    }
  };

  const sxMenuItem: SxProps<Theme> = {justifyContent: 'end', padding: '4px 16px', height: 36, minHeight: 36};

  return (
    <div className={classNames(style['tool-filter'], className)}>
      <div className="filter-icon">
        <Icon name="ico-filter" size={20} />
      </div>
      <Select value={select} onChange={onChange}>
        <MenuItem key={0} value={0} sx={{color: '#000000', ...sxMenuItem}}>
          <div className="dropdown-item">
            <span
              className="dropdown-name inline-block h-7 rounded px-2 py-0.5 text-h6 font-semibold text-slate-500"
              style={{backgroundColor: '#F1F5F9'}}
            >
              Not Done
            </span>
          </div>
        </MenuItem>
        {status.map(({id, name, color}) => (
          <MenuItem key={color} value={id} sx={{color, ...sxMenuItem}}>
            <div>
              <span
                className="dropdown-name inline-block h-7 rounded px-2 py-0.5 text-h6"
                style={{color, backgroundColor: color + '32'}}
              >
                {name}
              </span>
            </div>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default ToolFilter;
