interface IRounded {
  button: boolean;
}

export interface IState {
  rounded: IRounded;
}

const initialState: IState = {
  rounded: {
    button: true
  }
};

export default initialState;
