import { useEffect } from 'react';
import type { LexicalEditor } from 'lexical';
import { $getNearestNodeFromDOMNode, $getSelection, $isRangeSelection } from 'lexical';
import { LinkNode ,$isLinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// リンクをクリックした時の動作をカスタマイズするための関数型の型
type LinkFilter = (event: MouseEvent, linkNode: LinkNode) => boolean;

export default function ClickableLinkPlugin({
  filter, // リンクをクリックした時の動作をカスタマイズする関数
  newTab = false, // 新しいタブでリンクを開くかどうかのフラグ
}: {
  filter?: LinkFilter;
  newTab?: boolean;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // クリックイベントハンドラ
    function onClick(e: Event) {
      const event = e as MouseEvent | PointerEvent;
      const linkDomNode = getLinkDomNode(event, editor); // クリックされたリンクの DOM ノードを取得

      if (linkDomNode === null) {
        return;
      }

      const href = linkDomNode.getAttribute('href');

      // コンテンツ編集可能でない場合や href が存在しない場合は処理を終了
      if (linkDomNode.getAttribute('contenteditable') === 'false' || href === undefined) {
        return;
      }

      // リンクテキストを選択した場合は処理を終了
      const selection = editor.getEditorState().read($getSelection);
      if ($isRangeSelection(selection) && !selection.isCollapsed()) {
        return;
      }

      let linkNode = null;
      editor.update(() => {
        const maybeLinkNode = $getNearestNodeFromDOMNode(linkDomNode);

        if ($isLinkNode(maybeLinkNode)) {
          linkNode = maybeLinkNode;
        }
      });

      // フィルター関数が指定されている場合は、そのフィルターを通過しない場合は処理を終了
      if (linkNode === null || (filter !== undefined && !filter(event, linkNode))) {
        return;
      }

      try {
        // リンクを新しいタブで開くかどうかを判定
        if (href !== null) {
          const isMiddle = event.type === 'auxclick' && event.button === 1;
          window.open(href, newTab || event.metaKey || event.ctrlKey || isMiddle ? '_blank' : '_self');
          event.preventDefault(); // デフォルトの動作を防ぐ
        }
      } catch {
        // エラーが発生した場合は無視する
      }
    }

    // Lexical エディタのルートリスナーを登録
    return editor.registerRootListener((rootElement: null | HTMLElement, prevRootElement: null | HTMLElement) => {
      if (prevRootElement !== null) {
        prevRootElement.removeEventListener('click', onClick);
        prevRootElement.removeEventListener('auxclick', onClick);
      }

      if (rootElement !== null) {
        rootElement.addEventListener('click', onClick);
        rootElement.addEventListener('auxclick', onClick);
      }
    });
  }, [editor, filter, newTab]);

  return null;
}

// DOM ノードがリンクノードかどうかを判定する関数
function isLinkDomNode(domNode: Node): boolean {
  return domNode.nodeName.toLowerCase() === 'a';
}

// クリックされたリンクの DOM ノードを取得する関数
function getLinkDomNode(event: MouseEvent | PointerEvent, editor: LexicalEditor): HTMLAnchorElement | null {
  return editor.getEditorState().read(() => {
    const domNode = event.target as Node;

    if (isLinkDomNode(domNode)) {
      return domNode as HTMLAnchorElement;
    }

    if (domNode.parentNode && isLinkDomNode(domNode.parentNode)) {
      return domNode.parentNode as HTMLAnchorElement;
    }

    return null;
  });
}