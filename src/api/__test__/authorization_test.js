import sinon from 'sinon';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Authorization from '../Authorization';
import Resource from '../resource';

describe('Authorization', () => {
    const sandbox = sinon.sandbox.create();
    let authorization;
    let getSpy;
    let postSpy;
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);

        getSpy = sandbox.spy(axios, 'get');
        postSpy = sandbox.spy(axios, 'post');

        authorization = new Authorization(axios);
    });

    afterEach(() => {
        mock.restore();
        sandbox.restore();
    });

    it('should be a subclass of Resource', () => {
        expect(authorization).to.be.an.instanceOf(Resource);
    });

    describe('get', () => {
        it('should make a GET request to /v1/auth', () => {
            mock.onGet(/\/v1\/auth/).reply(200);

            const promise = authorization.get();
            expect(getSpy).to.have.been.calledWithExactly('/v1/auth');
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('create', () => {
        it('should make a POST request to /v1/auth', () => {
            mock.onPost(/\/v1\/auth/).reply(200);

            const promise = authorization.create();
            expect(postSpy).to.have.been.calledWithExactly('/v1/auth');
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('forgotPassword', () => {
        it('should make a POST request to /v1/forgot_password', () => {
            const params = {
                email: 'marc@gigwalk.com',
            };
            mock.onPost(/\/v1\/forgot_password/).reply(200);

            const promise = authorization.forgotPassword(params);
            expect(postSpy).to.have.been.calledWithExactly('/v1/forgot_password', { email: 'marc@gigwalk.com' });
            return expect(promise).to.be.fulfilled;
        });
    });

    describe('resetPassword', () => {
        it('should make a POST request to /v1/reset_password', () => {
            const params = {
                email: 'marc@gigwalk.com',
                password: 'n3wp@ssword',
                token: 'hell0world',
                checkExpired: false
            };
            mock.onPost(/\/v1\/reset_password/).reply(200);

            const promise = authorization.resetPassword(params);
            expect(postSpy).to.have.been.calledWithExactly('/v1/reset_password', {
                email: 'marc@gigwalk.com',
                password: 'n3wp@ssword',
                token: 'hell0world',
                checkExpired: false
            });
            return expect(promise).to.be.fulfilled;
        });
    });
});
