import {GetStaticPaths, GetStaticProps} from 'next';

import api from '../api';
import {ITaskResponse} from '../api/types/task.type';

type ParsedQueryParams = {
  id: string;
};

type PageProps = {
  task: ITaskResponse;
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({params}) => {
  try {
    const {id} = params!;
    const task = (await api.task.getOne({id})).data;
    return {
      props: {
        task
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const all = await api.task.get();
  const paths = all.data.flatMap(({id}) => ({params: {id}}));
  return {paths, fallback: 'blocking'};
};
