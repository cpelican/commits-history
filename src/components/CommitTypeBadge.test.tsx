import React from 'react';
import {render} from '@testing-library/react';
import {CommitTypeBadge, CommitTypeBadgeProps} from './CommitTypeBadge';

const defaultProps: CommitTypeBadgeProps = {
    type: 'ci',
};

describe('CommitTypeBadge', () => {
    test('renders as expected', () => {
        const {asFragment} = render(<CommitTypeBadge {...defaultProps} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders as expected with no type', () => {
        const {asFragment} = render(<CommitTypeBadge />);
        expect(asFragment()).toMatchInlineSnapshot('<DocumentFragment />');
    });
});
