import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { saveSession } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const session = await authApi.register(form);
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
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center lg:grid-cols-[0.95fr_1.05fr]">
        <section className="shell-card mx-auto w-full max-w-md p-6 sm:p-8 lg:mr-auto">
          <div>
            <p className="eyebrow">Task Flow</p>
            <h1 className="page-title">Create account</h1>
            <p className="muted mt-3">Register once, then manage your task list from any device.</p>
          </div>

          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Name
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Password
              <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} />
            </label>
            {error ? <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
            <button className="primary-btn w-full" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-sm text-stone-600">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>

        <div className="hidden rounded-[2rem] bg-brand-700 p-8 text-white shadow-soft lg:block xl:p-12">
          <p className="eyebrow text-brand-100">Why this app works</p>
          <h2 className="page-title max-w-xl text-white">A lightweight task manager with strong internship-ready features.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-sm text-brand-100">Secure auth</p>
              <p className="mt-2 text-lg font-semibold">JWT login flow</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-sm text-brand-100">Task features</p>
              <p className="mt-2 text-lg font-semibold">Add, edit, delete, toggle</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-sm text-brand-100">Extra polish</p>
              <p className="mt-2 text-lg font-semibold">Search, filter, pagination</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-sm text-brand-100">Responsive</p>
              <p className="mt-2 text-lg font-semibold">Mobile and desktop layouts</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}