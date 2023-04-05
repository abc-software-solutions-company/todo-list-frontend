import React, {FC} from 'react';

import Button from '@/core-ui/button';

import style from './style.module.scss';

interface Iprops {
  handleRename: () => void;
}
const OptionDocument: FC<Iprops> = ({handleRename}) => {
  return (
    <div className={style.options}>
      <Button className="btn" onClick={handleRename}>
        Rename
      </Button>
      <Button className="btn">Add to Favorate</Button>
      <Button className="btn">Delete</Button>
    </div>
  );
};

export default OptionDocument;
