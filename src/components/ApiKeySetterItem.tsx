import React, {useState} from 'react';
import './ApiKeySetterItem.scss';

export const API_STORAGE_KEY = 'github-api-key';

export const ApiKeySetterItem: React.FC = () => {
    const [secretKey, setSecretKey] = useState<string | null>(null);

    function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
        setSecretKey(e?.currentTarget?.value);
    }

    function handleButtonClick() {
        if (secretKey == null) {
            return;
        }
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
