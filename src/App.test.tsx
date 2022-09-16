import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import {Settings} from 'luxon';
import {Hooks, UseCommitsApiType} from './hooks';

describe('App', () => {
    test.each<UseCommitsApiType>([
        [[], null],
        [[], 404],
        [[], 403],
        [
            [
                {
                    sha: '1234',
                    commit: {
                        author: {
                            date: '2022-09-14T04:45:56Z',
                        },
                        message: 'commit message',
                    },
                    author: {
                        avatar_url: 'www.avatar.com',
                        login: 'some name',
                    },
                },
            ],
            null,
        ],
    ])(
        'renders as expected whith useCommitApi returning api values %s, error %s',
        (apiValue, error) => {
            jest.spyOn(Hooks, 'useCommitsApi').mockReturnValue([apiValue, error]);
            Settings.now = () => new Date(2022, 12, 25).valueOf();
            const {asFragment} = render(<App />);
            expect(asFragment()).toMatchSnapshot();
        },
    );
});
