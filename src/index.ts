import { Coordinate } from "./types/coordinate";
import { Rover } from "./entities/rover";
import { Mission } from "./core/mission";
import { File } from "./utils/file";
import { ProcessInput } from "./processInput";

async function init(filePath: string) {
    try {
        const fileLines: string[] = await File.readFileByLine(filePath);
        const process: ProcessInput = new ProcessInput(fileLines);

        const size: Coordinate = process.getPlateauSize();
        const roverList: Rover[] = process.getRoverList();

        const mission: Mission = new Mission(size, roverList);
        mission.start();

        roverList.forEach(rover => console.log(rover.getLog()));
        
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
}

init(process.argv[2]);
