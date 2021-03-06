import { Command } from './types/command'
import { Coordinate } from './types/coordinate'
import { Rover } from './entities/rover'
import { Direction } from './types/direction'

export class ProcessInput {
  private readonly size: Coordinate
  private readonly roverList: Rover[] = []

  constructor (line: string[]) {
    try {
      this.size = this.parserCoordinate(line.shift())

      while (line.length > 0) {
        const linePosition = line.shift()
        const lineCommands = line.shift()
        this.roverList.push(this.parserRover(linePosition, lineCommands))
      }
    } catch (error) {
      throw new Error('ERROR: Incorrect input file. ' + String(error.message))
    }
  }

  public getPlateauSize (): Coordinate {
    return this.size
  }

  public getRoverList (): Rover[] {
    return this.roverList
  }

  public parserCoordinate (line: string | undefined): Coordinate {
    const input: string[] = String(line).split(' ')
    const X: number = Number(input[0])
    const Y: number = Number(input[1])

    if (Number.isNaN(X) || Number.isNaN(Y)) {
      throw new Error('Coordinate should be a Number!')
    }

    return { X: Number(input[0]), Y: Number(input[1]) }
  }

  public parserRover (linePosition: string | undefined, lineCommands: string | undefined): Rover {
    const position = this.parserCoordinate(linePosition)
    const direction: Direction = this.parserDirection(linePosition)
    const commandList: Command[] = this.parserCommandList(lineCommands)

    return new Rover(position, direction, commandList)
  }

  public parserDirection (linePosition: string | undefined): Direction {
    const inputPosition: string[] = String(linePosition).split(' ')
    const direction: Direction = (Direction as any)[inputPosition[2]]

    if (direction === undefined) {
      throw new Error('Direction should be N, E, S or W!')
    }

    return direction
  }

  public parserCommandList (lineCommands: string | undefined): Command[] {
    const inputCommand: string[] = String(lineCommands).split('')
    return inputCommand
      .map(cmd => (Command as any)[cmd])
      .filter(cmd => cmd !== undefined)
  }
}
