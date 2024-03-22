import React from 'react';
import { EditorState } from "lexical";
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import './pagerich.css';
import EditorActions from "./EditorActions";

function onChange(editorState: EditorState) {
  console.log(editorState);
}

const editorConfig = {
  namespace: "MyEditor",
  onError: (error: any) => console.error(error),
};

const NewEditor = () => {

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div>
        <RichTextPlugin
          contentEditable={<ContentEditable className='TableNode__contentEditable' />}
          placeholder={<div className="placeholder">What's on your mind?</div>}
          ErrorBoundary={LexicalErrorBoundary} />
        <AutoFocusPlugin />
        <OnChangePlugin onChange={onChange} />
        <EditorActions />
      </div>
    </LexicalComposer>
  );
};

export default NewEditor;
