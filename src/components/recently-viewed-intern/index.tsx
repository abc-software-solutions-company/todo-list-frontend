import {FC} from 'react'
import styles from './style.module.scss'
import RecentlyHeading from './recently-heading'

const RecentlyViewedIntern: FC = () => {
  return (
    <div className={styles['recently-viewed']}>
        <RecentlyHeading />
        
    </div>
  )
}

export default RecentlyViewedIntern