interface IRequestParams {
  path: string | null;
  body?: object;
}

const basePath = '/api';
const headers = { 'Content-Type': 'application/json' };

export function getRequest<T = unknown>(params: IRequestParams): Promise<T> {
  return fetch(params.path === null ? basePath : `${basePath}/${params.path}`, {
    method: 'GET',
    headers,
    body: params.body ? JSON.stringify(params.body) : undefined,
  }).then(r => r.json());
}

export function postRequest<T = unknown>(params: IRequestParams): Promise<T> {
  return fetch(`${basePath}/${params.path}`, {
    method: 'POST',
    headers,
    body: params.body ? JSON.stringify(params.body) : undefined,
  }).then(r => r.json());
}

export function patchRequest<T = unknown>(params: IRequestParams): Promise<T> {
  return fetch(`${basePath}/${params.path}`, {
    method: 'PATCH',
    headers,
    body: params.body ? JSON.stringify(params.body) : undefined,
  }).then(r => r.json());
}

export function deleteRequest(params: Omit<IRequestParams, 'body'>): Promise<Response> {
  return fetch(`${basePath}/${params.path}`, {
    method: 'DELETE',
    headers,
  });
}
