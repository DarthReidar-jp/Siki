import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useNavigate } from 'react-router-dom';
import { FaRegSave } from "react-icons/fa";

const EditorActions = () => {
    const [editor] = useLexicalComposerContext();
    const navigate = useNavigate();

    const saveEditorContent = async (serializedState: any) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${backendUrl}page/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest' 
            },
            body: JSON.stringify(serializedState),
        });
        const result = await response.json();
        navigate(`/page/${result.page._id}`);
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
        <button className='button' onClick={saveContent}><FaRegSave /></button>
    );
};

export default EditorActions;
