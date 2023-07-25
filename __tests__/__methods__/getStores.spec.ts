import { getStores } from '../../src/getStores';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
jest.mock('axios');

describe('getStores', () => {
  it('should fetch stores from the specified environment',async () => {
    const env = 'prod';
    const apiKey = process.env.TEST_API_KEY!;
    const storesData = { data: {items: '[store data]'} };
    const getMock = jest.spyOn(axios, 'get').mockResolvedValue(storesData);

    await getStores(env, apiKey);
    expect(getMock).toHaveBeenCalledWith(`https://w${env === 'prod' ? '.' : env + '.' }killbills.${env === 'prod' ? 'co' : 'dev'}/stores`, {"headers": {"Authorization": apiKey}});
  });

  it('should fetch stores from the specified environment',async () => {
    const env = 'dev';
    const apiKey = process.env.TEST_API_KEY!;
    const storesData = { data: {items:'[store data]'} };
    const result = await getStores(env, apiKey);
    expect(result).toStrictEqual(storesData.data?.items);
  });

  it('should throw an error if no environment specified',async () => {
    const env = '';
    const apiKey = process.env.TEST_API_KEY!;

    expect(await getStores(env, apiKey)).toStrictEqual(new Error('No environment specified'));
  });
  
  it('should throw an error if no API key provided',async () => {
    const env = 'prod';
    const apiKey = '';
    expect(await getStores(env, apiKey)).toStrictEqual(new Error('No API key provided'));
  });
});
