import { Command } from '../types/command'
import { Coordinate } from '../types/coordinate'
import { Direction } from '../types/direction'

export interface IRobotic {
  getPosition: () => Coordinate
  getDirection: () => Direction
  hasCommand: () => boolean
  getNexCommand: () => Command
  getNextPosition: (command: string) => Coordinate
  getLog: () => string
  move: () => void
  turn: (command: Command) => void
}
