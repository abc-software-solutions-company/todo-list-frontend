import Seo from '@/components/common/seo/seo';
import HomeIntern from '@/components/home-itern';
import InternLayout from '@/layouts/intern-layout';


export default function ProjectPage() {
  return (
    <>
      <Seo title="Home page" />
      <HomeIntern />
    </>
  );
}

ProjectPage.Layout = InternLayout;
