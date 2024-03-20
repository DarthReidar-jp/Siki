import React, { useEffect  } from 'react';
import { EditorState } from "lexical";
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useNavigate, useParams } from 'react-router-dom';
import { nodes } from "./nodes";

const editorConfig = {
  namespace: "MyEditor",
  onError: (error: any) => console.error(error),
  nodes: nodes,
};

function onChange(editorState: EditorState) {
  console.log(editorState);
}

const EditorActions = () => {
  const [editor] = useLexicalComposerContext();
  const navigate = useNavigate();
  const saveEditorContent = async (serializedState: any) => {
      const response = await fetch('http://localhost:8000/api/page/rich', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serializedState),
      });
        const result = await response.json();
        console.log('Page created:', result);
        navigate(`/`);
  };

  const saveContent = () => {
    const editorState = editor.getEditorState();
    editorState.read(() => {
      const serializedState = editorState.toJSON();
      saveEditorContent(serializedState);
    });
  };

  return (
    <button onClick={saveContent}>Save</button>
  );
};

const PageEdit = () => {
  const [editor] = useLexicalComposerContext();
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
      editor.update(() => {
        editor.setEditorState(editor.parseEditorState(data.node));
      });
    };

    fetchData();
  }, [editor, pageId]);


  return (
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin 
          contentEditable={<ContentEditable className='contentEditable'/>} 
          placeholder={<div className="placeholder">What's on your mind?</div>}
          ErrorBoundary={LexicalErrorBoundary}/>
        <AutoFocusPlugin />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <EditorActions />
      </LexicalComposer>
  );
};

export default PageEdit;
