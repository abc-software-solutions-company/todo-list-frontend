import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/router';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';

import API from '@/api/network/todo-list';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';
import LayoutDefault from '@/layouts/default';

import Auth from '../auth';
import styles from './style.module.scss';

interface IFormInputs {
  ID: string;
}

const Schema = yup.object().shape({
  ID: yup.string().required('Please fill ID.')
});

function Action() {
  const router = useRouter();
  const toast = useToast();

  const {register, handleSubmit, formState} = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const {errors} = formState;

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    API.readTodoList(Number(data.ID))
      .then(res => {
        if (res.status == 200) {
          router.push(`/list/${data.ID}`);
        }
      })
      .catch(error => {
        toast.show({type: 'danger', title: 'Xin chào!', content: error.response.data.message, lifeTime: 3000});
      });
  };
  return (
    <Auth>
      <div className={styles['create-room']}>
        <div className="container">
          <div className="inner">
            <p className="title">TO DO LIST</p>
            <p className="headline">Organize your work and life, finally.</p>
            <div className="actions">
              <div className="item">
                <Button
                  variant="contained"
                  className="w-full"
                  color="primary"
                  onClick={() => {
                    router.push('/list');
                  }}
                >
                  Create New List
                </Button>
              </div>
              <div className="item">
                <form className="input-group" onSubmit={handleSubmit(onSubmit)}>
                  <Input className={errors.ID && 'error'} placeholder="Enter ID" {...register('ID')} />
                  <Button variant="contained" className="input-group-text" color="primary" type="submit">
                    Join
                  </Button>
                </form>
                {errors.ID && <p className=" invalid">{errors.ID.message}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Auth>
  );
}

Action.Layout = LayoutDefault;

export default Action;
