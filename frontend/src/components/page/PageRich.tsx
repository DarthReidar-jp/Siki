import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'; // リッチテキスト用のプラグイン
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'; // リンクの追加サポート
import { ListPlugin } from '@lexical/react/LexicalListPlugin'; // リスト作成のサポート
import { useNavigate } from 'react-router-dom';
import './pagerich.css';
import { nodes } from "./nodes";

const editorConfig = {
  namespace: "MyEditor",
  onError: (error: any) => console.error(error),
  nodes: nodes, // ノードの設定はリッチテキストに適したものを含める
};

const EditorActions = () => {
  const [editor] = useLexicalComposerContext();
  const navigate = useNavigate();

  // エディタの状態を非同期で保存
  const saveEditorContent = async (serializedState: any) => {
    console.log(serializedState);
    try {
      const response = await fetch('http://localhost:8000/api/page/rich', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serializedState),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Page created:', result);
        navigate(`/${result.page._id}`);
      } else {
        console.error('Failed to save the page');
      }
    } catch (error) {
      console.error('Error saving the page', error);
    }
  };

  const saveContent = () => {
    const editorState = editor.getEditorState();
    editorState.read(() => {
      const serializedState = editorState.toJSON();
      // 非同期の保存処理を呼び出し
      saveEditorContent(serializedState);
    });
  };

  return (
    <button onClick={saveContent}>Save</button>
  );
};

const PageRich = () => {
  return (
    <div className="container">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="page-detail">
          <div className='editorContainer'>
            <RichTextPlugin
                contentEditable={<ContentEditable className='contentEditable'/>}
                placeholder={<div className="placeholder">What's on your mind?</div>}
                ErrorBoundary={LexicalErrorBoundary}/>
            <AutoFocusPlugin />
            <HistoryPlugin />
            <ListPlugin /> 
            <LinkPlugin /> 
            <EditorActions />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};
export default PageRich;
