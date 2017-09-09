export const fetchOption = (headers, method='POST') => ({
  headers,
  method
});

export const fetchHeader = (token=null) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (token !== null) {
    headers.append('X-Authorization', token)
  }
  return headers;
}