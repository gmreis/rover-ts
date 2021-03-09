import { Coordinate } from "./../entities/coordinate";
import { Plateau } from "./../entities/plateau";
import { AntiCollision } from "./antiCollision";
import { IRobotic } from "./../interface/irobotic";
import { Command } from "./../entities/command";
import { Direction } from "./../entities/direction";

export class Mission {
    private plateau: Plateau;
    private anticollision: AntiCollision;
    private roboticList: IRobotic[];

    constructor(
        size: Coordinate,
        roboticList: IRobotic[]
    ) {
        this.plateau = new Plateau(size);
        this.anticollision = new AntiCollision(roboticList);
        this.roboticList = roboticList;
    }

    public start() {
        this.roboticList.forEach(this.executeCommand, this);
    }

    private executeCommand(robotic: IRobotic): void {
        let command;
        while (command = robotic.getNexCommand()) {
            if (command === Command.M && this.validMoviment(command, robotic)) {
                this.anticollision.removeObstacle(robotic);
                robotic.move();
                this.anticollision.addObstacle(robotic);
            } else {
                robotic.turn(command);
            }
        }
    }

    private validMoviment(command: Command, robotic: IRobotic): boolean {
        const nextPosition = robotic.getNextPosition(command);
        const isPositionValid = nextPosition && this.plateau.validPosition(nextPosition);
        const hasObstacle = nextPosition && this.anticollision.hasObstacle(nextPosition);

        return isPositionValid && !hasObstacle;
    }

    public result() {
        this.roboticList.forEach(this.checkPosition);
    }

    private checkPosition(robotic: IRobotic): void {
        console.log('checkPosition', robotic.getPosition(), Direction[robotic.getDirection()]);
    }
}