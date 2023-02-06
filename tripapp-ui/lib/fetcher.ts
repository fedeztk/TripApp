import {Session} from "next-auth";

export const customFetcher = ([url, method, session]: [string, string, Session | null], {arg = ""}: { arg?: any }) => {
    return fetch(encodeURI(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT as string).concat(url), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${session?.user.token}`,
            'userId': session?.user.id as string,
            // add CORS headers
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        method: method,
        body: arg ? JSON.stringify(arg) : undefined,
    }).catch((err) => console.log(err));
};

export const customFetcherSWR = ([url, method, session]: [string, string, Session | null]) => {
    return fetch(encodeURI(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT as string).concat(url), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${session?.user.token}`,
            'userId': session?.user.id as string,
            // add CORS headers
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        method: method,
    }).then((res) => {
        if (!res.ok) {
            throw new Error("An error occurred while fetching the data.")
        }
        return res.json()
    });
};