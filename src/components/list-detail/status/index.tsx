import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {MenuItem, Select, SelectProps} from '@mui/material';
import classNames from 'classnames';
import {FC, forwardRef} from 'react';

import {IStatus} from '@/data/api/types/list.type';

import style from './style.module.scss';

interface IProps extends SelectProps {
  className?: string;
  items: IStatus[];
  status: IStatus;
}

const Status: FC<IProps> = forwardRef(({items, className, status, ...rest}, ref) => {
  return (
    <div className={classNames(style.status, className, 'text-h6')}>
      <Select
        ref={ref}
        {...rest}
        className={classNames(style['status-button-desktop'])}
        value={status.id}
        IconComponent={KeyboardArrowDownIcon}
        sx={{color: '#FFFFFF', backgroundColor: status.color, fontFamily: 'inherit'}}
      >
        {items.map(({id, name, color}) => {
          return (
            <MenuItem
              key={id}
              value={id}
              sx={{color, justifyContent: 'end', fontFamily: 'inherit', margin: '0', padding: '4px 16px', height: 40, minHeight: 40}}
            >
              <div className="status-name" style={{backgroundColor: color + '32', padding: '3px 8px 5px', borderRadius: '4px'}}>
                {name}
              </div>
            </MenuItem>
          );
        })}
      </Select>
      <Select
        ref={ref}
        {...rest}
        className={classNames(style['status-button-mobile'])}
        value={status.id}
        IconComponent={ArrowDropDownIcon}
        sx={{color: '#FFFFFF', backgroundColor: status.color, fontFamily: 'inherit'}}
      >
        {items.map(({id, name, color}) => {
          return (
            <MenuItem
              key={id}
              value={id}
              sx={{color, justifyContent: 'end', fontFamily: 'inherit', margin: '0', padding: '4px 16px', height: 40, minHeight: 40}}
            >
              <div className="status-name" style={{backgroundColor: color + '32', padding: '3px 8px 5px', borderRadius: '4px'}}>
                {name}
              </div>
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
});
Status.displayName = 'Status';

export default Status;
