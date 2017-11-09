// @noflow
import path from 'path';
import through from 'through2';
import ejs from 'ejs';
import $RefParser from 'json-schema-ref-parser';
import { PluginError } from 'gulp-util';

const API_SCHEMA_PATH = path.join(__dirname, '../../src/schemas/api.json');
const API_ENTRY = path.join(__dirname, '../../src/index.js');

function gulpGenerate() {
    // Creating a stream through which each file will pass
    return through.obj((file, enc, cb) => {
        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-generate', 'Streams are not supported!'));
            return cb(null, file);
        }

        if (file.isBuffer()) {
            const jsonSchema = JSON.parse(file.contents);

            // Although not documented, providing a file path AND schema object allows
            // the ref parser to correctly resolve local files relative to the source
            $RefParser.dereference(API_SCHEMA_PATH, jsonSchema, (err, schema) => {
                if (err) {
                    this.emit('error', new PluginError('gulp-generate', err));
                    return cb(null, file);
                }

                const template = path.join(__dirname, '../../src/templates/api.ejs');
                ejs.renderFile(template, schema, (error, output) => {
                    if (error) this.emit('error', new PluginError('gulp-generate', error));
                    else file.contents = Buffer.from(output); // eslint-disable-line no-param-reassign

                    return cb(null, file);
                });
            });
        }
    });
}

export default function generateTask(gulp, plugins) {
    return () => {
        const pathInfo = path.parse(API_ENTRY);
        return gulp.src(API_SCHEMA_PATH)
            .pipe(gulpGenerate())
            .pipe(plugins.rename(pathInfo.base))
            .pipe(plugins.beautify())
            .pipe(plugins.eslint({ fix: true }))
            .pipe(gulp.dest(pathInfo.dir));
    };
}
