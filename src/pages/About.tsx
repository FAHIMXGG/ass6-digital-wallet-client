import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Award, 
  Target, 
  TrendingUp, 
  Lock,
  Smartphone,
  CreditCard,
  Banknote,
  CheckCircle,
  Star,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Bank-level security with end-to-end encryption for all financial transactions"
    },
    {
      icon: Zap,
      title: "Instant Transfers",
      description: "Send money instantly to friends, family, or businesses with real-time processing"
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Support for users, agents, and administrators with role-based access control"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with users worldwide through our secure digital payment platform"
    },
    {
      icon: Award,
      title: "Trusted Platform",
      description: "Built with reliability and trust, serving thousands of satisfied customers"
    },
    {
      icon: Target,
      title: "Precise Control",
      description: "Advanced wallet management with daily and monthly spending limits"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Transactions" },
    { number: "$2M+", label: "Total Volume" },
    { number: "99.9%", label: "Uptime" }
  ];

  const services = [
    {
      icon: Smartphone,
      title: "Mobile Payments",
      description: "Send and receive money on the go with our mobile-optimized platform"
    },
    {
      icon: CreditCard,
      title: "Card Management",
      description: "Secure card transactions with real-time balance updates and spending controls"
    },
    {
      icon: Banknote,
      title: "Bank Transfers",
      description: "Direct bank transfers with competitive fees and fast processing times"
    },
    {
      icon: Lock,
      title: "Security First",
      description: "Advanced security measures including 2FA, encryption, and fraud protection"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4 py-16">
                      <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                About <span className="text-primary">DigitalWallet</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We're revolutionizing digital payments by providing a secure, fast, and user-friendly 
                platform that connects people and businesses through seamless financial transactions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="text-lg px-8">
                    Create Account
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Learn More
                </Button>
              </div>
            </div>
        </div>
      </div>

      {/* Service Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The journey of DigitalWallet began with a simple vision: to make digital payments accessible, 
            secure, and seamless for everyone.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>2019 - The Beginning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Founded by a team of fintech enthusiasts who recognized the growing need for 
                accessible digital payment solutions in emerging markets.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>2021 - Rapid Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Launched our first mobile app and reached 10,000 users within the first year. 
                Introduced agent network for cash-in/cash-out services.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>2024 - Global Expansion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Expanded to serve over 50,000 users across multiple regions with advanced 
                security features and comprehensive financial services.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                To democratize financial services by providing accessible, secure, and efficient 
                digital payment solutions that empower individuals and businesses to transact 
                freely in the digital economy.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe that everyone deserves access to reliable financial tools that make 
                their lives easier and their businesses more successful, regardless of their 
                location or financial background.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform bridges the gap between traditional banking services and the 
                modern digital economy, ensuring financial inclusion for all.
              </p>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Our Vision</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To become the leading digital payment platform that bridges the gap between 
                    traditional banking and modern financial needs, serving millions of users 
                    worldwide with innovative financial solutions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Our Values</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-muted-foreground">Security & Trust</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-muted-foreground">Innovation & Excellence</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-muted-foreground">User-Centric Design</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-muted-foreground">Transparency & Integrity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-muted-foreground">Financial Inclusion</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-muted-foreground">Community Impact</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Digital C?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge technology with user-friendly design to deliver 
              the best digital payment experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
          <p className="text-lg text-muted-foreground">
            Trusted by thousands of users worldwide
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital payment solutions designed for modern needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the passionate team behind DigitalWallet, dedicated to revolutionizing 
            digital payments and financial services.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <CardTitle>Development Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Our skilled developers work tirelessly to build and maintain 
                the most secure and efficient payment platform using cutting-edge technologies.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <CardTitle>Security Experts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Dedicated security professionals ensuring your financial 
                data and transactions remain protected with bank-level encryption.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-12 w-12 text-primary" />
              </div>
              <CardTitle>Customer Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Our support team is here 24/7 to help you with any questions 
                or issues you may have with our platform.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-12 w-12 text-primary" />
              </div>
              <CardTitle>Business Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Strategic partnerships and business growth experts working to expand 
                our services and reach more communities worldwide.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Leadership Team */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">Leadership Team</h3>
            <p className="text-muted-foreground">
              Experienced leaders driving innovation and growth
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-lg">CEO & Founder</CardTitle>
                <CardDescription>John Smith</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  15+ years in fintech. Former VP at major payment processor. 
                  Passionate about financial inclusion and technology innovation.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-lg">CTO</CardTitle>
                <CardDescription>Sarah Johnson</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Expert in blockchain and cybersecurity. Led development teams 
                  at multiple successful fintech startups.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-lg">COO</CardTitle>
                <CardDescription>Michael Chen</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Operations specialist with deep experience in scaling fintech 
                  companies and building agent networks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
              <p className="text-muted-foreground">support@digitalc.com</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Visit Us</h3>
              <p className="text-muted-foreground">123 Digital Street, Tech City, TC 12345</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Digital C for their digital payment needs. 
              Start your journey today with secure, fast, and reliable financial transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8">
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
