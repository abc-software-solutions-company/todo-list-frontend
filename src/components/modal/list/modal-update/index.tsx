import {Autocomplete, ButtonGroup, Grid, MenuItem, Popper, Select, TextField} from '@mui/material';
import cls from 'classnames';
import {FC, useEffect, useState} from 'react';

import AssigneeIcon from '@/components/common/assignee-icon';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import {Modal} from '@/core-ui/modal';
import api from '@/data/api';
import {IUserResponse} from '@/data/api/types/user.type';
import {Visibilities} from '@/utils/constant';

import styles from '../style-create-upate.module.scss';
import {IProps} from '../types-create-update';
import useModalUpdateList from './hook';

const ModalUpdateList: FC<IProps> = props => {
  const {data, open, hiddenVisibility, onClose} = props;
  const {errors, onSubmit, register, setValue, owner, ownerKanban} = useModalUpdateList(props);
  const [options, setOptions] = useState<IUserResponse[]>([]);
  const defaultMemberIds = data?.members?.map((e: {id: any}) => e.id);
  const memberDefaultValue = options.filter(e => defaultMemberIds?.includes(e.id));
  const visibilityDefaultValue = hiddenVisibility
    ? undefined
    : data?.visibility
    ? data.visibility
    : Visibilities.PUBLIC;

  useEffect(() => {
    api.user.getIndentify().then(res => {
      if (res && res.status == 200) {
        setOptions(res.data);
      }
    });
  }, []);

  return (
    <>
      {open && (
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
                <Autocomplete
                  multiple
                  limitTags={3}
                  className="input-members scrollbar max-h-36 overflow-scroll bg-white"
                  defaultValue={[...memberDefaultValue]}
                  onChange={(e, value) => setValue('member', {ids: value.map(u => u.id)})}
                  options={options}
                  disableCloseOnSelect
                  getOptionLabel={option => option.email || 'no email'}
                  PopperComponent={popperProp => (
                    <Popper placement="top" className="absolute top-0 left-0" {...popperProp}>
                      {popperProp.children}
                    </Popper>
                  )}
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
                    <TextField {...params} className="members-textfield" label="member" placeholder="Add members..." />
                  )}
                />
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
      )}
    </>
  );
};

export default ModalUpdateList;
