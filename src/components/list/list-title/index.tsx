import {FC} from 'react';

interface IProps {
  tilte: string;
}
const ListTitle: FC<IProps> = ({tilte}) => {
  return (
    <>
      <div className="title">
        <span className="h3">TO-DO</span>
        <span className="sep"></span>
        <span className="h3">{tilte}</span>
      </div>
    </>
  );
};
export default ListTitle;
