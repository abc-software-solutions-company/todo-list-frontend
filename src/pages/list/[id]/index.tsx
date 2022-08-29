import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import API, {ITodoList} from '@/api/network/todo-list';
import ModalCreateTask from '@/components/modal-create-task';
import ModalDeleteList from '@/components/modal-delete-list';
import ModalDeleteTask from '@/components/modal-delete-task';
import ModalShare from '@/components/modal-share';
import ModalUpdateTask from '@/components/modal-update-task';
import Button from '@/core-ui/button';
import Checkbox from '@/core-ui/checkbox';
import IconButton from '@/core-ui/ico-button';
import Icon from '@/core-ui/icon';
import useCheckUserLocalStorage from '@/hooks/useCheckUserLocalStorage';
import useList from '@/hooks/useList';
import useTask from '@/hooks/useTask';

import styles from './style.module.scss';
import useToast from '@/core-ui/toast';
import Auth from '@/pages/auth';

const Detail: React.FC = () => {
  const router = useRouter();
  const {id} = router.query;

  const {list} = useList();
  const {user} = useCheckUserLocalStorage();
  const {task} = useTask(id ? id.toString() : '');

  const [aList, setAList] = useState<ITodoList | null>(null);
  const [createTaskOpen, setCreateTaskOpen] = useState<boolean>(false);
  const [editDetail, setEditdetail] = useState<boolean>(false);
  const [deleteDetail, setDeletedetail] = useState<boolean>(false);
  const [deleteListOpen, setDeleteListOpen] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>('');
  const [taskName, setTaskName] = useState<string>('');

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

  // Get list name.
  useEffect(() => {
    const fetch = async () => {
      await API.readTodoList(Number(id)).then(res => {
        setAList(res.data);
      });
    };

    fetch();
  }, [id]);

  if (!id) return null;

  if (!list) return null;
  if (!user) return null;
  if (!task) return null;

  return (
    <Auth>
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
                  <Icon name="abc-arrow-left-circle" />
                </div>
                <div className="title-left">
                  <h3 className="title-todo">{aList ? aList.listName : ''}</h3>
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
                  <div className="list-group">
                    <Checkbox className="list-box " />
                    <p className="title-group checked">{item.taskName}</p>
                  </div>
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
                <ModalUpdateTask taskId={taskId} oldTaskName={taskName} open={editDetail} onClose={handleEdit} />
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
            listID={aList?.id}
            listName={aList?.listName}
            open={deleteListOpen}
            onClose={handleDeleteListClose}
          />
          <ModalShare open={shareOpen} onClose={handleShare} id={id} />
        </div>
      </div>
    </Auth>
  );
};

export default Detail;
