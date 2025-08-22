import React from 'react';
import { 
  Wallet, 
  Send, 
  Download, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  CreditCard, 
  Smartphone, 
  Globe, 
  Lock, 
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Features() {
  const features = [
    {
      icon: Wallet,
      title: "Digital Wallet",
      description: "Secure digital wallet for storing and managing your funds with real-time balance tracking and transaction history.",
      color: "text-blue-600"
    },
    {
      icon: Send,
      title: "Send Money",
      description: "Send money instantly to friends, family, or businesses with just a few clicks. Fast, secure, and convenient.",
      color: "text-green-600"
    },
    {
      icon: Download,
      title: "Receive Money",
      description: "Receive payments from anywhere in the world. Share your wallet address or QR code for instant transfers.",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Bank-level security with encryption, two-factor authentication, and fraud protection to keep your money safe.",
      color: "text-red-600"
    },
    {
      icon: Zap,
      title: "Instant Transfers",
      description: "Lightning-fast money transfers that happen in seconds, not days. No more waiting for traditional banking delays.",
      color: "text-yellow-600"
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Support for different user types - regular users, agents, and administrators with role-based access control.",
      color: "text-indigo-600"
    },
    {
      icon: BarChart3,
      title: "Transaction Analytics",
      description: "Detailed analytics and reporting to track your spending patterns and financial insights.",
      color: "text-pink-600"
    },
    {
      icon: CreditCard,
      title: "Cash In/Out",
      description: "Easy cash-in and cash-out options through authorized agents and partner locations.",
      color: "text-orange-600"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Fully responsive design that works perfectly on all devices - desktop, tablet, and mobile phones.",
      color: "text-teal-600"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Access your wallet from anywhere in the world with our cloud-based platform.",
      color: "text-cyan-600"
    },
    {
      icon: Lock,
      title: "Privacy Protection",
      description: "Your personal and financial information is protected with industry-standard privacy measures.",
      color: "text-gray-600"
    },
    {
      icon: CheckCircle,
      title: "Verified System",
      description: "Fully verified and compliant digital wallet system with regular security audits and updates.",
      color: "text-emerald-600"
    }
  ];

  const benefits = [
    "No hidden fees or charges",
    "24/7 customer support",
    "Real-time transaction notifications",
    "Multi-currency support",
    "Offline transaction capabilities",
    "Integration with major payment systems"
  ];

  const stats = [
    { label: "Active Users", value: "10K+" },
    { label: "Daily Transactions", value: "50K+" },
    { label: "Countries Supported", value: "25+" },
    { label: "Security Score", value: "99.9%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features for
              <span className="text-blue-600 dark:text-blue-400"> Modern Banking</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Experience the future of digital banking with our comprehensive suite of features designed to make managing your money simple, secure, and efficient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform provides all the tools you need to manage your digital finances effectively and securely.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className={`${feature.color} mb-4`}>
                    <feature.icon className="h-12 w-12" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We've built our platform with user experience and security in mind, providing you with the best digital banking experience possible.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <Star className="h-8 w-8 mr-3" />
                  <h3 className="text-2xl font-bold">Premium Experience</h3>
                </div>
                <p className="text-blue-100 mb-6">
                  Join thousands of satisfied users who trust our platform for their daily financial needs.
                </p>
                <Button variant="secondary" size="lg" className="w-full">
                  Start Your Journey
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join our platform today and experience the future of digital banking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3">
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
