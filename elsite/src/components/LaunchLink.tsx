// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React, { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import instance from "./axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";

const LinkApp = () => {
	const user = useSelector((state: RootState) => state.auth.user);

	const [linkToken, setLinkToken] = useState("");
	interface LinkResponse {
		data: {
			link_token: string;
		};
	}

	const generateToken = async () => {
		const response: LinkResponse = await instance.post("/create_link_token", {
			id: user.id,
		});
		await setLinkToken(response.data.link_token);
	};
	useEffect(() => {
		if (user.id) {
			generateToken();
		}
	}, [user]);

	useEffect(() => {
		console.log("link token: ", linkToken);
	});

	return linkToken !== "" ? <LinkComponent linkToken={linkToken} /> : <></>;
};
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
interface LinkProps {
	linkToken: string;
}
const LinkComponent: React.FC<LinkProps> = (props: LinkProps) => {
	const user = useSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		console.log("Link Component called");
	});
	const onSuccess = React.useCallback((public_token, metadata) => {
		console.log("onSuccess called");

		// send public_token to server
		const response = instance.post("/set_access_token", {
			public_token: public_token,
			id: user.id,
		});
		console.log(response);

		// Handle response ...
	}, []);

	useEffect(() => {
		console.log(props);
	});

	const config: Parameters<typeof usePlaidLink>[0] = {
		token: props.linkToken,
		// receivedRedirectUri: window.location.href,
		onSuccess,
	};
	const { open, ready } = usePlaidLink(config);

	const callAccessToken = () => {
		instance
			.post("/set_access_token", {
				PUBLIC_TOKEN: "link-development-5aa3a121-176f-402f-98d2-bcf3ff5c72a4",
				id: user.id,
			})
			.then((res) => {
				console.log("xd");
				console.log(res);
			})
			.catch((err) => {
				console.log("error in calling access token ");

				console.log(err);
			});
	};
	return (
		<div>
			<h1>hi</h1>
			<button onClick={() => open()} disabled={!ready}>
				Link account
			</button>
			<button onClick={() => callAccessToken()}>Call Access Token</button>
		</div>
	);
};
export default LinkApp;
