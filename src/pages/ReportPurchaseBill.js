import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import usePost from "../hooks/usePost";
import {API_URL, DATE_FORMAT, STATISTIC_PAGE_TITLE} from "../common/constants";
import {Col, Row} from "react-bootstrap";
import PurchaseStatisticTable from "../components/Table/PurchaseStatisticTable";
import moment from "moment";

const convertDataResponse = res => res.data.map(p => (
    {
        id: p.billID,
        supplier: p.supplierName,
        dateCreate: moment(p.dateCreate).format(DATE_FORMAT.DMy),
        purchaseValue: p.purchaseValue,
        itemAmount: p.itemAmount
    }
))

const ReportPurchaseBill = () => {

    let history = useHistory();

    const {id} = useParams();
    let beginDate = history.location.state ? history.location.state.beginDate : null;
    let endDate = history.location.state ? history.location.state.endDate : null;

    const {
        data: purchaseStats,
        setData: setPurchaseStats,
        isLoading
    } = usePost([], {
        beginDate: beginDate,
        endDate: endDate
    }, `${API_URL}/statistic/purchaseBill/${id}`, convertDataResponse);

    console.log(purchaseStats);
    return (
        <div>
            <Row>
                <Col className="text-center">
                    <h3 style={{backgroundColor: "var(--title-color)"}}>{STATISTIC_PAGE_TITLE.DEFAULT}</h3>
                </Col>
            </Row>
            <Row>

            </Row>
            <Row>
                <PurchaseStatisticTable
                    isLoading={isLoading}
                    purchaseStats={purchaseStats}
                />
            </Row>
        </div>
    );
};

export default ReportPurchaseBill;