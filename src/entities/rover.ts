import { Command } from "./command";
import { Coordinate } from "./coordinate";
import { Direction } from "./direction";
import { IRobotic } from "./../interface/irobotic";

export class Rover implements IRobotic {
    constructor(
        private position: Coordinate,
        private direction: Direction,
        private commandList: Command[]
    ) {}

    public getPosition(): Coordinate {
        return this.position;
    }

    public getDirection(): Direction {
        return this.direction;
    }

    public hasCommand(): boolean {
        return this.commandList.length > 0;
    }

    public getNexCommand(): Command | void {
        return this.commandList.shift();
    }

    public getNextPosition(): Coordinate {
        let nextX = this.position.X;
        let nextY = this.position.Y;

        switch(this.direction) {
            case Direction.NORTH:
                nextY = nextY + 1;
                break;
            case Direction.SOUTH:
                nextY = nextY - 1;
                break;
            case Direction.EAST:
                nextX = nextX + 1;
                break;
            case Direction.WEST:
                nextX = nextX - 1;
                break;
        }

        return { X: nextX, Y: nextY };
    }

    public move(): void {
        this.position = this.getNextPosition();
    }

    public turn(command: Command): void {
        let nextDirection = this.direction;

        switch(command) {
            case Command.R:
                nextDirection = this.direction + 1;
                break;
            case Command.L:
                nextDirection = this.direction > 0 ? this.direction - 1 : 3;
                break;
        }

        this.direction = nextDirection % 4;
    }
}