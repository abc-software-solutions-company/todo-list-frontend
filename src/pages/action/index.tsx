import {FormGroup} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useRouter} from 'next/router';

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
                  className="title-btn"
                  onClick={() => {
                    router.push('/list');
                  }}
                >
                  Create New List
                </Button>
                <div className="input-group-room ">
                  <FormGroup row>
                    <TextField className="form-control-room" placeholder="Enter ID" />
                    <Button
                      variant="contained"
                      className="input-group-text "
                      onClick={() => {
                        router.push('/list');
                      }}
                    >
                      Join
                    </Button>
                  </FormGroup>
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
