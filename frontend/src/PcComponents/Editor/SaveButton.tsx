import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useNavigate } from 'react-router-dom';

const EditorActions = () => {
    const [editor] = useLexicalComposerContext();
    const navigate = useNavigate();

    const saveEditorContent = async (serializedState: any) => {
        const response = await fetch('http://localhost:8000/api/rich', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serializedState),
        });
        const result = await response.json();
        console.log('Page created:', result);
        console.log(JSON.stringify(serializedState));
        navigate(`/${result.page._id}`);
    };

    const saveContent = () => {
        const editorState = editor.getEditorState();
        editorState.read(() => {
            const serializedState = editorState.toJSON();
            const rootObject = { root: serializedState };
            saveEditorContent(rootObject);
        });
    };

    return (
        <button className='button' onClick={saveContent}>Save</button>
    );
};

export default EditorActions;
