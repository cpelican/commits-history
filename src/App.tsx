import React from 'react';
import './App.scss';
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

    return (
        <div className='commit-history-container'>
            {errorStatus && <p>{`Error with status ${errorStatus}`}</p>}
            {renderCommits()}
        </div>
    );
}

export default App;
