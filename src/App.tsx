import React from 'react';
import './App.scss';
import {ApiKeySetterItem, API_STORAGE_KEY} from './components/ApiKeySetterItem';
import {CommitItem} from './components/CommitItem';
import {APIItem, Hooks} from './hooks';

function App() {
    const [items, errorStatus] = Hooks.useCommitsApi();

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
        if ((items ?? []).length === 0) {
            return null;
        }
        return <ul className='commit-list-container'>{items?.map(renderCommitItem)}</ul>;
    }

    function renderApiKeySetterItem() {
        if (items?.length ?? 0 > 0) {
            return null;
        }
        return <ApiKeySetterItem />;
    }

    function renderError() {
        if (errorStatus == null) {
            return;
        }
        if (sessionStorage.getItem(API_STORAGE_KEY) == null) {
            return;
        }
        return (
            <div className='error-container'>
                <p className='error-message'>{`Error with status ${errorStatus}, please try again`}</p>
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

export default App;
