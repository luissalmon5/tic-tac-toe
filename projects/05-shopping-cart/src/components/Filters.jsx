import { useId } from "react"
import { useFilters } from "../hooks/useFilters"

export const Filters = () => {
    const minPriceFilterId = useId()
    const categoryFilterId = useId()
    const { filters, setFilters } = useFilters()


    const handleChangeMinPrice = (e) => {
        setFilters(prevState => ({
            ...prevState,
            price: e.target.value
        }))
    }

    const handleChangeCategory = (e) => {
        setFilters(prevState => ({
            ...prevState,
            category: e.target.value
        }))
    }

    return (
        <div className="filters flex justify-between items-center p-6 mb-8 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="price-filter flex justify-center items-center gap-4">
                <label className="text-sm font-semibold text-slate-700" htmlFor={minPriceFilterId}>Min Price</label>
                <input value={filters.price} type="range" id={minPriceFilterId} min="0" max="1000" onChange={handleChangeMinPrice} />
                <span className="price-value">${filters.price}</span>
            </div>
            <div className="category-filter flex justify-center items-center gap-4">
                <label className="text-xs font-semibold text-slate-500 mb-1 ml-1 uppercase tracking-wider" htmlFor={categoryFilterId}>Category</label>
                <select className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium cursor-pointer" id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">All</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Phones</option>
                </select>
            </div>
        </div>
    )
}