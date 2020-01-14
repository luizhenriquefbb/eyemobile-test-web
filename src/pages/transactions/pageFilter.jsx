import React from 'react';

export default function PageFilter(props) {

    const { options, setSelectedFilter, } = props;

    return (
        <aside className="page-filter">
            {options.map((option, index) => {
                return (
                    <div className={`page-filter-item ${option.selected ? 'on' : ''}`} key={index} onClick={() => { setSelectedFilter(option.name); }}>
                        <img src={option.icon} alt="" />
                        <span>{option.name}</span>
                    </div>
                );
            })}
        </aside>
    );
}