import {motion, useAnimation} from 'framer-motion';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import React, {useEffect, useState} from 'react';
import SidebarBrand from '@/components/sidebar-intern/sidebar-brand';
import SidebarActions from '@/components/sidebar-intern/sidebar-actions';
import SidebarProjects from '@/components/sidebar/sidebar-projects';

const Sidebar = () => {
  const [active, setActive] = useState(true);
  const controls = useAnimation();
  const controlText = useAnimation();
  const controlTitleText = useAnimation();

  const showMore = () => {
    controls.start({
      width: '321px',
      transition: {duration: 0.01},
      animationTimingFunction: 'ease-in-out'
    });
    controlText.start({
      opacity: 1,
      display: 'block',
      transition: {delay: 0.3}
    });
    controlTitleText.start({
      opacity: 1,
      transition: {delay: 0.3}
    });

    setActive(true);
  };

  const showLess = () => {
    controls.start({
      width: '100px',
      transition: {duration: 0.01},
      animationTimingFunction: 'ease-in-out'
    });

    controlText.start({
      opacity: 0,
      display: 'none'
    });

    controlTitleText.start({
      opacity: 0
    });

    setActive(false);
  };

  useEffect(() => {
    showMore();
  }, []);

  return (
    <motion.div
      animate={controls}
      className="animate fixed z-[1] inline-flex h-full w-[321px] flex-shrink-0 flex-col items-center justify-between border-r border-gray-500 bg-slate-50 p-8 duration-300"
    >
      <div id="top" className="flex w-full flex-col gap-6 self-stretch">
        <SidebarBrand active={active} showLess={showLess} showMore={showMore} />
        <SidebarActions controlText={controlText} />

        <div id="divider" className="h-[0.0625rem] bg-gray-500"></div>

        <motion.div animate={controlText} id="my-projects">
          <SidebarProjects />
        </motion.div>
      </div>

      <motion.div animate={controlText} id="bottom">
        <Button className="flex w-64 items-center justify-center gap-2 self-stretch rounded-lg border-2 border-gray-500 py-4 px-3 ">
          Log out
          <Icon name="ico-log-out" className="log-out" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
