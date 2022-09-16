import {API_STORAGE_KEY} from './components/ApiKeySetterItem';
import {APIItem} from './hooks';

export const ViewConfig = {
    url: 'https://api.github.com/repos/cpelican/commits-history/commits',
};

export class Fetcher {
    public static requestTimeout = 3_000;
    public static isPendingFetchRequest = false;
    // helped by from https://javascript.info/long-polling
    public static async subscribe(
        handleResponse: (resp: APIItem[] | null) => void,
        handleErrorStatus: (status: number | null) => void,
    ) {
        Fetcher.isPendingFetchRequest = true;
        const secretKey = sessionStorage.getItem(API_STORAGE_KEY);
        if (secretKey == null) {
            await new Promise((resolve) => setTimeout(resolve, Fetcher.requestTimeout));
            await Fetcher.subscribe(handleResponse, handleErrorStatus);
            return;
        }
        const response = await fetch(ViewConfig.url, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github+json',
                // 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
                Authorization: `Bearer ${secretKey}`,
            },
        });

        if (response.status === 502) {
            await Fetcher.subscribe(handleResponse, handleErrorStatus);
            return;
        }
        if (!response.ok) {
            Fetcher.isPendingFetchRequest = false;
            handleErrorStatus(response.status);
            handleResponse(null);
            await new Promise((resolve) => setTimeout(resolve, Fetcher.requestTimeout));
            if (Fetcher.isPendingFetchRequest) {
                return;
            }
            await Fetcher.subscribe(handleResponse, handleErrorStatus);
            return;
        }

        const responseData = await response.json();
        if (response.ok && responseData != null) {
            Fetcher.isPendingFetchRequest = false;
            handleErrorStatus(null);
            handleResponse(responseData);
        }
        await new Promise((resolve) => setTimeout(resolve, Fetcher.requestTimeout));
        if (Fetcher.isPendingFetchRequest) {
            return;
        }
        await Fetcher.subscribe(handleResponse, handleErrorStatus);
    }
}
