import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

type LoginCredentials = {
  email: string;
  password: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const credentials = body as LoginCredentials;

    // Validation des données
    if (!credentials.email || !credentials.password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Trouver l'utilisateur avec son email
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
      select: {
        id: true,
        email: true,
        name: true,
        passwordHash: true,
      },
    });

    // Ensure user exists and has required fields
    if (!user || !user.email || !user.passwordHash) {
      throw new Error('Invalid credentials');
    }

    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
