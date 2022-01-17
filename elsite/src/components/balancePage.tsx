import React from "react";
import "./balancePage.css";
import instance from "./axios";
import { useEffect, useState } from "react";
import Config from "./config.json";
interface Account {
	name: string;
	subtype: string;
	balances: {
		current: number;
		iso_currency_code: string;
	};
}

interface BalanceProps {
	account: Account;
}
const Balance = ({ account }: BalanceProps) => {
	// console.log(account);
	var formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: account.balances.iso_currency_code || "USD",
	});

	return (
		<tr>
			<td>{account?.name}</td>
			<td>{account?.subtype}</td>
			<td>{formatter.format(account?.balances.current)}</td>
		</tr>
	);
};

interface Transaction {
	iso_currency_code: string;
	merchant_name: string;
	name: string;
	date: string;
	amount: number;
}

interface TransactionProps {
	transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionProps) => {
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

interface BalancePageProps {
	themeDark: Boolean;
}

const BalancePage = ({ themeDark }: BalancePageProps) => {
	const initialMainAcc = Object.freeze({
		data: {
			accounts: [],
			transactions: [],
		},
	});

	const [mainAcc, setMainAcc] = useState(initialMainAcc);
	const [loading, setLoading] = useState(true);
	const [selection, setSelection] = useState(0);

	const renderAccounts = async () => {
		try {
			await instance
				.post("/transactions", {
					access_token: Config.SB_TOKEN,
				})
				.then((res) => {
					setMainAcc({ data: res.data });
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

	const balanceList = (page: number = 0) => {
		return mainAcc.data?.accounts?.map((currentAccount, i) => {
			return <Balance key={i} account={currentAccount} />;
		});
	};

	const transactionList = (page: number = 0) => {
		return mainAcc.data?.transactions?.map((currentTransaction, i) => {
			return <TransactionItem key={i} transaction={currentTransaction} />;
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
				<div id="leftselect" className={themeDark ? "darkButton" : "lightButton"}>
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
				<div id="tables" className="tbl-header">
					{loading ? (
						<p>Currently Loading...</p>
					) : selection === 0 ? (
						<table cellPadding="0" cellSpacing="0">
							<thead className="tbl-header">
								<tr>
									<th>Institution Name</th>
									<th>Account Type</th>
									<th>Balance</th>
								</tr>
							</thead>
							<tbody className="tbl-content">{balanceList()}</tbody>
						</table>
					) : selection === 1 ? (
						<table cellPadding="0" cellSpacing="0">
							<thead className="tbl-header">
								<tr>
									<th>Institution Name</th>
									<th>Date</th>
									<th>Amount</th>
								</tr>
							</thead>
							<tbody className="tbl-content">{transactionList()}</tbody>
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
