import React, {FC, ReactNode} from 'react';

interface IProps {
  children?: ReactNode;
}

const PageWrap: FC<IProps> = ({children}) => {
  return (
    <>
      {/* <pre>{JSON.stringify(auth)}</pre> */}
      {children}
    </>
  );
};

export default PageWrap;
