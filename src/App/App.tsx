import React from 'react';
import './App.scss';
import {ApiKeySetterItem, API_STORAGE_KEY} from '../components/ApiKeySetterItem';
import {CommitItem} from '../components/CommitItem';
import {usePolling} from './hooks';
import {APIItem} from '../types';


export function App() {
    const secretKey = sessionStorage.getItem(API_STORAGE_KEY),
        [state, apiCallState, setApiCallState] = usePolling(secretKey),
        hasCommits = (state.items ?? []).length > 0;

    function renderCommitItem(item: APIItem) {
        const author = {
            name: item.author.login,
            imageUrl: item.author.avatar_url,
        };
        return (
            <CommitItem
                key={item.sha}
                sha={item.sha}
                date={item.commit.author.date}
                message={item.commit.message}
                author={author}
            />
        );
    }

    function renderCommits() {
        if (apiCallState === 'error') {
            return;
        }

        if(!hasCommits) {
            return;
        }

        return <ul className='commit-list-container'>{state?.items?.map(renderCommitItem)}</ul>;
    }

    function renderApiKeySetterItem() {
        // todo: with adding a loading state,
        // the api key setter won't appear when reloading the page while having a correct api kay
        if (!['error', 'idle', 'input-change'].includes(apiCallState) || hasCommits) {
            return;
        }
        return <ApiKeySetterItem setAppState={setApiCallState} />;
    }

    function renderError() {
        if (apiCallState !== 'error') {
            return null;
        }

        return (
            <div className='error-container'>
                <p className='error-message'>{`Error with status ${state.errorStatus ?? 'unknown'}, please try again`}</p>
            </div>
        );
    }

    return (
        <div className='commit-history-container'>
            {renderApiKeySetterItem()}
            {renderError()}
            {renderCommits()}
        </div>
    );
}

