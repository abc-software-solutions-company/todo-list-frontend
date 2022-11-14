import TextField from '@mui/material/TextField';
import {MobileDateTimePicker} from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs, {Dayjs} from 'dayjs';
import {useState} from 'react';

import style from './styles.module.scss';

interface IDatePickerProp {
  value: Date;
  onChange: (value?: Date) => void;
}

const DatePicker = ({value, onChange}: IDatePickerProp) => {
  const [day, setDay] = useState<Dayjs | null>(dayjs(value));

  const handleChange = (newDay: Dayjs | null) => {
    setDay(newDay);
  };

  return (
    <div className={style['date-picker']}>
      <MobileDateTimePicker
        className="box"
        value={day}
        onChange={handleChange}
        onAccept={() => onChange(day?.toDate())}
        renderInput={params => <TextField {...params} />}
      />
    </div>
  );
};

export default DatePicker;
