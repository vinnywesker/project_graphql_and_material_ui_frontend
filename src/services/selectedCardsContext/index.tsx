import React, { createContext, useContext, useState } from 'react';

import { selectedItems } from '../../types';

interface selectedContext {
    selectedItems: selectedItems[] | null;
    setSelectedItems: (args: selectedItems[] | null) => void;
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

const Context = createContext<selectedContext>({} as selectedContext);

const Provider = ({ children }: Props) => {
    const [selectedItems, setSelectedItems] = useState<selectedItems[] | null>(null);
    return (
        <Context.Provider value={{
            selectedItems, setSelectedItems
        }}>
            {children}
        </Context.Provider>
    )
}

export default Provider;

export const useSelectedCards = () => useContext(Context);