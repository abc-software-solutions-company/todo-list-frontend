import classNames from 'classnames';
import {FC} from 'react';
import {Controller, useForm} from 'react-hook-form';

import DatePicker from '@/components/common/date-picker';
import {IBaseProps} from '@/types';

interface IProps extends IBaseProps {
  startDate: Date;
}

const StartDate: FC<IProps> = ({className, startDate}) => {
  const {control} = useForm<IProps>();
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className={classNames('start-date', className)}>
      <p className="title">Start date</p>
      <form>
        <Controller
          name="startDate"
          rules={{required: true}}
          control={control}
          render={({field}) => (
            <DatePicker
              format="DD/MM/YYYY"
              value={startDate}
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
export default StartDate;
