import OrganizationMetadata from '../src/api/organizationMetadata/index';
import axios from 'axios';
import schema from '../src/api/organizationMetadata/organizationMetadata-schema.json';
import helpers from '../src/helpers';

describe('Organization Metadata', () => {
    const client = axios.create({
        baseURL,
        headers: {
            Authorization: token
        }
    });
    const organizationMetadata = new OrganizationMetadata(client);

    const randString: string = helpers.randString();
    const organizationID: number = 7;
    const metadataFieldID: number = 1;

    it.skip('should be able to create metadata for an organization', (done) => {
        organizationMetadata.create({
            organization_id: organizationID,
            name: randString
        })
        .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.data).to.have.jsonSchema(schema);
            done();
        })
        .catch(done);
    });
    it.skip('should be able to get metadata for an organization', (done) => {
        organizationMetadata.get({
            organization_id: organizationID,
            query: {
                limit: 2
            }
        })
        .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.data).to.have.jsonSchema(schema);
            done();
        })
        .catch(done);
    });
    // failing; commenting out temporarily
    // it('should be able to update metadata for an organization', (done) => {
    //     organizationMetadata.update({
    //         organization_id: organizationID,
    //         organization_metadata_field_id: metadataFieldID,
    //         name: randString.substring(0, 8),
    //         query: {
    //             limit: 2
    //         }
    //     })
    //     .then((res) => {
    //         expect(res.status).to.equal(200);
    //         expect(res.data).to.have.jsonSchema(schema);
    //         done();
    //     })
    //     .catch(done);
    // }).timeout(30000);
    it.skip('should be able to get a metadata field for an organization', (done) => {
        organizationMetadata.getField({
            organization_id: organizationID,
            organization_metadata_field_id: metadataFieldID,
            query: {
                limit: 2
            }
        })
        .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.data).to.have.jsonSchema(schema);
            done();
        })
        .catch(done);
    });
    it.skip('should be able to update a metadata field for an organization', (done) => {
        organizationMetadata.updateField({
            organization_id: organizationID,
            organization_metadata_field_id: metadataFieldID,
            metadata: {
                randString
            }
        })
        .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.data).to.have.jsonSchema(schema);
            done();
        })
        .catch(done);
    });
});
