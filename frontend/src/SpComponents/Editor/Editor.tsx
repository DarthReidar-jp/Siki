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
import "./Editor.css";

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
      const editorInstance = createEditor();
      setEditor(editorInstance);
    }
  }, [serializedEditorState]);

  if (!editor) return <>Loading...</>;

  const initialConfig = {
    namespace: "MyEditor",
    theme: theme,
    onError,
    editorState: editor.parseEditorState(serializedEditorState)
  };

  return (
    <div className="page-container">
      <div className="page">
        <div className="editor">
          <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<div>Enter some text...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChange} />
            <AutoFocusPlugin />
            <UpdateButton id={id} />
            <DeleteButton id={id} />
          </LexicalComposer>
        </div>
      </div>
    </div>

  );
};

export default Editor;
