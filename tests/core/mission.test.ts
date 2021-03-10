import { assert } from "chai";
import { Mission } from "../../src/core/mission";
import { Direction } from "../../src/types/direction";
import { Rover } from "../../src/entities/rover";
import { Command } from "../../src/types/command";

describe('Mission', function() {
    it('Robots should not move to position with an obstacle.', function() {
        const roverOne = new Rover({ X: 1, Y: 1 }, Direction.NORTH, [Command.M]);
        const roverTwo = new Rover({ X: 1, Y: 2 }, Direction.SOUTH, [Command.M]);
        const mission = new Mission({ X: 5, Y: 5 }, [ roverOne, roverTwo ]);

        mission.start();

        assert.deepStrictEqual(roverOne.getPosition(), { X: 1, Y: 1 });
        assert.deepStrictEqual(roverTwo.getPosition(), { X: 1, Y: 2 });
    });

    it('Robots should not move out of the plateau.', function() {
        const rover = new Rover({ X: 1, Y: 1 }, Direction.SOUTH, [Command.M, Command.M]);
        const mission = new Mission({ X: 5, Y: 5 }, [ rover ]);

        mission.start();

        assert.deepStrictEqual(rover.getPosition(), { X: 1, Y: 0 });
    });

    it('Robot should finish the mission in position {X: 1, Y: 3} and direction NORTH.', function() {
        const rover = new Rover({ X: 1, Y: 2 }, Direction.NORTH, [ Command.L, Command.M, Command.L, Command.M, Command.L, Command.M, Command.L, Command.M, Command.M]);
        const mission = new Mission({ X: 5, Y: 5 }, [ rover ]);

        mission.start();

        assert.deepStrictEqual(rover.getPosition(), { X: 1, Y: 3 });
        assert.deepStrictEqual(rover.getDirection(), Direction.NORTH);
    });

    it('Robot should finish the mission in position {X: 5, Y: 1} and direction EAST.', function() {
        const rover = new Rover({ X: 3, Y: 3 }, Direction.EAST, [ Command.M, Command.M, Command.R, Command.M, Command.M, Command.R, Command.M, Command.R, Command.R, Command.M]);
        const mission = new Mission({ X: 5, Y: 5 }, [ rover ]);

        mission.start();

        assert.deepStrictEqual(rover.getPosition(), { X: 5, Y: 1 });
        assert.deepStrictEqual(rover.getDirection(), Direction.EAST);
    });

});