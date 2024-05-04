import EditorBase from './EditorBase';
import SaveButton from "./SaveButton";
import { theme } from './lexical-plugin/Theme';
import { nodes } from './lexical-plugin/nodes';

function onError(error: any) {
  console.error(error);
}
const editorConfig = {
  namespace: "MyEditor",
  theme: theme,
  onError,
  nodes: nodes
};

const NewPage = () => {
  return <EditorBase initialConfig={editorConfig}>
    <SaveButton />
  </EditorBase>;
};

export default NewPage;
