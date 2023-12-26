import {Clock, SlidersHorizontal} from 'lucide-react';
import React from 'react';
import Card from './project/project-card';
import NewLayout from '@/layouts/new-layout';

export default function ProjectsPage() {
  return (
    <>
      <div className="mt-8 mb-4 flex items-center font-bold">
        <Clock size={20} className="mr-2" /> Recently viewed
      </div>
      <div className="flex justify-between">
        <div className="mt-8 mb-4 font-bold">My project</div>
        <button className="flex items-center text-sm font-semibold">
          <SlidersHorizontal size={19} className="mr-2" /> Sell all
        </button>
      </div>
      <Card />
      <Card />
      <Card />
    </>
  );
}

ProjectsPage.Layout = NewLayout;
