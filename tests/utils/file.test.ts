import { assert } from "chai";
import sinon from 'sinon';
import rewiremock from 'rewiremock';
import EventEmitter from 'events';

const fsStub = {
    createReadStream: sinon.stub(),
    existsSync: sinon.stub(),
};
const readlineStub = new EventEmitter();

const mock = {
    'fs': {
        createReadStream: fsStub.createReadStream,
        existsSync: fsStub.existsSync
    },
    'readline': { createInterface: () => readlineStub }
}

const { File } = rewiremock.proxy(() => require('../../src/utils/file'), () => mock);

describe('File', function() {
    afterEach(() => {
        fsStub.existsSync.reset();
        fsStub.createReadStream.reset();
    });

    describe('fileExist', () => {
        it('Should return true if the file exists', () => {
            fsStub.existsSync.returns(true)
            assert.strictEqual(File.fileExist('file.txt'), true);
        });

        it('Should return false if the file exists ', () => {
            fsStub.existsSync.returns(false)
            assert.strictEqual(File.fileExist('file.txt'), false);
        });
    });

    describe('readFileByLine', () => {
        it('Should return error if the file does not exist', async () => {
            fsStub.existsSync.returns(false);
            try {
                await File.readFileByLine('filePath');
            } catch (error) {
                assert.strictEqual(error.message, 'File not found!');
            }
            assert.strictEqual(fsStub.createReadStream.called, false);
        });

        it('Should return a string list of all lines in the file ', async () => {
            fsStub.existsSync.returns(true);
            const readFilePromise = File.readFileByLine('filePath');

            readlineStub.emit('line', 'abc');
            readlineStub.emit('line', 'def');
            readlineStub.emit('close');

            const lines = await readFilePromise;

            assert.deepStrictEqual(lines, ['abc', 'def']);
        });
    })
});