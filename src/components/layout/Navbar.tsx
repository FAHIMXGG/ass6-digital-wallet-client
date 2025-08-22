import React, { useState, useMemo } from 'react';
import { Menu, X, Home, User, Mail, Info, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ModeToggle } from './mode-toggle';
import { useUserInfoQuery, useLogoutMutation, authApi } from '@/redux/features/auth/auth.api';
import { useDispatch } from 'react-redux';
import { role } from '@/constants/role';
import { Link } from 'react-router';

const Navbar = () => {
    const {data, isLoading} = useUserInfoQuery(undefined);
    const [logout] = useLogoutMutation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();

    const user = data?.data;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logout(undefined);
            dispatch(authApi.util.resetApiState());
            closeMenu();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Memoize navigation items to prevent unnecessary re-renders
    const navItems = useMemo(() => [
        { id: 'home', name: 'Home', href: '/', icon: Home, role: 'public'},
        { id: 'features', name: 'Features', href: '/features', icon: User, role: 'public'},
        { id: 'about', name: 'About', href: '/about', icon: Info, role: 'public'},
        { id: 'contact', name: 'Contact', href: '/contact', icon: Mail, role: 'public'},
        { id: 'faq', name: 'FAQ', href: '/faq', icon: Info, role: 'public'},
        { id: 'admin-dashboard', name: 'Admin Dashboard', href: '/admin', icon: LayoutDashboard, role: role.admin},
        { id: 'user-dashboard', name: 'User Dashboard', href: '/user', icon: LayoutDashboard, role: role.user},
        { id: 'agent-dashboard', name: 'Agent Dashboard', href: '/agent', icon: LayoutDashboard, role: role.agent},
    ], []);

    // Filter navigation items based on user role
    const filteredNavItems = useMemo(() => {
        return navItems.filter(item => 
            item.role === 'public' || item.role === user?.role
        );
    }, [navItems, user?.role]);

    const renderNavItem = (item: typeof navItems[0], isMobile = false) => (
        <Link
            key={item.id}
            to={item.href}
            onClick={isMobile ? closeMenu : undefined}
            className={cn(
                "transition-all duration-200 flex items-center space-x-2 rounded-lg",
                isMobile 
                    ? "hover:bg-gray-100 dark:hover:bg-gray-800 block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200"
                    : "px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            )}
        >
            <item.icon className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
            <span>{item.name}</span>
        </Link>
    );

    return (
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm dark:shadow-gray-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                <span className="text-white font-bold text-lg">DW</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    DigitalWallet
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                                    Secure & Fast
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-center space-x-1">
                            {filteredNavItems.map(item => renderNavItem(item))}
                        </div>
                    </div>

                    {/* Auth Buttons / User Info */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {user ? (
                            <div className="flex items-center space-x-3">
                                {/* <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-semibold">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {user.name}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                            {user.role}
                                        </span>
                                    </div>
                                </div> */}
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    asChild
                                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <Link to="/login">Sign In</Link>
                                </Button>
                                <Button 
                                    variant="default" 
                                    size="sm" 
                                    asChild
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <Link to="/register">Get Started</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                    
                    {/* Right side controls */}
                    <div className="flex items-center space-x-2">
                        <ModeToggle />
                        
                        {/* Mobile menu button */}
                        <div className="lg:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMenu}
                                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
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
            </div>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    "lg:hidden transition-all duration-300 ease-in-out overflow-hidden",
                    isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="px-4 pt-4 pb-6 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
                    {/* User info section for mobile */}
                    {user && (
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold">
                                    {user.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                    {user.role}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation items */}
                    <div className="space-y-1">
                        {filteredNavItems.map(item => renderNavItem(item, true))}
                    </div>

                    {/* Auth buttons for mobile */}
                    <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
                        {user ? (
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full flex items-center justify-center space-x-2 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800" 
                                onClick={handleLogout}
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </Button>
                        ) : (
                            <>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="w-full text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800" 
                                    asChild
                                >
                                    <Link to="/login">Sign In</Link>
                                </Button>
                                <Button 
                                    variant="default" 
                                    size="sm" 
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg" 
                                    asChild
                                >
                                    <Link to="/register">Get Started</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;