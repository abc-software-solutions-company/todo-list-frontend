import {MenuItem, Select} from '@mui/material';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import {ITodolistResponse} from '@/data/api/types/list.type';
import {useStateAuth} from '@/states/auth';

import FavoriteButton from '../../common/favorite-button';
import styles from './style.module.scss';

interface IProp {
  todolist: ITodolistResponse;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
  onAddTask: () => void;
  filterValue: number;
  onFilter: (value: number) => void;
  onSuccessFavorite: () => void;
}
export default function ToolbarDetail({todolist, filterValue, onEdit, onDelete, onShare, onAddTask, onFilter, onSuccessFavorite}: IProp) {
  const statusFilters = todolist.status.sort((a, b) => a.index - b.index);
  const auth = useStateAuth();
  return (
    <>
      <div className={styles['toolbar-detail']}>
        <div className="toolbar">
          <div className="left">
            <div className="title">{todolist.name}</div>
            <FavoriteButton className="favorite" onSuccess={onSuccessFavorite} todolist={todolist} />
          </div>
          <div className="right">
            {/* List Delete Button */}
            {auth?.id === todolist.userId && (
              <Button startIcon={<Icon name="ico-trash-2" />} onClick={onDelete}>
                <span className="h5 font-medium">Delete List</span>
              </Button>
            )}
            {/* List Share Button */}
            <Button startIcon={<Icon name="ico-share-2" />} onClick={onShare}>
              <span className="h5 font-medium">Share</span>
            </Button>
            {/* List Add Button */}
            {/* This add task button will only appear when visibility in this list = public */}
            {(auth?.id === todolist.userId || todolist.visibility === 'PUBLIC') && (
              <Button className="btn-add-todo" startIcon={<Icon name="ico-plus-circle" />} onClick={onAddTask}>
                <span className="h5 font-medium">Add Task</span>
              </Button>
            )}
            {/* List All Button */}
            <div className="filter">
              <div className="filter-icon">
                <Icon name="ico-filter" />
              </div>
              <Select value={filterValue} sx={{fontFamily: 'inherit'}} onChange={e => onFilter(e.target.value as number)}>
                <MenuItem
                  key={0}
                  value={0}
                  sx={{color: '#000000', justifyContent: 'end', fontFamily: 'inherit', margin: '0', padding: '4px 16px', height: 40, minHeight: 40}}
                >
                  <div className="dropdown-item" style={{padding: '3px 0px 5px', borderRadius: '4px'}}>
                    All
                  </div>
                </MenuItem>
                {statusFilters.map(({id, name, color}) => {
                  return (
                    <MenuItem
                      key={id}
                      value={id}
                      sx={{color, justifyContent: 'end', fontFamily: 'inherit', margin: '0', padding: '4px 16px', height: 40, minHeight: 40}}
                    >
                      <div className="dropdown-item" style={{color, backgroundColor: color + '32', padding: '0 8px 3px', borderRadius: '4px'}}>
                        {name}
                      </div>
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            {/* List Settings Button */}
            {auth?.id === todolist.userId && (
              <Button startIcon={<Icon name="ico-settings" />} onClick={onEdit}>
                <span className="h5 font-medium">Settings</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
