import {Autocomplete, Box, TextField} from '@mui/material';
import classNames from 'classnames';
import {FC, FocusEvent, useEffect, useState} from 'react';

import AssigneeIcon from '@/components/common/assignee-icon';
import api from '@/data/api';
import {IUserResponse} from '@/data/api/types/user.type';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

import Title from '../../title';

const Assignee: FC<IBaseProps> = ({className}) => {
  const {task, update} = useTask();
  const {id, assignees} = task;
  const userHasBeen = task.assignees.map(e => e.user.id);
  const [isEdting, setEditing] = useState(false);
  const [options, setOptions] = useState<IUserResponse[]>([]);

  const onClick = () => setEditing(true);
  const onClose = () => setEditing(false);
  const onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    const email = e.target.value;
    onClose();
    if (email.length > 5) {
      api.task.update({id, assignee: {add: [email]}}).then(update);
    }
  };

  useEffect(() => {
    api.user.getIndentify().then(res => {
      if (res && res.status == 200) {
        setOptions(res.data.sort(a => (userHasBeen.includes(a.id) ? -1 : 1)));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classNames('assignee', className)}>
      <Title text="Assignee" />
      {isEdting ? (
        <Autocomplete
          disablePortal
          freeSolo
          options={options}
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
                {option.name}
              </Box>
            );
          }}
        />
      ) : (
        <AssigneeIcon data={assignees} onClick={onClick} />
      )}
    </div>
  );
};
export default Assignee;
