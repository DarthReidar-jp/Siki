import {
  createEditor,
  EditorState,
  LexicalEditor
} from "lexical";
import { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useParams } from 'react-router-dom';
import { loadEditorState } from "./LoadEditorState";

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
    // 非同期関数をuseEffect内で定義
    const fetchData = async () => {
      try {
        const data = await loadEditorState(id); // 非同期関数を待ちます
        setSerializedEditorState(data);
      } catch (error) {
        console.error("Data loading error:", error);
        // エラーハンドリングをここで行います。
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (serializedEditorState) {
      // データがロードされた後でエディターを初期化
      const editorInstance = createEditor();
      setEditor(editorInstance);
    }
  }, [serializedEditorState]); // serializedEditorStateが変更されたらこの効果を実行

  if (!editor) return <>Loading...</>; // エディターがまだなければ、ロード中を表示

  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    editorState: editor.parseEditorState(serializedEditorState)
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
}

export default Editor;
