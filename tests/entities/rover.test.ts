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
        const rover = new Rover(position, Direction.S);

        assert.deepStrictEqual(rover.getPosition(), position);
        assert.deepStrictEqual(rover.getDirection(), Direction.S);
    });

    it('Should return the only one command', function() {
        const rover = new Rover(position, Direction.S, [Command.M]);

        assert.strictEqual(rover.hasCommand(), true);
        assert.strictEqual(rover.getNexCommand(), Command.M);
        assert.strictEqual(rover.hasCommand(), false);
        assert.strictEqual(rover.getNexCommand(), undefined);
    });

    describe('Next Position', function() {
        it('Should return to the next position to the North.', function() {
            const rover = new Rover(position, Direction.N);
            assert.deepStrictEqual(rover.getNextPosition(), { X: 5, Y: 6 });
        });

        it('Should return to the next position to the SOUTH.', function() {
            const rover = new Rover(position, Direction.S);
            assert.deepStrictEqual(rover.getNextPosition(), { X: 5, Y: 4 });
        });

        it('Should return to the next position to the EAST.', function() {
            const rover = new Rover(position, Direction.E);
            assert.deepStrictEqual(rover.getNextPosition(), { X: 6, Y: 5 });
        });

        it('Should return to the next position to the WEST.', function() {
            const rover = new Rover(position, Direction.W);
            assert.deepStrictEqual(rover.getNextPosition(), { X: 4, Y: 5 });
        });
    });

    describe('Move', function() {
        it('Should move to the North.', function() {
            const rover = new Rover(position, Direction.N);
            rover.move();
            assert.deepStrictEqual(rover.getPosition(), { X: 5, Y: 6 });
        });

        it('Should move to the SOUTH.', function() {
            const rover = new Rover(position, Direction.S);
            rover.move();
            assert.deepStrictEqual(rover.getPosition(), { X: 5, Y: 4 });
        });

        it('Should move to the EAST.', function() {
            const rover = new Rover(position, Direction.E);
            rover.move();
            assert.deepStrictEqual(rover.getPosition(), { X: 6, Y: 5 });
        });

        it('Should move to the WEST.', function() {
            const rover = new Rover(position, Direction.W);
            rover.move();
            assert.deepStrictEqual(rover.getPosition(), { X: 4, Y: 5 });
        });
    });

    describe('Turn', function() {
        it('Should turn to right.', function() {
            const expectedDirectionList = [Direction.E, Direction.S, Direction.W, Direction.N];
            const rover = new Rover(position, Direction.N);

            expectedDirectionList.forEach(function(expectedDirection) {
                rover.turn(Command.R);
                assert.strictEqual(rover.getDirection(), expectedDirection);
            })
        });

        it('Should turn to left.', function() {
            const expectedDirectionList = [Direction.W, Direction.S, Direction.E, Direction.N];
            const rover = new Rover(position, Direction.N);

            expectedDirectionList.forEach(function(expectedDirection) {
                rover.turn(Command.L);
                assert.strictEqual(rover.getDirection(), expectedDirection);
            })
        });

        it('Doesn\'t should change the direction when the command is diferent of R or L.', function() {
            const rover = new Rover(position, Direction.N);
            rover.turn(Command.M);
            assert.strictEqual(rover.getDirection(), Direction.N);
        });
    });
});