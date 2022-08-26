import {useRouter} from 'next/router';
import React, {useState} from 'react';

import ModalCreateList from '@/components/modal-create-list';
import ModalCreateTask from '@/components/modal-create-task';
import ModalDeleteList from '@/components/modal-delete-list';
import ModalDeleteTask from '@/components/modal-delete-task';
// import ModalShare from '@/components/modal-share';
import ModalUpdateTask from '@/components/modal-update-task';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import LayoutDefault from '@/layouts/default';

export default function PageHome() {
  const router = useRouter();
  const toast = useToast();

  const [createListOpen, setCreateListOpen] = useState<boolean>(false);
  const [deleteListOpen, setDeleteListOpen] = useState<boolean>(false);
  const [createTaskOpen, setCreateTaskOpen] = useState<boolean>(false);
  const [updateTaskOpen, setUpdateTaskOpen] = useState<boolean>(false);
  const [deleteTaskOpen, setDeleteTaskOpen] = useState<boolean>(false);
  // const [shareOpen, setShareOpen] = useState<boolean>(false);

  const handleCloseCreateListOpen = () => {
    setCreateListOpen(false);
  };
  const handleCloseDeleteListOpen = () => {
    setDeleteListOpen(false);
  };
  const handleCreateTaskListOpen = () => {
    setCreateTaskOpen(false);
  };
  const handleUpdateTaskOpen = () => {
    setUpdateTaskOpen(false);
  };
  const handleDeleteTaskOpen = () => {
    setDeleteTaskOpen(false);
  };
  // const handleShare = () => {
  //   setShareOpen(false);
  // };

  return (
    <>
      <Button
        variant="contained"
        text="Info"
        onClick={() =>
          toast.show({type: 'info', title: 'Xin chào!', content: 'lorem ipsum dolor sit amet', lifeTime: Infinity})
        }
      />
      <Button
        variant="contained"
        text="Danger"
        onClick={() =>
          toast.show({type: 'danger', title: 'Xin chào!', content: 'lorem ipsum dolor sit amet', lifeTime: 3000})
        }
      />
      <Button
        variant="contained"
        text="Warning"
        onClick={() =>
          toast.show({type: 'warning', title: 'Xin chào!', content: 'lorem ipsum dolor sit amet', lifeTime: 5000})
        }
      />
      <Button
        variant="contained"
        text="Success"
        onClick={() =>
          toast.show({type: 'success', title: 'Xin chào!', content: 'lorem ipsum dolor sit amet', lifeTime: 7000})
        }
      />
      <br />
      <Button variant="contained" text="Quick Play" onClick={() => router.push('/quick-play')} />
      <br />
      <Button variant="contained" text="Create New List" onClick={() => setCreateListOpen(true)} />
      <br />
      <Button variant="contained" text="Delete List" onClick={() => setDeleteListOpen(true)} />
      <br />
      <Button variant="contained" text="Create New Task" onClick={() => setCreateTaskOpen(true)} />
      <br />
      <Button variant="contained" text="Update Task" onClick={() => setUpdateTaskOpen(true)} />
      <br />
      <Button variant="contained" text="Delete Task" onClick={() => setDeleteTaskOpen(true)} />
      <br />
      {/* <Button variant="contained" text="Input" onClick={() => setShareOpen(true)} />
      <br />
      <Button variant="contained" text="ModalShare" onClick={() => setShareOpen(true)} /> */}
      <Icon size={16} name="abc-arrow-left-circle" />
      <Icon name="abc-x-circle" />
      <Icon size={24} name="abc-edit text-abc-blue" />
      <Icon size={32} name="abc-plus-circle" />
      <Icon size={48} name="abc-share" />
      <Icon size={48} name="abc-trash" />
      <ModalCreateList open={createListOpen} onClose={handleCloseCreateListOpen} />
      <ModalDeleteList open={deleteListOpen} onClose={handleCloseDeleteListOpen} />
      <ModalCreateTask open={createTaskOpen} onClose={handleCreateTaskListOpen} />
      <ModalUpdateTask open={updateTaskOpen} onClose={handleUpdateTaskOpen} />
      <ModalDeleteTask open={deleteTaskOpen} onClose={handleDeleteTaskOpen} />
      {/* <ModalShare open={shareOpen} onClose={handleShare} /> */}
    </>
  );
}

PageHome.Layout = LayoutDefault;
