import React from 'react'
import {AlignLeft, Moon, Settings, Sun} from "lucide-react"
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';

const Navbar = () => {
    
    const dispatch = useAppDispatch();
    
     const isSidebarCollapsed = useAppSelector(
            (state) => state.global.isSidebarCollapsed, 
    );

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    return (
        <div className="flex items-center justify-between bg-white px-6 py-4 dark:bg-black">
            <div className="flex items-center">
                {!isSidebarCollapsed ? null : (
                        <button
                        onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
                        className={
                            isDarkMode
                            ? `rounded p-2 dark:hover:bg-gray-700`
                            : `rounded p-2 hover:bg-gray-100`
                        }
                        >
                        <AlignLeft className='h-6 w-6 cursor-pointer dark:text-white'></AlignLeft>
                    </button>
                )}
            </div>
            <div className="flex items-center space-x-3">
                <Link
                    href="/"
                    className= "h-min w-min rounded p-2 hover:bg-gray-100"
                >
                    <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
                </Link>
                <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
                <button
                    onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
                    className={
                        isDarkMode
                        ? `rounded p-2 dark:hover:bg-gray-700`
                        : `rounded p-2 hover:bg-gray-100`
                    }
                    >
                    {isDarkMode ? (
                        <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
                    ) : (
                        <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
                    )}
                </button>
            </div>
        </div>
    )
}

export default Navbar