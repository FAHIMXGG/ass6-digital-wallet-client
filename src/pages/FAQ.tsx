import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  Wallet,
  Shield,
  CreditCard,
  Users,
  Globe,
  Smartphone,
  HelpCircle,
  Mail,
  Phone
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    // Account & Registration
    {
      id: 'account-1',
      question: 'How do I create an account?',
      answer: 'Creating an account is simple! Click the "Sign Up" button on our homepage, fill in your personal information including your full name, email address, and phone number. You\'ll need to verify your email and phone number to complete the registration process.',
      category: 'Account & Registration',
      tags: ['account', 'signup', 'registration', 'create']
    },
    {
      id: 'account-2',
      question: 'What documents do I need to verify my account?',
      answer: 'To verify your account, you\'ll need a valid government-issued ID (passport, driver\'s license, or national ID), proof of address (utility bill or bank statement), and a recent photo. These documents help us ensure the security of our platform.',
      category: 'Account & Registration',
      tags: ['verification', 'documents', 'kyc', 'identity']
    },
    {
      id: 'account-3',
      question: 'Can I have multiple accounts?',
      answer: 'No, you can only have one account per person. This is to prevent fraud and ensure compliance with financial regulations. If you need to manage multiple businesses, please contact our support team for business account options.',
      category: 'Account & Registration',
      tags: ['multiple', 'business', 'fraud', 'compliance']
    },

    // Security & Safety
    {
      id: 'security-1',
      question: 'How secure is my money and personal information?',
      answer: 'Your security is our top priority. We use bank-level encryption (256-bit SSL), two-factor authentication (2FA), and follow strict security protocols. Your funds are held in secure, regulated financial institutions, and we never store your full banking credentials.',
      category: 'Security & Safety',
      tags: ['security', 'encryption', '2fa', 'protection']
    },
    {
      id: 'security-2',
      question: 'What happens if I lose my phone or forget my password?',
      answer: 'Don\'t worry! You can recover your account through multiple methods. Use your email address and security questions, or contact our 24/7 support team. We\'ll help you regain access to your account and funds safely.',
      category: 'Security & Safety',
      tags: ['recovery', 'password', 'lost', 'support']
    },
    {
      id: 'security-3',
      question: 'Is my transaction history private?',
      answer: 'Yes, your transaction history is completely private and secure. We follow strict privacy policies and never share your financial information with third parties without your explicit consent, except when required by law.',
      category: 'Security & Safety',
      tags: ['privacy', 'history', 'data', 'confidential']
    },

    // Transactions & Payments
    {
      id: 'transactions-1',
      question: 'How long do money transfers take?',
      answer: 'Most transfers are instant or completed within minutes. Domestic transfers typically take 1-2 business days, while international transfers may take 1-3 business days depending on the destination country and banking system.',
      category: 'Transactions & Payments',
      tags: ['transfer', 'time', 'instant', 'domestic', 'international']
    },
    {
      id: 'transactions-2',
      question: 'What are the fees for sending money?',
      answer: 'Our fees are transparent and competitive. Domestic transfers are usually free or have minimal fees ($1-3). International transfers have fees ranging from $5-15 depending on the amount and destination. We always show the exact fee before you confirm any transaction.',
      category: 'Transactions & Payments',
      tags: ['fees', 'cost', 'pricing', 'transparent']
    },
    {
      id: 'transactions-3',
      question: 'What is the maximum amount I can send?',
      answer: 'Daily limits depend on your account verification level. Basic accounts can send up to $1,000 per day, verified accounts up to $10,000 per day, and premium accounts up to $50,000 per day. You can request higher limits by contacting support.',
      category: 'Transactions & Payments',
      tags: ['limits', 'maximum', 'daily', 'amount']
    },
    {
      id: 'transactions-4',
      question: 'Can I cancel a transaction after sending it?',
      answer: 'Once a transaction is confirmed and processed, it cannot be cancelled. However, if the recipient hasn\'t received the funds yet, we can attempt to recall the transfer. Contact our support team immediately if you need to cancel a transaction.',
      category: 'Transactions & Payments',
      tags: ['cancel', 'recall', 'refund', 'mistake']
    },

    // Cash In/Out
    {
      id: 'cash-1',
      question: 'How can I add money to my wallet?',
      answer: 'You can add money through multiple methods: bank transfer, credit/debit card, cash deposit at authorized agents, or mobile money. Bank transfers are usually free, while card payments may have a small fee (1-3%).',
      category: 'Cash In/Out',
      tags: ['deposit', 'add', 'fund', 'bank', 'card']
    },
    {
      id: 'cash-2',
      question: 'How do I withdraw money from my wallet?',
      answer: 'You can withdraw money through bank transfers, ATM withdrawals using our debit card, or cash pickup at authorized agents. Bank transfers are free, while ATM withdrawals may have small fees depending on the ATM network.',
      category: 'Cash In/Out',
      tags: ['withdraw', 'cash', 'atm', 'bank', 'pickup']
    },
    {
      id: 'cash-3',
      question: 'Are there limits on cash deposits and withdrawals?',
      answer: 'Yes, there are daily and monthly limits. Daily cash deposits are limited to $5,000, and withdrawals to $3,000. Monthly limits are $50,000 for deposits and $30,000 for withdrawals. These limits help prevent fraud and comply with regulations.',
      category: 'Cash In/Out',
      tags: ['limits', 'daily', 'monthly', 'cash', 'regulations']
    },

    // Technical Support
    {
      id: 'support-1',
      question: 'What should I do if my app is not working?',
      answer: 'First, try restarting the app and checking your internet connection. If the problem persists, clear the app cache or reinstall the app. For persistent issues, contact our technical support team through the app or call our 24/7 helpline.',
      category: 'Technical Support',
      tags: ['app', 'technical', 'bug', 'support', 'help']
    },
    {
      id: 'support-2',
      question: 'How can I contact customer support?',
      answer: 'We offer 24/7 customer support through multiple channels: live chat in the app, email at support@digitalwallet.com, phone at +1 (555) 123-4567, and social media. Our average response time is under 5 minutes for urgent issues.',
      category: 'Technical Support',
      tags: ['support', 'contact', 'help', '24/7', 'response']
    },
    {
      id: 'support-3',
      question: 'Do you support multiple languages?',
      answer: 'Yes! Our platform supports 15+ languages including English, Spanish, French, German, Chinese, Arabic, and more. You can change the language in your app settings, and our customer support team can assist you in multiple languages.',
      category: 'Technical Support',
      tags: ['languages', 'multilingual', 'international', 'localization']
    },

    // Business & Enterprise
    {
      id: 'business-1',
      question: 'Do you offer business accounts?',
      answer: 'Yes, we offer comprehensive business solutions including business accounts, bulk payment processing, API integration, and dedicated account managers. Business accounts have higher limits and additional features for managing company finances.',
      category: 'Business & Enterprise',
      tags: ['business', 'enterprise', 'bulk', 'api', 'corporate']
    },
    {
      id: 'business-2',
      question: 'Can I integrate your payment system into my website?',
      answer: 'Absolutely! We provide robust APIs and SDKs for easy integration. Our documentation includes code examples in multiple programming languages, and our developer support team can help you implement the integration quickly and securely.',
      category: 'Business & Enterprise',
      tags: ['api', 'integration', 'website', 'developer', 'sdk']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'Account & Registration', name: 'Account & Registration', icon: Users },
    { id: 'Security & Safety', name: 'Security & Safety', icon: Shield },
    { id: 'Transactions & Payments', name: 'Transactions & Payments', icon: CreditCard },
    { id: 'Cash In/Out', name: 'Cash In/Out', icon: Wallet },
    { id: 'Technical Support', name: 'Technical Support', icon: Smartphone },
    { id: 'Business & Enterprise', name: 'Business & Enterprise', icon: Globe }
  ];

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked
              <span className="text-blue-600 dark:text-blue-400"> Questions</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Find answers to common questions about our digital wallet platform. Can't find what you're looking for? Contact our support team.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search questions, answers, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-lg py-3"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No questions found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Try adjusting your search terms or browse all categories.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                        {item.question}
                      </CardTitle>
                      {expandedItems.includes(item.id) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardHeader>
                  {expandedItems.includes(item.id) && (
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Can't find the answer you're looking for? Our support team is here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3">
              <Mail className="mr-2 h-5 w-5" />
              Contact Support
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              <Phone className="mr-2 h-5 w-5" />
              Call Us Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
