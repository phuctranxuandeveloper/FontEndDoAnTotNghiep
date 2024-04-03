import React, {ReactNode, useEffect, useState} from 'react';
import { Sidebar } from '../common/Sidebar';

interface LayoutSideBarProps {
    children: ReactNode;
}

export const LayoutSideBar : React.FC<LayoutSideBarProps> = ({children}) => {
    const [sidebarWidth, setSidebarWidth] = useState<number | undefined>(undefined);
    const [sidebarTop, setSidebarTop] = useState<number | undefined>(undefined);

    useEffect( () => {
        const sidebarEl = document.querySelector(".sidebar") as HTMLElement;
        const sidebarReact = sidebarEl.getBoundingClientRect();
        setSidebarWidth(sidebarReact.width);
        setSidebarTop(sidebarReact.top);
    }, [])

    useEffect(() => {
        if (!sidebarTop) return window.addEventListener("scroll", isSticky)

        return () => {
            window.removeEventListener("scroll", isSticky)
        }
    }, [sidebarTop])

    const isSticky = () => {
        const sidebarEl = document.querySelector(".sidebar") as HTMLElement;
        const scrollTop = window.scrollY;
        if(scrollTop >= sidebarTop - 10){
            sidebarEl.classList.add("is-sticky")
        }
        else{
            sidebarEl.classList.remove("is-sticky")
        }
    }
  return (
    <>
        <main className="md:flex md:justify-between px-5 mt-8">
            <div className="content w-full md:w-[73%] ">{children}</div>
            <div className="md:w-[25%] border-2 border-solid border-gray-100 rounded-xl p-5" style={{ width: sidebarWidth }}>
                <Sidebar />
            </div>
        </main>
    </>
  )
}
