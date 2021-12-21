import {DATE_FORMAT, SORT_ORDERS} from "../../common/constants";
import moment from "moment";
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';

export const _defaultCol = [
    {
        dataField: 'code',
        text: 'Mã',
        sort: true,
    }, {
        dataField: 'name',
        text: 'Tên',
        sort: true
    }, {
        dataField: 'type',
        text: 'Loại',
        sort: true
    }, {
        dataField: 'total',
        text: 'Tổng',
        sort: true
    }
];

export const _purchaseDetailCol = [
    {
        dataField: 'id',
        text: 'ID',
        sort: true
    }, {
        dataField: 'name',
        text: 'Tên nguyên liệu',
        sort: true
    }, {
        dataField: 'unitPrice',
        text: 'Đơn giá',
        sort: true
    }, {
        dataField: 'quantity',
        text: 'Số lượng',
        sort: true
    }, {
        dataField: 'unit',
        text: 'Đơn vị tính',
        sort: true
    }, {
        dataField: 'total',
        text: 'Thành tiền',
        sort: true,
    }
];

export const _purchaseStatisticCol = [
    {
        dataField: 'billID',
        text: 'Mã hoá đơn nhập',
        sort: true
    }, {
        dataField: 'dateCreate',
        text: 'Ngày nhập',
        sort: true,
        sortFunc: (a, b, order) => {
            if (order === SORT_ORDERS.ASC)
                return moment(a, DATE_FORMAT.yMd) - moment(b, DATE_FORMAT.yMd);
            return moment(b, DATE_FORMAT.yMd) - moment(a, DATE_FORMAT.yMd);
        },
    }, {
        dataField: 'itemAmount',
        text: 'Tổng lượng hàng nhập',
        sort: true
    }, {
        dataField: 'purchaseValue',
        text: 'Tổng tiền',
        sort: true
    }
];

export const numberFormatter = (cell) => {
    return <span>{cell.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>;
}
export const _supplierStatisticCol = [
    {
        dataField: 'id',
        text: 'Mã nhà cung cấp',
        sort: true,
        footer: "",
        headerAlign: 'center'
    }, {
        dataField: 'name',
        text: 'Tên nhà cung cấp',
        sort: true,
        footer: "",
        headerAlign: 'center'
        // filter: textFilter()
    }, {
        dataField: 'itemAmount',
        text: 'Tổng lượng hàng nhập',
        sort: true,
        align: 'right',
        footer: "Tổng cộng",
        footerAlign: (column, colIndex) => 'right',
        headerAlign: 'center',
        formatter: numberFormatter
    }, {
        dataField: 'purchaseValue',
        text: 'Tổng tiền',
        sort: true,
        headerAlign: 'center',
        align: 'right',
        formatter: numberFormatter,
        footerAlign: (column, colIndex) => 'right',
        footer: columnData => columnData.reduce((acc, item) => acc + item, 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }
];

export const _customerStatisticCol = [
    {
        dataField: 'id',
        text: 'Mã khách hàng',
        sort: true,
    }, {
        dataField: 'name',
        text: 'Tên khách hàng',
        sort: true
    }, {
        dataField: '',
        text: 'Ngày sinh',
        sort: true
    }, {
        dataField: 'purchaseValue',
        text: 'Tổng doanh thu',
        sort: true
    }
];