import React from "react";
import "./transactionPage.css";
import instance from "./axios.js";
import { useEffect, useState } from "react";

const Transaction = ({ account }) => {
    // console.log(account);
    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return (
        <tr>
            <td>{account?.name}</td>
            <td>{account?.subtype}</td>
            <td>{formatter.format(account?.balances.current)}</td>
        </tr>
    );
};

const TransactionPage = () => {
    const [page, setPage] = useState(0);
    const [mainAcc, setMainAcc] = useState({ accounts: [] });
    const [loading, setLoading] = useState(true);

    const renderAccounts = async () => {
        try {
            await instance
                .post("/balance", {
                    access_token: "access-sandbox-4acad0a3-4e55-4ecc-8a16-8114123c22c4",
                })
                .then((res) => {
                    // console.log(res);

                    setMainAcc({ accounts: res.data.accounts });
                    // console.log("acc2");
                    // console.log(mainAcc);
                    setLoading(false);
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        renderAccounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const transactionList = (page) => {
        // console.log("acc");
        // console.log(mainAcc.accounts);
        return mainAcc.accounts?.map((currentAccount, i) => {
            // console.log("curr Acc");
            // console.log(currentAccount);

            return <Transaction key={i} account={currentAccount} />;
            // console.log("?");
            // return <h1>hello</h1>;
        });
    };

    return (
        <div id="transactionbackground">
            <div id="transactioncontainer" class="tbl-header">
                {loading ? (
                    <p>Currently Loading...</p>
                ) : (
                    <table cellPadding="0" cellSpacing="0">
                        <thead className="tbl-header" cellPadding="0" cellSpacing="0">
                            <tr>
                                <th>Institution Name</th>
                                <th>Account Type</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody className="tbl-content" cellPadding="0" cellSpacing="0">
                            {transactionList()}
                        </tbody>
                    </table>
                )}
            </div>
            <div id="endsection"></div>
        </div>
    );
};

export default TransactionPage;
