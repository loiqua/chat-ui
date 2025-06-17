'use client';

import { signIn } from 'next-auth/react';

interface SignInButtonProps {
  provider: string;
  children: React.ReactNode;
  className?: string;
}

export default function SignInButton({ provider, children, className }: SignInButtonProps) {
  return (
    <button className={className} onClick={() => signIn(provider)}>
      {children}
    </button>
  );
}
