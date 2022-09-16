import React from 'react';
import {DateTime} from 'luxon';

import './CommitItem.scss';
import {AdditionalInfo} from './AdditionalInfo';
import {CommitTypeBadge, commitTypes} from './CommitTypeBadge';

export interface CommitItemProps {
    sha: string;
    date: string;
    message: string;
    author: {
        name: string;
        imageUrl: string;
    };
}

export interface CommitBits {
    commitMessage: string;
    prefix?: keyof typeof commitTypes;
}

export function getMessageBits(commitMessage: string): CommitBits {
    if (commitMessage == null) {
        return {commitMessage: ''};
    }
    // eslint-disable-next-line no-unsafe-optional-chaining
    const [commitTypePrefix, ...rest] = commitMessage?.trim?.()?.split(':'),
        commitType = commitTypes?.[commitTypePrefix];
    if (commitType == null) {
        return {commitMessage};
    }
    const splittedMessage = rest?.join(':')?.trim();
    return {prefix: commitType, commitMessage: splittedMessage === '' ? commitType : splittedMessage};
}

export const CommitItem: React.FC<CommitItemProps> = React.memo(({sha, message, date, author}) => {
    function getDateMessage() {
        const dateMessage = date
            ? DateTime.fromISO(date).toRelative({unit: ['years', 'months', 'days', 'hours', 'minutes']})
            : '-';
        return <span>{dateMessage}</span>;
    }

    function getAuthor() {
        const name = author.name ?? 'unknown';
        return <span className='author-message'>{name}</span>;
    }

    const content = (
            <>
                {getAuthor()}
                {getDateMessage()}
            </>
        ),
        {prefix, commitMessage} = getMessageBits(message);
    return (
        <li key={sha} className='commit-item'>
            <h4>{commitMessage === '' ? 'No commit message' : commitMessage}</h4>
            <CommitTypeBadge type={prefix} />
            <AdditionalInfo content={content} imageUrl={author.imageUrl} imageAlt={`avatar for ${author.name}`} />
        </li>
    );
});

CommitItem.displayName = 'CommitItem';
