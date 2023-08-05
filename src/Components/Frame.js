
import './Frame.css';
import React from 'react';

function Frame({src}) {

    return (
        <div>

        <div className="frame-container">
        <iframe
            src={src || ''}
            width="100%"
            height="100%"
            allowFullScreen
            referrerPolicy="unsafe-url"
        ></iframe>
        
        </div>
        </div>


    );
}

export default Frame;