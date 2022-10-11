import {GetStaticPaths, GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import apiTask from '@/api/network/task';
import apiTodo from '@/api/network/todo';
import {ITodo} from '@/api/types/todo.type';

type ParsedQueryParams = {
  id: string;
};

type PageProps = {
  roomId: string;
  title: string;
  taskCount: number;
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({locale, params}) => {
  try {
    const {id} = params!;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let title = '';
    let taskCount = 0;

    // Get title and 3 task in description
    await apiTask
      .getListTasks(id)
      .then(res => {
        const listData: ITodo = res.data;
        title = listData.name!;
        taskCount = listData.tasks?.length || 0;
      })
      .catch(() => (title = 'This list Not Found'));
    return {
      props: {
        roomId: id,
        title,
        taskCount,
        ...(await serverSideTranslations(locale!, ['common']))
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const rooms = await apiTodo.getAllTodo();
  const paths = rooms.data.flatMap((room: {id: string}) => ({params: {id: `${room.id}`}}));
  return {paths, fallback: 'blocking'};
};
