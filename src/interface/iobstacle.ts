import { Coordinate } from "./../entities/coordinate";

export interface IObstacle {
    getPosition(): Coordinate;
}
