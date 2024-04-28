import React, { useState, useEffect, useCallback } from 'react';
import TopPageButton from "./TopPageButton";
import ChatButton from "./ChatButton";
import LogoutButton from "./LogoutButton";

interface SidebarProps {
    isOpen: boolean;
    closeMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeMenu }) => {
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const handleTouchStart = useCallback((e: TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    }, []);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        setTouchEnd(e.touches[0].clientX);
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (touchEnd - touchStart > 50) {  // 左から右へのスワイプが50pxより大きい場合
            closeMenu();
        }
    }, [touchStart, touchEnd, closeMenu]);

    useEffect(() => {
        const sidebarElement = document.getElementById('sidebar');
        if (sidebarElement && isOpen) {
            sidebarElement.addEventListener('touchstart', handleTouchStart);
            sidebarElement.addEventListener('touchmove', handleTouchMove);
            sidebarElement.addEventListener('touchend', handleTouchEnd);

            return () => {
                sidebarElement.removeEventListener('touchstart', handleTouchStart);
                sidebarElement.removeEventListener('touchmove', handleTouchMove);
                sidebarElement.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [isOpen, handleTouchStart, handleTouchMove, handleTouchEnd]);  // すべての関連関数を依存配列に含める

    return (
        <div id="sidebar" className={`fixed top-0 right-0 w-80 h-full bg-gray-800 text-white shadow-2xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="flex flex-col justify-between h-full ">
                <div className='bg-gray-800'>
                    <div className="p-5">
                        <h1 onClick={closeMenu} className="text-xl font-bold mb-5">メニュー</h1>
                    </div>
                    <ul className="space-y-4 p-5">
                        <TopPageButton closeSidebar={closeMenu} />
                        <ChatButton closeSidebar={closeMenu} />
                        <LogoutButton closeSidebar={closeMenu} />
                    </ul>
                </div>
                <div className="p-5">
                    <p className="text-gray-400 text-sm">© 2024 Siki</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
