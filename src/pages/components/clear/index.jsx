import React from 'react';
import './clear.css';

export default function (props) {

    const {
        borderColor='#bfbfbf',
        margin='54px auto',
        width='90%',
    } = props;

    return (
        <>
            <div className="clear" style={{
                borderColor,
                margin,
                width,
            }}></div>
        </>
    );
}