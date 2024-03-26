import React from 'react';
import {
FORMAT_TEXT_COMMAND,
TextFormatType,
} from "lexical";
import { useCallback } from "react";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const textFormat = [
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "code",
    "subscript",
    "superscript",
];

const InlineToolbarPlugin: React.FC = () => {
    const [editor] = useLexicalComposerContext();

    const formatText = useCallback(
        (format: TextFormatType) => {
            editor.update(() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
            });
        },
        [editor]
    );

    return (
        <div>
            {textFormat.map((format) => (
                <button
                    key={format}
                    type="button"
                    onClick={() => formatText(format as TextFormatType)}
                >
                    {format}
                </button>
            ))}
        </div>
    );
};


export default InlineToolbarPlugin;
