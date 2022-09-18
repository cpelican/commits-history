import {commitTypes} from './CommitTypeBadge';

export interface CommitBits {
    commitMessage: string;
    prefix?: keyof typeof commitTypes;
}

function getMessageBits(commitMessage: string): CommitBits {
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
export {getMessageBits};
