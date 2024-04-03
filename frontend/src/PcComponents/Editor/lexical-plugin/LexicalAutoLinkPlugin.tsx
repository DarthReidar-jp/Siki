import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import { FC } from 'react';
import { urlRegex,FRONTEND_URL_SEARCH_PATTERN} from './validateUrl';

const LexicalAutoLinkPlugin: FC = () => (
    <AutoLinkPlugin matchers={[(text: string) => {
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

        // フロントエンド URL 検索パターン
        const frontendUrlMatch = FRONTEND_URL_SEARCH_PATTERN.exec(text);
        if (frontendUrlMatch !== null) {
          const fullMatch = frontendUrlMatch[0];
          const searchQuery = encodeURIComponent(frontendUrlMatch[1]);
          const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
          return {
            index: frontendUrlMatch.index,
            length: fullMatch.length,
            text: fullMatch,
            url: `${frontendUrl}search?query=${searchQuery}`,
          };
        }
        return null;
    }]} />
);

export default LexicalAutoLinkPlugin;