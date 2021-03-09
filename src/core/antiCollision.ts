import { Coordinate } from "./../entities/coordinate";
import { IObstacle } from "./../interface/iobstacle";

export class AntiCollision {
    private obstacleMap: Map<String, IObstacle> = new Map();

    constructor(obstacleList: IObstacle[]) {
        this.obstacleMap = new Map();
        obstacleList.forEach(this.addObstacle, this);
    }

    public addObstacle(obstacle: IObstacle) {
        this.obstacleMap.set(`${obstacle.getPosition().X}:${obstacle.getPosition().Y}`, obstacle);
    }

    public hasObstacle(coordinate: Coordinate) {
        return this.obstacleMap.has(`${coordinate.X}:${coordinate.Y}`);
    }

    public removeObstacle(obstacle: IObstacle) {
        this.obstacleMap.delete(`${obstacle.getPosition().X}:${obstacle.getPosition().Y}`);
    }
}