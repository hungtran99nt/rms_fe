import {DATE_FORMAT, SORT_ORDERS} from "../../common/constants";
import moment from "moment";

export const numberFormatter = (cell) => {
    return <span>{cell.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} </span>;
}

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
        dataField: 'ingredientID',
        text: 'Mã nguyên liệu',
        align: 'right',
        headerAlign: 'center',
        sort: true
    }, {
        dataField: 'ingredientName',
        text: 'Tên nguyên liệu',
        headerAlign: 'center',
        sort: true
    }, {
        dataField: 'ingredientType',
        text: 'Loại',
        align: "center",
        headerAlign: 'center',
        sort: true
    }, {
        dataField: 'ingredientUnit',
        text: 'Đơn vị tính',
        align: "center",
        headerAlign: 'center',
        sort: true
    }, {
        dataField: 'unitPrice',
        text: 'Đơn giá',
        formatter: numberFormatter,
        headerAlign: 'center',
        align: 'right',
        sort: true
    }, {
        dataField: 'quantity',
        text: 'Số lượng',
        formatter: numberFormatter,
        headerAlign: 'center',
        align: 'right',
        sort: true
    }, {
        dataField: 'total',
        text: 'Thành tiền',
        align: 'right',
        formatter: numberFormatter,
        headerAlign: 'center',
        sort: true,
    }
];

export const _purchaseStatisticCol = [
    {
        dataField: 'id',
        text: 'Mã hoá đơn nhập',
        sort: true,
        align: 'right',
        headerAlign: 'center',
    }, {
        dataField: 'supplier',
        text: 'Nhà cung cấp',
        sort: true,
        headerAlign: 'center',
    }, {
        dataField: 'dateCreate',
        text: 'Ngày nhập',
        align: "center",
        sort: true,
        sortFunc: (a, b, order) => {
            if (order === SORT_ORDERS.ASC)
                return moment(a, DATE_FORMAT.yMd) - moment(b, DATE_FORMAT.yMd);
            return moment(b, DATE_FORMAT.yMd) - moment(a, DATE_FORMAT.yMd);
        },
        headerAlign: 'center',
    }, {
        dataField: 'itemAmount',
        text: 'Tổng lượng hàng nhập',
        sort: true,
        align: 'right',
        formatter: numberFormatter,
        headerAlign: 'center',
    }, {
        dataField: 'purchaseValue',
        text: 'Tổng tiền',
        sort: true,
        align: 'right',
        formatter: numberFormatter,
        headerAlign: 'center',
    }
];

export const _supplierStatisticCol = [
    {
        dataField: 'id',
        text: 'Mã nhà cung cấp',
        sort: true,
        align: 'right',
        headerAlign: 'center',
        headerStyle: () => {
            return {width: '150px'};
        }
    }, {
        dataField: 'name',
        text: 'Tên nhà cung cấp',
        sort: true,
        headerAlign: 'center'
    }, {
        dataField: 'itemAmount',
        text: 'Tổng lượng hàng nhập',
        sort: true,
        align: 'right',
        headerAlign: 'center',
        formatter: numberFormatter
    }, {
        dataField: 'purchaseValue',
        text: 'Tổng tiền',
        sort: true,
        headerAlign: 'center',
        align: 'right',
        formatter: numberFormatter,
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