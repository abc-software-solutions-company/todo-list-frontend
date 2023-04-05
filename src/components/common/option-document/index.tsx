import Link from 'next/link';
import React, {FC} from 'react';

import style from './style.module.scss';

const OptionDocument: FC = () => {
  return (
    <div className={style.options}>
      <Link href="">Rename</Link>
      <Link href="">Add to Favorate</Link>
      <Link href="">Delete</Link>
    </div>
  );
};

export default OptionDocument;
