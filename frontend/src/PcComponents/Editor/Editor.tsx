import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { createEditor, EditorState, LexicalEditor } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";
import { loadEditorState } from "./LoadEditorState";
import { theme } from "./Theme";
import InlineToolbarPlugin from './InlineToolbarPlugin';
import MarkdownPlugin from './MarkdownPlugin';
import ToolbarPlugin from './ToolbarPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import "./Editor.scss";

import { nodes } from './nodes';


function onChange(editorState: EditorState, editor: LexicalEditor) {
  editorState.read(() => {
    console.log(editorState);
  });
}

function onError(error: any) {
  console.error(error);
}

function Editor() {
  const { id } = useParams();
  const [serializedEditorState, setSerializedEditorState] = useState<string>("");
  const [editor, setEditor] = useState<LexicalEditor | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadEditorState(id);
        console.log(data);
        setSerializedEditorState(data);
      } catch (error) {
        console.error("Data loading error:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (serializedEditorState) {
      const editorInstance = createEditor(    
        {namespace: "MyEditor",
          theme: theme,
          onError,
          nodes:nodes});
      setEditor(editorInstance);
    }
  }, [serializedEditorState]);

  if (!editor) return <>Loading...</>;

  const initialConfig = {
    namespace: "MyEditor",
    theme: theme,
    onError,
    nodes:nodes,
    editorState: editor.parseEditorState(serializedEditorState)
  };

  return (
    <div className="page-container">
      <div className="page">
        <LexicalComposer initialConfig={initialConfig}>
          <ToolbarPlugin />
          <InlineToolbarPlugin />
          <div className="editor">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<div>Enter some text...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChange} />
            <AutoFocusPlugin />
            <HistoryPlugin />
            <MarkdownPlugin />
            <UpdateButton id={id} />
            <DeleteButton id={id} />
          </div>
        </LexicalComposer>
      </div>
    </div>

  );
};

export default Editor;
