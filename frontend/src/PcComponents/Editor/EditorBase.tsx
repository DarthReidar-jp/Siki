import React from 'react';
import { EditorBaseProps } from '../../utils/types/types';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import MarkdownPlugin from './lexical-plugin/MarkdownPlugin';
import LexicalAutoLinkPlugin from "./lexical-plugin/LexicalAutoLinkPlugin";
import ClickableLinkPlugin from "./lexical-plugin/ClickableLinkPlugin";

const EditorBase = ({ initialConfig, children }: EditorBaseProps) => {
    return (
        <div className="flex justify-center p-4 mt-8">  
            <div className="w-full max-w-xl bg-white p-4 border rounded ">
                <LexicalComposer initialConfig={initialConfig}>
                    <div className="bg-white rounded p-4 mb-4 min-h-[300px]">
                        <RichTextPlugin
                            contentEditable={<ContentEditable className="min-h-[150px] bg-transparent border-none outline-none w-full" />}
                            placeholder={<div className="absolute text-gray-400 top-32 pb-1 left-96 pointer-events-none select-none">Enter some text...</div>}
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <TabIndentationPlugin />
                        <OnChangePlugin onChange={(editorState) => console.log(editorState)} />
                        <AutoFocusPlugin />
                        <HistoryPlugin />
                        <MarkdownPlugin />
                        <LexicalAutoLinkPlugin />
                        <ClickableLinkPlugin />
                    </div>
                    <div className="fixed right-72 top-28 flex flex-col gap-4 text-gray-400">
                        {children}
                    </div>
                </LexicalComposer>
            </div>
        </div>
    );
};

export default EditorBase;
