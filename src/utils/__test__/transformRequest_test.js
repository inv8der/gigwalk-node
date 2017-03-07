import { expect } from 'chai';
import transformRequest from '../transformRequest';

describe('transformRequest', () => {
    it('should convert all keys in an API request to snake case', () => {
        const params = {
            camelCase: 'rules',
            nested: {
                objectId: 2,
            }
        };
        expect(transformRequest(params)).to.deep.equal({
            camel_case: 'rules',
            nested: {
                object_id: 2,
            }
        });
    });

    it('should not modify the request if payload is not a plain object', () => {
        const data = new Map();
        data.set('camelCase', 'rules');

        const result = transformRequest(data);
        expect(result).to.equal(data);
        expect(result.has('camelCase')).to.be.true;
    });
});
