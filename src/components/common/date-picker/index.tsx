import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, {Dayjs} from 'dayjs';
import {useState} from 'react';

import style from './styles.module.scss';

interface IDatePickerProp {
  data: string;
  onChange: (data?: string) => void;
}

const DatePicker = ({data, onChange}: IDatePickerProp) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(data || '2014-08-18T21:11:54'));
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    onChange(value?.toString());
  };
  return (
    <div className={style['date-picker']}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker className="box" inputFormat="MM/DD/YYYY" value={value} onChange={handleChange} renderInput={params => <TextField {...params} />} />
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;
