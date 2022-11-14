import TextField from '@mui/material/TextField';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, {Dayjs} from 'dayjs';
import {useState} from 'react';

import style from './styles.module.scss';

interface IDatePickerProp {
  value: Date;
  format?: string;
  onChange: (value?: Date) => void;
}

const DatePicker = ({value, format = 'MM/DD/YYYY', onChange}: IDatePickerProp) => {
  const [day, setDay] = useState<Dayjs | null>(dayjs(value));

  const handleChange = (newDay: Dayjs | null) => {
    setDay(newDay);
  };

  return (
    <div className={style['date-picker']}>
      <MobileDatePicker
        className="box"
        inputFormat={format}
        value={day}
        onChange={handleChange}
        onAccept={() => onChange(day?.toDate())}
        renderInput={params => <TextField {...params} />}
      />
    </div>
  );
};

export default DatePicker;
