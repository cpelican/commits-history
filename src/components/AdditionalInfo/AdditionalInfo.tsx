import React from 'react';
import './AdditionalInfo.scss';

interface AdditionalInfoProps {
    className?: string;
    imageUrl?: string;
    imageAlt?: string;
}

export const AdditionalInfo: React.FC<React.PropsWithChildren<AdditionalInfoProps>> = React.memo(({imageUrl, imageAlt, children}) => {
    const image = imageAlt && imageUrl ? <img className='additional-info-image' src={imageUrl} alt={imageAlt} /> : null;

    return (
        <div className='additional-info-container'>
            {image}
            <div className='additional-info-content'>{children}</div>
        </div>
    );
});

AdditionalInfo.displayName = 'AdditionalInfo';
