import HeadLine from '@/components/common/headline'
import Icon from '@/core-ui/icon'
import {FC} from 'react'

const MyProjectHeading: FC = () => {
  return (
    <HeadLine
        titleLeft='My project'
        iconRight={<Icon name='ico-sliders-horizontal'/>}
        titleRight='See all'
    />
  )
}

export default MyProjectHeading