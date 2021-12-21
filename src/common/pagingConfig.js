import paginationFactory from "react-bootstrap-table2-paginator";
import {SORT_ORDERS} from "./constants";

export const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    nextPageText: 'Next',
    prePageText: 'Prev',
    hideSizePerPage: true,
    withFirstAndLast: false,
    alwaysShowAllBtns: true,
});

export const sortCode = (a, b, order) => {
    let number_a = Number(a.split(/(\d+)/)[1]);
    let number_b = Number(b.split(/(\d+)/)[1]);
    return order === SORT_ORDERS.ASC ? number_a - number_b : number_b - number_a;
}

export const isMatchExact = (str1, str2) => {
    let re = new RegExp('^' + str1 + '$');
    if (str1 === "") return true;
    return re.test(str2);
}
