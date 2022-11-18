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
  minDateTime?: Date;
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
        inputFormat={'MM/DD/YYYY HH:MM'}
        showToolbar={true}
        value={day}
        toolbarTitle={title}
        readOnly={readonly}
        minDateTime={dayjs(minDateTime || '14/11/1990 14:11')}
        onChange={handleChange}
        onAccept={() => onChange(day?.toDate())}
        renderInput={params => (
          <TextField
            focused={false}
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: 'None'
            }}
          />
        )}
      />
    </div>
  );
};

export default DatePicker;
