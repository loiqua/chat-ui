import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SignInButton from '@/components/SignInButton';
import SignOutButton from '@/components/SignOutButton';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        {session ? (
          <div>
            <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
            <p className="mt-2">You are signed in as {session.user?.email}</p>
            <div className="mt-4">
              <SignOutButton />
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold">Welcome to the Chat App</h1>
            <p className="mt-2">Please sign in to continue</p>
            <div className="mt-4 flex flex-col space-y-2 w-48 mx-auto">
              <SignInButton provider='github' className='bg-gray-800 text-white p-2 rounded-lg'>Sign in with Github</SignInButton>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
