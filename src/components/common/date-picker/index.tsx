import TextField from '@mui/material/TextField';
import {DesktopDatePicker} from '@mui/x-date-pickers';
import dayjs, {Dayjs} from 'dayjs';
import {useState} from 'react';

import style from './styles.module.scss';

interface IDatePickerProp {
  value: Date;
  onChange: (value?: Date) => void;
  readonly?: boolean;
  title: string;
  minDate?: Date;
}

const DatePicker = ({value, onChange, readonly, title, minDate}: IDatePickerProp) => {
  const inputFormat = 'MM/DD/YYYY';
  const [day, setDay] = useState<Dayjs | null>(dayjs(value));
  const handleChange = (newDay: Dayjs | null) => {
    setDay(newDay);
  };

  return (
    <div className={style['date-time-picker']}>
      <DesktopDatePicker
        className={`date-input`}
        inputFormat={inputFormat}
        value={day}
        toolbarTitle={title}
        readOnly={readonly}
        minDate={dayjs(minDate || '14/11/1990')}
        onChange={handleChange}
        onAccept={() => onChange(day?.toDate())}
        renderInput={params => <TextField focused={false} {...params} />}
      />
    </div>
  );
};

export default DatePicker;
