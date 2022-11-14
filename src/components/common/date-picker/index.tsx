import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, {Dayjs} from 'dayjs';
import {FC, useState} from 'react';

const DatePicker: FC = () => {
  const [value, setValue] = useState<Dayjs | null>(dayjs('2014-08-18T21:11:54'));
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={params => <TextField {...params} />}
        />
        <MobileDatePicker
          label="Date mobile"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={params => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePicker;
