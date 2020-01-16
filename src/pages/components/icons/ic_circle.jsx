import React from 'react';

export default function (props) {

    const { color, className, } = props;
    return (
        <div className={className}>
            <svg height="100%" width="100%">
                <circle cx="50%" cy="50%" r="25%" fill={color} />
            </svg>
        </div>
    );
}