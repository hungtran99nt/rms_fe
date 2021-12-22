import React, {useState} from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import {_purchaseStatisticCol, _supplierStatisticCol, numberFormatter} from "./Columns";
import DataNotFound from "../DataNotFound";
import './table.css';
import {SORT_ORDERS} from "../../common/constants";
import {pagination} from "../../common/pagingConfig";
import {useHistory} from "react-router-dom";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {FormControl, InputGroup} from "react-bootstrap";
import {BiSearchAlt} from "react-icons/bi";

const defaultSorted = [{
    dataField: 'purchaseValue',
    order: SORT_ORDERS.DESC
}]

const SupplierStatisticTable = ({supplierStatistics, beginDate, endDate, isLoading, reloadData}) => {

    const pagination = paginationFactory({
        // page: 1,
        sizePerPage: 5,
        // nextPageText: 'Next',
        // prePageText: 'Prev',
        hideSizePerPage: false,
        // withFirstAndLast: false,
        // alwaysShowAllBtns: true,
        custom: true,
        totalSize: supplierStatistics.length
    });

    let history = useHistory();

    console.log(beginDate)
    console.log(endDate)

    const onClickRow = {
        onClick: (e, row, rowIndex) => {
            history.push(`/purchaseStat/supplier/${row.id}`, {beginDate: beginDate, endDate: endDate});
        }
    }

    return (
        <>
            <PaginationProvider
                pagination={pagination}
            >
                {
                    ({
                         paginationProps,
                         paginationTableProps
                     }) => (
                        <div>
                            <div className="d-inline-block mb-3">
                                <InputGroup id="input-group-header">
                                    <InputGroup.Text id="search-icon"><BiSearchAlt/></InputGroup.Text>
                                    <FormControl
                                        // onChange={event => setSearchText(event.target.value)}
                                        placeholder="Enter supplier name"
                                    />
                                </InputGroup>
                            </div>
                            <PaginationListStandalone
                                { ...paginationProps }
                            />
                            <BootstrapTable
                                hover
                                keyField='id'
                                data={supplierStatistics}
                                columns={_supplierStatisticCol}
                                defaultSorted={defaultSorted}
                                formatter={numberFormatter}
                                footerClasses="footer-class"
                                rowEvents={onClickRow}
                                { ...paginationTableProps }
                            />
                        </div>
                    )
                }
            </PaginationProvider>
            {isLoading && <div>Loading...</div>}
            {!isLoading && supplierStatistics.length === 0 && <DataNotFound/>}
        </>
    );
};

export default SupplierStatisticTable;