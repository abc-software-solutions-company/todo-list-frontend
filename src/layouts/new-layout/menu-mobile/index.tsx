import {FC} from 'react';

import {IToolProps} from '@/components/lists-detail/toolbar/tool';
import Icon from '@/core-ui/icon';

interface IMenuMobile {
  task: string;
}

const MenuMobile: FC<IMenuMobile> = ({task}) => {
  const notificationToolProps: IToolProps = {
    icon: <Icon name="ico-notification" />,
    text: 'Notification'
  };
  const shareToolProps: IToolProps = {
    icon: <Icon name="ico-share" />
  };
};
