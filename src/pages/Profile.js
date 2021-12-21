import React from 'react';

const Profile = (account) => {
    console.log(account)
    return (
        <div>
            <p>Profile</p>
            <h1>{account.account.fullName}</h1>
            <h2>{account.account.role}</h2>
        </div>
    );
};

export default Profile;