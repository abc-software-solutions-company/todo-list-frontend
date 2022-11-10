import {GetStaticPaths, GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import api from '../api';
import {ITodolistResponse} from '../api/types/todolist.type';

type ParsedQueryParams = {
  id: string;
};

type PageProps = {
  list: ITodolistResponse;
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({locale, params}) => {
  try {
    const {id} = params!;
    const list = (await api.todolist.getOne({id})).data;
    return {
      props: {
        list,
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
  const allList = await api.todolist.get();
  const paths = allList.data.flatMap(({id}) => ({params: {id}}));
  return {paths, fallback: 'blocking'};
};
