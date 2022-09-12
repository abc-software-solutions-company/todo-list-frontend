import React from 'react';

export type GlobalContext = {
  userName: string;
  id: string;
  createdDate: string;
};

// eslint-disable-next-line import/no-named-as-default-member
const ThemeContext = React.createContext<GlobalContext>({userName: '', id: '', createdDate: ''});
export {ThemeContext};
