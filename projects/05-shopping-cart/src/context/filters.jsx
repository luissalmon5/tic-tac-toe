import { createContext, useState } from "react";


// 1.- Create context
export const FiltersContext = createContext()


// 2.- Create Provider
export const FiltersProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        category: 'all',
        price: 0
    })
    return (
        <FiltersContext.Provider value={
            {
                filters, setFilters
            }
        }>
            {children}
        </FiltersContext.Provider>
    )
}