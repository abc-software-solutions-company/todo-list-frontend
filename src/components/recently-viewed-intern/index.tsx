import {FC} from 'react'
import styles from './style.module.scss'
import RecentlyHeading from './recently-heading'
import RecentlyTasks from './recently-tasks'

const RecentlyViewedIntern: FC = () => {
  return (
    <div className={styles['recently-viewed']}>
        <RecentlyHeading />
        <RecentlyTasks />
    </div>
  )
}

export default RecentlyViewedIntern