import React, {useState} from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import {_customerStatisticCol} from "./Columns";

const CustomerStatisticTable = () => {
    const [users, setUsers] = useState([]);
    return (
        <>
            <BootstrapTable
                hover
                keyField='id'
                data={users}
                columns={_customerStatisticCol}
            />
        </>
    );
};

export default CustomerStatisticTable;