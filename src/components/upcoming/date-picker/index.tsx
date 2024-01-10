import React, {CSSProperties, FC} from 'react';
import TextField from '@mui/material/TextField';
import {DesktopDatePicker} from '@mui/x-date-pickers';
import dayjs, {Dayjs} from 'dayjs';
import {useState} from 'react';

interface IDatePickerProps {
  value: Date;
  onChange: (value?: Date) => void;
  readonly?: boolean;
  title: string;
  minDate?: Date;
  maxDate?: Date;
  className: string | undefined;
}

const DatePicker: FC<IDatePickerProps> = ({className, onChange, title, value, maxDate, minDate, readonly}) => {
  const inputFormat = 'DD/MM/YYYY';
  const [day, setDay] = useState<Dayjs | null>(dayjs(value));
  const [open, setOpen] = useState<boolean>(false);
  const handleChange = (newDay: Dayjs | null) => {
    setDay(newDay);
    onChange(dayjs(newDay).toDate());
  };

  return (
    <div className="">
      <DesktopDatePicker
        className={`text-h5 font-semibold text-slate-700`}
        inputFormat={inputFormat}
        value={day}
        open={open}
        onOpen={() => {
          if (!readonly) setOpen(true);
        }}
        onClose={() => setOpen(false)}
        toolbarTitle={title}
        readOnly={readonly}
        minDate={dayjs(minDate || '14/11/1990')}
        maxDate={dayjs(maxDate || '31/12/2099')}
        onChange={date => handleChange(date)}
        renderInput={params => (
          <TextField
            focused={false}
            {...params}
            onClick={() => {
              if (!readonly) setOpen(true);
            }}
          />
        )}
      />
    </div>
  );
};

export default DatePicker;
