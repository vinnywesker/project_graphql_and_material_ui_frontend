import React, { createContext, useContext, useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as Provider } from '@material-ui/styles';



interface Props {
    children: JSX.Element | JSX.Element[];
}

interface propsContext {
    setUserTheme(args: "dark" | "light"): void
}

const Context = createContext<propsContext>({} as propsContext)

const ThemeProvider = ({ children }: Props) => {
    const [userTheme, setUserTheme] = useState<"dark" | "light">("dark");

    const theme = createMuiTheme({
        palette: {
            type: userTheme,
        }
    });

    return (
        <Context.Provider value={{
            setUserTheme
        }}>
            <Provider theme={theme}>
                {children}
            </Provider>
        </Context.Provider>
    );
}
export default ThemeProvider;

export const useSetTheme = () => useContext(Context);