// src/context/SearchContext.tsx
import { createContext, useContext } from 'react';

export interface SearchContextType {
    keyword: string;
    setKeyword: (value: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
    keyword: '',
    setKeyword: () => { },
});

export const useSearchContext = () => useContext(SearchContext);
