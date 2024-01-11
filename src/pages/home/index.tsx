import Seo from '@/components/common/seo/seo';
import Home from '@/components/home';
import Layout from '@/layouts/layout';

export default function ProjectPage() {
  return (
    <>
      <Seo title="Home page" />
      <Home className="py-12 px-6" />
    </>
  );
}

ProjectPage.Layout = Layout;
