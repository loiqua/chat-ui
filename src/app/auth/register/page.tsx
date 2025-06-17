"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowRight, Zap, Shield, Users } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/local/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error ?? 'Erreur lors de l\'inscription');
      }

      toast.success('Compte créé avec succès !');
      router.push('/login');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      toast.error(errorMessage);
      
      if (errorMessage.includes('email')) {
        setError('email', { message: errorMessage });
      } else if (errorMessage.includes('mot de passe')) {
        setError('password', { message: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Branding & Features */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  ChatFlow
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/80 mb-6">
                L&apos;avenir de la communication d&apos;équipe
              </p>
              <p className="text-lg text-white/60 max-w-lg">
                Créez votre compte pour accéder à toutes les fonctionnalités de notre plateforme de messagerie moderne.
              </p>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Ultra Rapide</h3>
                <p className="text-white/60 text-sm">Messages instantanés sans délai</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Sécurisé</h3>
                <p className="text-white/60 text-sm">Chiffrement end-to-end</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Collaboratif</h3>
                <p className="text-white/60 text-sm">Équipes illimitées</p>
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Créer un compte
                </h2>
                <p className="text-white/60">
                  Rejoignez la révolution
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                    Nom complet
                  </label>
                  <input
                    id="name"
                    type="text"
                    disabled={isLoading}
                    placeholder="Votre nom complet"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all disabled:opacity-50"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                    Adresse email
                  </label>
                  <input
                    id="email"
                    type="email"
                    disabled={isLoading}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all disabled:opacity-50"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLoading}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all disabled:opacity-50"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-9 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    disabled={isLoading}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all disabled:opacity-50"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-9 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isLoading ? 'Création en cours...' : 'Créer mon compte'}</span>
                    {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/60">
                  Déjà un compte?{' '}
                  <a
                    href="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push('/login');
                    }}
                    className="ml-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer"
                  >
                    Se connecter
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
