import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { createEditor, LexicalEditor } from "lexical";
import { theme } from "./lexical-plugin/Theme";
import { nodes } from './lexical-plugin/nodes';
import { loadEditorState } from "../../utils/LoadEditorState";
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";
import EditorBase from "./EditorBase";
import "./lexical-plugin/Theme.scss";

function onError(error: any) {
  console.error(error);
}

function UpdateEditor() {
  const { id } = useParams();
  const [serializedEditorState, setSerializedEditorState] = useState<string>("");
  const [editor, setEditor] = useState<LexicalEditor | null>(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const data = await loadEditorState(id);
        setSerializedEditorState(data);
      } catch (error) {
        console.error("データロードエラー:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (serializedEditorState) {
      const editorInstance = createEditor(
        {
          namespace: "UpdateEditor",
          theme: theme,
          onError,
          nodes: nodes
        });
      setEditor(editorInstance);
    }
  }, [serializedEditorState]);

  useEffect(() => {
    if (editor) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0.5); 
    }
  }, [editor]);

  if (!editor) {
    return (<></>
    );
  }

  const initialConfig = {
    namespace: "UpdateEditor",
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
