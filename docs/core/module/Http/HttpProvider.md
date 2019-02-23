## Http Provider
  
The HttpModule uses the provider to make the request. By default, Phusion uses the `AxiosHttpProvider` but if you wanted to use a different library other than Axios, you can easily write your own provider. Your provider must implement the `HttpModuleInterface`
  
### makeHttpRequest(request: HttpRequest): Promise<HttpResponse>

This method is the only one on the provider class. It takes an instance of `HttpRequest` as an argument and must return an instance of `HttpResponse`.
