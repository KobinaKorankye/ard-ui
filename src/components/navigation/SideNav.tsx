"use client";

import { FaHome } from "react-icons/fa";
import NavButton from "./NavButton";
import { usePathname } from "next/navigation";
import { GiHistogram } from "react-icons/gi";
import IconButton from "./IconButton";
import { BiBell, BiBot, BiHelpCircle, BiNotification, BiSearch } from "react-icons/bi";
import { FiHelpCircle } from "react-icons/fi";
import { TbHelpCircleFilled, TbSettingsFilled } from "react-icons/tb";
import Button from "./Button";
import { LuBot } from "react-icons/lu";
import { BsFillBellFill, BsPerson } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import AppInput from "../inputs/AppInput";
import { useState } from "react";

const navs = [
    { text: 'Dashboard', path: '/u', icon: FaHome },
    { text: 'Tables', path: '/u/tables', icon: GiHistogram },
]

const other_navs = [
    { text: 'Chatbot', path: '/u/chat', icon: LuBot },
]
export default function SideNav({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();
    const [isDarkMode, setIsDarkMode] = useState(true)

    return (
        <div className={`flex w-full h-screen bg-bg dark:bg-darkbg`}>
            <div className="w-[18%] h-full flex flex-col items-center overflow-y-auto pt-[2.88rem] pb-5">
                <div className="font-bold text-sm text-dark dark:text-white">ARD DASHBOARD</div>

                <div className="mt-[2.99rem] flex flex-col">
                    {
                        navs.map((nav) => (
                            <NavButton {...nav} active={nav.path === pathname} />
                        ))
                    }
                </div>

                <div className="text-xs w-[11.72rem] font-bold text-dark mt-10">
                    AI
                </div>

                <div className="flex flex-col mt-4">
                    {
                        other_navs.map((nav) => (
                            <NavButton {...nav} active={nav.path === pathname} />
                        ))
                    }
                </div>

                <div className="flex flex-col w-[13.63rem] h-[10.59rem] bg-primary rounded-2xl p-[1.03rem] mt-auto">
                    <IconButton size="md" icon={TbHelpCircleFilled} />
                    <div className={`text-sm text-white font-bold mt-auto`}>Need help?</div>
                    <div className={`text-xs text-white mb-2`}>Please check our docs</div>
                    <Button text="DOCUMENTATION" widthClass="w-full" />
                </div>
            </div>
            <div className="w-[82%] flex flex-col col-span-6 h-full overflow-y-auto">
                <div className="flex w-full pt-[1.41rem] px-[3rem] items-center text-xs">
                    <div className="flex text-dark dark:text-white gap-1">
                        <div className="text-disabled">Pages</div>
                        <div>/</div>
                        <div>{[...navs, ...other_navs].find((nav) => nav.path === pathname)?.text}</div>
                    </div>

                    <div className="flex gap-5 items-center ml-auto">
                        <AppInput icon={BiSearch} placeholder="Type here..." />

                        <div className="flex gap-2 items-center font-bold text-dull text-xs">
                            <BsPerson className="text-lg" />
                            <div>Sign In</div>
                        </div>

                        <div className="flex gap-4 text-lg items-center text-dull text-base">
                            <TbSettingsFilled />
                            <BsFillBellFill />
                        </div>

                    </div>
                </div>
                <div className="flex w-full px-[3rem] items-center text-sm text-dark dark:text-white font-bold">
                    {[...navs, ...other_navs].find((nav) => nav.path === pathname)?.text}
                </div>
                <div className="relative w-full flex-1 flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
}
