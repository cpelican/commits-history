import React from 'react';
import {CommitBits, CommitItem, CommitItemProps, getMessageBits} from './CommitItem';
import {render, screen} from '@testing-library/react';

const defaultProps: CommitItemProps = {
    sha: '1234',
    date: 'one minute ago',
    message: 'commit message',
    author: {
        imageUrl: 'www.avatar.com',
        name: 'some name',
    },
};

describe('CommitItem', () => {
    test.each<[string, CommitBits]>([
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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

    test('renders as expected', () => {
        const {asFragment} = render(<CommitItem {...defaultProps} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders as expected with no message', () => {
        render(<CommitItem {...{...defaultProps, message: ''}} />);
        expect(screen.getByRole('heading', {level: 4})).toMatchSnapshot();
    });
});
