type ICardBGColor = 'gray' | 'blue'
type ICaculateProps = {
    taskDone: number, taskTotal: number
}
type ICaculatePercentage = (props: ICaculateProps) => number;