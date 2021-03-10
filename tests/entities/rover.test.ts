import { assert } from "chai";
import { Coordinate } from "../../src/types/coordinate";
import { Rover } from "../../src/entities/rover";
import { Direction } from "../../src/types/direction";
import { Command } from "../../src/types/command";

describe('Rover', function() {
    let position: Coordinate;

    beforeEach(function () {
        position = { X: 5, Y: 5 };
    });

    it('Should return the same position and direction that when was created', function() {
        const rover = new Rover(position, Direction.SOUTH);

        assert.deepStrictEqual(rover.getPosition(), position);
        assert.deepStrictEqual(rover.getDirection(), Direction.SOUTH);
    });

    it('Should return the only one command', function() {
        const rover = new Rover(position, Direction.SOUTH, [Command.M]);

        assert.strictEqual(rover.hasCommand(), true);
        assert.strictEqual(rover.getNexCommand(), Command.M);
        assert.strictEqual(rover.hasCommand(), false);
        assert.strictEqual(rover.getNexCommand(), undefined);
    });

    describe('Next Position', function() {
        it('Should return to the next position to the North.', function() {
            const rover = new Rover(position, Direction.NORTH);
            assert.deepStrictEqual(rover.getNextPosition(), { X: 5, Y: 6 });
        });

        it('Should return to the next position to the SOUTH.', function() {
            const rover = new Rover(position, Direction.SOUTH);
            assert.deepStrictEqual(rover.getNextPosition(), { X: 5, Y: 4 });
        });

        it('Should return to the next position to the EAST.', function() {
            const rover = new Rover(position, Direction.EAST);
            assert.deepStrictEqual(rover.getNextPosition(), { X: 6, Y: 5 });
        });

        it('Should return to the next position to the WEST.', function() {
            const rover = new Rover(position, Direction.WEST);
            assert.deepStrictEqual(rover.getNextPosition(), { X: 4, Y: 5 });
        });
    });

    describe('Move', function() {
        it('Should move to the North.', function() {
            const rover = new Rover(position, Direction.NORTH);
            rover.move();
            assert.deepStrictEqual(rover.getPosition(), { X: 5, Y: 6 });
        });

        it('Should move to the SOUTH.', function() {
            const rover = new Rover(position, Direction.SOUTH);
            rover.move();
            assert.deepStrictEqual(rover.getPosition(), { X: 5, Y: 4 });
        });

        it('Should move to the EAST.', function() {
            const rover = new Rover(position, Direction.EAST);
            rover.move();
            assert.deepStrictEqual(rover.getPosition(), { X: 6, Y: 5 });
        });

        it('Should move to the WEST.', function() {
            const rover = new Rover(position, Direction.WEST);
            rover.move();
            assert.deepStrictEqual(rover.getPosition(), { X: 4, Y: 5 });
        });
    });

    describe('Turn', function() {
        it('Should turn to right.', function() {
            const expectedDirectionList = [Direction.EAST, Direction.SOUTH, Direction.WEST, Direction.NORTH];
            const rover = new Rover(position, Direction.NORTH);

            expectedDirectionList.forEach(function(expectedDirection) {
                rover.turn(Command.R);
                assert.strictEqual(rover.getDirection(), expectedDirection);
            })
        });

        it('Should turn to left.', function() {
            const expectedDirectionList = [Direction.WEST, Direction.SOUTH, Direction.EAST, Direction.NORTH];
            const rover = new Rover(position, Direction.NORTH);

            expectedDirectionList.forEach(function(expectedDirection) {
                rover.turn(Command.L);
                assert.strictEqual(rover.getDirection(), expectedDirection);
            })
        });

        it('Doesn\'t should change the direction when the command is diferent of R or L.', function() {
            const rover = new Rover(position, Direction.NORTH);
            rover.turn(Command.M);
            assert.strictEqual(rover.getDirection(), Direction.NORTH);
        });
    });
});