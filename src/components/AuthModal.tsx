import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { X, UserPlus, LogIn, Sparkles, Check } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    users,
    login,
    registerUser,
    currentUser,
  } = useBlog();

  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Independent Writer');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const cleanHandle = handle.trim()
      ? handle.trim().startsWith('@')
        ? handle.trim()
        : `@${handle.trim()}`
      : `@${name.toLowerCase().replace(/\s+/g, '')}`;

    registerUser({
      name: name.trim(),
      handle: cleanHandle,
      email: email.trim(),
      role: role.trim() || 'Writer',
      bio: bio.trim() || 'Author on Chronicle.',
    });
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Match by email or handle or pick first
    const matched = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() || u.handle === email.trim()
    );
    if (matched) {
      login(matched.id);
    } else if (users.length > 0) {
      login(users[0].id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95">
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <span className="font-serif text-2xl font-semibold text-stone-900">Chronicle</span>
          <p className="text-xs text-stone-500 mt-1">
            {mode === 'signup'
              ? 'Create an account to write and publish stories'
              : 'Sign in to your author account'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-lg bg-stone-100 p-1 mb-6 text-xs">
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              mode === 'signup' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              mode === 'signin' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
            }`}
          >
            Sign In
          </button>
        </div>

        {mode === 'signup' ? (
          <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Maya Lin"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!handle) {
                    setHandle(`@${e.target.value.toLowerCase().replace(/\s+/g, '')}`);
                  }
                }}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Handle</label>
                <input
                  type="text"
                  placeholder="@mayalin"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Role / Focus</label>
                <input
                  type="text"
                  placeholder="Architect & Writer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                placeholder="maya@studio.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                required
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Bio (1-2 sentences)</label>
              <textarea
                rows={2}
                placeholder="Writing on tactile interfaces and spatial poetics."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer mt-2"
            >
              Complete Registration & Start Writing
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignIn} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Email or Handle</label>
              <input
                type="text"
                placeholder="elena@chronicle.journal or @elenarostova"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                required
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </form>
        )}

        {/* Demo Fast Account Switcher */}
        <div className="mt-6 pt-5 border-t border-stone-100">
          <p className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-2 text-center">
            Or test with a pre-configured author
          </p>
          <div className="grid grid-cols-2 gap-2">
            {users.slice(0, 4).map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => login(user.id)}
                className="flex items-center gap-2 p-2 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors text-left cursor-pointer"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full border border-stone-200"
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-stone-900 truncate">{user.name}</p>
                  <p className="text-[10px] text-stone-500 truncate">{user.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
