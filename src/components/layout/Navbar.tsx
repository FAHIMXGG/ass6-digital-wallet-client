import React, { useState, useMemo } from 'react';
import { Menu, X, Home, User, Mail, Info, LogOut, LayoutDashboard } from 'lucide-react';
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
        { id: 'wallet', name: 'Wallet', href: '/wallet', icon: User, role: 'public'},
        { id: 'transactions', name: 'Transactions', href: '/transactions', icon: Info, role: 'public'},
        { id: 'support', name: 'Support', href: '/support', icon: Mail, role: 'public'},
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
                "text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1",
                isMobile 
                    ? "hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium space-x-3"
                    : "px-3 py-2 rounded-md text-sm font-medium"
            )}
        >
            <item.icon className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
            <span>{item.name}</span>
        </Link>
    );

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">DW</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">DigitalWallet</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {filteredNavItems.map(item => renderNavItem(item))}
                        </div>
                    </div>

                    {/* Auth Buttons / User Info */}
                    <div className="hidden md:block flex items-center space-x-3">
                        {user ? (
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link to="/login">Sign In</Link>
                                </Button>
                                <Button variant="default" size="sm" asChild>
                                    <Link to="/register">Register</Link>
                                </Button>
                            </>
                        )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
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
            </div>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
                    isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                    {filteredNavItems.map(item => renderNavItem(item, true))}

                    <div className="pt-4 pb-2 space-y-2">
                        {user ? (
                            <>
                                <div className="px-3 py-2 text-sm text-gray-700">
                                    Welcome, {user.name}
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full flex items-center justify-center space-x-2" 
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" size="sm" className="w-full" asChild>
                                    <Link to="/login">Sign In</Link>
                                </Button>
                                <Button variant="default" size="sm" className="w-full" asChild>
                                    <Link to="/register">Register</Link>
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