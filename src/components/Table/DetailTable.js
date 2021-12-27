import React from 'react';
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {useHistory} from "react-router-dom";
import {FormControl, InputGroup} from "react-bootstrap";
import {BiSearchAlt} from "react-icons/bi";
import BootstrapTable from "react-bootstrap-table-next";
import {_purchaseDetailCol, _supplierStatisticCol, numberFormatter} from "./Columns";
import DataNotFound from "../DataNotFound";
import './table.css';

const DetailTable = ({details, isLoading}) => {
    const pagination = paginationFactory({
        sizePerPage: 5,
        hideSizePerPage: false,
        custom: true,
        totalSize: details.length
    });

    let history = useHistory();

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
                                    <InputGroup.Text id="search-icon" style={{fontWeight: "bold"}}>CHI TIẾT</InputGroup.Text>
                                </InputGroup>
                            </div>
                            <PaginationListStandalone
                                { ...paginationProps }
                            />
                            <BootstrapTable
                                hover
                                keyField='id'
                                data={details}
                                columns={_purchaseDetailCol}
                                formatter={numberFormatter}
                                footerClasses="footer-class"
                                { ...paginationTableProps }
                            />
                        </div>
                    )
                }
            </PaginationProvider>
            {isLoading && <div>Loading...</div>}
            {!isLoading && details.length === 0 && <DataNotFound/>}
        </>
    );
};

export default DetailTable;