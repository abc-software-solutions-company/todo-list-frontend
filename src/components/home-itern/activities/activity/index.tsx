import {FC} from 'react';
import cls from 'classnames';
import styles from './style.module.scss';
import { ISetActivity } from './type';
import ActiTop from '../acti-top';
import ActiBottom from '../acti-bottom';

interface IActivity {
  type: ISetActivity,
  quantity: string,
  classes: string
}

const Activity: FC<IActivity> = ({ quantity, type, classes }) => {
  
  return (
    <div className={cls(styles['activity-item'], classes)}>
      <div className="flex flex-col items-start gap-6 self-stretch">
        <ActiTop type={type} />
        <ActiBottom type={type} />
      </div>
    </div>
  );
};

export default Activity;
