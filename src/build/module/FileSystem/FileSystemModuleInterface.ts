
export interface FileSystemModuleInterface
{
	createFile(absoluteFilePath: string): boolean;

	fileExists(absoluteFilePath: string): boolean;

	forEachFileRecursively(srcDirPath: string, callback: Function, ignorePatterns: Array<any>): this;

	getDirContents(absoluteDirPath: string): Array<string>;

	getFiles(absoluteDirPath: string): Array<string>;

	getRelativePathBetweenDirs(fromPath: string, toPath: string): string;

	isDirectory(absoluteFilePath: string): boolean;

	isFile(absoluteFilePath: string): boolean;

	readAsTextString(absoluteFilePath: string): string;

	readYaml(absoluteFilePath: string): Object;

	removeDir(absoluteDirPath: string): boolean;

	removeFile(absoluteFilePath: string): boolean;

	writeFile(absoluteFilePath: string, fileContents: string): boolean;
}