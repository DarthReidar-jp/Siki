import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { createEditor, EditorState, LexicalEditor } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { loadEditorState } from "./LoadEditorState";
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import EditorActions from "./EditorActions";
import InlineToolbarPlugin from "./InlineToolbarPlugin";
import ToolbarPlugin from "./ToolbarPlugin";
import MarkdownPlugin from "./MarkdownPlugin";
import DeleteButton from "./DeleteButton";
import { nodes } from "./nodes";

const theme = {
};

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
    theme,
    nodes,
    onError,
    editorState: editor.parseEditorState(serializedEditorState)
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <InlineToolbarPlugin />
      <div>
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<div>Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <ListPlugin />
        <CheckListPlugin />
        <MarkdownPlugin />
        <AutoFocusPlugin />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <EditorActions />
        <DeleteButton id={id} />
      </div>
    </LexicalComposer>
  );
}

export default Editor;
