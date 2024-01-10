import React from 'react';

import Layout from '@/layouts/layout';
import Project from '@/components/project';

export default function ProjectsPage() {
  return (
    <>
      <Project />
    </>
  );
}

ProjectsPage.Layout = Layout;
