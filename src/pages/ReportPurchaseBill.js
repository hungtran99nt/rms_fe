import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import usePost from "../hooks/usePost";
import {API_URL, DATE_FORMAT, STATISTIC_PAGE_TITLE} from "../common/constants";
import {Button, Col, Row} from "react-bootstrap";
import PurchaseStatisticTable from "../components/Table/PurchaseStatisticTable";
import moment from "moment";
import axios from "axios";

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

    // let beginDate = history.location.state ? history.location.state.beginDate : null;
    // let endDate = history.location.state ? history.location.state.endDate : null;

    let beginDate =  localStorage.getItem("BEGIN_DATE") || "";
    let endDate = localStorage.getItem("END_DATE") || "";

    beginDate = new Date(beginDate);
    // beginDate.setDate(beginDate.getDate() + 1);
    endDate = new Date(endDate);
    // endDate.setDate(endDate.getDate() + 1);
    console.log(beginDate)
    console.log(endDate)

    // let bd = moment(beginDate).format(DATE_FORMAT.DMy).toString();

    const [purchaseStats, setPurchaseStats]
        = useState(JSON.parse(localStorage.getItem("PURCHASE_STATS")) || [])

    // const {
    //     data: purchaseStats,
    //     setData: setPurchaseStats,
    //     isLoading
    // } = usePost([], {
    //     beginDate: beginDate,
    //     endDate: endDate
    // }, `${API_URL}/statistic/purchaseBill/${id}`, convertDataResponse);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let didCancel = false;

        const token = localStorage.getItem("TOKEN");
        if (!token) return;

        setIsLoading(true);
        if (beginDate && !endDate || !beginDate && endDate) {
            localStorage.removeItem("PURCHASE_STATS");
            localStorage.removeItem("BEGIN_DATE");
            localStorage.removeItem("END_DATE");
        }
        axios({
            method: 'POST',
            url: `${API_URL}/statistic/purchaseBill/${id}`,
            data: {
                beginDate: beginDate,
                endDate: endDate
            }
        }).then(response => {
            if (!didCancel) {
                localStorage.removeItem("PURCHASE_STATS");
                localStorage.removeItem("BEGIN_DATE");
                localStorage.removeItem("END_DATE");
                setIsLoading(false);
                console.log(response)
                setPurchaseStats(convertDataResponse(response));
                localStorage.setItem("PURCHASE_STATS", JSON.stringify(convertDataResponse(response)));
                localStorage.setItem("BEGIN_DATE", beginDate);
                localStorage.setItem("END_DATE", endDate);
            }
        }).catch(error => {
            if (!didCancel) {
                localStorage.removeItem("PURCHASE_STATS");
                localStorage.removeItem("BEGIN_DATE");
                localStorage.removeItem("END_DATE");
                setIsLoading(false);
                setErrorMessage(error.message);
            }
        });
        return () => {
            didCancel = true;
        }
    }, [id, convertDataResponse]);

    console.log(purchaseStats);

    let sum;
    if (purchaseStats.length !== 0)
        sum = purchaseStats.map(i => i.purchaseValue).reduce((a, b) => a + b).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });


    return (
        <div>
            <Row>
                <Col className="text-center mb-3">
                    <h3 style={{
                        backgroundColor: "var(--title-color)",
                        borderRadius: "0.25rem"
                    }}>{STATISTIC_PAGE_TITLE.PURCHASE}</h3>
                </Col>
            </Row>
            <Row>
                <div className="mb-3">
                    <Button onClick={() => history.push("/reports")}>Quay lại</Button>
                </div>
            </Row>
            <Row>
                <PurchaseStatisticTable
                    isLoading={isLoading}
                    purchaseStats={purchaseStats}
                    beginDate={beginDate}
                    endDate={endDate}
                />
            </Row>
            <Row>
                <Col>
                    <div className="sum fw-bold"
                         style={{backgroundColor: "var(--title-color)", borderRadius: "0.25rem", padding: "10px"}}>
                        <span>Tổng === {sum} ₫</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ReportPurchaseBill;