import { Response } from 'express';

const fetchUserProfile = async (
    res: Response,
    query: string,
    params: any,
    formatFunction: (data: any) => any
) => {
    try {
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Referer: 'https://leetcode.com',
            },
            body: JSON.stringify({
                query: query,
                variables: params,
            }),
        });

        const result = await response.json();
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
        }
        if (result.errors) {
            return res.send(result);
        }

        return res.json(formatFunction(result.data));
    } catch (err) {
        console.error('Error: ', err);
        return res.send(err);
    }
};

export default fetchUserProfile;
