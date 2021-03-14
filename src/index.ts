import { Coordinate } from './types/coordinate'
import { Rover } from './entities/rover'
import { Mission } from './core/mission'
import { readFileByLine } from './utils/file'
import { ProcessInput } from './processInput'

readFileByLine(process.argv[2])
  .then((fileLines: string[]) => {
    const process: ProcessInput = new ProcessInput(fileLines)

    const size: Coordinate = process.getPlateauSize()
    const roverList: Rover[] = process.getRoverList()

    const mission: Mission = new Mission(size, roverList)
    mission.start()

    roverList.forEach(rover => console.log(rover.getLog()))
  })
  .catch((error: any) => {
    console.error(error.message)
    process.exit(1)
  })
