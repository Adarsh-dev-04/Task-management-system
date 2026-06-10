const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (path, options = {}) => {
  const token = localStorage.getItem("taskflow_token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const authApi = {
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
};

export const taskApi = {
  getTasks: (params) => {
    const query = new URLSearchParams();

    if (params.page) query.set("page", params.page);
    if (params.limit) query.set("limit", params.limit);
    if (params.search) query.set("search", params.search);
    if (params.status) query.set("status", params.status);

    const suffix = query.toString() ? `?${query.toString()}` : "";
    return request(`/tasks${suffix}`);
  },
  createTask: (payload) => request("/tasks", { method: "POST", body: JSON.stringify(payload) }),
  updateTask: (id, payload) => request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteTask: (id) => request(`/tasks/${id}`, { method: "DELETE" }),
  toggleTask: (id) => request(`/tasks/${id}/toggle`, { method: "PATCH" }),
};