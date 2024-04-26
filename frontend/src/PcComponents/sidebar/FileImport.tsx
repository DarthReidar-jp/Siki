// components/sidebar/FileImport.tsx
import React, { useState } from 'react';

const FileImport = () => {
  // 進捗状況を管理するための状態変数
  const [progress, setProgress] = useState('');

  // ファイル選択時の処理
const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
  
      // ファイル形式がJSONかどうかをチェック
      if (!file.type.includes('json')) {
        alert('JSON形式のファイルを選択してください。');
        return;
      }
  
      // ファイル内容を読み込み
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          setProgress('ファイルを送信中...');
          try {
            // 環境変数からバックエンドURLを取得
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            // ファイル内容をバックエンドに送信
            const response = await fetch(`${backendUrl}json`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data: text }),
            });
  
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
  
            setProgress('送信完了！');
          } catch (error) {
            console.error('ファイルの送信に失敗しました。', error);
            setProgress('エラーが発生しました。');
          }
        }
      };
      reader.readAsText(file);
    }
  };
  

  return (
    <li className="px-5 py-3 hover:bg-blue-900 transition duration-300 cursor-pointer">
      <input type="file" accept=".json" onChange={handleFileChange} className='appearance-none w-full text-xs'/>
      <p className="text-xs mt-1 text-white">{progress}</p>
    </li>
  );
};

export default FileImport;
