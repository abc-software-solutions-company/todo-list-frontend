import classNames from 'classnames';
import {FC} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import DatePicker from '@/components/common/date-picker';
import {IBaseProps} from '@/types';

interface IProps extends IBaseProps {
  startDate?: string;
}

const StartDate: FC<IProps> = ({className, startDate}) => {
  const {handleSubmit, control} = useForm<IProps>();
  const onSubmit: SubmitHandler<IProps> = data => alert(data.startDate);

  return (
    <div className={classNames('start-date', className)}>
      <p className="title">Start date</p>
      {/* <p>3/11/2022</p> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="startDate"
          rules={{required: true}}
          control={control}
          render={({field}) => <DatePicker data={startDate || ''} onChange={text => field.onChange(text)} />}
        />
        <input type="submit" />
      </form>
    </div>
  );
};
export default StartDate;
