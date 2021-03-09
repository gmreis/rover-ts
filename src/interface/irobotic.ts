import { Command } from "./../entities/command";
import { Coordinate } from "./../entities/coordinate";
import { Direction } from "./../entities/direction";

export interface IRobotic {
    getPosition(): Coordinate;
    getDirection(): Direction;
    getNexCommand(): Command | void;
    getNextPosition(command: string): Coordinate;
    move(): void;
    turn(command: Command): void;
}
