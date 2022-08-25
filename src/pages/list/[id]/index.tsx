import Image from 'next/image';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import IconAdd from '@/assets/images/icon-add.svg';
import IconArrowLeft from '@/assets/images/icon-arrow-left.svg';
import IconDelete from '@/assets/images/icon-delete.svg';
import IconEdit from '@/assets/images/icon-edit.svg';
import IconShare from '@/assets/images/icon-share.svg';
import ModalDeleteTask from '@/components/modal-delete-task';
import ModalShare from '@/components/modal-share';
import ModalUpdateTask from '@/components/modal-update-task';
import Button from '@/core-ui/button';
import API from '@/api/network/task';
import {ITask} from '@/api/network/task';
import styles from './style.module.scss';
import ModalCreateTask from '@/components/modal-create-task';
import {IUser} from '@/api/network/user';

const Detail: React.FC = () => {
  const router = useRouter();
  const {id} = router.query;

  const [createTaskOpen, setCreateTaskOpen] = useState<boolean>(false);
  const [task, setTask] = useState<ITask[] | null>(null);
  const [taskId, setTaskId] = useState<string>('');
  const [taskName, setTaskName] = useState<string>('');
  const [user, setUser] = useState<IUser | null>(null);

  const handleCloseCreateTaskOpen = () => {
    setCreateTaskOpen(false);
  };

  const [shareOpen, setShareOpen] = useState<boolean>(false);

  const handleShare = () => {
    setShareOpen(false);
  };

  const [editDetail, setEditdetail] = useState<boolean>(false);

  const handleEdit = () => {
    setEditdetail(false);
  };

  const [deleteDetail, setDeletedetail] = useState<boolean>(false);

  const handleDelete = () => {
    setDeletedetail(false);
  };

  // Fetch data.
  const fetchData = async (id: string) => {
    await API.getTasks(id.toString()).then(res => {
      setTask(res.data);
    });
  };

  useEffect(() => {
    if (id) fetchData(id.toString());
  }, [id]);

  // Get userId.
  useEffect(() => {
    const json = localStorage.getItem('user')?.toString();
    const object = JSON.parse(json);
    setUser(object);
  }, []);

  // Handle delete open.
  const handleDeleteOpen = (taskId: string, taskName: string) => {
    setDeletedetail(true);
    setTaskId(taskId);
    setTaskName(taskName);
  };

  // Handle edit open.
  const handleEditOpen = (taskId: string, taskName: string) => {
    setEditdetail(true);
    setTaskId(taskId);
    setTaskName(taskName);
  };

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
                    router.push('/action');
                  }}
                >
                  <Image src={IconArrowLeft} alt="Arrow left" />
                </div>

                <div className="title-left">
                  <h3 className="title-todo">Shopping</h3>
                </div>
              </div>
              <div className="detail-right">
                <div className="detail-items">
                  <Button className="items" onClick={() => setDeletedetail(true)}>
                    <Image src={IconDelete} alt="Delete" width={22} height={22} />
                  </Button>
                  <div className="title-right">Delete</div>
                </div>
                <div className="detail-items items-share">
                  <Button className="items" onClick={() => setShareOpen(true)}>
                    <Image src={IconShare} alt="Share" width={20} height={16} />
                  </Button>
                  <div className="title-right">Share</div>
                </div>
                <div className="detail-items">
                  <Button className="items" onClick={() => setCreateTaskOpen(true)}>
                    <Image src={IconAdd} alt="Add" width={22} height={22} />
                  </Button>
                  <div className="title-right">Add To-Do</div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-group">
            {task.map(item => (
              <>
                <div className="detail-list">
                  <p className="title-group">{item.taskName}</p>
                  <div className="icon-group">
                    <Button className="btn-hover-hand" onClick={() => handleEditOpen(item.id, item.taskName)}>
                      <Image src={IconEdit} alt="Edit" width={20} height={16} />
                    </Button>
                    <Button
                      className="btn-hover-hand"
                      width={11}
                      height={19}
                      onClick={() => handleDeleteOpen(item.id, item.taskName)}
                    >
                      <Image src={IconDelete} alt="Delete" />
                    </Button>
                  </div>
                </div>
                <ModalCreateTask
                  todolistId={id?.toString()}
                  userId={user.id}
                  open={createTaskOpen}
                  onClose={handleCloseCreateTaskOpen}
                />
                <ModalDeleteTask taskId={taskId} taskName={taskName} open={deleteDetail} onClose={handleDelete} />
                <ModalUpdateTask taskId={taskId} taskName={taskName} open={editDetail} onClose={handleEdit} />
                <ModalShare open={shareOpen} onClose={handleShare} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
