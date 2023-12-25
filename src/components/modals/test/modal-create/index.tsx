import {Box, Chip, FormControl, InputLabel, TextareaAutosize} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import cls from 'classnames';
import {FC, useEffect, useState} from 'react';

import Button from '@/core-ui/button';
import Modal from '@/core-ui/modal';
import api from '@/data/api';
import {IUserResponse} from '@/data/api/types/user.type';
import {useStateAuth} from '@/states/auth';
import iosAutoFocus from '@/utils/ios-autofocus';

import styles from '../style-create-upate.module.scss';
import {IProps} from '../types-create-update';
import useModalCreateList from './hook';
import Icon from '@/core-ui/icon';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import DatePicker from '@/components/common/date-picker';

const ModalCreateTaskIntern: FC<IProps> = props => {
  const [project, setProject] = useState('');
  const me = useStateAuth();
  const {open, onClose} = props;
  const {isSubmitting, errors, onSubmit, register, setFocus, setValue} = useModalCreateList(props);
  const [options, setOptions] = useState<IUserResponse[]>([]);

  useEffect(() => {
    setFocus('name');
    iosAutoFocus();
  }, [setFocus]);

  useEffect(() => {
    api.user.getIndentify().then(res => {
      if (res && res.status == 200) {
        setOptions(res.data);
      }
    });
  }, []);

  if (!open) return null;

  return (
    <Modal
      className={cls(styles['com-modal-todo-add-edit'], 'max-w-[702px]')}
      variant="center"
      open={open}
      onClose={onClose}
      showCloseButton={false}
    >
      <form onSubmit={onSubmit} className="w-full">
        <Modal.Body>
          <div className="flex w-full flex-col items-start gap-2">
            <TextareaAutosize
              className={cls(styles['input-modal-todo-add-edit'], styles['input-taskname'], 'border-0 text-gray-500')}
              placeholder="Task name"
            />
            <TextareaAutosize
              className={cls(styles['input-modal-todo-add-edit'], styles['input-des'], 'border-0 text-gray-500')}
              placeholder="Description"
            />
          </div>
          <div className="flex items-start gap-3 self-stretch">
            <DatePicker value={new Date()} onChange={() => {}} title="aaaa" />
          </div>
        </Modal.Body>
        <Modal.Footer className="border-t">
          <div className='w-full flex justify-between items-center self-stretch'>
            <div>
              <Select
                value={project}
                onChange={e => setProject(e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
                displayEmpty
                className="text-[#1E40AF]"
              >
                <MenuItem value="">Choose project</MenuItem>
                <MenuItem defaultChecked={true} value={10}>
                  Project 1
                </MenuItem>
                <MenuItem value={20}>Project 2</MenuItem>
                <MenuItem value={30}>Project 3</MenuItem>
              </Select>
            </div>
            <div className="flex items-end justify-end gap-1">
              <Button
                className="flex items-center justify-center gap-2 rounded-lg border bg-gray-200 p-1"
                onClick={onClose}
              >
                <span>Cacel</span>
                <Icon name="ico-times" />
              </Button>
              <Button className="flex items-center justify-center gap-2 rounded-lg border bg-blue-800 p-1 opacity-40">
                <span className="text-gray-200">Add task</span>
                <Icon name="ico-send-right" className="text-gray-200" />
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalCreateTaskIntern;
