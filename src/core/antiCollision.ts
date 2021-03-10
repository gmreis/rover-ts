import { Coordinate } from "../types/coordinate";
import { IObstacle } from "../interfaces/iobstacle";

export class AntiCollision {
    private obstacleMap: Map<String, IObstacle> = new Map();

    constructor(obstacleList: IObstacle[]) {
        this.obstacleMap = new Map();
        obstacleList.forEach(this.addObstacle, this);
    }

    public addObstacle(obstacle: IObstacle): void {
        this.obstacleMap.set(`${obstacle.getPosition().X}:${obstacle.getPosition().Y}`, obstacle);
    }

    public hasObstacle(coordinate: Coordinate): boolean {
        return this.obstacleMap.has(`${coordinate.X}:${coordinate.Y}`);
    }

    public removeObstacle(obstacle: IObstacle): void {
        this.obstacleMap.delete(`${obstacle.getPosition().X}:${obstacle.getPosition().Y}`);
    }
}