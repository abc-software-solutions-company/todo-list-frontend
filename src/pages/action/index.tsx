import {useRouter} from 'next/router';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';

import styles from './style.module.scss';

const Action: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles['create-room']}>
        <div className="container">
          <div className="section-room">
            <div className="title-room">
              <p className="title-todo">TO DO LIST</p>
            </div>
            <div className="section-content">
              <p className="description-todo">Organize your work and life, finally.</p>
              <div className="section-btn">
                <Button
                  variant="contained"
                  onClick={() => {
                    router.push('/list');
                  }}
                >
                  Create New List
                </Button>
                <div className="input-group">
                  <Input placeholder="Enter ID" />
                  <Button className="input-group-text">Join</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Action;
