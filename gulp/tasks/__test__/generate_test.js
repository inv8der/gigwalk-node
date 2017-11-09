import path from 'path';
import fs from 'fs';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { expect } from 'chai';
import { promisify } from 'bluebird';
import generateTask from '../generate';

const plugins = gulpLoadPlugins();
const readFileAsync = promisify(fs.readFile);

describe('Gulp tasks', () => describe('generate', () => {
    // Make sure entry point is in the project root src folder so that eslint
    // can resolve relative imports properly
    const API_ENTRY = path.join(__dirname, '../../../src/__generate_test__index.js');
    const API_SCHEMA_PATH = path.join(__dirname, './examples/schema.json');

    before(() => {
        generateTask.__Rewire__('API_SCHEMA_PATH', API_SCHEMA_PATH);
        generateTask.__Rewire__('API_ENTRY', API_ENTRY);
    });

    after(() => {
        generateTask.__ResetDependency__('API_SCHEMA_PATH');
        generateTask.__ResetDependency__('API_ENTRY');
    });

    it('should generate the api source code using the JSON schema and ejs templates', (done) => {
        gulp.task('generate', generateTask(gulp, plugins));
        gulp.task('generate_test', ['generate'], () => {
            const filename = path.join(__dirname, './examples/api.js');
            Promise.all([readFileAsync(API_ENTRY, 'utf8'), readFileAsync(filename, 'utf8')])
                .then(([result, expected]) => {
                    expect(result).to.equal(expected);
                    done();
                })
                .catch((err) => { done(err); })
                .then(() => { fs.unlinkSync(API_ENTRY); });
        });
        gulp.start(['generate_test']);
    }).timeout(5000);
}));
