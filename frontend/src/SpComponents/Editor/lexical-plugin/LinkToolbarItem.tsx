import { FC, useState } from 'react';
import { FocusTrap, Popover } from '@headlessui/react';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { validateUrl } from './validateUrl'; 

const LinkToolbarItem: FC = () => {
    const [url, setUrl] = useState('');
    const [editor] = useLexicalComposerContext();
    return (
        <Popover className="relative">
            <Popover.Button className='...'>
                <span>リンクに変換</span>
            </Popover.Button>
            <Popover.Panel className="absolute ...">
                {({ close }) => (
                    <FocusTrap>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='url' className='text-xs'>URL(https://)</label>
                            <input id='url' onChange={(e) => { setUrl(e.target.value); }}
                                className='...' />
                            <div className='...'>
                                <button onClick={() => {
                                    if (validateUrl(url)) {
                                        editor.dispatchCommand(
                                            TOGGLE_LINK_COMMAND,
                                            url,
                                        );
                                    } else {
                                        console.error('invalid url');
                                    }
                                    close();
                                }} className='...'>挿入</button>
                            </div>
                        </div>
                    </FocusTrap>
                )}
            </Popover.Panel>
        </Popover>
    );
};

export default LinkToolbarItem;