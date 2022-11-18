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
  value?: string;
  handleSave: (text: string) => void;
  autoFocus?: boolean;
  onClick?: () => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement, Element>) => void;
  placeholder?: string;
  write?: boolean;
  navive?: boolean;
}

const InputAutosize: FC<IProps> = ({className, value = '', handleSave, write = true, navive, placeholder, onClick, onBlur: onBlurExtend, autoFocus}) => {
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
    onBlurExtend?.(e);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setValue('text', value);
      e.currentTarget.blur();
    }
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <TextareaAutosize
      className={classNames(className, navive ? '' : style['default-css'])}
      {...register('text', {value})}
      placeholder={placeholder}
      onClick={onClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      readOnly={!write}
      autoFocus={autoFocus}
    />
  );
};

export default InputAutosize;
