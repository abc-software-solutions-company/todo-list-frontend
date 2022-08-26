import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/todo-list';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';

import styles from './style.module.scss';
import {useEffect} from 'react';
import {ROUTES} from '@/configs/routes.config';

interface IFormInputs {
  ID: string;
}

const Schema = yup.object().shape({
  ID: yup.string().required('Please fill all the required fields.')
});
const Action: React.FC = () => {
  const router = useRouter();
  // Check local storage.
  // useEffect(() => {
  //   const checkLocal = localStorage.getItem('user');
  //   if (!checkLocal) {
  //     router.push(ROUTES.QUICKPLAY);
  //   }
  // }, []);

  const {register, handleSubmit, formState} = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const {errors} = formState;

  useEffect(() => {});

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    API.readTodoList(Number(data.ID))
      .then(res => {
        if (res.status == 200) {
          router.push(`/list/${data.ID}`);
        }
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };
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
              <div className="section-error">
                <div></div>
                {errors.ID && <p className=" invalid">{errors.ID.message}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Action;
