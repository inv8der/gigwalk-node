import { expect } from 'chai';
import transformResponse from '../transformResponse';

describe('transformResponse', () => {
    it('should convert all keys in an API response to camel case', () => {
        const data = JSON.stringify({
            snake_case: 'sucks',
            nested: {
                object_id: 2,
            }
        });
        expect(transformResponse(data)).to.deep.equal({
            snakeCase: 'sucks',
            nested: {
                objectId: 2,
            }
        });
    });

    it('should not modify the response if payload is not a valid JSON string', () => {
        expect(transformResponse('Success!')).to.equal('Success!');
    });
});
