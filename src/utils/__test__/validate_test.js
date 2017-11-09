import { expect } from 'chai';
import validate from '../validate';

describe('validate', () => {
    it('should validate an object using the provided JSON schema', () => {
        const schema = {
            additionalProperties: false,
            properties: {
                check_expired: { type: 'boolean' },
                email: { type: 'string' },
                password: { type: 'string' },
                token: { type: 'string' },
            },
            required: ['email', 'password', 'token'],
            type: 'object',
        };
        const data = {
            email: 'marc@gigwalk.com',
            password: 'canhazgigwalklove',
            token: '7004cf8bb3022b36f6dc68a89b776d0acf936feb',
        };

        expect(validate(data, schema)).to.deep.equal({ warnings: [], errors: [] });
    });

    it('should return a list of warnings if any unknown properties were found (and removed)', () => {
        const schema = {
            additionalProperties: false,
            properties: {
                check_expired: { type: 'boolean' },
                email: { type: 'string' },
                password: { type: 'string' },
                token: { type: 'string' },
            },
            required: ['email', 'password', 'token'],
            type: 'object',
        };
        const data = {
            email: 'marc@gigwalk.com',
            password: 'canhazgigwalklove',
            token: '7004cf8bb3022b36f6dc68a89b776d0acf936feb',
            destroy_all_humans: true, // This guy isn't welcome here
        };

        expect(validate(data, schema)).to.deep.equal({ warnings: ['Unknown property: data.destroy_all_humans'], errors: [] });
        expect(data).to.deep.equal({
            email: 'marc@gigwalk.com',
            password: 'canhazgigwalklove',
            token: '7004cf8bb3022b36f6dc68a89b776d0acf936feb',
        });
    });

    it('should return a list of errors if the object failed to validate', () => {
        const schema = {
            additionalProperties: false,
            properties: {
                check_expired: { type: 'boolean' },
                email: { type: 'string' },
                password: { type: 'string' },
                token: { type: 'string' },
            },
            required: ['email', 'password', 'token'],
            type: 'object',
        };
        const data = {
            email: 'marc@gigwalk.com',
            password: 'canhazgigwalklove',
            // Missing required 'token' property
            check_expired: 'true', // Not a boolean!!
        };

        // Note: we use ajv to format validation errors, so if anything changes internally
        // to that module, this test might start failing
        const errors = [
            'data.check_expired should be boolean',
            'data should have required property \'token\'',
        ];
        expect(validate(data, schema)).to.deep.equal({ warnings: [], errors });
    });
});
