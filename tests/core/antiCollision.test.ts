import { assert } from 'chai'
import { AntiCollision } from '../../src/core/antiCollision'
import { Direction } from '../../src/types/direction'
import { Rover } from '../../src/entities/rover'

describe('AntiCollision', function () {
  let roverOne: Rover
  let roverTwo: Rover
  let roverThree: Rover
  let antiCollision: AntiCollision

  beforeEach(function () {
    roverOne = new Rover({ X: 1, Y: 1 }, Direction.N)
    roverTwo = new Rover({ X: 2, Y: 2 }, Direction.N)
    roverThree = new Rover({ X: 3, Y: 3 }, Direction.N)

    antiCollision = new AntiCollision([roverOne, roverTwo, roverThree])
  })

  it('Should return true when has an obstacle in a position.', function () {
    assert.strictEqual(antiCollision.hasObstacle({ X: 1, Y: 1 }), true)
    assert.strictEqual(antiCollision.hasObstacle({ X: 2, Y: 2 }), true)
    assert.strictEqual(antiCollision.hasObstacle({ X: 3, Y: 3 }), true)
  })

  it('Should return false when has not an obstacle in a position.', function () {
    assert.strictEqual(antiCollision.hasObstacle({ X: 4, Y: 1 }), false)
  })

  it('Should return false when an obstacle is removed.', function () {
    antiCollision.removeObstacle(roverOne)
    antiCollision.removeObstacle(roverTwo)

    assert.strictEqual(antiCollision.hasObstacle({ X: 1, Y: 1 }), false)
    assert.strictEqual(antiCollision.hasObstacle({ X: 2, Y: 2 }), false)
    assert.strictEqual(antiCollision.hasObstacle({ X: 3, Y: 3 }), true)
  })
})
