import React from 'react';
import './AdditionalInfo.scss';

interface AdditionalInfoProps {
    className?: string;
    imageUrl?: string;
    imageAlt?: string;
    content: React.ReactNode;
}

export const AdditionalInfo: React.FC<AdditionalInfoProps> = React.memo(({content, imageUrl, imageAlt}) => {
    const image = imageAlt && imageUrl ? <img className='additional-info-image' src={imageUrl} alt={imageAlt}/> : null;

    return (
        <div className="additional-info-container">
            {image}
            <div className="additional-info-content">
                {content}
            </div>
        </div>
    );
});

AdditionalInfo.displayName = 'AdditionalInfo';
