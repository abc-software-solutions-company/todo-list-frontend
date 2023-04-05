import {GetStaticProps} from 'next';

type ParsedQueryParams = {
  id: string;
};

type PageProps = {
  id: string;
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({params}) => {
  try {
    const {id} = params!;
    return {
      props: {id}
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};
