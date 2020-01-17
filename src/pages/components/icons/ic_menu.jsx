/* eslint-disable max-len */
import React from 'react';

export default function (props) {
    const { fill = '#737689', className, } = props;

    return (
        <div className={className}>
            <svg height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                    <path d="m13.7996317 0c-7.62118783 0-13.7995397 6.17881187-13.7995397 13.7997237 0 7.6209119 6.17835187 13.8002757 13.7995397 13.8002757 7.6211879 0 13.8002757-6.1789958 13.8002757-13.8002757 0-7.62127983-6.1790878-13.7997237-13.8002757-13.7997237z"
                        fill={fill} />
                    <g stroke="#f5f7fa">
                        <path d="m7 9h14" />
                        <path d="m7 14h14" />
                        <path d="m7 19h14" />
                    </g>
                </g>
            </svg>
        </div>
    );
}
