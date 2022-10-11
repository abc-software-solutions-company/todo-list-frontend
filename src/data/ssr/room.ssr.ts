import {GetStaticPaths, GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import apiTodo from '@/api/network/todo';

type ParsedQueryParams = {
  id: string;
};

type PageProps = {
  roomId: string;
  title: string;
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({locale, params}) => {
  try {
    const {id} = params!;
    return {
      props: {
        roomId: id,
        title: 'This is test description for Todo List Website, This will change in the future',
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
