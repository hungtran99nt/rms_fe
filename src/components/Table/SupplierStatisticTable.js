import React, {useMemo, useState} from 'react';
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
        sizePerPage: 9,
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

    const [searchText, setSearchText] = useState('');
    const supplierStatsSearched = useMemo(() => {
        return supplierStatistics.filter(s => {
            return s.name?.toLowerCase().includes(searchText?.toLowerCase())
        });
    }, [searchText, supplierStatistics]);

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
                                        onChange={event => setSearchText(event.target.value)}
                                        placeholder="Tìm theo tên của NCC"
                                    />
                                </InputGroup>
                            </div>
                            <PaginationListStandalone
                                { ...paginationProps }
                            />
                            <BootstrapTable
                                hover
                                keyField='id'
                                data={supplierStatsSearched}
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
            {!isLoading && supplierStatsSearched.length === 0 && <DataNotFound/>}
        </>
    );
};

export default SupplierStatisticTable;