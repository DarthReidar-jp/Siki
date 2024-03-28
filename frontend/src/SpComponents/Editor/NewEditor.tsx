import React from 'react';
import { EditorState } from "lexical";
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import InlineToolbarPlugin from './InlineToolbarPlugin';
import MarkdownPlugin from './MarkdownPlugin';
import ToolbarPlugin from './ToolbarPlugin';
import SaveButton from "./SaveButton";
import "./Editor.scss";
import { nodes } from './nodes';
import { theme } from "./Theme";


function onChange(editorState: EditorState) {
  console.log(editorState);
}
function onError(error: any) {
  console.error(error);
}

const editorConfig = {
  namespace: "MyEditor",
  theme:theme,
  onError,
  nodes:nodes
};

const NewEditor = () => {
  return (
    <div className="sp-page-container">
      <div className="page">
        <LexicalComposer initialConfig={editorConfig}>
          <ToolbarPlugin />
          <InlineToolbarPlugin />
          <div className="editor">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<div className='placeholder'>タイトル</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChange} />
            <AutoFocusPlugin />
            <MarkdownPlugin />
            <HistoryPlugin />
          </div>
          <SaveButton />
        </LexicalComposer>
      </div>
    </div>
  );
};

export default NewEditor;
