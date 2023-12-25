import {FC, useEffect} from 'react'
import styles from './style.module.scss'
import TodayHeading from './today-heading'
import TodayBody from './today-body'
import useTasksIntern from '@/states/tasks-intern/use-tasks-intern'
import LocalStorage from '@/utils/local-storage'
import { ROUTES } from '@/configs/routes.config'

const TodayIntern: FC = () => {
  

  return (
    <div className={styles['today']}>
        <TodayHeading />
        <TodayBody />
    </div>
  )
}

export default TodayIntern