import React, { useState } from 'react';
import { uploadJsonFile } from "../../utils/fetch/uploadJsonFile";
import { ProjectIdProps } from '../../utils/types/types';

const Import:React.FC<ProjectIdProps> = ({ projectId }) => {
  const [progress, setProgress] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.includes('json')) {
        alert('JSON形式のファイルを選択してください。');
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          console.log("読み込まれたファイルの内容:", text); 
          setProgress('ファイルを送信中...');
          try {
            const projectIdToSend = projectId ?? undefined;
            await uploadJsonFile(text, projectIdToSend); 
            setProgress('送信完了！');
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
    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
      <label className="flex w-full cursor-pointer">
        <div className="relative w-full">
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer "
          />
          <div className="flex w-full h-full ">
            <span className="text-gray-600 text-left">import Scrapbox file</span>
          </div>
        </div>
      </label>
      <p className="text-xs mt-1 text-gray-400">{progress}</p>
    </div>
  );
};

export default Import;
