//PCコンポーネント
export interface PcComponentProps {
    isLoggedIn: boolean;
}


//List系
export interface Page {
    _id: string;
    title: string;
    content: string;
    score?: number;
}
export interface PageItemProps {
    page: Page;
    projectId?: string;
  }
export interface PageListProps {
    pages: Page[];
    projectId?: string;
}
export interface FetchPagesError {
    message: string;
}

export interface InitialData {
    pages: Page[][];
    pageParams: number[];
}
export interface SortSelectProps {
    sort: string;
    onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

//chatコンポーネント系
export interface Message {
    text: string;
    timestamp: string;
    sender: 'user' | 'ai';
}
export interface MessageInputProps {
    inputText: string;
    isLoading: boolean;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent) => void;
}
export interface MessageListProps {
    messages: Message[];
    isLoading: boolean;
}

//サイドバー
export interface Chat  {
    id: string;
    title: string;
};

//Editor系
export interface EditorConfig {
    namespace: string;
    theme: any;
    onError: (error: Error) => void;
    nodes: any[];
    editorState?: any;
}

export interface EditorBaseProps {
    initialConfig: EditorConfig;
    children: React.ReactNode;
}

//プロジェクト系
export interface Project  {
    projectId: string;
    projectName: string;
    isPublic:boolean;
};