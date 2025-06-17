"use client"

import React, { useState } from 'react';
import { Github, Eye, EyeOff, ArrowRight, Zap, Shield, Users } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/auth/register';
  };

  const handleSocialSignIn = async (provider: string) => {
    try {
      await signIn(provider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/dashboard',
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error signing in with credentials:', error);
      alert('Erreur de connexion : ' + (error instanceof Error ? error.message : 'Vérifiez vos identifiants'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-500 opacity-60"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-1000 opacity-60"></div>
      </div>

      {/* Main Content */}
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
                Connectez-vous, collaborez et créez ensemble dans un environnement moderne et sécurisé.
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

          {/* Right Side - Login Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Connexion
                </h2>
                <p className="text-white/60">
                  Bon retour parmi nous
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="mb-6">
                <button
                  onClick={() => handleSocialSignIn('github')}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 group cursor-pointer"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Continuer avec GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white/60">ou</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Adresse email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-white/60">
                    <input type="checkbox" className="mr-2 rounded" />
                    <span>Se souvenir de moi</span>
                  </label>
                  <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Mot de passe oublié ?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  <span>Se connecter</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-white/60">
                  Pas encore de compte?{' '}
                  <a
                    href="/auth/register"
                    onClick={handleSignUpClick}
                    className="ml-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer"
                  >
                    Créer un compte
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
