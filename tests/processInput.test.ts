import { assert } from "chai";
import { Command } from "../src/types/command";
import { Direction } from "../src/types/direction";
import { ProcessInput } from './../src/processInput';

describe('ProcessInput', function() {
    it('Should return an error if the input file is invalid.', () => {
        let processInput;
        try {
            processInput = new ProcessInput(['a', 'a a']);
        } catch (error) {
            assert.strictEqual(error.message, 'ERROR: Incorrect input file. Coordinate should be a Number!');
        }
        assert.isUndefined(processInput);
    });

    it('Should return the coordinate of the plateau and the list of rover.', () => {
        const processInput = new ProcessInput(['5 5', '1 1 E', 'MRL']);
        const roverList = processInput.getRoverList();
        const rover = roverList[0];

        assert.deepStrictEqual(processInput.getPlateauSize(), { X: 5, Y: 5 });
        assert.lengthOf(roverList, 1);
        assert.deepStrictEqual(rover.getPosition(), { X: 1, Y: 1 });
        assert.strictEqual(rover.getDirection(), Direction.E);
        assert.deepStrictEqual(rover.getNexCommand(), Command.M);
        assert.deepStrictEqual(rover.getNexCommand(), Command.R);
        assert.deepStrictEqual(rover.getNexCommand(), Command.L);
    });

    describe('parserCoordinate', () => {
        it('An error should be returned if the X position is not a number.', () => {
            let processInput;
            try {
                processInput = new ProcessInput(['5 5', 'A 1 E', 'MRL']);
            } catch (error) {
                assert.strictEqual(error.message, 'ERROR: Incorrect input file. Coordinate should be a Number!');
            }
            assert.isUndefined(processInput);
        });

        it('An error should be returned if the Y position is not a number.', () => {
            let processInput;
            try {
                processInput = new ProcessInput(['5 5', 'A 1 E', 'MRL']);
            } catch (error) {
                assert.strictEqual(error.message, 'ERROR: Incorrect input file. Coordinate should be a Number!');
            }
            assert.isUndefined(processInput);
        });

        it('The coordinate {X: 1, Y: 3} should be returned for the string "1 3"', () => {
            const processInput = new ProcessInput(['1 3', '1 3 E', 'MRL']);
            const roverList = processInput.getRoverList();
            const rover = roverList[0];

            assert.deepStrictEqual(processInput.getPlateauSize(), { X: 1, Y: 3 });
            assert.lengthOf(roverList, 1);
            assert.deepStrictEqual(rover.getPosition(), { X: 1, Y: 3 });
        });

        it('The coordinate {X: 41, Y: 33} should be returned for the string "41 33"', () => {
            const processInput = new ProcessInput(['41 33', '41 33 E', 'MRL']);
            const roverList = processInput.getRoverList();
            const rover = roverList[0];

            assert.deepStrictEqual(processInput.getPlateauSize(), { X: 41, Y: 33 });
            assert.lengthOf(roverList, 1);
            assert.deepStrictEqual(rover.getPosition(), { X: 41, Y: 33 });
        });
    });

    describe('parserDirection', () => {
        it('Should return an error if the direction is Y', () => {
            let processInput;
            try {
                processInput = new ProcessInput(['5 5', '1 1 Y', 'MRL']);
            } catch (error) {
                assert.strictEqual(error.message, 'ERROR: Incorrect input file. Direction should be N, E, S or W!');
            }
            assert.isUndefined(processInput);
        });

        it('Should return the N direction with the N input.', () => {
            const processInput = new ProcessInput(['5 5', '1 1 N', 'MRL']);
            const roverList = processInput.getRoverList();
            const rover = roverList[0];

            assert.lengthOf(roverList, 1);
            assert.deepStrictEqual(rover.getDirection(), Direction.N);
        });

        it('Should return the E direction with the E input.', () => {
            const processInput = new ProcessInput(['5 5', '1 1 E', 'MRL']);
            const roverList = processInput.getRoverList();
            const rover = roverList[0];

            assert.lengthOf(roverList, 1);
            assert.deepStrictEqual(rover.getDirection(), Direction.E);
        });

        it('Should return the S direction with the S input.', () => {
            const processInput = new ProcessInput(['5 5', '1 1 S', 'MRL']);
            const roverList = processInput.getRoverList();
            const rover = roverList[0];

            assert.lengthOf(roverList, 1);
            assert.deepStrictEqual(rover.getDirection(), Direction.S);
        });

        it('Should return the W direction with the W input.', () => {
            const processInput = new ProcessInput(['5 5', '1 1 W', 'MRL']);
            const roverList = processInput.getRoverList();
            const rover = roverList[0];

            assert.lengthOf(roverList, 1);
            assert.deepStrictEqual(rover.getDirection(), Direction.W);
        });
    });

    describe('parserCommandList', () => {
        it('Should return a command list when all commands.', () => {
            const processInput = new ProcessInput(['5 5', '1 1 E', 'MRL']);
            const roverList = processInput.getRoverList();
            const rover = roverList[0];

            assert.lengthOf(roverList, 1);
            assert.deepStrictEqual(rover.getNexCommand(), Command.M);
            assert.deepStrictEqual(rover.getNexCommand(), Command.R);
            assert.deepStrictEqual(rover.getNexCommand(), Command.L);
        });

        it('Should return a command list with only the commands are valid ', () => {
            const processInput = new ProcessInput(['5 5', '1 1 E', 'MQRTL']);
            const roverList = processInput.getRoverList();
            const rover = roverList[0];

            assert.lengthOf(roverList, 1);
            assert.deepStrictEqual(rover.getNexCommand(), Command.M);
            assert.deepStrictEqual(rover.getNexCommand(), Command.R);
            assert.deepStrictEqual(rover.getNexCommand(), Command.L);
        });

        it('Should return an empty command list', () => {
            const processInput = new ProcessInput(['5 5', '1 1 E']);
            const roverList = processInput.getRoverList();
            const rover = roverList[0];

            assert.lengthOf(roverList, 1);
            assert.deepStrictEqual(rover.hasCommand(), false);
            assert.deepStrictEqual(rover.getNexCommand(), undefined);
        });
    });
});
