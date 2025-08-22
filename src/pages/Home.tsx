import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  TrendingUp,
  CheckCircle,
  Star,
  Play,
  Download,
  Smartphone,
  CreditCard,
  Wallet,
  Send,
  Download as Receive
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  const heroFeatures = [
    { text: "Bank-level security", icon: Shield },
    { text: "Instant transfers", icon: Zap },
    { text: "Global reach", icon: Globe }
  ];

  const statsData: StatItem[] = [
    { id: '1', value: '1M+', label: 'Active Users', icon: Users },
    { id: '2', value: '$500M+', label: 'Transactions', icon: TrendingUp },
    { id: '3', value: '150+', label: 'Countries', icon: Globe },
    { id: '4', value: '99.9%', label: 'Uptime', icon: Shield }
  ];

  const featuresData: FeatureItem[] = [
    {
      id: '1',
      title: 'Digital Wallet',
      description: 'Secure digital wallet for storing and managing your funds with real-time balance tracking.',
      icon: Wallet,
      color: 'text-blue-600'
    },
    {
      id: '2',
      title: 'Send Money',
      description: 'Send money instantly to friends, family, or businesses with just a few clicks.',
      icon: Send,
      color: 'text-green-600'
    },
    {
      id: '3',
      title: 'Receive Money',
      description: 'Receive payments from anywhere in the world with your unique wallet address.',
      icon: Receive,
      color: 'text-purple-600'
    },
    {
      id: '4',
      title: 'Mobile App',
      description: 'Full-featured mobile app available for iOS and Android devices.',
      icon: Smartphone,
      color: 'text-orange-600'
    },
    {
      id: '5',
      title: 'Cash In/Out',
      description: 'Easy cash-in and cash-out options through authorized agents worldwide.',
      icon: CreditCard,
      color: 'text-red-600'
    },
    {
      id: '6',
      title: 'Analytics',
      description: 'Detailed analytics and insights to track your spending patterns.',
      icon: TrendingUp,
      color: 'text-indigo-600'
    }
  ];

  const testimonialsData: TestimonialItem[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      content: 'This platform has revolutionized how I handle payments. The instant transfers and low fees have saved me both time and money.',
      rating: 5,
      avatar: 'SJ'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Freelance Developer',
      content: 'I love how easy it is to send money internationally. The app is intuitive and the customer support is excellent.',
      rating: 5,
      avatar: 'MC'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Student',
      content: 'Perfect for managing my expenses while studying abroad. The security features give me peace of mind.',
      rating: 5,
      avatar: 'ER'
    }
  ];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setStats(statsData);
      setFeatures(featuresData);
      setTestimonials(testimonialsData);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    The Future of
                    <span className="block text-yellow-300"> Digital Banking</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-blue-100 max-w-2xl">
                    Send, receive, and manage your money globally with unprecedented speed, security, and convenience.
                  </p>
                </div>

                {/* Hero Features */}
                <div className="flex flex-wrap gap-4">
                  {heroFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <feature.icon className="h-5 w-5 text-yellow-300" />
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-lg px-8 py-3 group"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-black hover:bg-white hover:text-gray-900 text-lg px-8 py-3"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </div>

                {/* Download App */}
                <div className="flex items-center gap-4 pt-4">
                  <Button variant="outline" size="sm" className="border-white/30 text-black hover:bg-white hover:text-gray-900">
                    <Download className="mr-2 h-4 w-4" />
                    Download App
                  </Button>
                  <span className="text-sm text-blue-200">Available on iOS & Android</span>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <Wallet className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Digital Wallet</h3>
                          <p className="text-sm text-blue-200">Secure & Fast</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">$2,450.00</p>
                        <p className="text-sm text-blue-200">Available Balance</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <Send className="h-6 w-6 mx-auto mb-2 text-green-300" />
                        <p className="text-sm font-medium">Send Money</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <Receive className="h-6 w-6 mx-auto mb-2 text-blue-300" />
                        <p className="text-sm font-medium">Receive Money</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {isLoading ? (
              // Skeleton loading for stats
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="text-center">
                  <Skeleton className="h-12 w-24 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </div>
              ))
            ) : (
              stats.map((stat) => (
                <div key={stat.id} className="text-center group">
                  <div className="flex items-center justify-center mb-4">
                    <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to manage your digital finances effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Skeleton loading for features
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="group">
                  <CardHeader>
                    <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                </Card>
              ))
            ) : (
              features.map((feature) => (
                <Card key={feature.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className={`${feature.color} mb-4`}>
                      <feature.icon className="h-12 w-12 group-hover:scale-110 transition-transform" />
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
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied users who trust our platform for their daily financial needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              // Skeleton loading for testimonials
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center mb-4">
                    <Skeleton className="h-12 w-12 rounded-full mr-4" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </Card>
              ))
            ) : (
              testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of users worldwide and experience the future of digital banking today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-lg px-8 py-3"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
