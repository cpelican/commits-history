import React from 'react';
import {CommitItem, CommitItemProps} from './CommitItem';
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
    test('renders as expected', () => {
        const {asFragment} = render(<CommitItem {...defaultProps} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders as expected with no message', () => {
        render(<CommitItem {...{...defaultProps, message: ''}} />);
        expect(screen.getByRole('heading', {level: 4})).toMatchSnapshot();
    });
});
