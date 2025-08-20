import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Shield, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '@/lib/utils';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        marketingEmails: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log('Registration attempt:', formData);
        }, 2000);
    };

    const passwordRequirements = [
        { text: 'At least 8 characters', met: formData.password.length >= 8 },
        { text: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
        { text: 'One lowercase letter', met: /[a-z]/.test(formData.password) },
        { text: 'One number', met: /\d/.test(formData.password) },
        { text: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) }
    ];

    const allRequirementsMet = passwordRequirements.every(req => req.met);
    const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
                    <p className="text-gray-600">Join DigitalWallet and start managing your finances securely</p>
                </div>

                {/* Registration Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                    First name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="John"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                    Last name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                Phone number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            
                            {/* Password Requirements */}
                            {formData.password && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs font-medium text-gray-700 mb-2">Password requirements:</p>
                                    <div className="space-y-1">
                                        {passwordRequirements.map((req, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <Check className={cn(
                                                    "w-3 h-3",
                                                    req.met ? "text-green-500" : "text-gray-300"
                                                )} />
                                                <span className={cn(
                                                    "text-xs",
                                                    req.met ? "text-green-600" : "text-gray-500"
                                                )}>
                                                    {req.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                Confirm password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    className={cn(
                                        "w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors",
                                        formData.confirmPassword.length > 0
                                            ? passwordsMatch
                                                ? "border-green-300 focus:ring-green-500"
                                                : "border-red-300 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-blue-500"
                                    )}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {formData.confirmPassword.length > 0 && !passwordsMatch && (
                                <p className="text-xs text-red-600">Passwords do not match</p>
                            )}
                        </div>

                        {/* Checkboxes */}
                        <div className="space-y-3">
                            <label className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    required
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                                />
                                <span className="text-sm text-gray-700">
                                    I agree to the{' '}
                                    <a href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                                        Privacy Policy
                                    </a>
                                </span>
                            </label>
                            <label className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    name="marketingEmails"
                                    checked={formData.marketingEmails}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                                />
                                <span className="text-sm text-gray-700">
                                    I want to receive updates about new features and security enhancements
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading || !allRequirementsMet || !passwordsMatch || !formData.agreeToTerms}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Creating account...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-2">
                                    <span>Create account</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500">or</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* Social Registration */}
                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full py-3 border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </Button>
                    </div>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a
                                href="/login"
                                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        🔒 Your data is protected with bank-level security and 256-bit encryption
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
