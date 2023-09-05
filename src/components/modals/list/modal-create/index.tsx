import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import cls from 'classnames';
import {FC, useEffect, useState} from 'react';

import AssigneeIcon from '@/components/common/assignee-icon';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import Modal from '@/core-ui/modal';
import api from '@/data/api';
import {IUserResponse} from '@/data/api/types/user.type';
import {useStateAuth} from '@/states/auth';
import {Visibilities} from '@/utils/constant';
import iosAutoFocus from '@/utils/ios-autofocus';

import styles from '../style-create-upate.module.scss';
import {IProps} from '../types-create-update';
import useModalCreateList from './hook';

const ModalCreateList: FC<IProps> = props => {
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
      className={cls(styles['com-modal-todo-add-edit'], 'max-w-xl')}
      variant="center"
      open={open}
      onClose={onClose}
    >
      <form onSubmit={onSubmit}>
        <Modal.Header>
          <h3 className="title">Create New List</h3>
        </Modal.Header>
        <Modal.Body>
          <Input
            autoFocus={true}
            error={errors.name?.message}
            placeholder={'Enter your list name'}
            {...register('name')}
          />
          <Input
            className="mt-4"
            placeholder={'Enter your task symbol (Optional)'}
            maxLength={5}
            {...register('taskSymbol')}
            error={errors.taskSymbol?.message}
          />
          <Select
            {...register('visibility')}
            defaultValue={Object.keys(Visibilities)[0]}
            className="input-type"
            sx={[{color: '#334155'}]}
          >
            {Object.keys(Visibilities).map((key, idx) => {
              return (
                <MenuItem key={key} value={key}>
                  {Object.values(Visibilities)[idx]}
                </MenuItem>
              );
            })}
          </Select>
          <Autocomplete
            multiple
            className="input-members"
            onChange={(e, value) => setValue('member', {ids: value.map(u => u.id)})}
            defaultValue={[me as IUserResponse]}
            options={options}
            disableCloseOnSelect
            getOptionLabel={option => `${option.name} (${option.email})`}
            renderOption={(prop, option, state) => {
              const {selected} = state;
              if (!selected)
                return (
                  <li {...prop} className={styles['assignee-item']}>
                    <AssigneeIcon name={option.name} />
                    <span>
                      {option?.email} ({option?.name})
                    </span>
                  </li>
                );
            }}
            renderInput={params => (
              <div className="max-h-[200px] overflow-auto p-1.5">
                <TextField {...params} className="members-textfield" label="member" placeholder="Add members..." />
              </div>
            )}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="content">
            <Button
              className="w-full"
              variant="outlined"
              color="primary"
              text="Cancel"
              onClick={onClose}
              type="button"
            />
            <Button
              className="w-full"
              variant="contained"
              color="primary"
              text="Create"
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalCreateList;
