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
      //FIXME: This revalidate rule may be cause slow api due to a lot of static page call api, I am changing to Using On-Demand Revalidation
      // revalidate: 60 // In seconds
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};
