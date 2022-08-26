import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import TaskAPI, {ITask} from '@/api/network/task';
import ListAPI, {IList} from '@/api/network/todo-list';
import {IUser} from '@/api/network/user';
import ModalCreateTask from '@/components/modal-create-task';
import ModalDeleteList from '@/components/modal-delete-list';
import ModalDeleteTask from '@/components/modal-delete-task';
import ModalShare from '@/components/modal-share';
import ModalUpdateTask from '@/components/modal-update-task';
import Button from '@/core-ui/button';
import IconButton from '@/core-ui/ico-button';
import Icon from '@/core-ui/icon';

import styles from './style.module.scss';

const Detail: React.FC = () => {
  const router = useRouter();
  // Check local storage.
  useEffect(() => {
    const checkLocal = localStorage.getItem('user');
    if (!checkLocal) {
      router.push(ROUTES.QUICKPLAY);
    }
  }, []);
  const {id} = router.query;

  const [createTaskOpen, setCreateTaskOpen] = useState<boolean>(false);
  const [editDetail, setEditdetail] = useState<boolean>(false);
  const [deleteDetail, setDeletedetail] = useState<boolean>(false);
  const [deleteListOpen, setDeleteListOpen] = useState<boolean>(false);
  const [list, setList] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [task, setTask] = useState<ITask[] | null>(null);
  const [taskId, setTaskId] = useState<string>('');
  const [taskName, setTaskName] = useState<string>('');
  const [user, setUser] = useState<IUser | null>(null);

  const handleCloseCreateTaskOpen = () => {
    setCreateTaskOpen(false);
  };

  const handleShare = () => {
    setShareOpen(false);
  };

  const handleEdit = () => {
    setEditdetail(false);
  };

  const handleDelete = () => {
    setDeletedetail(false);
  };

  // Get userId.
  useEffect(() => {
    const json = localStorage.getItem('user')?.toString();

    if (json) {
      const object = JSON.parse(json);
      setUser(object);
    }
  }, []);

  // Fetch data.
  const fetchData = async (id: string) => {
    await Promise.all([ListAPI.readTodoList(Number(id)), TaskAPI.getTasks(id.toString())]).then(([list, task]) => {
      if (user && task.data.length == 0) {
        alert('This your list is empty!');
      }

      setList(list.data);
      setTask(task.data);
    });
  };

  useEffect(() => {
    if (id) fetchData(id.toString());
  }, [id]);

  // Handle delete task open.
  const handleDeleteOpen = (taskId: string, taskName: string) => {
    setDeletedetail(true);
    setTaskId(taskId);
    setTaskName(taskName);
  };

  // Handle edit task open.
  const handleEditOpen = (taskId: string, taskName: string) => {
    setEditdetail(true);
    setTaskId(taskId);
    setTaskName(taskName);
  };

  // Handle delete list close.
  const handleDeleteListClose = () => {
    setDeleteListOpen(false);
  };

  if (!list) return null;
  if (!task) return null;
  if (!user) return null;

  return (
    <>
      <div className={styles['create-detail-section']}>
        <div className="container">
          <div className="banner-detail">
            <div className="detail-content">
              <div className="detail-left">
                <div
                  className="icon-arrow-left"
                  onClick={() => {
                    router.push('/list');
                  }}
                >
                  <Icon size={28} name="abc-arrow-left-circle" />
                </div>

                <div className="title-left">
                  <h3 className="title-todo">{list.listName}</h3>
                </div>
              </div>

              <div className="detail-right">
                <Button variant="contained" className="items" onClick={() => setDeleteListOpen(true)}>
                  <Icon name="abc-trash" />
                  <div className="title-right">Delete</div>
                </Button>
                <Button variant="contained" className="items" onClick={() => setShareOpen(true)}>
                  <Icon name="abc-share" />
                  <div className="title-right">Share</div>
                </Button>
                <Button variant="contained" className="items" onClick={() => setCreateTaskOpen(true)}>
                  <Icon name="abc-plus-circle" />
                  <div className="title-right">Add To-Do</div>
                </Button>
              </div>
            </div>
          </div>
          <div className="detail-group">
            {task.map(item => (
              <>
                <div className="detail-list">
                  <p className="title-group">{item.taskName}</p>
                  <div className="actions">
                    <IconButton
                      className="btn-hover-hand"
                      icon="abc-edit"
                      onClick={() => handleEditOpen(item.id, item.taskName)}
                    />
                    <IconButton
                      className="btn-hover-hand"
                      icon="abc-trash"
                      onClick={() => handleDeleteOpen(item.id, item.taskName)}
                    />
                  </div>
                </div>
                <ModalDeleteTask taskId={taskId} taskName={taskName} open={deleteDetail} onClose={handleDelete} />
                <ModalUpdateTask taskId={taskId} taskName={taskName} open={editDetail} onClose={handleEdit} />
              </>
            ))}
          </div>
          <ModalCreateTask
            todolistId={id?.toString()}
            userId={user.id}
            open={createTaskOpen}
            onClose={handleCloseCreateTaskOpen}
          />
          <ModalDeleteList
            listID={list.id}
            listName={list.listName}
            open={deleteListOpen}
            onClose={handleDeleteListClose}
          />
          <ModalShare open={shareOpen} onClose={handleShare} id={id} />
        </div>
      </div>
    </>
  );
};

export default Detail;
