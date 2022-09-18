import {API_STORAGE_KEY} from '../components/ApiKeySetterItem';
import {ApiCallState, AppState} from '../types';

export const ViewConfig = {
    url: 'https://api.github.com/repos/cpelican/commits-history/commits',
};

export interface SubscribeArgs {
    handleFetchState: (state: AppState) => void;
    handleApiCallState: (apiState: ApiCallState) => void;
}

export class Fetcher {
    public static requestTimeout = 10_000;
    public static isPendingFetchRequest = false;

    private static async waitAndSubscribe(subscribeArgs: SubscribeArgs) {
        await new Promise((resolve) => setTimeout(resolve, Fetcher.requestTimeout));
        if (Fetcher.isPendingFetchRequest) {
            return;
        }
        await Fetcher.subscribe(subscribeArgs);
    }
    // helped by https://javascript.info/long-polling
    public static async subscribe(subscribeArgs: SubscribeArgs) {
        Fetcher.isPendingFetchRequest = true;
        const secretKey = sessionStorage.getItem(API_STORAGE_KEY),
            response = await fetch(ViewConfig.url, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${secretKey}`,
            },
        });
        Fetcher.isPendingFetchRequest = false;

        if (!response.ok) {
            subscribeArgs.handleFetchState({errorStatus: response.status, items: null});
            subscribeArgs.handleApiCallState('error');
            if (response.status === 502) {
                await Fetcher.waitAndSubscribe(subscribeArgs);
            }
            return;
        }

        const responseData = await response.json();
        if (response.ok && responseData != null) {
            subscribeArgs.handleFetchState({errorStatus: null, items: responseData});
            subscribeArgs.handleApiCallState('polling');
        }
        await Fetcher.waitAndSubscribe(subscribeArgs);
    }
}
