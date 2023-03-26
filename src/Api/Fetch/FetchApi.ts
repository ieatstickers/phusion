
export class FetchApi
{
  public static fetch(
    url: string,
    options: RequestInit
  ): Promise<Response>
  {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(async (response) => {
          if (!response.ok)
          {
            return reject(response);
          }
          
          return resolve(response);
        })
        .catch(reject)
    })
  }
}
