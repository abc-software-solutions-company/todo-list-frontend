import TextField from '@mui/material/TextField';
import {DateTimePicker} from '@mui/x-date-pickers';
import dayjs, {Dayjs} from 'dayjs';
import {useState} from 'react';

import style from './styles.module.scss';

interface IDatePickerProp {
  value: Date;
  onChange: (value?: Date) => void;
  readonly?: boolean;
  title: string;
  minDateTime: Date;
}

const DatePicker = ({value, onChange, readonly, title, minDateTime}: IDatePickerProp) => {
  const [day, setDay] = useState<Dayjs | null>(dayjs(value));

  const handleChange = (newDay: Dayjs | null) => {
    setDay(newDay);
  };

  return (
    <div className={style['date-time-picker']}>
      <DateTimePicker
        className="date-input"
        inputFormat={'DD/MM/YYYY HH:MM'}
        showToolbar={true}
        value={day || '14/11/2022 14:11'}
        toolbarTitle={title}
        readOnly={readonly}
        minDateTime={dayjs(minDateTime)}
        onChange={handleChange}
        onAccept={() => onChange(day?.toDate())}
        renderInput={params => <TextField focused={false} {...params} />}
      />
    </div>
  );
};

export default DatePicker;
