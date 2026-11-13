import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import LoginBrandPanel from '../components/LoginBrandPanel';
import LoginForm from '../components/LoginForm';
import { ShoppingBag } from 'lucide-react';

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    showPassword,
    setShowPassword,
    loading,
    handleLogin,
  } = useLogin();
  return (
    <div className="min-h-screen bg-[#f5f7fb] lg:grid lg:grid-cols-2">
      <LoginBrandPanel />
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Link
            to="/login"
            className="mb-10 flex items-center justify-center gap-2 lg:hidden"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#101b35] text-[#d6b477]">
              <ShoppingBag size={21} />
            </div>
            <span className="text-xl font-bold tracking-wide text-[#101b35]">
              NEXVIA
            </span>
          </Link>

          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b18a49]">
              Welcome back
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#101b35] sm:text-4xl">
              Sign in to Nexvia
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your account details to continue to your marketplace.
            </p>
          </div>
          <LoginForm
            email={email}
            password={password}
            error={error}
            showPassword={showPassword}
            loading={loading}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onSubmit={handleLogin}
          />
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              New to Nexvia?
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <Link
            to="/register"
            className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-[#101b35] transition hover:border-[#c49a52] hover:bg-[#c49a52]/5"
          >
            Create an account
          </Link>

          <p className="mt-8 text-center text-xs leading-5 text-slate-400">
            By continuing, you agree to use Nexvia responsibly and securely.
          </p>
        </div>
      </section>
    </div>
  );
}
