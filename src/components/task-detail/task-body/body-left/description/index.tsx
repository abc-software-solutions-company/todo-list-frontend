import classNames from 'classnames';
import {FC, useState} from 'react';
import {useForm} from 'react-hook-form';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

import Title from '../../title';
import DescriptionButton from './description-button';
import DescriptionForm, {IDescriptionForm} from './description-form';

const Description: FC<IBaseProps> = ({className}) => {
  const {write, task} = useTask();
  const form = useForm<IDescriptionForm>({mode: 'onChange', defaultValues: {description: ''}});
  const [isEditing, setIsEditing] = useState(false);
  const [beforeChange, setBeforeChange] = useState<string>(task.description || '');
  const onClick = () => {
    if (write) setIsEditing(true);
    setBeforeChange(task.description);
    // This is where we need capture data before editing for compare list of picture need remove
  };
  const onClose = () => {
    if (write) setIsEditing(false);
  };

  const editBtn = !isEditing && write && task.description && <Button text="Edit" className="edit-btn" onClick={onClick} />;

  return (
    <div className={classNames('description', className)}>
      <Title icon={<Icon name="ico-description" />} text="Description" rightBtn={editBtn} />
      {!isEditing ? <DescriptionButton {...{onClick}} /> : <DescriptionForm beforeChange={beforeChange} {...{form, onClose}} />}
    </div>
  );
};

export default Description;
