import React, {useState} from 'react';
import {ApiCallState} from '../../types';
import './ApiKeySetterItem.scss';

export const API_STORAGE_KEY = 'github-api-key';

interface ApiKeySetterItemProps {
    setAppState: (state: ApiCallState) => void;
}

export const ApiKeySetterItem: React.FC<ApiKeySetterItemProps> = ({setAppState}) => {
    const [secretKey, setSecretKey] = useState<string | null>(null);

    function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
        setAppState('input-change');
        setSecretKey(e?.currentTarget?.value);
    }

    function handleButtonClick() {
        if (secretKey == null) {
            return;
        }
        setAppState('polling');
        window.sessionStorage.setItem(API_STORAGE_KEY, secretKey);
    }

    return (
        <div className='api-key-setter-item'>
            <label htmlFor='api-key-input'>Please enter the api key</label>
            <div className='input-group'>
                <input id='api-key-input' type='text' onChange={handleInputChange} />
                <button disabled={secretKey == null || (secretKey?.length ?? 0) < 4} onClick={handleButtonClick}>
                    Ok
                </button>
            </div>
        </div>
    );
};
