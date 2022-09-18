
import {CommitBits, getMessageBits} from './helpers';

describe('helpers', () => {
    test.each<[string, CommitBits]>([
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: we test null although it is not accepted as a type
        [null, {commitMessage: ''}],
        ['', {commitMessage: ''}],
        ['test', {commitMessage: 'test', prefix: 'test'}],
        ['add tests', {commitMessage: 'add tests'}],
        ['wtf message: no no no!', {commitMessage: 'wtf message: no no no!'}],
        ['many: double: points', {commitMessage: 'many: double: points'}],
        ['chore: do something', {commitMessage: 'do something', prefix: 'chore'}],
        ['chores: do something', {commitMessage: 'chores: do something'}],
        ['feature:do something', {commitMessage: 'do something', prefix: 'feature'}],
        [
            'feature:do something: do another thing',
            {commitMessage: 'do something: do another thing', prefix: 'feature'},
        ],
        [
            'feature: do something: do another thing',
            {commitMessage: 'do something: do another thing', prefix: 'feature'},
        ],
    ])('getMessageBits() with commit message %s renders %s', (commitMessage, expected) => {
        expect(getMessageBits(commitMessage)).toEqual(expected);
    });
});
