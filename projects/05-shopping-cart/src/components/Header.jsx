import { Filters } from "./Filters"
import { CartIcon } from "./Icons"

export const Header = () => {
    return (
       <>
            <div className="flex items-center mx-auto gap-4 mb-5 pl-6 pr-6 lg:pl-12 lg:pr-12 absolute top-0 left-0 h-20 w-full bg-white border-b border-slate-200 shadow-sm">
                <h1 className="text-3xl">Salmon Shop</h1>
            </div>
            <Filters/>
        </>
    )
}