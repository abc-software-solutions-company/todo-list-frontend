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
      //FIXME: This revalidate rule may be cause slow api due to a lot of static page call api, I am changing to Using On-Demand Revalidation
      // revalidate: 60 // In seconds
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
