export interface APIItem {
    sha: string;
    commit: {
        author: {
            date: string;
        };
        message: string;
    };
    author: {
        avatar_url: string;
        login: string;
    };
}

export type ApiCallState = 'idle' | 'error' | 'input-change' | 'polling' | 'loading';

export interface AppState {
    items: APIItem[] | null;
    errorStatus: number | null;
}
