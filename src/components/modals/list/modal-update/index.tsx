import {Autocomplete, Chip, MenuItem, Select, TextField} from '@mui/material';
import cls from 'classnames';
import {FC, useEffect, useState} from 'react';

import AssigneeIcon from '@/components/common/assignee-icon';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import Modal from '@/core-ui/modal';
import api from '@/data/api';
import {IUserResponse} from '@/data/api/types/user.type';
import useModals from '@/states/modals/use-modals';
import {Visibilities} from '@/utils/constant';

import styles from '../style-create-upate.module.scss';
import {IProps} from '../types-create-update';
import useModalUpdateList from './hook';

const ModalUpdateList: FC<IProps> = props => {
  const {data, open, hiddenVisibility, onClose} = props;
  const {errors, onSubmit, register, setValue, owner, ownerKanban} = useModalUpdateList(props);
  const [options, setOptions] = useState<IUserResponse[]>([]);
  const [members, setMembers] = useState<IUserResponse[]>([]);

  const defaultMemberIds = data?.members?.map((e: {id: any}) => e.id) || [];
  const ownerOfList = options.find(x => x.id === data?.userId);

  const {setIsOpenModal} = useModals();
  const visibilityDefaultValue = hiddenVisibility
    ? undefined
    : data?.visibility
    ? data.visibility
    : Visibilities.PUBLIC;
  const onDelete = () => {
    setIsOpenModal('deleteList');
  };
  useEffect(() => {
    api.user.getIndentify().then(res => {
      if (res && res.status == 200) {
        const memberDefaultValue = res.data.filter(e => defaultMemberIds.includes(e.id));
        setOptions(res.data);
        setMembers(memberDefaultValue);
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
          <h3 className="title">Settings</h3>
        </Modal.Header>
        <Modal.Body>
          <Input
            error={errors.name?.message}
            value={data?.name}
            autoFocus={true}
            placeholder={'Enter your list name'}
            {...register('name')}
          />
          <Input
            error={errors.taskSymbol?.message}
            value={data?.taskSymbol}
            placeholder={'Enter your task Symbol. EX: TEST (optional)'}
            maxLength={5}
            {...register('taskSymbol')}
            className="mt-4"
          />
          {data && (owner || ownerKanban) && (
            <Select
              {...register('visibility')}
              className="input-type"
              defaultValue={visibilityDefaultValue}
              sx={{color: '#334155'}}
            >
              {Object.keys(Visibilities).map((key, idx) => {
                return (
                  <MenuItem key={key} value={key}>
                    {Object.values(Visibilities)[idx]}
                  </MenuItem>
                );
              })}
            </Select>
          )}
          {data && options.length > 0 && (owner || ownerKanban) && (
            <>
              <Autocomplete
                multiple
                className="input-members"
                value={members}
                onChange={(e, value) => {
                  if (ownerOfList) {
                    setMembers([ownerOfList, ...value.filter(({id}) => id !== data.userId)]);
                    setValue('member', {ids: [data.userId, ...value.map(u => u.id)]});
                  }
                }}
                options={options}
                disableCloseOnSelect
                getOptionLabel={option => `${option.name} (${option.email})`}
                renderTags={(tagValue, getTagProps) => {
                  return tagValue.map((option, index) => (
                    <Chip
                      {...getTagProps({index})}
                      key={index}
                      label={option.email}
                      disabled={data.userId === option.id}
                    />
                  ));
                }}
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
              <div className="delete mt-4 flex items-center justify-end">
                <span className="hidden underline hover:cursor-pointer sm:block" onClick={() => onDelete()}>
                  Delete List
                </span>
              </div>
            </>
          )}
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
            <Button className="w-full" variant="contained" color="primary" text="Save" type="submit" />
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalUpdateList;
