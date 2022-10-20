import {GetStaticPaths, GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import api from '../api';
import {IListResponse} from '../api/types/list.type';

type ParsedQueryParams = {
  id: string;
};

type PageProps = {
  list: IListResponse;
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({locale, params}) => {
  try {
    const {id} = params!;
    const list = (await api.list.getOne({id})).data;
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
  const allList = await api.list.get();
  const paths = allList.data.flatMap(({id}) => ({params: {id}}));
  return {paths, fallback: 'blocking'};
};
