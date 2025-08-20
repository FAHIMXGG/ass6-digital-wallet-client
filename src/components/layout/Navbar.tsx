import React, { useState } from 'react';
import { Menu, X, Home, User, Mail, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ModeToggle } from './mode-toggle';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Wallet', href: '/wallet', icon: User },
        { name: 'Transactions', href: '/transactions', icon: Info },
        { name: 'Support', href: '/support', icon: Mail },
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <a href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">DW</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">DigitalWallet</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:block flex items-center space-x-3">
                        <Button variant="ghost" size="sm" asChild>
                            <a href="/login">Sign In</a>
                        </Button>
                        <Button variant="default" size="sm" asChild>
                            <a href="/register">Register</a>
                        </Button>
                    </div>
                    <ModeToggle />

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-blue-600"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
                    isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={closeMenu}
                            className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-3"
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </a>
                    ))}
                    <div className="pt-4 pb-2 space-y-2">
                        <Button variant="ghost" size="sm" className="w-full" asChild>
                            <a href="/login">Sign In</a>
                        </Button>
                        <Button variant="default" size="sm" className="w-full" asChild>
                            <a href="/register">Register</a>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;