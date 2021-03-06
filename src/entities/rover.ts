import { Command } from '../types/command'
import { Coordinate } from '../types/coordinate'
import { Direction } from '../types/direction'
import { IRobotic } from '../interfaces/irobotic'

export class Rover implements IRobotic {
  constructor (
    private position: Coordinate,
    private direction: Direction,
    private readonly commandList: Command[] = []
  ) {}

  public getPosition (): Coordinate {
    return this.position
  }

  public getDirection (): Direction {
    return this.direction
  }

  public hasCommand (): boolean {
    return this.commandList.length > 0
  }

  public getNexCommand (): any {
    return this.commandList.shift()
  }

  public getNextPosition (): Coordinate {
    let nextX = this.position.X
    let nextY = this.position.Y

    switch (this.direction) {
      case Direction.N:
        nextY = nextY + 1
        break
      case Direction.S:
        nextY = nextY - 1
        break
      case Direction.E:
        nextX = nextX + 1
        break
      case Direction.W:
        nextX = nextX - 1
        break
    }

    return { X: nextX, Y: nextY }
  }

  public move (): void {
    this.position = this.getNextPosition()
  }

  public turn (command: Command): void {
    let nextDirection = this.direction

    switch (command) {
      case Command.R:
        nextDirection = this.direction + 1
        break
      case Command.L:
        nextDirection = this.direction > 0 ? this.direction - 1 : 3
        break
    }

    this.direction = nextDirection % 4
  }

  public getLog (): string {
    return `${this.position.X} ${this.position.Y} ${Direction[this.direction]}`
  }
}
