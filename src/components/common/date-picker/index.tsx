import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, {Dayjs} from 'dayjs';
import {FC, useState} from 'react';

import style from './styles.module.scss';

interface IDatePickerProp {
  data: string;
  handle: () => void;
}

const DatePicker: FC = ({data, handle}: IDatePickerProp) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(data || '2014-08-18T21:11:54'));
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    handle();
  };
  return (
    <div className={style['date-picker']}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="date-picker-desktop">
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={params => <TextField {...params} />}
          />
        </div>
        <div className="date-picker-mobile">
          <MobileDatePicker
            label="Date mobile"
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={params => <TextField {...params} />}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;
