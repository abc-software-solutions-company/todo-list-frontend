import classNames from 'classnames';
import {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';

import DatePicker from '@/components/common/date-picker';
import {IBaseProps} from '@/types';

interface IProps extends IBaseProps {
  dueDate: Date;
}

const DueDate: FC<IProps> = ({className, dueDate}) => {
  const {control} = useForm<IProps>();
  const handleSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className={classNames('due-date', className)}>
      <p className="title">Due date</p>
      <form>
        <Controller
          name="dueDate"
          rules={{required: true}}
          control={control}
          render={({field}) => (
            <DatePicker
              format="DD/MM/YYYY"
              value={dueDate}
              onChange={text => {
                field.onChange(text);
                handleSubmit(text);
              }}
            />
          )}
        />
      </form>
    </div>
  );
};
export default DueDate;
