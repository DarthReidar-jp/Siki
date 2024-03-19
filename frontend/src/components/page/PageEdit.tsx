import React, { useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useNavigate, useParams } from 'react-router-dom';
import { nodes } from "./nodes";

const editorConfig = {
    namespace: "MyEditor",
  onError: (error: any) => console.error(error),
  nodes: nodes,
};

const PageEdit = () => {
  const [editor] = useLexicalComposerContext();
  const navigate = useNavigate();
  const { pageId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`http://localhost:8000/api/page/rich/${pageId}`, {
            method: 'GET',
            credentials: 'include',
          });
        if (!response.ok) {
        throw new Error('Failed to fetch page');
        }
      const data = await response.json();

      // データをデシリアライズしてエディタに反映
      editor.update(() => {
        editor.setEditorState(editor.parseEditorState(data.node));
      });
    };

    fetchData();
  }, [editor, pageId]);

  const onSave = async () => {
    // 現在のエディタの状態を取得してシリアライズ
    const serializedState = editor.getEditorState().toJSON();

    try {
      const response = await fetch(`http://localhost:8000/api/page/rich/${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ node: serializedState }),
        credentials: 'include',
      });

      if (response.ok) {
        navigate(`/rich/${pageId}`);
      } else {
        console.error('Failed to update the page');
      }
    } catch (error) {
      console.error('Error updating the page', error);
    }
  };

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
            <button onClick={onSave}>Update</button>
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};

export default PageEdit;
