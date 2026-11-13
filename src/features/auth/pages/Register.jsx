import { Link } from 'react-router-dom';
import useRegister from '../hooks/useRegister';
import RegisterBrandPanel from '../components/RegisterBrandPanel';
import RegisterForm from '../components/RegisterForm';
import { ShoppingBag } from 'lucide-react';

export default function Register() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    error,
    showPassword,
    setShowPassword,
    loading,
    handleRegister,
  } = useRegister();
  return (
    <div className="min-h-screen bg-[#f5f7fb] lg:grid lg:h-screen lg:min-h-0 lg:grid-cols-2 lg:overflow-hidden">
      <RegisterBrandPanel />
      <section className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:px-10 lg:py-5 xl:px-16">
        <div className="w-full max-w-md">
          <Link
            to="/login"
            className="mb-6 flex items-center justify-center gap-2 lg:hidden"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#101b35] text-[#d6b477]">
              <ShoppingBag size={21} />
            </div>
            <span className="text-xl font-bold tracking-wide text-[#101b35]">
              NEXVIA
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#b18a49]">
              Create your account
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#101b35] sm:text-4xl">
              Join Nexvia
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Fill in your details to get started with your marketplace account.
            </p>
          </div>
          <RegisterForm
            name={name}
            email={email}
            password={password}
            role={role}
            error={error}
            showPassword={showPassword}
            loading={loading}
            onNameChange={setName}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onRoleChange={setRole}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onSubmit={handleRegister}
          />
          {/* Login Link */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Already registered?
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <Link
            to="/login"
            className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#101b35] transition hover:border-[#c49a52] hover:bg-[#c49a52]/5"
          >
            Sign in to your account
          </Link>

          {/* Footer */}
          <p className="mt-4 text-center text-xs leading-5 text-slate-400">
            By creating an account, you agree to use Nexvia responsibly and
            securely.
          </p>
        </div>
      </section>
    </div>
  );
}
