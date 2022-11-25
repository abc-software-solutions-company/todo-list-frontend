import {FC} from 'react';

interface IProps {
  tilte: string;
}
const Title: FC<IProps> = ({tilte}) => {
  return (
    <div className="title">
      <span className="h3">{tilte}</span>
    </div>
  );
};
export default Title;
