import {useRouter} from 'next/router';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';

import style from './style.module.scss';
import ToolBarLeft from './toolbar-left';
import ToolBarRight from './toolbar-right';

interface IProps {
  option?: boolean;
}
const ToolBarListDetail: FC<IProps> = ({option = true}) => {
  const router = useRouter();
  const {id} = router.query;
  return (
    <>
      <div className={style['toolbar-container']}>
        {option ? (
          <>
            <ToolBarLeft />
            <ToolBarRight />
          </>
        ) : (
          <div className="flex cursor-pointer items-center" onClick={() => router.push(`${ROUTES.LIST}/${id}`)}>
            <Icon name="back" className="ico-arrow-reply text-sky-500" size={24} />
            <span className="mx-3 font-semibold text-sky-500">Back to list</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ToolBarListDetail;
