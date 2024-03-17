import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import { useNavigate } from 'react-router-dom';
import './pagerich.css';
import { nodes } from "./nodes";

const editorConfig = {
  namespace: "MyEditor",
  onError: (error: any) => console.error(error),
  nodes: nodes,
};

// 新しいコンポーネントを作成し、エディタの状態操作を行います
const EditorActions = () => {
  const [editor] = useLexicalComposerContext();
  const navigate = useNavigate();
  

  const saveContent = () => {
    // エディタの状態を同期的に取得
    editor.update(() => {
      const editorState = editor.getEditorState();
      editorState.read(() => {
        const serializedState = editorState.toJSON();
        // 非同期処理はupdateの外で実行
        saveEditorContent(serializedState);
      });
    });
  };

  // 非同期の保存処理を別関数として定義
  const saveEditorContent = async (serializedState:any) => {
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
        navigate('/');
      } else {
        console.error('Failed to save the page');
      }
    } catch (error) {
      console.error('Error saving the page', error);
    }
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
            <PlainTextPlugin 
                contentEditable={<ContentEditable className='contentEditable'/>} 
                placeholder={<div className="placeholder">いまなにしてる？</div>} 
                ErrorBoundary={LexicalErrorBoundary}/>
            <AutoFocusPlugin />
            <HistoryPlugin />
            <EditorActions />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};
export default PageRich;
