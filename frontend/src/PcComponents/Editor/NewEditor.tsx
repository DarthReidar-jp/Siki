import EditorBase from './EditorBase';
import SaveButton from "./SaveButton";
import { useParams } from 'react-router-dom';
import { theme } from './lexical-plugin/Theme';
import { nodes } from './lexical-plugin/nodes';

function onError(error: any) {
  console.error(error);
}

const initialEditorConfig = {
  namespace: "NewEditor",
  theme: theme,
  onError,
  nodes: nodes
};

const NewPage = () => {
  const { projectId } = useParams<{ projectId?: string }>(); 
  console.log(projectId);

  return (
    <EditorBase initialConfig={initialEditorConfig}>
      <SaveButton projectId={projectId} />
    </EditorBase>
  );
};

export default NewPage;
