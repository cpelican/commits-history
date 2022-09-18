import React from 'react';
import {render} from '@testing-library/react';
import {App} from './App';
import {Settings} from 'luxon';
import * as moduleHooks from './hooks';
import {ApiCallState, AppState} from '../types';

describe('App', () => {
    test.each<[AppState, ApiCallState]>([
        [{items: [], errorStatus: null}, 'idle'],
        [{items: [], errorStatus: 404}, 'error'],
        [{items: [], errorStatus: 403}, 'error'],
        [
            {
                items: [
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
                errorStatus: null
            },
            'polling'
        ],
        // if the api call comes back no commits
        [
            {
                items: [],
                errorStatus: null
            },
            'polling'
        ],
    ])('renders as expected whith useCommitApi returning state %s, api state %s', (appState, apiCallState) => {
        jest.spyOn(moduleHooks, 'usePolling').mockReturnValue([appState, apiCallState, jest.fn()]);
        Settings.now = () => new Date(2022, 12, 25).valueOf();
        const {asFragment} = render(<App />);
        expect(asFragment()).toMatchSnapshot();
    });
});

