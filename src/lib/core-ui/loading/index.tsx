import React, {FC, HTMLAttributes} from 'react';

type IProps = HTMLAttributes<HTMLElement>;

const Loading: FC<IProps> = ({className, ...rest}) => {
  return (
    <div className={['abc-loading', className].filter(x => !!x).join(' ')} {...rest}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
