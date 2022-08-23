import React, {useState} from 'react';
import LayoutDefault from '@/layouts/default';
import {useRouter} from 'next/router';
import Button from '@/core-ui/button';
import ModalCreateList from '@/components/modal-create-list';
import ModalCreateTask from '@/components/modal-create-task';
import ModalDeleteList from '@/components/modal-delete-list';
import ModalUpdateTask from '@/components/modal-update-task';
import ModalDeleteTask from '@/components/modal-delete-task';
import ModalShare from '@/components/modal-share';
import useMediaQuery from '@/hooks/useMediaQuery';
export default function PageHome() {
  const router = useRouter();

  const [createListOpen, setCreateListOpen] = useState<boolean>(false);
  const [deleteListOpen, setDeleteListOpen] = useState<boolean>(false);
  const [createTaskOpen, setCreateTaskOpen] = useState<boolean>(false);
  const [updateTaskOpen, setUpdateTaskOpen] = useState<boolean>(false);
  const [deleteTaskOpen, setDeleteTaskOpen] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);

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
  const handleShare = () => {
    setShareOpen(false);
  };

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <>
      <Button text="Quick Play" onClick={() => router.push('/quick-play')} />
      <br />
      <Button text="Create New List" onClick={() => setCreateListOpen(true)} />
      <br />
      <Button text="Delete List" onClick={() => setDeleteListOpen(true)} />
      <br />
      <Button text="Create New Task" onClick={() => setCreateTaskOpen(true)} />
      <br />
      <Button text="Update Task" onClick={() => setUpdateTaskOpen(true)} />
      <br />
      <Button text="Delete Task" onClick={() => setDeleteTaskOpen(true)} />
      <br />
      <Button text="Input" onClick={() => setShareOpen(true)} />

      <ModalCreateList open={createListOpen} onClose={handleCloseCreateListOpen} />
      <ModalDeleteList open={deleteListOpen} onClose={handleCloseDeleteListOpen} />
      <ModalCreateTask open={createTaskOpen} onClose={handleCreateTaskListOpen} />
      <ModalUpdateTask open={updateTaskOpen} onClose={handleUpdateTaskOpen} />
      <ModalDeleteTask open={deleteTaskOpen} onClose={handleDeleteTaskOpen} />
      <ModalShare open={shareOpen} onClose={handleShare} />

      <span>{`${matches}`}</span>
    </>
  );
}

PageHome.Layout = LayoutDefault;
