import {MagnifyingGlassIcon} from "@heroicons/react/20/solid"

export function Header() {
    return (
        <>
            <header>
                <nav className="bg-blue-600 border-blue-200 px-4 lg:px-6 py-8 flex justify-center">
                    <div className="flex flex-wrap justify-between items-center w-8/12">
                        <div>
                            <a href="https://flowbite.com" className="flex items-center">
                                {/*<img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9"*/}
                                {/*     alt="Flowbite Logo"/>*/}
                                <span
                                    className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">logo</span>
                            </a>
                        </div>

                        <div className="w-6/12">
                            <label className="relative text-gray-400 focus-within:text-gray-600">
                                <input type="text" placeholder="Buscar" className="w-full py-1 pl-6 text-gray-500 border rounded-md
                                        outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"/>

                                <button>
                                    <MagnifyingGlassIcon
                                        className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-1"/>
                                </button>
                            </label>
                        </div>

                        <div>
                            <a href="#"
                               className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                Login
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}