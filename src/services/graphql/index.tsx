import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { URL_GRAPHQL_BACKEND } from '../../config/envVars';

const client = new ApolloClient({
    uri: URL_GRAPHQL_BACKEND,
    cache: new InMemoryCache()
});

interface Props {
    children: JSX.Element | JSX.Element[];
}

const Provider = ({ children }: Props) => (
    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
)

export default Provider;