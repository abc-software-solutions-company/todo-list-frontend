import {Autocomplete, MenuItem, Select, TextField} from '@mui/material';
import cls from 'classnames';
import {FC, useEffect, useState} from 'react';

import AssigneeIcon from '@/components/common/assignee-icon';
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
  const visibilityDefaultValue = hiddenVisibility ? undefined : data?.visibility ? data.visibility : Visibilities.PUBLIC;
  const {onSubmit, register, errors, isSubmitting, setValue} = useModalCreateUpdateList(props);
  const [options, setOptions] = useState<IUserResponse[]>([]);
  const defaultMember = data ? data.members.filter(e => e.isActive).map(e => e.user) : [];
  const defaultMemberIds = defaultMember.map(e => e.id);
  const memberDefaultValue = options.filter(e => defaultMemberIds.includes(e.id));

  useEffect(() => {
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
                <Select {...register('visibility')} className="input-type" defaultValue={visibilityDefaultValue} sx={{color: '#334155'}}>
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
                  className="input-members"
                  defaultValue={[...memberDefaultValue]}
                  onChange={(e, value) => setValue('member', {emails: value.map(u => (u as any).email)})}
                  options={options}
                  disableCloseOnSelect
                  getOptionLabel={option => option.email || 'no email'}
                  renderOption={(prop, option, state) => {
                    const {selected} = state;
                    if (!selected)
                      return (
                        <li {...prop} className="m-2 flex items-center gap-x-2.5">
                          <AssigneeIcon name={option.name} />
                          <span>
                            {option?.email} ({option?.name})
                          </span>
                        </li>
                      );
                  }}
                  renderInput={params => <TextField {...params} className="members-textfield" label="member" placeholder="Add members..." />}
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
