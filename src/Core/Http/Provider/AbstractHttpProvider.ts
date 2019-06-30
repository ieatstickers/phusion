

export class AbstractHttpProvider
{
	protected getQueryStringFromParams(paramsObject, prefix = '?')
	{
		let queryString = [];
		let paramName;

		for (paramName in paramsObject) {
			if (paramsObject.hasOwnProperty(paramName))
			{
				let paramValue = paramsObject[paramName];

				if (typeof paramValue === 'object')
				{
					paramValue = JSON.stringify(paramValue);
				}

				queryString.push(
						encodeURIComponent(paramName) + "=" + encodeURIComponent(paramValue)
				);
			}
		}

		if (!prefix)
		{
			prefix = '';
		}

		return prefix + queryString.join("&");
	}
}