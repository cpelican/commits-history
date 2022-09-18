import React from 'react';
import {DateTime} from 'luxon';

import './CommitItem.scss';
import {AdditionalInfo} from '../AdditionalInfo';
import {CommitTypeBadge} from '../CommitTypeBadge';
import {getMessageBits} from '../helpers';

export interface CommitItemProps {
    sha: string;
    date: string;
    message: string;
    author: {
        name: string;
        imageUrl: string;
    };
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
            <AdditionalInfo imageUrl={author.imageUrl} imageAlt={`avatar for ${author.name}`} >
                {content}
            </AdditionalInfo>
        </li>
    );
});

CommitItem.displayName = 'CommitItem';
