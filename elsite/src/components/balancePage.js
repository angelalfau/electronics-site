import React from "react";
import "./balancePage.css";
import instance from "./axios.js";
import { useEffect, useState } from "react";

const Balance = ({ account }) => {
    // console.log(account);
    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <tr>
            <td>{account?.name}</td>
            <td>{account?.subtype}</td>
            <td>{formatter.format(account?.balances.current)}</td>
        </tr>
    );
};

const Transaction = ({ transaction }) => {
    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: transaction.iso_currency_code || "USD",
    });

    return (
        <tr>
            <td>{transaction?.merchant_name || transaction?.name}</td>
            <td>{transaction?.date}</td>
            <td>{formatter.format(transaction?.amount)}</td>
        </tr>
    );
};

const BalancePage = ({ themeDark }) => {
    // const [page, setPage] = useState(0);
    const [mainAcc, setMainAcc] = useState({ data: [] });
    const [loading, setLoading] = useState(true);
    const [selection, setSelection] = useState(0);

    const renderAccounts = async () => {
        try {
            await instance
                .post("/transactions", {
                    access_token: "access-sandbox-4acad0a3-4e55-4ecc-8a16-8114123c22c4",
                })
                .then((res) => {
                    // console.log(res);

                    setMainAcc({ data: res.data });
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

    const balanceList = (page) => {
        // console.log("acc");
        // console.log(mainAcc.accounts);
        return mainAcc.data?.accounts?.map((currentAccount, i) => {
            // console.log("curr Acc");
            // console.log(currentAccount);

            return <Balance key={i} account={currentAccount} />;
            // console.log("?");
            // return <h1>hello</h1>;
        });
    };

    const transactionList = (page) => {
        // console.log("acc");
        // console.log(mainAcc.accounts);
        return mainAcc.data?.transactions?.map((currentTransaction, i) => {
            // console.log("curr Acc");
            // console.log(currentAccount);

            return <Transaction key={i} transaction={currentTransaction} />;
            // console.log("?");
            // return <h1>hello</h1>;
        });
    };

    const selectBalance = () => {
        setSelection(0);
    };
    const selectTransaction = () => {
        setSelection(1);
    };
    const selectInvestment = () => {
        setSelection(2);
    };

    return (
        <div id="balancebackground">
            <div id="balancecontainer">
                <div id="leftselect" class={themeDark ? "darkButton" : "lightButton"}>
                    <button
                        className={`selbtn ${selection === 0 ? "selected" : ""}`}
                        onClick={selectBalance}
                    >
                        Balance
                    </button>
                    <button
                        className={`selbtn ${selection === 1 ? "selected" : ""}`}
                        onClick={selectTransaction}
                    >
                        Transactions
                    </button>
                    <button
                        className={`selbtn ${selection === 2 ? "selected" : ""}`}
                        onClick={selectInvestment}
                    >
                        Investments
                    </button>
                </div>
                <div id="tables" class="tbl-header">
                    {loading ? (
                        <p>Currently Loading...</p>
                    ) : selection === 0 ? (
                        <table cellPadding="0" cellSpacing="0">
                            <thead className="tbl-header" cellPadding="0" cellSpacing="0">
                                <tr>
                                    <th>Institution Name</th>
                                    <th>Account Type</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody className="tbl-content" cellPadding="0" cellSpacing="0">
                                {balanceList()}
                            </tbody>
                        </table>
                    ) : selection === 1 ? (
                        <table cellPadding="0" cellSpacing="0">
                            <thead className="tbl-header" cellPadding="0" cellSpacing="0">
                                <tr>
                                    <th>Institution Name</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody className="tbl-content" cellPadding="0" cellSpacing="0">
                                {transactionList()}
                            </tbody>
                        </table>
                    ) : selection === 2 ? (
                        <p>No investment accounts found</p>
                    ) : (
                        <p>Error has occurred, bad selection</p>
                    )}
                </div>
                <div id="rightfilter"></div>
            </div>
            <div id="endsection"></div>
        </div>
    );
};

export default BalancePage;
