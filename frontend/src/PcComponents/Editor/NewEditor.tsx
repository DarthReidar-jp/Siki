import EditorBase from './EditorBase';
import SaveButton from "./SaveButton";
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
  return <EditorBase initialConfig={initialEditorConfig}>
    <SaveButton />
  </EditorBase>;
};

export default NewPage;
