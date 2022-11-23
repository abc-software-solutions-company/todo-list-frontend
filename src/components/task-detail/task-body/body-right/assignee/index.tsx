import {arrayMove} from '@dnd-kit/sortable';
import {Autocomplete, Box, TextField} from '@mui/material';
import classNames from 'classnames';
import {FC, FocusEvent, useState} from 'react';

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
  const idOptions = options.map(e => e.id);
  const bg = assignee ? JoinerBgColos[(idOptions.indexOf(assignee.userId) + 1) % JoinerBgColos.length] : undefined;
  const [isEdting, setEditing] = useState(false);

  const onClick = () => setEditing(true);
  const onClose = () => setEditing(false);
  const onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    const email = e.target.value;
    onClose();
    if (email.length > 5) {
      api.task.update({id, assignee: {add: [email]}}).then(update);
    }
  };

  const optionAssignToMe = () => {
    if (options.length == 0) return [];
    const assignToMeIndex = options.findIndex(e => e.email == auth?.email);
    return arrayMove(options, assignToMeIndex, 0);
  };

  return (
    <div className={classNames('assignee', className)}>
      <Title text="Assignee" />
      {isEdting ? (
        <Autocomplete
          disablePortal
          freeSolo
          options={optionAssignToMe()}
          getOptionLabel={option => (option as any).email}
          onBlur={onClose}
          renderInput={params => {
            return <TextField {...params} label="User" onBlur={onBlur} autoFocus className="ring-0" />;
          }}
          renderOption={(props, option) => {
            return (
              <Box component="li" {...props}>
                {option.email}
                <br />
                {option.email?.includes(auth?.email || '') ? `${option.name} (Assign to me)` : option.name}
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
