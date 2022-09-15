import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import {Settings} from 'luxon';
import {Hooks, UseCommitsApiType} from './hooks';


describe('App', () => {
    test.each<UseCommitsApiType>([
      [[], false, ''],
      [[], true, ''],
      [[], true, 'End of the world error!'],
      [[], false, 'End of the world error!'],
      [[], false, null],
      [[{
        sha: '1234',
        commit: {
            author: {
                date: '2022-09-14T04:45:56Z'
            },
            message: 'commit message'
        },
        author: {
            avatar_url: 'www.avatar.com',
            login: 'some name'
        }
      }], false, ''],
    ])('renders as expected whith useCommitApi returning api values %s, isLoading %s, error %s', (apiValue, isLoading, error) => {
      jest.spyOn(Hooks, 'useCommitsApi').mockReturnValue([apiValue, isLoading, error]);
      Settings.now = () => new Date(2022, 12, 25).valueOf();
      const {asFragment} = render(<App />);
      expect(asFragment()).toMatchSnapshot();
    });
});

