import React from 'react';
import { EditorState } from "lexical";
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import './pagerich.css';
import { nodes } from "./nodes";
import EditorActions from "./EditerActions";
import InlineToolbarPlugin from "./InlineToolbarPlugin";
import ToolbarPlugin from "./ToolbarPlugin";
import MarkdownPlugin from "./MarkdownPlugin";

function onChange(editorState: EditorState) {
  console.log(editorState);
}

const editorConfig = {
  namespace: "MyEditor",
  onError: (error: any) => console.error(error),
  nodes: nodes,
};

const NewEditor = () => {

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <ToolbarPlugin />
      <InlineToolbarPlugin />
      <div>
        <RichTextPlugin
          contentEditable={<ContentEditable className='TableNode__contentEditable' />}
          placeholder={<div className="placeholder">What's on your mind?</div>}
          ErrorBoundary={LexicalErrorBoundary} />
        <ListPlugin />
        <CheckListPlugin />
        <MarkdownPlugin />
        <AutoFocusPlugin />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <EditorActions />
      </div>
    </LexicalComposer>
  );
};

export default NewEditor;
