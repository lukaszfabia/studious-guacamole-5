import { promises as fs } from 'fs';
import path from 'path';

export default async function writer(obj: any, filename: string): Promise<string> {
    const demandedPath = path.join(process.cwd(), "jsons");

    try {
        await fs.mkdir(demandedPath, { recursive: true });

        const filePath = path.join(demandedPath, `${filename}.json`);

        // indent
        await fs.writeFile(filePath, JSON.stringify(obj, null, 2));
        console.log(`Saved to: ${filePath}`);
        return filePath;
    } catch (error) {
        console.error(`Failed to save: ${error}`);
        throw new Error("Failed to save");
    }
}
