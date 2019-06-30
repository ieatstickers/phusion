
export class FileSystem
{
	private static nodeJsFileSystem: any;
	private static nodeJsPath: any;
	private static shellJs: any;
	private static yamlJs: any;

	public static createFile(absoluteFilePath: string): boolean
	{
		try
		{
			// Get directory path by removing file name at the end
			let directoryPath = absoluteFilePath.replace(/[^\/]+$/, '');
			this.getShellJs().mkdir('-p', directoryPath);

			this
				.getNodeJsFileSystem()
				.writeFileSync(absoluteFilePath, '');
		} catch (exception)
		{
			throw exception;
		}

		return true;
	};

	public static fileExists(absoluteFilePath: string): boolean
	{
		let fileExists;

		try
		{
			this.getNodeJsFileSystem().statSync(absoluteFilePath);
			fileExists = true;
		} catch (exception)
		{
			fileExists = false;
		}

		return fileExists;
	}

	public static forEachFileRecursively(srcDirPath: string, callback: Function, ignorePatterns: Array<RegExp> = [], iterationCount: number = 0): number
	{
		let itemsInScope = this.getDirContents(srcDirPath);

		for (let key in itemsInScope)
		{
			let fileName = itemsInScope[key];
			let fullFilePath = srcDirPath + '/' + fileName;
			let shouldContinue = false;

			// For each ignore pattern
			for (let key in ignorePatterns)
			{
				let pattern = new RegExp(ignorePatterns[key]);

				// If full file path matches
				if(pattern.test(fullFilePath))
				{
					// Ignore it and return
					shouldContinue = true;
					break;
				}
			}

			if (shouldContinue)
			{
				continue;
			}

			if (this.isDirectory(fullFilePath))
			{
				iterationCount = this.forEachFileRecursively(fullFilePath, callback, [], iterationCount);
			}
			else if (this.isFile(fullFilePath))
			{
				iterationCount++;
				callback(fileName, fullFilePath);
			}
		}

		return iterationCount;
	}

	public static getDirContents(absoluteDirPath: string): Array<string>
	{
		let dirItems = this
			.getNodeJsFileSystem()
			.readdirSync(absoluteDirPath);

		return dirItems.filter((function (fileOrDirName)
		{
			let stat = this
				.getNodeJsFileSystem()
				.statSync(absoluteDirPath + '/' + fileOrDirName);
			return (stat.isFile() || stat.isDirectory());
		}).bind(this));
	}

	public static getFiles(absoluteDirPath: string): Array<string>
	{
		let dirItems = this
			.getNodeJsFileSystem()
			.readdirSync(absoluteDirPath);

		return dirItems.filter((function (fileOrDirName)
		{
			return this
				.getNodeJsFileSystem()
				.statSync(absoluteDirPath + fileOrDirName).isFile();
		}).bind(this));
	}

	public static getRelativePathBetweenDirs(fromPath: string, toPath: string): string
	{
		const path = this.getNodeJsPath();

		return path.relative(fromPath, toPath);
	}

	public static isDirectory(absoluteFilePath: string): boolean
	{
		return this
			.getNodeJsFileSystem()
			.statSync(absoluteFilePath).isDirectory();
	}

	public static isFile(absoluteFilePath: string): boolean
	{
		return this
			.getNodeJsFileSystem()
			.statSync(absoluteFilePath).isFile();
	}

	public static readAsTextString(absoluteFilePath: string): string
	{
		return this.getNodeJsFileSystem().readFileSync(absoluteFilePath).toString();
	};

	public static readYaml(absoluteFilePath: string): Object
	{
		if (!this.fileExists(absoluteFilePath))
		{
			return null;
		}

		let yamlString = this.readAsTextString(absoluteFilePath);

		// Return imported JavaScript array
		return this.getYamlJs().parse(yamlString);
	}

	public static removeDir(absoluteDirPath: string): boolean
	{
		let fs = this.getNodeJsFileSystem();

		if (fs.existsSync(absoluteDirPath))
		{
			fs.readdirSync(absoluteDirPath).forEach(function (file, index)
			{
				var currentPath = absoluteDirPath + "/" + file;

				if (fs.lstatSync(currentPath).isDirectory())
				{
					// recurse
					this.removeDir(currentPath);
				} else
				{
					// delete file
					fs.unlinkSync(currentPath);
				}
			});

			fs.rmdirSync(absoluteDirPath);

			return true;
		}

		return false;
	};

	public static removeFile(absoluteFilePath: string): boolean
	{
		let fs = this.getNodeJsFileSystem();

		fs.unlinkSync(absoluteFilePath);

		return true;
	};

	public static writeFile(absoluteFilePath: string, fileContents: string): boolean
	{
		let fileExists = this.fileExists(absoluteFilePath);

		// If file doesn't exist
		if (fileExists == false)
		{
			// Create it
			this
				.createFile(absoluteFilePath);
		}

		try
		{
			this.getNodeJsFileSystem().writeFileSync(
				absoluteFilePath,
				fileContents,
				'utf-8'
			);
		} catch (exception)
		{
			return false;
		}

		return true;
	}

	private static getNodeJsFileSystem(): any
	{
		if (!this.nodeJsFileSystem)
		{
			this.nodeJsFileSystem = require('fs')
		}

		return this.nodeJsFileSystem;
	}

	private static getNodeJsPath(): any
	{
		if (!this.nodeJsPath)
		{
			this.nodeJsPath = require('path')
		}

		return this.nodeJsPath;
	}

	private static getYamlJs(): any
	{
		if (!this.yamlJs)
		{
			this.yamlJs = require('yamljs')
		}

		return this.yamlJs;
	}

	private static getShellJs(): any
	{
		if (!this.shellJs)
		{
			this.shellJs = require('shelljs')
		}

		return this.shellJs;
	}
}