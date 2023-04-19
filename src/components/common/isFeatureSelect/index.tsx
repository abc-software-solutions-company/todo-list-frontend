import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import classNames from 'classnames';
import {FC} from 'react';

import {IBaseProps} from '@/types';

interface IProps extends IBaseProps {
  defaultItem?: string;
  isFeature: boolean | undefined | string;
  onChange: (event: SelectChangeEvent<boolean | undefined | string>) => void;
  readonly?: boolean;
}

const FeatureSelect: FC<IProps> = ({isFeature: isFeatureValue, className, onChange, readonly = false, defaultItem}) => {
  const list = [
    {id: 0, name: 'Bug', color: 'rgb(244, 63, 94)', status: false},
    {id: 1, name: 'Feature', color: 'rgb(14, 165, 233)', status: true}
  ];
  const defaultItemArray = {id: 3, name: defaultItem, color: '#000', status: 'undefined'};
  const feature = list.filter(e => e.status == isFeatureValue)[0] || list[0];
  return (
    <div className={classNames(className, 'text-h6')}>
      <Select
        value={isFeatureValue}
        onChange={onChange}
        IconComponent={KeyboardArrowDownIcon}
        readOnly={readonly}
        sx={{color: '#000', borderWidth: 1, borderColor: feature.color}}
      >
        {defaultItem && (
          <MenuItem
            key={defaultItemArray.id}
            value={defaultItemArray.status}
            sx={{color: defaultItemArray.color, justifyContent: 'end', padding: '4px 16px'}}
          >
            <div className="is-feature-inner relative">
              <span className="is-feature-name inline-block rounded text-h6" style={{color: defaultItemArray.color}}>
                {defaultItemArray.name}
              </span>
              <div className="mobile-icon hidden">
                <ArrowDropDownIcon sx={{color: '#000'}} />
              </div>
            </div>
          </MenuItem>
        )}
        {list.map(({id, name, color, status}) => {
          return (
            <MenuItem key={id} value={status} sx={{color, justifyContent: 'end', padding: '4px 16px'}}>
              <div className="is-feature-inner relative">
                <span className="is-feature-name inline-block rounded text-h6" style={{color}}>
                  {name}
                </span>
                <div className="mobile-icon hidden">
                  <ArrowDropDownIcon sx={{color}} />
                </div>
              </div>
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default FeatureSelect;
