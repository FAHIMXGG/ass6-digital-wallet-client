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
    Globe
} from 'lucide-react';
import { Button } from '../ui/button';

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
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Top Section with Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <feature.icon className="w-8 h-8 text-blue-400 mb-2" />
                            <span className="text-sm text-gray-300">{feature.text}</span>
                        </div>
                    ))}
                </div>

                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">DW</span>
                            </div>
                            <span className="text-xl font-bold">DigitalWallet</span>
                        </div>
                        <p className="text-gray-400 mb-4 max-w-md">
                            Secure, fast, and reliable digital wallet solution for the modern world. 
                            Manage your finances with confidence and ease.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center space-x-2 text-gray-400">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">support@digitalwallet.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-400">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-400">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">123 Finance St, Digital City, DC 12345</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>


            </div>

        </footer>
    );
};

export default Footer;