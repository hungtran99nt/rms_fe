import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import './Report.css';
import DatePicker from "react-datepicker";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {API_URL, DATE_FORMAT, STATISTIC_PAGE_TITLE} from "../common/constants";
import SupplierStatisticTable from "../components/Table/SupplierStatisticTable";
import CustomerStatisticTable from "../components/Table/CustomerStatisticTable";
import axios from "axios";

const validateForm = Yup.object().shape({
    statistic: Yup.string().required("Chưa chọn loại thống kê"),
});

const convertDataResponse = res => res.data.map(s => (
    {
        id: s.id,
        name: s.name,
        itemAmount: s.itemAmount,
        purchaseValue: s.purchaseValue
    }
))


const Reports = () => {
    const [title, setTitle] = useState(localStorage.getItem("TITLE") || "");

    const [dateRange, setDateRange] = useState([null, null]);
    const [beginDate, endDate] = dateRange;

    const [reloadData, setReloadData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")
    const [supplierStatistics, setSupplierStatistics]
        = useState(JSON.parse(localStorage.getItem("SUPPLIER_STATS")) || []);

    const initialValues = {
        statistic: localStorage.getItem("CHOSEN") || "",
        beginDate: new Date(localStorage.getItem("BEGIN_DATE")) || null,
        endDate: new Date(localStorage.getItem("END_DATE")) || null,
        date: ""
    }

    const submit = (values, {setFieldValues}) => {
        setIsLoading(true);
        if (values.beginDate && !values.endDate || !values.beginDate && values.endDate || values.beginDate ==="" && values.endDate==="") {
            localStorage.removeItem("SUPPLIER_STATS");
            localStorage.removeItem("BEGIN_DATE");
            localStorage.removeItem("END_DATE");
            setDateRange([null, null])
        }
        axios({
            method: 'POST',
            url: `${API_URL}/statistic/supplier/`,
            data: {
                beginDate: values.beginDate,
                endDate: values.endDate
            }
        }).then(res => {
            localStorage.removeItem("SUPPLIER_STATS");
            localStorage.removeItem("CHOSEN");
            localStorage.removeItem("BEGIN_DATE");
            localStorage.removeItem("END_DATE");
            setSupplierStatistics(convertDataResponse(res));
            setIsLoading(false);
            setReloadData(false);
            setError("");
            localStorage.setItem("SUPPLIER_STATS", JSON.stringify(res.data));
            localStorage.setItem("CHOSEN", values.statistic);
            localStorage.setItem("TITLE", title);
            localStorage.setItem("BEGIN_DATE", values.beginDate);
            localStorage.setItem("END_DATE", values.endDate);
        }).catch(err => {
            console.log("err = ", err);
            localStorage.removeItem("SUPPLIER_STATS");
            localStorage.removeItem("BEGIN_DATE");
            localStorage.removeItem("END_DATE");
            setIsLoading(false);
            setReloadData(false);
            setError(`Error: ${err.message}`);
        });

    }
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: submit,
        validationSchema: validateForm,
    });

    let sum;
    if (supplierStatistics.length !== 0)
        sum = supplierStatistics.map(i => i.purchaseValue).reduce((a, b) => a + b).toLocaleString(undefined, {
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
                    }}>{title ? title : STATISTIC_PAGE_TITLE.DEFAULT}</h3>
                </Col>
            </Row>
            <Form onSubmit={formik.handleSubmit} className="mb-3">
                <Row>
                    <Col className="col-3">
                        <Form.Select aria-label="Select statistic type"
                                     name="statistic"
                                     onChange={evt => {
                                         setTitle(evt.target.value);
                                         formik.handleChange(evt);
                                     }}
                                     onBlur={formik.handleBlur}
                                     value={formik.values.statistic}
                                     isInvalid={formik.touched.statistic && formik.errors.statistic}
                        >
                            <option value="">---Chọn loại thống kê---</option>
                            <option value={STATISTIC_PAGE_TITLE.SUPPLIER}>Thống kê NCC theo doanh chi
                            </option>
                            <option value={STATISTIC_PAGE_TITLE.CUSTOMER}>Thống kê KH theo doanh thu
                            </option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.statistic}
                        </Form.Control.Feedback>
                    </Col>
                    <Col className="col-3">
                        <Form.Group>
                            <DatePicker
                                className="form-control"
                                name="date"
                                selectsRange={true}
                                startDate={beginDate}
                                endDate={endDate}
                                dateFormat={DATE_FORMAT.dMy}
                                onChange={(date) => {
                                    formik.setFieldValue("beginDate", date[0]);
                                    formik.setFieldValue("endDate", date[1]);
                                    setDateRange(date);
                                }}
                                isClearable={true}
                                onBlur={formik.handleBlur}
                                placeholderText="Nhập khoảng thời gian"
                                todayButton="Today"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                            />
                            {error && <div className="errorMessage">{error}</div>}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button type="submit" className="btn-primary"
                                disabled={formik.values.statistic !== STATISTIC_PAGE_TITLE.SUPPLIER}
                        >
                            Thống kê
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                {formik.values.statistic === STATISTIC_PAGE_TITLE.DEFAULT && <CustomerStatisticTable/>}
                {formik.values.statistic === STATISTIC_PAGE_TITLE.CUSTOMER && <CustomerStatisticTable/>}
                {formik.values.statistic === STATISTIC_PAGE_TITLE.SUPPLIER &&
                    <SupplierStatisticTable
                        isLoading={isLoading}
                        reloadData={setReloadData}
                        supplierStatistics={supplierStatistics}
                        beginDate={formik.values.beginDate}
                        endDate={formik.values.endDate}
                    />}
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

export default Reports;