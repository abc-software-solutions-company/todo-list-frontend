import {arrayMove} from '@dnd-kit/sortable';
import {Autocomplete, Box, TextField} from '@mui/material';
import classNames from 'classnames';
import {FC, useState} from 'react';

import AssigneeIcon from '@/components/common/assignee-icon';
import api from '@/data/api';
import {useStateAuth} from '@/states/auth';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';
import {JoinerBgColos} from '@/utils/constant';

import Title from '../../title';

const Assignee: FC<IBaseProps> = ({className}) => {
  const auth = useStateAuth();
  const {task, update} = useTask();
  const {id, assignees} = task;
  const options = task.todolist.members.filter(e => e.isActive).map(e => e.user);
  const assignee = assignees.filter(e => e.isActive)[0];
  options.unshift({
    email: 'null',
    name: 'UnAssigned',
    id: 'unassigned'
  });
  const idOptions = options.map(e => e.id);
  const bg = assignee ? JoinerBgColos[(idOptions.indexOf(assignee.userId) + 1) % JoinerBgColos.length] : undefined;
  const [isEdting, setEditing] = useState(false);

  const onClick = () => setEditing(true);
  const onClose = () => setEditing(false);
  const onSelect = (email: string) => {
    onClose();
    if (email.length > 5) api.task.update({id, assignee: {emails: [email]}}).then(update);
    if (email === 'null') api.task.update({id, assignee: {emails: []}}).then(update);
  };

  const optionAssignToMe = () => {
    if (options.length == 0) return [];
    const assignToMeIndex = options.findIndex(e => e.email == auth?.email);
    return arrayMove(options, assignToMeIndex, 0);
  };

  const optionChecked = <div className="ico-check text-base font-extrabold text-blue-700"></div>;

  return (
    <div className={classNames('assignee', className)}>
      <Title text="Assignee" />
      {isEdting ? (
        <Autocomplete
          disablePortal
          options={optionAssignToMe()}
          noOptionsText={'Searching...'}
          getOptionLabel={option => (option as any).name}
          open={true}
          onBlur={onClose}
          fullWidth={true}
          renderInput={params => {
            return <TextField {...params} placeholder="Search People" autoFocus className="ring-0" />;
          }}
          renderOption={(props, option) => {
            return (
              <Box component="li" {...props} onClick={() => onSelect(option.email || '')}>
                <br />
                <div className="flex w-full justify-between gap-x-8">
                  <div className="name">{option.email?.includes(auth?.email || '  ') ? `${option.name} (Assign to me)` : option.name}</div>
                  <div className="active">
                    {assignee?.user.email === option.email && optionChecked}
                    {!assignee && option.email == 'null' && optionChecked}
                  </div>
                </div>
              </Box>
            );
          }}
        />
      ) : (
        <div className="assignee-user" onClick={onClick}>
          <AssigneeIcon data={assignee} bg={bg} />
        </div>
      )}
    </div>
  );
};
export default Assignee;
