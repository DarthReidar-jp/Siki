// components/HamburgerMenu
import React from 'react';

// Propsの型定義
interface HamburgerMenuProps {
    toggleMenu: () => void; // toggleMenu は引数を取らず、戻り値がない関数
  }

  const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ toggleMenu })  => {
  return (
    <button onClick={toggleMenu} className="p-2 focus:outline-none focus:ring-2 focus:ring-gray-500">
      <div className="space-y-2">
        <span className="block w-8 h-0.5 bg-gray-700"></span>
        <span className="block w-8 h-0.5 bg-gray-700"></span>
        <span className="block w-8 h-0.5 bg-gray-700"></span>
      </div>
    </button>
  );
};

export default HamburgerMenu;
