import { assert } from 'chai'
import { Mission } from '../../src/core/mission'
import { Direction } from '../../src/types/direction'
import { Rover } from '../../src/entities/rover'
import { Command } from '../../src/types/command'

describe('Mission', function () {
  it('Robots should not move to position with an obstacle.', function () {
    const roverOne = new Rover({ X: 1, Y: 1 }, Direction.N, [Command.M])
    const roverTwo = new Rover({ X: 1, Y: 2 }, Direction.S, [Command.M])
    const mission = new Mission({ X: 5, Y: 5 }, [roverOne, roverTwo])

    mission.start()

    assert.deepStrictEqual(roverOne.getPosition(), { X: 1, Y: 1 })
    assert.deepStrictEqual(roverTwo.getPosition(), { X: 1, Y: 2 })
  })

  it('Robots should not move out of the plateau.', function () {
    const rover = new Rover({ X: 1, Y: 1 }, Direction.S, [Command.M, Command.M])
    const mission = new Mission({ X: 5, Y: 5 }, [rover])

    mission.start()

    assert.deepStrictEqual(rover.getPosition(), { X: 1, Y: 0 })
  })

  it('Robot should finish the mission in position {X: 1, Y: 3} and direction NORTH.', function () {
    const rover = new Rover({ X: 1, Y: 2 }, Direction.N, [Command.L, Command.M, Command.L, Command.M, Command.L, Command.M, Command.L, Command.M, Command.M])
    const mission = new Mission({ X: 5, Y: 5 }, [rover])

    mission.start()

    assert.deepStrictEqual(rover.getPosition(), { X: 1, Y: 3 })
    assert.deepStrictEqual(rover.getDirection(), Direction.N)
  })

  it('Robot should finish the mission in position {X: 5, Y: 1} and direction EAST.', function () {
    const rover = new Rover({ X: 3, Y: 3 }, Direction.E, [Command.M, Command.M, Command.R, Command.M, Command.M, Command.R, Command.M, Command.R, Command.R, Command.M])
    const mission = new Mission({ X: 5, Y: 5 }, [rover])

    mission.start()

    assert.deepStrictEqual(rover.getPosition(), { X: 5, Y: 1 })
    assert.deepStrictEqual(rover.getDirection(), Direction.E)
  })
})
