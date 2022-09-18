export interface IState {
  isMenuOpen: boolean;
  isDrawerOpen: string;
  isModalVideoOpen: boolean;
}

const initialState: IState = {
  isMenuOpen: false,
  isDrawerOpen: 'left',
  isModalVideoOpen: false
};

export default initialState;
