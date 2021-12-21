import React from 'react';
import pageNotFoundImg from "../assets/images/page_not_found2.jpg";

const PageNotFound = () => {
    return (
        <div className="d-flex justify-content-center">
            <img src={pageNotFoundImg} alt="no data found"/>
        </div>
    );
};

export default PageNotFound;