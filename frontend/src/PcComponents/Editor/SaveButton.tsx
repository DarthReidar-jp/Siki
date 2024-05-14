import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useNavigate } from 'react-router-dom';
import { FaRegSave } from "react-icons/fa";
import { saveEditorState } from '../../utils/fetch/LoadEditorState'; // Adjust the path as necessary

const EditorActions = ({ projectId }: { projectId?: any }) => {
    const [editor] = useLexicalComposerContext();
    const navigate = useNavigate();

    const saveEditorContent = async (serializedState: any) => {
        const response = await saveEditorState(serializedState, projectId);
        if (projectId) {
            // Navigate to project-specific page when projectId is provided
            navigate(`/project/${projectId}/${response.page._id}`);
        } else {
            // Navigate to general page when no projectId is provided
            navigate(`/page/${response.page._id}`);
        }
    };

    const saveContent = () => {
        const editorState = editor.getEditorState();
        editorState.read(() => {
            const serializedState = editorState;
            const rootObject = { root: serializedState };
            saveEditorContent(rootObject);
        });
    };

    return (
        <button className='button' onClick={saveContent}>
            <FaRegSave />
        </button>
    );
};

export default EditorActions;
