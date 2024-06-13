const csrfFetch = async(url, options= {}) => {
  options.headers ||= {};
  options.method ||= "GET"
  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] ||= "application/json"
    options.headers["X-CSRF-Token"] = sessionStorage.getItem('X-CSRF-Token')
  }

  const res = await fetch(url, options);
  if (res.status >= 400) throw res;
  return res
}

export const restoreCSRF = async() => {
  const response = await csrfFetch("/api/session");
  storeCSRF(response);
  return response
}

export const storeCSRF = (res) => {
  const csrfToken = res.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken)
}

export default csrfFetch;