import classNames from 'classnames';
import {FC} from 'react';

import DatePicker from '@/components/common/date-picker';
import {IBaseProps} from '@/types';

interface IProps extends IBaseProps {
  title: string;
  value: Date;
  handleSave: (date: Date) => void;
  readonly?: boolean;
}

const PickDateTime: FC<IProps> = ({className, value, title, handleSave, readonly}) => {
  const onSave = (date?: Date) => {
    if (date) handleSave(date);
  };

  return (
    <div className={classNames(className)}>
      <DatePicker
        title={title}
        value={value}
        readonly={readonly}
        onChange={date => {
          onSave(date);
        }}
      />
    </div>
  );
};
export default PickDateTime;
