import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { taskApi } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

const emptyForm = { title: "", description: "" };

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await taskApi.getTasks({ page, limit: 6, search, status });
      setTasks(response.tasks);
      setTotalPages(response.totalPages || 1);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [page, search, status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingTaskId) {
        await taskApi.updateTask(editingTaskId, form);
      } else {
        await taskApi.createTask(form);
      }

      setForm(emptyForm);
      setEditingTaskId(null);
      setPage(1);
      await loadTasks();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (task) => {
    setEditingTaskId(task._id);
    setForm({ title: task.title, description: task.description || "" });
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (taskId) => {
    await taskApi.deleteTask(taskId);
    await loadTasks();
  };

  const handleToggle = async (taskId) => {
    await taskApi.toggleTask(taskId);
    await loadTasks();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-5">
        <header className="shell-card flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Task Flow</p>
            <h1 className="page-title">Dashboard</h1>
            <p className="muted mt-2">Welcome {user?.name || "back"}. Keep your tasks moving.</p>
          </div>
          <button className="secondary-btn w-full sm:w-auto" type="button" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <section className="shell-card p-5 sm:p-6">
          <form className="grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Title
              <input
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Description
              <textarea
                rows="3"
                className="min-h-[110px] resize-y"
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              />
            </label>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <button className="primary-btn" type="submit" disabled={saving}>
                {saving ? "Saving..." : editingTaskId ? "Update Task" : "Add Task"}
              </button>
              {editingTaskId ? (
                <button className="secondary-btn" type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </section>

        <section className="shell-card grid gap-4 p-5 sm:p-6 lg:grid-cols-[1fr_220px] lg:items-center">
          <input
            className="w-full"
            placeholder="Search by title or description"
            value={search}
            onChange={(event) => {
              setPage(1);
              setSearch(event.target.value);
            }}
          />
          <select
            className="w-full"
            value={status}
            onChange={(event) => {
              setPage(1);
              setStatus(event.target.value);
            }}
          >
            <option value="">All status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </section>

        {error ? <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

        <section className="shell-card p-5 sm:p-6">
          {loading ? (
            <p className="muted">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="muted">No tasks found. Add one above.</p>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <article
                  key={task._id}
                  className={`rounded-2xl border bg-white p-4 shadow-sm transition sm:p-5 ${
                    task.status === "completed" ? "border-emerald-200" : "border-stone-200"
                  }`}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-stone-900">{task.title}</h3>
                      <p className="mt-2 break-words text-sm leading-6 text-stone-600">
                        {task.description || "No description provided."}
                      </p>
                    </div>
                    <span
                      className={`task-pill self-start whitespace-nowrap ${
                        task.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button className="secondary-btn" type="button" onClick={() => handleToggle(task._id)}>
                      Toggle
                    </button>
                    <button className="secondary-btn" type="button" onClick={() => startEdit(task)}>
                      Edit
                    </button>
                    <button className="danger-btn" type="button" onClick={() => handleDelete(task._id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 border-t border-stone-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <button className="secondary-btn w-full sm:w-auto" type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>
              Previous
            </button>
            <span className="text-center text-sm text-stone-600">
              Page {page} of {totalPages}
            </span>
            <button className="secondary-btn w-full sm:w-auto" type="button" disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)}>
              Next
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}