import React, {useState} from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import {_defaultCol} from "./Columns";

const DefaultTable = () => {
    const [users, setUsers] = useState([]);
    return (
        <>
            <BootstrapTable
                hover
                keyField='id'
                data={users}
                columns={_defaultCol}
            />
        </>
    );
};

export default DefaultTable;