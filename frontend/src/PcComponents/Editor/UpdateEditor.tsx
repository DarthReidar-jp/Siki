import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { createEditor, LexicalEditor } from "lexical";
import { theme } from "./lexical-plugin/Theme";
import { nodes } from './lexical-plugin/nodes';
import { loadEditorState } from "../../utils/fetch/LoadEditorState";
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";
import EditorBase from "./EditorBase";
import "./lexical-plugin/Theme.scss";
import { useVerifyProjectAccess } from "../../utils/useVerifyProjectAccess";

function onError(error: any) {
  console.error(error);
}

function UpdateEditor() {
  const { projectId, id } = useParams<{ projectId?: string, id: string }>();
  const [serializedEditorState, setSerializedEditorState] = useState<string>("");
  const [editor, setEditor] = useState<LexicalEditor | null>(null);
  const access = useVerifyProjectAccess(projectId);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await loadEditorState(id, projectId);
        setSerializedEditorState(data);
      } catch (error) {
        console.error("データロードエラー:", error);
      }
    };
    fetchData();
  }, [id, projectId]);

  useEffect(() => {
    if (serializedEditorState) {
      const editorInstance = createEditor(
        {
          namespace: "UpdateEditor",
          theme: theme,
          onError,
          nodes: nodes,
          editable: access.isMember
        });
      setEditor(editorInstance);
      console.log(`Editor set to ${access.isMember ? "editable" : "read-only"} mode.`);  // コンソールにモードの変更を表示
    }
  }, [serializedEditorState, access.isMember]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(access.isMember);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0.5);
    }
  }, [editor, access.isMember]);

  if (!editor) {
    return (<></>
    );
  }

  const initialConfig = {
    namespace: "UpdateEditor",
    theme: theme,
    onError,
    nodes: nodes,
    editorState: editor.parseEditorState(serializedEditorState),
    editable: access.isMember
  };

  return (
    <EditorBase initialConfig={initialConfig}>
      {access.isMember && (
        <>
          <UpdateButton id={id} projectId={projectId} />
          <DeleteButton id={id} projectId={projectId} />
        </>
      )}
    </EditorBase>
  );
};

export default UpdateEditor;
