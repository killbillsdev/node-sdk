import { cipherHmacPayload } from '../../src/services/cryptoService';

describe('sanity check', () => {
    it('should be true', () => {
        expect(true).toBeTruthy();
    })
})

jest.mock('crypto', () => ({
  createHmac: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  digest: jest.fn().mockReturnValue('hashedPayload'),
}));

describe('cipherHmacPayload', () => {
  it('should return the hashed payload', () => {
    const payload = '{foo:bar}';
    const hmac = 'myHmacKey';

    const result = cipherHmacPayload(payload, hmac);

    expect(result).toBe('hashedPayload');
    expect(require('crypto').createHmac).toHaveBeenCalledWith('sha256', hmac);
    expect(require('crypto').update).toHaveBeenCalledWith('{foo:bar}');
    expect(require('crypto').digest).toHaveBeenCalledWith('hex');
  });
});
