import React, { useCallback, useState, FunctionComponent } from "react";
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from "react-plaid-link";
import instance from "./axios.js";

interface Props {
    token: string;
}

const PlaidLink: FunctionComponent<Props> = ({ token }) => {
    const onSuccess = useCallback<PlaidLinkOnSuccess>((public_token, metadata) => {
        // send public_token to server
    }, []);

    const config: PlaidLinkOptions = {
        token,
        onSuccess,
        // onExit
        // onEvent
    };

    const { open, ready, error } = usePlaidLink(config);

    return (
        <button onClick={() => open()} disabled={!ready}>
            Connect a bank account
        </button>
    );
};

const App: FunctionComponent = () => {
    const [token, setToken] = useState<string | null>(null);

    // generate a link_token
    React.useEffect(() => {
        async function createLinkToken() {
            console.log("hey");

            let response = await fetch("https://development.plaid.com/link/token/create", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            const { link_token } = await response.json();
            setToken(link_token);
        }
        createLinkToken();
        console.log(token);
    }, []);

    // only initialize Link once our token exists
    return token === null ? (
        // insert your loading animation here
        <div className="loader">hi</div>
    ) : (
        <PlaidLink token={token} />
    );
};

export default App;
