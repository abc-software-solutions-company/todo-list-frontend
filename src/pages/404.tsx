import ErrorInformation from '@/components/common/404';
import Seo from '@/components/common/seo/seo';
import LayoutDefault from '@/layouts/default';

export default function PageNotFound() {
  return (
    <>
      <Seo title="404" description="404 description" />
      <ErrorInformation />
    </>
  );
}

PageNotFound.Layout = LayoutDefault;
