import dayjs from "dayjs";

require("isomorphic-fetch");

let api = process.env.BACK_API ? process.env.BACK_API : "";

export const serverUrl = api;

export function createRequest(
	url: RequestInfo,
	method: RequestInit["method"],
	body?: any,
	headers: RequestInit["headers"] = {}
) {
	const options: RequestInit = {
		method,
		headers: {
			"content-type": "application/json",
			timezone: dayjs().format("Z"),
			...headers
		}
	};

	if (body) options.body = JSON.stringify(body);

	url = api + url;

	return fetch(url, options);
}

export function sendPost(
	url: RequestInfo,
	body?: any,
	headers?: RequestInit["headers"]
) {
	return createRequest(url, "POST", body, headers);
}

export function sendPut(
	url: RequestInfo,
	body?: any,
	headers?: RequestInit["headers"]
) {
	return createRequest(url, "PUT", body, headers);
}

export function sendGet(url: RequestInfo, headers?: RequestInit["headers"]) {
	return createRequest(url, "GET", null, headers);
}

export function sendDelete(url: RequestInfo, headers?: RequestInit["headers"]) {
	return createRequest(url, "DELETE", null, headers);
}
