import React, {useState} from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import {_supplierStatisticCol, numberFormatter} from "./Columns";
import DataNotFound from "../DataNotFound";
import './table.css';
import {SORT_ORDERS} from "../../common/constants";

const defaultSorted = [{
    dataField: 'purchaseValue',
    order: SORT_ORDERS.DESC
}]

const SupplierStatisticTable = ({supplierStatistics, beginDate, endDate, isLoading, reloadData}) => {

    return (
        <>
            <BootstrapTable
                hover
                keyField='id'
                data={supplierStatistics}
                columns={_supplierStatisticCol}
                defaultSorted={defaultSorted}
                formatter={numberFormatter}
                footerClasses="footer-class"
                // filter={filterFactory()}
            />
            {isLoading && <div>Loading...</div>}
            {!isLoading && supplierStatistics.length === 0 && <DataNotFound/>}
        </>
    );
};

export default SupplierStatisticTable;