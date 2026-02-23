export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  console.log("url", url);

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
};