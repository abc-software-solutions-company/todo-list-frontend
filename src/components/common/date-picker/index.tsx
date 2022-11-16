import TextField from '@mui/material/TextField';
import {DateTimePicker} from '@mui/x-date-pickers';
import dayjs, {Dayjs} from 'dayjs';
import {useState} from 'react';

import style from './styles.module.scss';

interface IDatePickerProp {
  value: Date;
  onChange: (value?: Date) => void;
  readonly?: boolean;
}

const DatePicker = ({value, onChange, readonly}: IDatePickerProp) => {
  const [day, setDay] = useState<Dayjs | null>(dayjs(value));

  const handleChange = (newDay: Dayjs | null) => {
    setDay(newDay);
  };

  return (
    <div className={style['date-picker']}>
      <DateTimePicker
        className="box"
        inputFormat={'DD/MM/YYYY HH:MM'}
        value={day}
        readOnly={readonly}
        onChange={handleChange}
        onAccept={() => onChange(day?.toDate())}
        renderInput={params => <TextField {...params} />}
      />
    </div>
  );
};

export default DatePicker;
