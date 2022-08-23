import {useRouter} from 'next/router';
import styles from './style.module.scss';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';

const Action: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles['create-room']}>
        <div className="container">
          <div className="section-room">
            <div className="title-room">
              <p className="title-todo">TO DO LIST</p>
              <p className="description-todo">Organize your work and life, finally.</p>
            </div>
            <div className="section-btn">
              <Button
                text=" Create New List"
                className="title-btn"
                onClick={() => {
                  router.push('/list');
                }}
              />
              <div className="input-group-room  ">
                <Input type="text" className="form-control-room" placeholder="Enter link or ID" />
                <Button
                  text="Join"
                  className="input-group-text "
                  onClick={() => {
                    router.push('/list');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Action;
