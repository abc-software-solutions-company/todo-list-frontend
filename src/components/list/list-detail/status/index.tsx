import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {MenuItem, Select, SelectProps} from '@mui/material';
import classNames from 'classnames';
import {FC, forwardRef} from 'react';

import {IStatus} from '@/data/api/types/list.type';

import style from './style.module.scss';

interface IProps extends SelectProps {
  className?: string;
  items: IStatus[];
  defaultValue: IStatus;
}

const Status: FC<IProps> = forwardRef(({items, className, defaultValue, ...rest}, ref) => {
  return (
    <div className={classNames(style.status, className, 'text-h6')}>
      <Select
        ref={ref}
        {...rest}
        className={style['status-button']}
        value={defaultValue.id}
        IconComponent={KeyboardArrowDownIcon}
        sx={{color: '#FFFFFF', backgroundColor: defaultValue.color, fontFamily: 'inherit'}}
      >
        {items.map(({id, name, color}) => {
          return (
            <MenuItem key={id} value={id} sx={{color, justifyContent: 'end', fontFamily: 'inherit'}}>
              <div className="MuiStatus-box" style={{backgroundColor: color + '32'}}>
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
