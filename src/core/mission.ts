import { Coordinate } from '../types/coordinate'
import { Plateau } from './../entities/plateau'
import { AntiCollision } from './antiCollision'
import { IRobotic } from '../interfaces/irobotic'
import { Command } from '../types/command'

export class Mission {
  private readonly plateau: Plateau
  private readonly anticollision: AntiCollision
  private readonly roboticList: IRobotic[]

  constructor (
    size: Coordinate,
    roboticList: IRobotic[]
  ) {
    this.plateau = new Plateau(size)
    this.anticollision = new AntiCollision(roboticList)
    this.roboticList = roboticList
  }

  public start (): void {
    this.roboticList.forEach(this.executeCommand, this)
  }

  private executeCommand (robotic: IRobotic): void {
    while (robotic.hasCommand()) {
      const command = robotic.getNexCommand()
      if (command === Command.M && this.validMoviment(command, robotic)) {
        this.anticollision.removeObstacle(robotic)
        robotic.move()
        this.anticollision.addObstacle(robotic)
      } else {
        robotic.turn(command)
      }
    }
  }

  private validMoviment (command: Command, robotic: IRobotic): boolean {
    const nextPosition = robotic.getNextPosition(command)
    const isPositionValid = this.plateau.validPosition(nextPosition)
    const hasObstacle = this.anticollision.hasObstacle(nextPosition)

    return isPositionValid && !hasObstacle
  }
}
