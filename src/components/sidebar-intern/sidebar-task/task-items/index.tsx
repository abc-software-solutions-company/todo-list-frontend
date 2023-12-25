import ListEllipse from '@/components/common/icons/list-ellipse'
import Icon from '@/core-ui/icon'
import React from 'react'

export interface ISidebarTaskItem {
    color: string,
    name: string
}

function SidebarTaskItem({ name, color }: ISidebarTaskItem) {
  return (
    <div className='flex items-center gap-[0.125rem] w-[232px]'>
        <ListEllipse />
        <div className='flex items-center py-4 px-1 justify-between' style={{flex: "1 0 0"}}>
            <p className='text-lg font-semibold leading-6 text-[#374151]'>
              {name}
            </p>
            <Icon name='ico-more-horizontal' />
        </div>
    </div>
  )
}

export default SidebarTaskItem