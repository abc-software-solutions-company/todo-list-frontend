import {Autocomplete, MenuItem, Select, TextField} from '@mui/material';
import cls from 'classnames';
import {FC, useEffect, useState} from 'react';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {IUserResponse} from '@/data/api/types/user.type';
import {Visibilities} from '@/utils/constant';

import useModalCreateUpdateList from './hook';
import styles from './style.module.scss';

export interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  hiddenVisibility?: boolean;
  data?: ITodolistResponse;
}

const ModalCreateUpdateList: FC<IProps> = props => {
  const {open, onClose, data, hiddenVisibility} = props;
  const defaultValue = hiddenVisibility ? undefined : data?.visibility ? data.visibility : Visibilities.PUBLIC;
  const {onSubmit, register, errors, isSubmitting, setValue} = useModalCreateUpdateList(props);
  const [options, setOptions] = useState<IUserResponse[]>([]);
  const [defaultMember, setDefaultMember] = useState<IUserResponse[]>([]);

  useEffect(() => {
    if (data) {
      setDefaultMember(data.members.filter(e => e.isActive).map(e => e.user));
    }
    api.user.getIndentify().then(res => {
      if (res && res.status == 200) {
        setOptions(res.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {open && (
        <Modal className={cls(styles['com-modal-todo-add-edit'], 'max-w-xl')} variant="center" open={open} onClose={onClose}>
          <form onSubmit={onSubmit}>
            <Modal.Header>
              <h3 className="title">{data ? 'Settings' : 'Create New List'}</h3>
            </Modal.Header>
            <Modal.Body>
              <Input error={errors.name?.message} value={data?.name} autoFocus={true} placeholder={'Enter your list name'} {...register('name')} />
              {data && !hiddenVisibility && (
                <Select {...register('visibility')} className="input-type" defaultValue={defaultValue} sx={{color: '#334155'}}>
                  {Object.keys(Visibilities).map((key, idx) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {Object.values(Visibilities)[idx]}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
              {data && !hiddenVisibility && (
                <Autocomplete
                  multiple
                  freeSolo
                  className="mt-4"
                  defaultValue={[...defaultMember]}
                  onChange={(e, value) => setValue('member', {emails: value.map(u => (u as any).email)})}
                  options={options}
                  disableCloseOnSelect
                  getOptionLabel={option => (option as any).email}
                  renderOption={(prop, option) => <li {...prop}>{(option as any).email}</li>}
                  renderInput={params => <TextField {...params} label="member" placeholder="Add members..." />}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <div className="content">
                <Button className="w-full" variant="outlined" color="primary" text="Cancel" onClick={onClose} type="button" />
                <Button
                  className="w-full"
                  variant="contained"
                  color="primary"
                  text={data?.id ? 'Save' : 'Create'}
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                />
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ModalCreateUpdateList;
