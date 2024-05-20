import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useNavigate } from 'react-router-dom';
import { FaRegSave } from "react-icons/fa";
import { saveEditorState } from '../../utils/fetch/LoadEditorState'; 
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // スタイルをインポート

const EditorActions = ({ projectId }: { projectId?: any }) => {
    const [editor] = useLexicalComposerContext();
    const navigate = useNavigate();

    const saveEditorContent = async (serializedState: any) => {
        const response = await saveEditorState(serializedState, projectId);
        if (projectId) {
            navigate(`/project/${projectId}/${response.page._id}`);
        } else {
            navigate(`/page/${response.page._id}`);
        }
    };

    const saveContent = () => {
        const editorState = editor.getEditorState();
        editorState.read(() => {
            const rootObject = { root: editorState };
            saveEditorContent(rootObject);
        });
    };

    return (
        <Tippy content="保存する">
            <button className='button' onClick={saveContent}>
                <FaRegSave />
            </button>
        </Tippy>
    );
};

export default EditorActions;
