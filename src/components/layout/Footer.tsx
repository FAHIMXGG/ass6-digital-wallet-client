import React from 'react';
import { 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin, 
    Mail, 
    Phone, 
    MapPin,
    Shield,
    CreditCard,
    Lock,
    HelpCircle,
    FileText,
    Users,
    Globe,
    ArrowRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Company",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Press", href: "/press" },
                { name: "Blog", href: "/blog" },
            ]
        },
        {
            title: "Products",
            links: [
                { name: "Digital Wallet", href: "/wallet" },
                { name: "Crypto Exchange", href: "/exchange" },
                { name: "Payment Gateway", href: "/payments" },
                { name: "API", href: "/api" },
            ]
        },
        {
            title: "Support",
            links: [
                { name: "Help Center", href: "/help" },
                { name: "Contact Us", href: "/contact" },
                { name: "Status", href: "/status" },
                { name: "Community", href: "/community" },
            ]
        },
        {
            title: "Legal",
            links: [
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "GDPR", href: "/gdpr" },
            ]
        }
    ];

    const socialLinks = [
        { name: "Facebook", icon: Facebook, href: "#" },
        { name: "Twitter", icon: Twitter, href: "#" },
        { name: "Instagram", icon: Instagram, href: "#" },
        { name: "LinkedIn", icon: Linkedin, href: "#" },
    ];

    const features = [
        { icon: Shield, text: "Bank-level Security" },
        { icon: CreditCard, text: "Multiple Payment Methods" },
        { icon: Lock, text: "256-bit Encryption" },
        { icon: Globe, text: "Global Coverage" },
    ];

    return (
        <footer className="bg-gray-900 dark:bg-gray-950 text-white border-t border-gray-800 dark:border-gray-700">
            {/* Compact Features Section */}
            <div className="border-b border-gray-800 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <feature.icon className="w-5 h-5 text-blue-400 dark:text-blue-300 flex-shrink-0" />
                                <span className="text-sm text-gray-300 dark:text-gray-400">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">DW</span>
                            </div>
                            <span className="text-lg font-bold text-white dark:text-white">DigitalWallet</span>
                        </div>
                        <p className="text-gray-400 dark:text-gray-300 mb-4 text-sm max-w-md">
                            Secure, fast, and reliable digital wallet solution for the modern world.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-1 mb-4">
                            <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-300">
                                <Mail className="w-3 h-3" />
                                <span className="text-xs">support@digitalwallet.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-300">
                                <Phone className="w-3 h-3" />
                                <span className="text-xs">+1 (555) 123-4567</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-8 h-8 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors duration-200"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-4 h-4 text-gray-300 dark:text-gray-200" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold mb-3 text-gray-200 dark:text-gray-100">{section.title}</h3>
                            <ul className="space-y-1">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors duration-200 text-xs block py-1"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 dark:border-gray-700 mt-6 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-6 text-xs text-gray-400 dark:text-gray-300">
                            <span>&copy; {currentYear} DigitalWallet. All rights reserved.</span>
                            <span className="text-gray-600 dark:text-gray-500">•</span>
                            <span>Made with ❤️ for the future of finance</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs border-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white"
                                asChild
                            >
                                <Link to="/contact">
                                    Get Support
                                    <ArrowRight className="w-3 h-3 ml-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;