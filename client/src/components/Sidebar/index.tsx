"use client";

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import { useGetProjectsQuery } from '@/state/api';
import { Briefcase, ChartGantt, ChevronDown, ChevronLeft, ChevronUp, LockIcon, LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, {useState} from 'react'
import { Aclonica } from 'next/font/google';

const aclonica = Aclonica({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
});


const Sidebar = () => {

    const [showProjects, setShowProjects] = useState(true);

    const {data: projects} = useGetProjectsQuery();

    const dispatch = useAppDispatch();
        
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed, 
    );

    const isDarkMode = useAppSelector(
        (state) => state.global.isDarkMode,
    );

    const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white 
        ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}
    `;

    return (
        <div className={sidebarClassNames}>
            <div className='flex h-[100%] w-full flex-col justify-start'>
                <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 py-4 dark:bg-black">
                    <div className={`text-2xl font-bold text-gray-800 dark:text-white ${aclonica.className}`}>
                        TASKLY
                    </div>
                    {isSidebarCollapsed ? null : (
                        <button
                        onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
                        className={
                            isDarkMode
                            ? `rounded p-2 dark:hover:bg-gray-700`
                            : `rounded p-2 hover:bg-gray-100`
                        }
                        >
                        <ChevronLeft className='h-6 w-6 cursor-pointer dark:text-white' strokeWidth={2.5}></ChevronLeft>
                    </button>
                )}
                </div>
                <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700'>
                    <Image src="/logo.png" alt="Logo" width={40} height={40} />
                    <div>
                        <h3 className='text-md font-bold tracking-wide dark:text-gray-200'>
                            MY TEAM
                        </h3>
                        <div className='mt-1 flex items-start gap-2'>
                            <LockIcon className='mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400'/>
                            <p className='text-xs text-gray-500'>Private</p>
                        </div>
                    </div>
                </div>
                <nav className='z-10 w-full'>
                    <SidebarLink icon={ChartGantt} label='Timeline' href="/"/>
                </nav>

                <button onClick={() => setShowProjects((prev) => !prev)}
                className='flex w-full items-center justify-between px-8 py-3 text-gray-500'>
                    <span className="">Projects</span>
                        {showProjects ? (
                            <ChevronUp className="h-5 w-5" />
                        ) : (
                            <ChevronDown className="h-5 w-5" />
                        )}
                </button>

                {showProjects && projects?.map((project) => (
                    <SidebarLink
                        key={project.id}
                        icon={Briefcase}
                        label={project.name}
                        href={`/projects/${project.id}`}/>
                ))}
            </div>
        </div>
    )
};

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href} className="w-full">
            <div
                className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 
                    dark:bg-black dark:hover:bg-gray-700 ${
                        isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
                    }justify-start px-8 py-3`}
            >
                {isActive && (
                    <div className="absolute left-0 top-0 h-full w-[5px] bg-blue-200" />
                )}
                <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                <span className="font-medium text-gray-800 dark:text-gray-100">
                    {label}
                </span>
            </div>
        </Link>
    );
};


export default Sidebar;