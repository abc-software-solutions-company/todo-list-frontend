import {GetStaticPaths, GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import api from '../api';
import {ISeo} from '../api/types/commom';

type ParsedQueryParams = {
  id: string;
};

type PageProps = {
  id: string;
  seo: ISeo;
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({locale, params}) => {
  try {
    const {id} = params!;
    const seo = (await api.todolist.seoOne({id})).data;
    return {
      props: {
        id,
        seo,
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
