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
}

const PickDateTime: FC<IProps> = ({className, value, title, handleSave, readonly}) => {
  const onSave = (date?: Date) => {
    if (date) handleSave(date);
  };

  return (
    <div className={classNames(className)}>
      <Title text={title} />
      <DatePicker
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
