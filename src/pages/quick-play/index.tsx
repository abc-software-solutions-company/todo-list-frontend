import React, {ChangeEvent, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import API from '@/api/network/user';

import styles from './style.module.scss';
import TodoListLogo from '@/components/icons/todolist-logo';
import Button from '@/core-ui/button';

interface IFormData {
  user_name: string;
}

const DEFAULT_VALUES = {user_name: ''};

const QuickPlay: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<IFormData>(DEFAULT_VALUES);
  const [windowWidth, setWindowWidth] = useState(0);

  const update = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleSubmit = event => {
    const user_name = formData.user_name;
    const length = user_name.length;
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (user_name === '') {
      alert('Please enter your user name!');
      location.reload();
    }

    if (length >= 20) {
      alert('Your user name should small than 20 charaters!');
      location.reload();
    }

    if (format.test(user_name)) {
      alert('Special characters not allowed!');
      location.reload();
    }

    console.log(formData.user_name);

    // API.createUser(formData).then(resp => {
    //   setFormData(DEFAULT_VALUES);
    // });
    // router.push('/action');
    event.preventDefault();
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let newFormData: IFormData = {...formData};
    newFormData[name] = value;
    setFormData(newFormData);
  };

  return (
    <div className={styles['section-todo-list']}>
      <div className="container">
        <div className="inner">
          <div className="logo-wrapper">
            <TodoListLogo width={windowWidth <= 640 ? 175 : 249} />
          </div>
          <div className="enter-your-name">
            <h2 className="heading">Let's start !</h2>
            <form onSubmit={handleSubmit}>
              <input
                className="input"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                type="text"
                placeholder="Enter your name"
              />
              <Button className="btn-enter" text="Enter" type="submit" />
            </form>
          </div>
          <div className="copyright">Copyright © 2022 By ABC Software Solutions Company.</div>
        </div>
      </div>
    </div>
  );
};

export default QuickPlay;
