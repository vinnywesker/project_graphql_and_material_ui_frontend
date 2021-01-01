import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import ShowCards from './views/showCards/index';
import ThemeProvider from './services/themeContext/index';
import ContextEmployeeProvider from './services/employeesContext/index';
import ApolloProvider from './services/graphql/index';
import ContextSelectedItemsProvider from './services/selectedCardsContext/index';

const App = () => {

    return (
        <ThemeProvider>
            <ApolloProvider>
                <ContextEmployeeProvider>
                    <ContextSelectedItemsProvider>
                        <CssBaseline />
                        <ShowCards />
                    </ContextSelectedItemsProvider>
                </ContextEmployeeProvider>
            </ApolloProvider>
        </ThemeProvider >
    )
}

export default App;