import React from 'react';

import Layout from '@/layouts/layout';
import Project from '@/components/project';
import Seo from '@/components/common/seo/seo';

export default function ProjectsPage() {
  return (
    <>
      <Seo title="My Projects" />
      <Project />
    </>
  );
}

ProjectsPage.Layout = Layout;
