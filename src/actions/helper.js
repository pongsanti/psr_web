const POST = 'POST'

export const fetchOption = (headers, method='POST', body=null) => {
  const opt = {headers, method}
  if (body !== null) {
    opt.body = body;
  }
  return opt;
}

export const fetchHeader = (token=null) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (token !== null) {
    headers.append('X-Authorization', token)
  }
  return headers;
}

export const postOption = (headers, body) => ({
  headers,
  method: POST,
  body
});

