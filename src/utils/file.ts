import * as readline from 'readline';
import * as fs from 'fs';
import { once } from 'events';

export class File {
    public static async readFileByLine(filePath: string): Promise<string[]> {
        if (!File.fileExist(filePath)) {
            throw new Error('File not found!');
        }

        const lines: string[] = [];
        const reader = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity
        });

        reader.on('line', line => lines.push(line));

        await once(reader, 'close');

        return lines;
    }

    public static fileExist(file: string): boolean {
        return fs.existsSync(file);
    }
}
