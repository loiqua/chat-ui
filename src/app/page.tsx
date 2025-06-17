import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SignOutButton from '@/components/SignOutButton';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenue, {session.user?.name}!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Vous êtes connecté avec {session.user?.email}
        </p>
        <div className="mt-4">
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}
