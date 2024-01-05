import {FC} from 'react'
import styles from './style.module.scss'
import MyProjectHeading from './my-project-heading'
import MyProjectList from './my-project-list'


const MyProjectItern: FC = () => {
  return (
    <div className={styles['my-project']}>
        <MyProjectHeading />
        <MyProjectList />
    </div>
  )
}

export default MyProjectItern