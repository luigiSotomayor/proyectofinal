export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const resp = await response.json();

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return resp;
};
