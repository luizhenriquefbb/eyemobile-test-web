import React from 'react';
import { connect, } from 'react-redux';


function ClientsTable(props) {

    const {clients,} = props;

    return (
        <div className="clients-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>DOCUMENTO</th>
                        <th>NASCIMENTO</th>
                        <th>CLIENTE DESDE</th>
                        <th>ULTIMA COMPRA</th>
                    </tr>

                </thead>
                <tbody>

                    {clients.map(client => {
                        return (
                            <tr key={client.id}>
                                <td><span>{client.id}</span></td>
                                <td><span>{client.name}</span></td>
                                <td><span>{client.document}</span></td>
                                <td><span>{client.birthdate}</span></td>
                                <td><span>{client.customer_since}</span></td>
                                <td><span>{client.last_purchase}</span></td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>

    );
}


const mapStateToProps = ({ clients_reducer, }) => {
    return {
        clients: Object.values(clients_reducer),
    };
};

export default connect(mapStateToProps, null)(ClientsTable);