// ImportPlugin.tsx
import { FC, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';


export const ImportPlugin: FC<{
    defaultContentAsJSON?: string;
  }> = ({
    defaultContentAsJSON
  }) => {
    const [ editor ] = useLexicalComposerContext();
  
    useEffect(() => {
      if(typeof defaultContentAsJSON === 'undefined') return;
      editor.update(() => {
        const editorState = editor.parseEditorState(defaultContentAsJSON);
        editor.setEditorState(editorState);
      });
    }, [editor, defaultContentAsJSON]);
    
    return null;
  };
  
  export default ImportPlugin;