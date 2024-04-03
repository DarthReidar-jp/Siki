import React from 'react';
import { EditorState } from "lexical";
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import InlineToolbarPlugin from './lexical-plugin/InlineToolbarPlugin';
import MarkdownPlugin from './lexical-plugin/MarkdownPlugin';
import ToolbarPlugin from './lexical-plugin/ToolbarPlugin';
import SaveButton from "./SaveButton";
import "./Editor.scss";
import { nodes } from './nodes';
import { theme } from "./Theme";

import { validateUrl } from "./lexical-plugin/validateUrl";
import ClickableLinkPlugin from "./lexical-plugin/ClickableLinkPlugin";
import LexicalAutoLinkPlugin from "./lexical-plugin/LexicalAutoLinkPlugin";
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'


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
            <LinkPlugin validateUrl={validateUrl} />
            <ClickableLinkPlugin />
            <TabIndentationPlugin />
            <LexicalAutoLinkPlugin />
          </div>
          <SaveButton />
        </LexicalComposer>
      </div>
    </div>
  );
};

export default NewEditor;
