import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { saveSession } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const session = await authApi.login(form);
      saveSession(session);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden rounded-[2rem] bg-stone-950 p-8 text-white shadow-soft lg:block xl:p-12">
          <p className="eyebrow text-brand-300">Task Flow</p>
          <h1 className="page-title max-w-xl text-white">Keep your tasks moving with a clean daily workflow.</h1>
          <p className="mt-4 max-w-lg text-stone-300">
            Sign in to manage tasks, switch status quickly, and keep the dashboard focused on what matters today.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-stone-300">Protected routes</p>
              <p className="mt-2 text-lg font-semibold">JWT ready</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-stone-300">Task controls</p>
              <p className="mt-2 text-lg font-semibold">CRUD + toggle</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-stone-300">Responsive UI</p>
              <p className="mt-2 text-lg font-semibold">Mobile first</p>
            </div>
          </div>
        </div>

        <section className="shell-card mx-auto w-full max-w-md p-6 sm:p-8 lg:ml-auto">
          <div>
            <p className="eyebrow">Task Flow</p>
            <h1 className="page-title">Welcome back</h1>
            <p className="muted mt-3">Sign in to track tasks, toggle status, and keep your day organized.</p>
          </div>

          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Password
              <input name="password" type="password" value={form.password} onChange={handleChange} required />
            </label>
            {error ? <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
            <button className="primary-btn w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-sm text-stone-600">
            No account? <Link to="/register">Create one</Link>
          </p>
        </section>
      </section>
    </main>
  );
}