import {createTheme, ThemeProvider} from '@mui/material/styles';
import {ReactNode} from 'react';

const muiTheme = createTheme({
  typography: {
    fontFamily: `Mulish, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`
  }
});

interface IMuiThemeProps {
  children: ReactNode;
}

const MuiThemeProvider = ({children}: IMuiThemeProps) => {
  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
