import { HttpHeaders } from "@angular/common/http";

export enum HttpMethods {
    GET,
    POST,
    PUT,
    DELETE
}

type HeaderType = { headers: { [header: string]: string }};

export type HttpBodyParams = {url: string, body: any, options?: HeaderType};
export type HttpParams = Omit<HttpBodyParams, 'body'>;

export type HttpBodyParamsArray = [string, any, { [header: string]: string }];
export type HttpParamsArray = [string, { [header: string]: string }];

export type HttpMethodsParametersMap = {
  [HttpMethods.GET]: HttpParams;
  [HttpMethods.POST]: HttpBodyParams;
  [HttpMethods.PUT]: HttpBodyParams;
  [HttpMethods.DELETE]: HttpParams;
};

export type HttpMethodsParametersArrayMap = {
  [HttpMethods.GET]: HttpParamsArray;
  [HttpMethods.POST]: HttpBodyParamsArray;
  [HttpMethods.PUT]: HttpBodyParamsArray;
  [HttpMethods.DELETE]: HttpParamsArray;
};


// P: parameters; R: Return value
type ArgsInterface<M extends HttpMethods, K extends HttpMethodsParametersMap[M]> = K;
type CallbackArgsInterface<M extends HttpMethods, K extends HttpMethodsParametersArrayMap[M]> = K;
type CallbackInterfaceType<M extends HttpMethods> = (...args: CallbackArgsInterface<M, HttpMethodsParametersArrayMap[M]>) => any;
type MethodInterfaceType<M extends HttpMethods, R> = (callback: CallbackInterfaceType<M>, args: ArgsInterface<M, HttpMethodsParametersMap[M]>) => R;


interface IHttpCallInterface<M extends HttpMethods, R> {
    call: MethodInterfaceType<M, R>;
}

export class HttpCalls implements IHttpCallInterface<HttpMethods, HttpMethodsParametersMap> {
    call<M extends HttpMethods, T>(callback: CallbackInterfaceType<M>, args: ArgsInterface<M, HttpMethodsParametersMap[M]>): T {
      // Overrides the headers for a new request
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const options = { headers };
      const newArgs = { ...args, options };
      console.log('New args with overrides: ', newArgs);
      const paramsArray = Object.values(newArgs) as HttpMethodsParametersArrayMap[M];
      console.log('Args array:', paramsArray);

      return callback(...paramsArray) as T;
    }

}
