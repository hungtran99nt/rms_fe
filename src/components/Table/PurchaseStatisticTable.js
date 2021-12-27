import React, {useMemo, useState} from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import {_purchaseStatisticCol, numberFormatter} from "./Columns";
import DataNotFound from "../DataNotFound";
import {SORT_ORDERS} from "../../common/constants";
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {BiSearchAlt} from "react-icons/bi";

const defaultSorted = [{
    dataField: 'purchaseValue',
    order: SORT_ORDERS.DESC
}]

const PurchaseStatisticTable = ({purchaseStats, isLoading, beginDate, endDate}) => {
    let history = useHistory();
    const pagination = paginationFactory({
        // page: 1,
        sizePerPage: 9,
        // nextPageText: 'Next',
        // prePageText: 'Prev',
        // hideSizePerPage: true,
        // withFirstAndLast: false,
        // alwaysShowAllBtns: true,
        custom: true,
        totalSize: purchaseStats.length
    });

    const onClickRow = {
        onClick: (e, row, rowIndex) => {
            history.push(`/purchaseBill/${row.id}`);
        }
    }

    console.log(beginDate)
    console.log(endDate)

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

                            </div>
                            <PaginationListStandalone
                                { ...paginationProps }
                            />
                            <BootstrapTable
                                hover
                                keyField='id'
                                data={purchaseStats}
                                columns={_purchaseStatisticCol}
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
            {!isLoading && purchaseStats.length === 0 && <DataNotFound/>}
        </>
    );
};

export default PurchaseStatisticTable;