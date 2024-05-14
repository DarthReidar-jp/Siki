import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { createEditor, LexicalEditor } from "lexical";
import { theme } from "./Theme";
import { nodes } from './nodes';
import { loadEditorState } from "../../utils/fetch/LoadEditorState";
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";
import "./Theme.scss";
import EditorBase from "./EditorBase";

function onError(error: any) {
  console.error(error);
}

function UpdateEditor() {
  const { id } = useParams();
  const [serializedEditorState, setSerializedEditorState] = useState<string>("");
  const [editor, setEditor] = useState<LexicalEditor | null>(null);

  //データの取得
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
  //Editorの作成
  useEffect(() => {
    if (serializedEditorState) {
      const editorInstance = createEditor(
        {
          namespace: "MyEditor",
          theme: theme,
          onError,
          nodes: nodes
        });
      setEditor(editorInstance);
    }
  }, [serializedEditorState]);

  if (!editor) return <>Loading...</>;

  const initialConfig = {
    namespace: "MyEditor",
    theme: theme,
    onError,
    nodes: nodes,
    editorState: editor.parseEditorState(serializedEditorState)
  };

  return (
    <EditorBase initialConfig={initialConfig}>
      <UpdateButton id={id} />
      <DeleteButton id={id} />
    </EditorBase>
  );
};

export default UpdateEditor;
