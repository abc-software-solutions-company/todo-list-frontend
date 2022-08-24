import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';

import styles from './style.module.scss';

interface IFormInputs {
  ID: string;
}

const Schema = yup.object().shape({
  ID: yup.string().required('Please fill all the required fields.')
});
const Action: React.FC = () => {
  const router = useRouter();
  const {register, handleSubmit, formState} = useForm<IFormInputs>({
    resolver: yupResolver(Schema)
  });

  const {errors} = formState;

  const onSubmit: SubmitHandler<IFormInputs> = data => alert(JSON.stringify(data, null, 2));
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
                <form className="input-group" onSubmit={handleSubmit(onSubmit)}>
                  <Input className={errors.ID && 'error'} placeholder="Enter ID" {...register('ID')} />
                  <Button className="input-group-text" type="submit">
                    Join
                  </Button>
                </form>
              </div>
              {errors.ID && <p className="text-end invalid ">{errors.ID.message}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Action;
