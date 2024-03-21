import React, { useEffect, useRef, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { useParams } from 'react-router-dom';
import { EditorState } from 'lexical'; // EditorStateの型をインポート
import { nodes } from "./nodes";

const PageEdit = () => {
  const { id } = useParams();
  const [initialEditorState, setInitialEditorState] = useState(null);
  const editorStateRef = useRef<EditorState | null>(null);


  useEffect(() => {
    const loadContent = async () => {
      const response = await fetch(`http://localhost:8000/api/rich/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch page');
      }
      const data = await response.json();
      console.log(data.root);
      setInitialEditorState(data.root);
    };

    loadContent();
  }, [id]);

  // ここでsaveContent関数を実装するか、もしくは別途定義してください
  const saveContent = (content:any) => {
    console.log("Saving content:", content);
    // ここに実際の保存処理を記述
  };

  if (!initialEditorState) {
    return <div>Loading...</div>;
  }

  const editorConfig = {
    namespace: "MyEditor",
    onError: (error: any) => console.error(error),
    nodes: nodes,
    editorState: initialEditorState, // これはデータベースから取得した後に設定されます
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className='TableNode__contentEditable' />}
          placeholder={<div className="placeholder">What's on your mind?</div>} 
          ErrorBoundary={LexicalErrorBoundary}/>
        <OnChangePlugin onChange={editorState => editorStateRef.current = editorState} />
        <button onClick={() => {
          if (editorStateRef.current) {
            saveContent(JSON.stringify(editorStateRef.current))
          }
        }}>Save Changes</button>
    </LexicalComposer>
  );
};
export default PageEdit;
