import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {API_URL, DATE_FORMAT, STATISTIC_PAGE_TITLE} from "../common/constants";
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import DetailTable from "../components/Table/DetailTable";
import axios from "axios";
import {BiSearchAlt} from "react-icons/bi";
import './Report.css';
import moment from "moment";

const convertDataResponse = res => (
    {
        purchaseID: res.data.id,
        dateCreate: moment(res.data.dateCreate).format(DATE_FORMAT.DMy),
        des: res.data.des,

        deliveredBy: res.data.deliveredBy.name,
        // storedIn: res.data.storedIn.name,
        storedIn: res.data.storedIn.name,
        createdBy: `${res.data.createdBy.firstName} ${res.data.createdBy.lastName} - ${res.data.createdBy.role}`
    }
)

const convertDetail = res => res.map(p => (
    {
        ingredientID: p.hasIngredient.id,
        ingredientName: p.hasIngredient.name,
        ingredientType: p.hasIngredient.type.name,
        ingredientUnit: p.hasIngredient.unit.name,
        quantity: p.quantity,
        unitPrice: p.unitPrice,
        total: p.quantity * p.unitPrice,
    }
))

const PurchaseBillDetail = () => {
    let history = useHistory();
    const {id} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [purchaseBill, setPurchaseBill] = useState({});
    const [details, setDetails] = useState([]);

    useEffect(() => {
        let didCancel = false;

        const token = localStorage.getItem("TOKEN");
        if (!token) return;

        setIsLoading(true);
        axios({
            method: 'GET',
            url: `${API_URL}/purchaseBill/${id}`,
        }).then(response => {
            if (!didCancel) {
                setIsLoading(false);
                console.log(response)
                setPurchaseBill(convertDataResponse(response));
                setDetails(convertDetail(response.data.purchaseBillDetails))
            }
        }).catch(error => {
            if (!didCancel) {
                setIsLoading(false);
                setErrorMessage(error.message);
            }
        });
        return () => {
            didCancel = true;
        }
    }, [id, convertDetail, convertDataResponse]);

    console.log(purchaseBill);
    console.log(details);

    let sum;
    if (details.length !== 0)
        sum = details.map(i => i.total).reduce((a, b) => a + b).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    console.log(sum);
    return (
        <div>
            <Row>
                <Col className="text-center mb-3">
                    <h3 style={{backgroundColor: "var(--title-color)", borderRadius: "0.25rem"}}>{STATISTIC_PAGE_TITLE.DETAIL}</h3>
                </Col>
            </Row>
            <Row>
                <div className="mb-3">
                    <Button onClick={() => history.goBack()}>Quay lại</Button>
                </div>
            </Row>
            <Row>
                <Col>
                    <div className="d-inline-block mb-3 ">
                        <InputGroup id="input-group-header">
                            <InputGroup.Text id="search-icon" style={{width: "150px", fontWeight: "bold"}}>Nhà cung cấp</InputGroup.Text>
                            <FormControl
                                // onChange={event => setSearchText(event.target.value)}
                                value={purchaseBill.deliveredBy}
                                readOnly
                            />
                        </InputGroup>
                    </div>
                </Col>
                <Col>
                    <div className="d-inline-block mb-3 ">
                        <InputGroup id="input-group-header">
                            <InputGroup.Text id="search-icon" style={{width: "150px", fontWeight: "bold"}}>Mã hoá đơn</InputGroup.Text>
                            <FormControl
                                // onChange={event => setSearchText(event.target.value)}
                                value={purchaseBill.purchaseID}
                                readOnly
                            />
                        </InputGroup>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="d-inline-block mb-3 ">
                        <InputGroup id="input-group-header">
                            <InputGroup.Text id="search-icon" style={{width: "150px", fontWeight: "bold"}}>Người nhập</InputGroup.Text>
                            <FormControl
                                // onChange={event => setSearchText(event.target.value)}
                                value={purchaseBill.createdBy}
                                readOnly
                            />
                        </InputGroup>
                    </div>
                </Col>
                <Col>
                    <div className="d-inline-block mb-3 ">
                        <InputGroup id="input-group-header">
                            <InputGroup.Text id="search-icon" style={{width: "150px", fontWeight: "bold"}}>Ngày nhập</InputGroup.Text>
                            <FormControl
                                // onChange={event => setSearchText(event.target.value)}
                                value={purchaseBill.dateCreate}
                                readOnly
                            />
                        </InputGroup>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="d-inline-block mb-3 ">
                        <InputGroup id="input-group-header">
                            <InputGroup.Text id="search-icon" style={{width: "150px", fontWeight: "bold"}}>Mô tả</InputGroup.Text>
                            <FormControl
                                // onChange={event => setSearchText(event.target.value)}
                                value={purchaseBill.des}
                                readOnly
                            />
                        </InputGroup>
                    </div>
                </Col>
                <Col>
                    <div className="d-inline-block mb-3 ">
                        <InputGroup id="input-group-header">
                            <InputGroup.Text id="search-icon" style={{width: "150px", fontWeight: "bold"}}>Kho</InputGroup.Text>
                            <FormControl
                                // onChange={event => setSearchText(event.target.value)}
                                value={purchaseBill.storedIn}
                                readOnly
                            />
                        </InputGroup>
                    </div>
                </Col>
            </Row>
            <Row>
                <DetailTable
                    isLoading={isLoading}
                    details={details}
                />
            </Row>
            <Row>
                <Col>
                    <div className="sum fw-bold"
                         style={{backgroundColor: "var(--title-color)", padding: "10px", borderRadius: "0.25rem"}}>
                        <span>Tổng === {sum} ₫</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default PurchaseBillDetail;