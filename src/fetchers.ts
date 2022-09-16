import {APIItem} from './hooks';

export const ViewConfig = {
    url: 'https://api.github.com/repos/cpelican/commits-history/commits',
};

export class Fetcher {
    public static requestTimeout = 3_000;
    public static isPendingFetchRequest = false;
    // helped by from https://javascript.info/long-polling
    public static async subscribe(handleResponse: (resp: APIItem[]) => void, handleErrorStatus: (status: number) => void) {
        Fetcher.isPendingFetchRequest = true;
        const response = await fetch(ViewConfig.url, {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: 'Bearer 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',
            },
        });

        if (response.status === 502) {
            await Fetcher.subscribe(handleResponse, handleErrorStatus);
            return;
        }
        if (!response.ok) {
            Fetcher.isPendingFetchRequest = false;
            handleErrorStatus(response.status);
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
            handleResponse(responseData);
        }
        await new Promise((resolve) => setTimeout(resolve, Fetcher.requestTimeout));
        if (Fetcher.isPendingFetchRequest) {
            return;
        }
        await Fetcher.subscribe(handleResponse, handleErrorStatus);
    }
}
