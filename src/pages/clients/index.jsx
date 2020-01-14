import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import * as clientActions from '../../redux/actions/clientActions';
import ClientsTable from './ClientsTable';
import './clients.css';
import React, { useEffect, useState, } from 'react';
import { connect, } from 'react-redux';
import { faSearch, } from '@fortawesome/free-solid-svg-icons';

function Clients(props) {
    const [filterValue, setFilterValue,] = useState('');

    const { filterByName, } = props;

    useEffect(() => { filterByName(filterValue); }, [filterValue, filterByName,]);

    return (
        <>
            <div className="input-container">
                <FontAwesomeIcon icon={faSearch} />
                <input
                    className="input-field"
                    type="text"
                    placeholder="PESQUISAR POR NOME"
                    onChange={(evt) => (setFilterValue(evt.target.value))}
                    value={filterValue}
                />
            </div>


            <ClientsTable />

        </>
    );
}

const mapStateToProps = ({ clients_reducer, }) => {
    return {
        clients: Object.values(clients_reducer),
    };
};

export default connect(mapStateToProps, clientActions)(Clients);