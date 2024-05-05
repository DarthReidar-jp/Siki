import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import { FC } from 'react';
import { urlRegex, FRONTEND_URL_SEARCH_PATTERN } from './validateUrl';

// LexicalAutoLinkPluginコンポーネントは、自動リンク機能を提供します
const LexicalAutoLinkPlugin: FC = () => (
 <AutoLinkPlugin
   // マッチャー関数を定義して、リンクとして扱う文字列のパターンを設定します
   matchers={[(text: string) => {
     // 標準のURLパターンにマッチする場合
     const urlMatch = urlRegex.exec(text);
     if (urlMatch !== null) {
       const fullMatch = urlMatch[0];
       const isHttpUrl = fullMatch.startsWith('http');
       const protocol = isHttpUrl ? fullMatch : `https://${fullMatch}`;
       return {
         index: urlMatch.index,
         length: fullMatch.length,
         text: fullMatch,
         url: protocol,
       };
     }

     // フロントエンドのURLパターンにマッチする場合
     const frontendUrlMatch = FRONTEND_URL_SEARCH_PATTERN.exec(text);
     if (frontendUrlMatch !== null) {
       const fullMatch = frontendUrlMatch[0];
       console.log(fullMatch);
       const searchQuery = encodeURIComponent(frontendUrlMatch[1]);
       const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
       return {
         index: frontendUrlMatch.index,
         length: fullMatch.length,
         text: fullMatch,
         url: `${frontendUrl}search?query=${searchQuery}`,
       };
     }

     // マッチしない場合はnullを返す
     return null;
   }]}
 />
);

export default LexicalAutoLinkPlugin;