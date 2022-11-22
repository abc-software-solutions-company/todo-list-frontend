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
  const inputFormat = 'MM/DD/YYYY HH:MM';
  const [day, setDay] = useState<Dayjs | null>(dayjs(value));
  const [active, setActive] = useState(false);
  const handleChange = (newDay: Dayjs | null) => {
    setDay(newDay);
  };

  const placeholderChange = () => {
    return active ? 'MM/DD/YYYY' : 'None';
  };

  return (
    <div className={style['date-time-picker']}>
      <DateTimePicker
        className={`date-input ${active && 'active'}`}
        inputFormat={inputFormat}
        showToolbar={true}
        value={day}
        toolbarTitle={title}
        readOnly={readonly}
        minDateTime={dayjs(minDateTime || '14/11/1990 14:11')}
        onChange={handleChange}
        onAccept={() => onChange(day?.toDate())}
        renderInput={params => (
          <TextField
            onBlur={() => {
              setActive(false);
            }}
            onClick={() => {
              setActive(true);
            }}
            focused={false}
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: placeholderChange()
            }}
          />
        )}
      />
    </div>
  );
};

export default DatePicker;
