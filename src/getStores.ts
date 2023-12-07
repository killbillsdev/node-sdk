import axios from 'axios';

export const getStores = async (env:string,apiKey:string,limit:number=1000,offset:number=0) => {
    try {

        if (!env || env === '' || env === undefined || env === null) throw new Error('No environment specified');
        if (!apiKey) throw new Error('No API key provided');
        const response = await axios.get(`https://w.${env === 'prod' ? '' : env + '.'}killbills.${env === 'prod' ? 'co' : 'dev'}/stores?limit=${limit}&offset=${offset}`, {headers:{Authorization: apiKey}});
        return response?.data?.items;
    } catch (error: Error | any) {
        console.error(error?.message);
        return error;
    }
};