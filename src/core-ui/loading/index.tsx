import React, {FC, HTMLAttributes} from 'react';

interface IProps extends HTMLAttributes<HTMLElement> {}

const Loading: FC<IProps> = ({className, ...rest}) => {
  return (
    <div className={['abc-loading', className].filter((x: string) => !!x).join(' ')} {...rest}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
