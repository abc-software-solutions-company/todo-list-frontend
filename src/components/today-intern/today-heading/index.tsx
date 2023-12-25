import {FC} from 'react'
import Icon from '@/core-ui/icon'
import HeadLine from '@/components/common/headline'

const TodayHeading: FC = () => {
  return (
    <HeadLine 
      iconLeft= {<Icon name='ico-calendar-check' />}
      titleLeft='Today'
      iconRight= {<Icon name='ico-sliders-horizontal' />}
      titleRight='View'
    />
  )
}

export default TodayHeading