import { Command } from "../types/command";
import { Coordinate } from "../types/coordinate";
import { Direction } from "../types/direction";

export interface IRobotic {
    getPosition(): Coordinate;
    getDirection(): Direction;
    getNexCommand(): Command | void;
    getNextPosition(command: string): Coordinate;
    getLog(): string;
    move(): void;
    turn(command: Command): void;
}
