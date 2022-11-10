import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {MenuItem, Select, SelectProps} from '@mui/material';
import classNames from 'classnames';
import {FC, forwardRef} from 'react';

import {IStatus} from '@/data/api/types/todolist.type';

interface IProps extends SelectProps {
  className?: string;
  items: IStatus[];
  status: IStatus;
}

const StatusSelect: FC<IProps> = forwardRef(({items, className, status, ...rest}, ref) => {
  return (
    <div className={classNames(className, 'text-h6')}>
      <Select
        ref={ref}
        {...rest}
        value={status.id}
        IconComponent={KeyboardArrowDownIcon}
        sx={{color: '#FFFFFF', backgroundColor: status.color, fontFamily: 'inherit'}}
      >
        {items.map(({id, name, color}) => {
          return (
            <MenuItem key={id} value={id} sx={{color, justifyContent: 'end', fontFamily: 'inherit', padding: '4px 16px'}}>
              <div className="relative">
                <span className="status-name inline-block rounded px-2 py-0.5 text-h6" style={{backgroundColor: color + '32'}}>
                  {name}
                </span>
                <div className="mobile-icon hidden">
                  <ArrowDropDownIcon />
                </div>
              </div>
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
});
StatusSelect.displayName = 'StatusSelect';

export default StatusSelect;
