import { expect } from 'chai';
import stringifyQuery from '../stringifyQuery';

describe('stringifyQuery', () => {
    it('should generate a query string with all keys converted to snake case', () => {
        expect(stringifyQuery({ snakeCase: true })).equal('?snake_case=true');
        expect(stringifyQuery({ hello: 'world', foo: 'bar' })).to.equal('?hello=world&foo=bar');
        expect(stringifyQuery({})).equal('');
    });
});
