import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useNavigate } from 'react-router-dom';
import { FaRegSave } from "react-icons/fa";
import { updateEditorState } from '../../utils/fetch/LoadEditorState';

const UpdateButton = ({ id, projectId }: { id: any; projectId?: any }) => {
    const [editor] = useLexicalComposerContext();
    const navigate = useNavigate();

    const updateEditorContent = async (serializedState: any) => {
        const response = await updateEditorState(serializedState,id);
        console.log('ページの更新:', response);
        if (projectId) {
            // Navigate to the project-specific page when projectId is provided
            navigate(`/project/${projectId}`);
          } else {
            // Navigate to the home page when no projectId is provided
            navigate(`/`);
          }
    };

    const updateContent = () => {
        const editorState = editor.getEditorState();
        editorState.read(() => {
            const serializedState = editorState.toJSON();
            const rootObject = { root: serializedState };
            updateEditorContent(rootObject);
        });
    };

    return (
        <button className='button' onClick={updateContent}><FaRegSave /></button>
    );
};

export default UpdateButton;
