import { Coordinate } from "../types/coordinate";

export class Plateau {
    constructor(
        public readonly size: Coordinate
    ) {}

    public validPosition(position: Coordinate): boolean {
        return position.X >= 0 && position.X <= this.size.X
            && position.Y >= 0 && position.Y <= this.size.Y;
    }
}
