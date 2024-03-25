import React from 'react';
import { EditorState } from "lexical";
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import SaveButton from "./SaveButton";
import "./Editor.css";

function onChange(editorState: EditorState) {
  console.log(editorState);
}

const editorConfig = {
  namespace: "MyEditor",
  onError: (error: any) => console.error(error),
};

const NewEditor = () => {

  return (
    <div className="container">
      <div className="page-diteil">
        <div className="page-diteil-body">
          <LexicalComposer initialConfig={editorConfig}>
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<div>Enter some text...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChange} />
            <AutoFocusPlugin />
            <SaveButton />
          </LexicalComposer>
        </div>
      </div>
    </div>
  );
};

export default NewEditor;
