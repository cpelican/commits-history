import React from 'react';
import clsx from 'clsx';
import './CommitTypeBadge.scss';

export const commitTypes: Record<string, string> = {
    chore: 'chore',
    feature: 'feature',
    build: 'build',
    ci: 'ci',
    style: 'style',
    refactor: 'refactor',
    perf: 'performance',
    test: 'test'
};

export interface CommitTypeBadgeProps {
    type?: keyof typeof commitTypes;
}


export const CommitTypeBadge: React.FC<CommitTypeBadgeProps> = React.memo(({type}) => {
    if (type == null) {
        return null;
    }
    return (
        <span className={clsx('commit-type-badge', type)}>
            {type}
        </span>
    );
});

CommitTypeBadge.displayName = 'CommitTypeBadge';

