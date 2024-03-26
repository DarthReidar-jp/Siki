// components/sidebar/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import './sidebar.css'
import TopPageButton from './TopPageButton';

function Sidebar() {
  // サイドバーの表示状態を管理するための状態変数
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // マウスが左端にあるかどうかを検出する関数
    const handleMouseMove = (e:any) => {
      if (e.clientX < 20) { // 画面の左端から30px以内の範囲を検出範囲とする
        setIsVisible(true);
      }
      // サイドバーが表示されているが、マウスがサイドバーの範囲外（80px以上離れた場所）に移動した場合
      else if (isVisible && e.clientX > 180) {
        setIsVisible(false);
      }
      // 上記以外の場合は状態を変更しない（サイドバーの内部でのマウス移動を許可）
    };

    // イベントリスナーを追加
    window.addEventListener('mousemove', handleMouseMove);

    // コンポーネントがアンマウントされる時にイベントリスナーを削除
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  },[isVisible]);
  return (
    <div className={`sidebar ${isVisible ? 'active' : ''}`}>
      <ul>
        <TopPageButton />
      </ul>
    </div>
  );
}

export default Sidebar;
