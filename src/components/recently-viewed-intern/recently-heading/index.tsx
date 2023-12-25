import HeadLine from '@/components/common/headline'
import Icon from '@/core-ui/icon'
import {FC} from 'react'

const RecentlyHeading: FC = () => {
  return (
    <HeadLine
        iconLeft={<Icon name='ico-clock' />}
        titleLeft='Recently viewed'
    />
  )
}

export default RecentlyHeading