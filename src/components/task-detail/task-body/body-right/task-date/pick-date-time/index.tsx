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
}

const PickDateTime: FC<IProps> = ({className, value, title, handleSave, readonly, minDate}) => {
  const onSave = (date?: Date) => {
    console.log('🚀 ~ file: index.tsx:19 ~ onSave ~ date', date);
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
          onSave(date);
        }}
        minDate={minDate}
      />
    </div>
  );
};
export default PickDateTime;
