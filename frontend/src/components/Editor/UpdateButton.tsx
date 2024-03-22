import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useNavigate } from 'react-router-dom';

// 引数として{id}オブジェクトを受け取るように変更
const UpdateButton = ({ id }: { id: any }) => {
    const [editor] = useLexicalComposerContext();
    const navigate = useNavigate();

    const updateEditorContent = async (serializedState: any) => {
        // テンプレート文字列の構文を正しく使用するように変更
        const response = await fetch(`http://localhost:8000/api/rich/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serializedState),
        });
        const result = await response.json();
        console.log('Page updated:', result); // ログのメッセージを「Page created」から「Page updated」に変更
        console.log(JSON.stringify(serializedState));
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
        <button onClick={updateContent}>更新</button>
    );
};

export default UpdateButton;
