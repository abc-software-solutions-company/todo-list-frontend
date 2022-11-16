import {TextareaAutosize} from '@mui/material';
import classNames from 'classnames';
import {FC, FocusEvent, KeyboardEvent, useEffect} from 'react';
import {useForm} from 'react-hook-form';

import {IBaseProps} from '@/types';

import style from './style.module.scss';

export interface IInputAutosizeInputs {
  text: string;
}

export interface IProps extends IBaseProps {
  value: string;
  handleSave: (text: string) => void;
  placeholder?: string;
  write?: boolean;
  navive?: boolean;
}

const InputAutosize: FC<IProps> = ({className, value, handleSave, write = true, navive, placeholder}) => {
  const {register, setValue} = useForm<IInputAutosizeInputs>();
  useEffect(() => {
    setValue('text', value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onSave = (text: string) => {
    if (text !== value) handleSave(text);
  };

  const onBlur = (e: FocusEvent<HTMLTextAreaElement, Element>) => {
    onSave(e.currentTarget.value as string);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setValue('text', value);
      e.currentTarget.blur();
    }
    if (e.key === 'Enter') {
      e.currentTarget.blur();
      onSave(e.currentTarget.value as string);
    }
  };

  return (
    <TextareaAutosize
      className={classNames(className, navive ? '' : style['default-css'])}
      {...register('text', {value})}
      placeholder={placeholder}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      readOnly={!write}
    />
  );
};

export default InputAutosize;
