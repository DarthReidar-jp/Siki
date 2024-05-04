import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useNavigate } from 'react-router-dom';
import { FaRegSave } from "react-icons/fa";

const UpdateButton = ({ id }: { id: any }) => {
    const [editor] = useLexicalComposerContext();
    const navigate = useNavigate();

    const updateEditorContent = async (serializedState: any) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${backendUrl}page/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest' // このヘッダーを追加
            },
            body: JSON.stringify(serializedState),
        });
        const result = await response.json();
        console.log('ページの更新:', result);
        navigate(`/`);
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
