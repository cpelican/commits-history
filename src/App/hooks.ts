import {useEffect, useRef, useState} from 'react';
import {Fetcher} from './fetchers';
import {ApiCallState, AppState} from '../types';

export function usePolling(secretKey: string | null): [AppState, ApiCallState, (apiState: ApiCallState) => void] {
    const [apiCallState, setApiCallState] = useState<ApiCallState>('idle'),
        [state, setState] = useState<AppState>({items: null, errorStatus: null}),
        prevApiCallState = useRef<ApiCallState>();

    useEffect(() => {
        if (apiCallState === 'idle' && secretKey != null) {
            Fetcher.subscribe({handleFetchState: setState, handleApiCallState: setApiCallState});
        }
        if (apiCallState === 'polling' && prevApiCallState.current === 'input-change') {
            Fetcher.subscribe({handleFetchState: setState, handleApiCallState: setApiCallState});
        }
        prevApiCallState.current = apiCallState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiCallState]);

    return [state, apiCallState, setApiCallState];
}
