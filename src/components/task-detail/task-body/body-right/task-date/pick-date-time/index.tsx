import classNames from 'classnames';
import {FC} from 'react';

import DatePicker from '@/components/common/date-picker';
import {IBaseProps} from '@/types';

import Title from '../../../title';

interface IProps extends IBaseProps {
  title: string;
  value: Date;
  handleSave: (date: Date) => void;
  readonly?: boolean;
  minDate?: Date;
  error?: boolean;
}

const PickDateTime: FC<IProps> = ({className, value, title, handleSave, readonly, minDate, error = false}) => {
  const onSave = (date?: Date) => {
    if (date) handleSave(date);
  };

  return (
    <div className={classNames(className)}>
      <Title text={title} />
      <DatePicker
        title={title}
        value={value}
        readonly={readonly}
        onChange={date => {
          if (!error) onSave(date);
        }}
        minDate={minDate}
      />
    </div>
  );
};
export default PickDateTime;
