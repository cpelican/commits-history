import {useEffect, useState} from 'react';
import {fetchItems} from './fetchers';

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

export type UseCommitsApiType = [APIItem[], boolean, string];

export class Hooks {
    public static useCommitsApi = (): UseCommitsApiType => {
        const [error, setError] = useState<string | null>(null),
            [isLoading, setIsLoading] = useState<boolean>(false),
            [items, setItems] = useState<APIItem[]>([]);

        useEffect(() => {
            async function fetchData() {
                setIsLoading(true);
                try {
                    const apiItems = await fetchItems();
                    setItems(apiItems);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (e: any) {
                    setError(e.message);
                }
            }

            const hasSomeItems = items.length !== 0;
            if (!hasSomeItems && !isLoading) {
                fetchData();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return [items, isLoading, error];
    };
}
