import {GetStaticPaths, GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import apiTask from '@/api/network/task';
import apiTodo from '@/api/network/todo';

type ParsedQueryParams = {
  id: string;
};

type PageProps = {
  roomId: string;
  title: string;
  listData: string;
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({locale, params}) => {
  try {
    const {id} = params!;
    let listDataRaw = '';

    // Get title and 3 task in description
    await apiTask.getListTasks(id).then(res => (listDataRaw = JSON.stringify(res.data)));
    return {
      props: {
        roomId: id,
        title: 'This is test description for Todo List Website, This will change in the future',
        listData: listDataRaw,
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
