import {useEffect, useState} from 'react';
import {Fetcher} from './fetchers';

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

export type UseCommitsApiType = [APIItem[], number | null];

export class Hooks {
    public static useCommitsApi = (): UseCommitsApiType => {
        const [errorStatus, setErrorStatus] = useState<number | null>(null),
            [items, setItems] = useState<APIItem[]>([]);

        useEffect(() => {
            Fetcher.subscribe(setItems, setErrorStatus);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return [items, errorStatus];
    };
}
