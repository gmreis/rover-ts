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
            assert.fail();
        });

        it('An error should be returned if the Y position is not a number.', () => {
            assert.fail();
        });

        it('The coordinate {X: 1, Y: 3} should be returned for the string "1 3"', () => {
            assert.fail();
        });

        it('The coordinate {X: 41, Y: 33} should be returned for the string "41 33"', () => {
            assert.fail();
        });
    });

    describe('parserDirection', () => {
        it('Should return an error if the direction is Y', () => {
            assert.fail();
        });

        it('Should return the N direction with the N input.', () => {
            assert.fail();
        });

        it('Should return the E direction with the E input.', () => {
            assert.fail();
        });

        it('Should return the S direction with the S input.', () => {
            assert.fail();
        });

        it('Should return the W direction with the W input.', () => {
            assert.fail();
        });
    });

    describe('parserCommandList', () => {
        it('Should return a command list when all commands are valid ', () => {
            assert.fail();
        });

        it('Should return a command list with only the commands are valid ', () => {
            assert.fail();
        });

        it('Should return an empty command list ', () => {
            assert.fail();
        });
    });
});
