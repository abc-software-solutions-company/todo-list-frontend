import {Autocomplete, Box, TextField} from '@mui/material';
import classNames from 'classnames';
import {FC, SyntheticEvent, useState} from 'react';

import AssigneeIcon from '@/components/common/assignee-icon';
import api from '@/data/api';
import {IUserResponse} from '@/data/api/types/user.type';
import useMemberOptions from '@/hooks/useMemberOptions';
import {useStateAuth} from '@/states/auth';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

import Title from '../../title';

const Assignee: FC<IBaseProps> = ({className}) => {
  const auth = useStateAuth();
  const {task, update} = useTask();
  const {id, assignees} = task;

  const assignee = assignees.filter(e => e.isActive)[0];

  const {options, optionActive} = useMemberOptions(task.todolist.members, assignee?.userId);

  const [isEdting, setEditing] = useState(false);

  const onClick = () => setEditing(true);
  const onClose = () => setEditing(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChange = (event: SyntheticEvent<Element, Event>, value: IUserResponse | null) => {
    if (value) {
      if (value.id !== 'Unassigned') api.task.update({id, assignee: {ids: [value.id]}}).then(update);
      else api.task.update({id, assignee: {ids: []}}).then(update);
      onClose();
    }
  };

  return (
    <div className={classNames('assignee', className)}>
      <Title text="Assignee" />
      {isEdting ? (
        <Autocomplete
          disablePortal
          options={options}
          noOptionsText={'Searching...'}
          getOptionLabel={option => option.name}
          open={true}
          onChange={onChange}
          onBlur={onClose}
          defaultValue={optionActive || options[0]}
          renderInput={params => <TextField {...params} placeholder="Search People" autoFocus className="ring-0" />}
          renderOption={(props, option, {selected}) => {
            return (
              <Box component="li" {...props}>
                <div className="flex w-full items-center gap-x-2.5">
                  <AssigneeIcon name={option.name} bg={option.bg} />
                  <div className="name grow">{auth && auth.id === option.id ? 'Me' : option.name}</div>
                  <div className="active">{selected && <i className="ico-check text-base font-extrabold text-blue-700" />}</div>
                </div>
              </Box>
            );
          }}
        />
      ) : (
        <div className="assignee-user" onClick={onClick}>
          <AssigneeIcon name={optionActive?.name} bg={optionActive?.bg} />
        </div>
      )}
    </div>
  );
};
export default Assignee;
