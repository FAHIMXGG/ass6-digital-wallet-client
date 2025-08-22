import { useEffect, useRef, useState } from 'react';
import { driver, type DriveStep } from 'driver.js';
import 'driver.js/dist/driver.css';
import './tour-styles.css';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function GuidedTour() {
  const driverRef = useRef<any>(null);
  const [isTourActive, setIsTourActive] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const startTour = () => {
    console.log('=== STARTING TOUR ===');
    
    // Check if driver is available
    if (typeof driver !== 'function') {
      console.error('Driver.js is not available!');
      showNotification('Driver.js library not loaded', 'error');
      return;
    }
    
    console.log('Driver.js is available');
    
    // Destroy any existing tour
    if (driverRef.current) {
      console.log('Destroying existing tour...');
      driverRef.current.destroy();
      driverRef.current = null;
    }

    // Optimized tour steps with better positioning - 6 steps total
    const steps: DriveStep[] = [
      {
        element: 'body',
        popover: {
          title: 'Welcome to Digital Wallet! 👋',
          description: 'Let\'s take a quick tour of the main features. This tour will highlight important sections of the sidebar.',
          side: 'over' as const,
          align: 'center' as const
        }
      },
      {
        element: '[data-tour="sidebar-header"]',
        popover: {
          title: 'Navigation Header',
          description: 'This is your main navigation hub with the app logo and theme toggle button.',
          side: 'right' as const,
          align: 'start' as const
        }
      },
      {
        element: '[data-tour="home-link"]',
        popover: {
          title: 'Home Dashboard',
          description: 'Click here to return to your main dashboard with an overview of your wallet and recent activities.',
          side: 'right' as const,
          align: 'start' as const
        }
      },
      {
        element: '[data-tour="wallet-section"]',
        popover: {
          title: 'Wallet Management',
          description: 'Access wallet features - view your balance, transaction history, and manage wallet settings.',
          side: 'right' as const,
          align: 'start' as const
        }
      },
      {
        element: '[data-tour="transactions-section"]',
        popover: {
          title: 'Transaction History',
          description: 'Track all your money transfers, payments, and financial activities. View detailed transaction logs here.',
          side: 'right' as const,
          align: 'start' as const
        }
      },
      {
        element: '[data-tour="user-management"]',
        popover: {
          title: 'Profile Management',
          description: 'Update your personal information, change account settings, and manage your profile details.',
          side: 'right' as const,
          align: 'start' as const
        }
      }
    ];

    // Check which elements exist and are visible
    const availableSteps = steps.filter(step => {
      if (typeof step.element === 'string') {
        const element = document.querySelector(step.element);
        if (!element) {
          console.log(`Element ${step.element}: ❌ NOT FOUND`);
          return false;
        }
        
        // Check if element is visible
        const rect = element.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0;
        console.log(`Element ${step.element}: ${isVisible ? '✅ FOUND & VISIBLE' : '⚠️ FOUND BUT HIDDEN'}`);
        
        // Include even if hidden - driver.js can handle it
        return true;
      }
      return false;
    });

    console.log(`Available steps: ${availableSteps.length}/${steps.length}`);
    console.log('Steps included:', availableSteps.map(s => s.element));

    // Always include at least the body element
    if (availableSteps.length === 0) {
      console.log('No elements found, using body-only tour');
      availableSteps.push(steps[0]);
    }

    try {
      console.log('Creating driver instance...');
      console.log('Available steps for tour:', availableSteps);
      
      // Validate steps before creating driver
      const validSteps = availableSteps.map(step => {
        console.log('Validating step:', step.element);
        if (typeof step.element === 'string') {
          const element = document.querySelector(step.element);
          if (!element) {
            console.warn(`Element not found for step: ${step.element}`);
          }
        }
        return step;
      });

      driverRef.current = driver({
        showProgress: true,
        steps: validSteps,
        stagePadding: 10,
        allowClose: true,
        overlayOpacity: 0.6,
        overlayColor: 'rgba(0, 0, 0, 0.6)',
        popoverClass: 'driverjs-theme',
        animate: true,
        smoothScroll: true,
        showButtons: ['next', 'previous', 'close'],
        disableActiveInteraction: false
      });

      console.log('Driver instance created successfully');
      console.log('Driver methods available:', Object.keys(driverRef.current));
      
      // Try to add event listeners if the method exists
      if (typeof driverRef.current.on === 'function') {
        console.log('Using .on() method for event listeners');
        driverRef.current.on('completed', () => {
          console.log('Tour completed');
          localStorage.setItem('tour-completed', 'true');
          sessionStorage.setItem('tour-seen', 'true');
          setIsTourActive(false);
          document.body.classList.remove('driver-active');
          showNotification('Tour completed! You can restart it anytime from Settings. 🎉', 'success');
        });

        driverRef.current.on('closed', () => {
          console.log('Tour closed by user');
          localStorage.setItem('tour-completed', 'true');
          sessionStorage.setItem('tour-seen', 'true');
          setIsTourActive(false);
          document.body.classList.remove('driver-active');
          showNotification('Tour closed. You can restart it anytime from Settings.', 'success');
        });

        driverRef.current.on('destroyed', () => {
          console.log('Tour destroyed');
          setIsTourActive(false);
          document.body.classList.remove('driver-active');
        });
      } else {
        console.log('Event listeners not available - using timeout fallback');
        // Fallback: just set a timeout to mark as completed after 30 seconds
        setTimeout(() => {
          if (isTourActive) {
            console.log('Tour timeout - marking as completed');
            localStorage.setItem('tour-completed', 'true');
            setIsTourActive(false);
            document.body.classList.remove('driver-active');
          }
        }, 30000);
      }

      console.log('Event listeners set up successfully');
      console.log('Starting tour...');
      setIsTourActive(true);
      
      // Add body class for additional styling
      document.body.classList.add('driver-active');
      
      driverRef.current.drive();
      console.log('Tour drive() called successfully');
      
      // Show success notification
      showNotification('Tour started! 🎉', 'success');
      
    } catch (error) {
      console.error('Error starting tour:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      
      console.error('Error details:', {
        message: errorMessage,
        stack: errorStack,
        availableSteps: availableSteps.length,
        driverExists: !!driverRef.current
      });
      setIsTourActive(false);
      document.body.classList.remove('driver-active');
      showNotification(`Failed to start tour: ${errorMessage}`, 'error');
    }
  };

  const restartTour = () => {
    console.log('=== RESTARTING TOUR ===');
    
    // Clear tour completion flags
    localStorage.removeItem('tour-completed');
    sessionStorage.removeItem('tour-seen');
    console.log('Tour completion flags cleared');
    
    // Stop any existing tour
    if (driverRef.current) {
      console.log('Destroying existing tour...');
      driverRef.current.destroy();
      driverRef.current = null;
      setIsTourActive(false);
      document.body.classList.remove('driver-active');
    }
    
    // Start tour after a short delay
    setTimeout(() => {
      console.log('Starting tour after restart...');
      startTour();
    }, 100);
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 9999;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    }, 3000);
  };

  // Auto-start tour for new users (only once per browser session)
  useEffect(() => {
    const tourCompleted = localStorage.getItem('tour-completed');
    const hasSeenTour = sessionStorage.getItem('tour-seen');
    const isDashboard = window.location.pathname.includes('/user') || 
                       window.location.pathname.includes('/admin') || 
                       window.location.pathname.includes('/agent');

    console.log('Auto-start check:', { tourCompleted, hasSeenTour, isDashboard, pathname: window.location.pathname });

    // Only auto-start if:
    // 1. User has never completed the tour (no localStorage) - persists across browser sessions
    // 2. User hasn't seen the tour in this session (no sessionStorage) - prevents auto-start on page reload
    // 3. User is on a dashboard page
    if (!tourCompleted && !hasSeenTour && isDashboard) {
      console.log('Auto-starting tour for new user...');
      const timer = setTimeout(() => {
        startTour();
        // Mark that user has seen the tour in this session
        sessionStorage.setItem('tour-seen', 'true');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, []);

  // Add global functions for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Add keyboard shortcut for tour restart
      const handleKeyDown = (event: KeyboardEvent) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'h') {
          event.preventDefault();
          console.log('Keyboard shortcut triggered: Restart tour');
          restartTour();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Cleanup function
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  // Add global functions for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).testTour = () => {
        console.log('Manual tour test from console');
        startTour();
      };
      (window as any).clearTour = () => {
        console.log('Clearing tour data');
        localStorage.removeItem('tour-completed');
        sessionStorage.removeItem('tour-seen');
        console.log('Tour data cleared from both localStorage and sessionStorage');
      };
      (window as any).checkElements = () => {
        console.log('Checking tour elements...');
        const elements = document.querySelectorAll('[data-tour]');
        console.log('Found elements:', elements.length);
        elements.forEach(el => {
          console.log(`- ${el.getAttribute('data-tour')}: ${el.tagName}`);
        });
      };
      (window as any).restartTour = () => {
        console.log('Manual restart from console');
        restartTour();
      };
      (window as any).simpleTest = () => {
        console.log('Running simple driver test...');
        try {
          console.log('Driver function type:', typeof driver);
          console.log('Driver function:', driver);
          
          const testDriver = driver({
            steps: [
              {
                element: 'body',
                popover: {
                  title: 'Simple Test',
                  description: 'This is a simple test to check if driver.js works',
                  side: 'left' as const,
                  align: 'start' as const
                }
              }
            ]
          });
          
          console.log('Driver instance created:', testDriver);
          testDriver.drive();
          console.log('Simple test successful!');
        } catch (error) {
          console.error('Simple test failed:', error);
          console.error('Error details:', error instanceof Error ? error.message : error);
        }
      };
      
      (window as any).debugInfo = () => {
        console.log('=== DEBUG INFO ===');
        console.log('Driver function available:', typeof driver);
        console.log('React hooks working:', typeof useState);
        console.log('Current tour active:', isTourActive);
        console.log('Driver ref current:', !!driverRef.current);
        console.log('Available tour elements:');
        document.querySelectorAll('[data-tour]').forEach(el => {
          console.log(`- ${el.getAttribute('data-tour')}: ${el.tagName}`);
        });
      };
      
      (window as any).testOverlay = () => {
        console.log('Testing overlay visibility...');
        const overlay = document.querySelector('.driver-stage');
        if (overlay) {
          console.log('Overlay found:', overlay);
          console.log('Overlay styles:', window.getComputedStyle(overlay));
          console.log('Background color:', window.getComputedStyle(overlay).backgroundColor);
          console.log('Opacity:', window.getComputedStyle(overlay).opacity);
          console.log('Body has driver-active class:', document.body.classList.contains('driver-active'));
        } else {
          console.log('No overlay found - tour might not be active');
        }
      };
      
      (window as any).adjustOverlay = (opacity: number) => {
        console.log(`Adjusting overlay opacity to ${opacity}`);
        const overlay = document.querySelector('.driver-stage');
        if (overlay) {
          (overlay as HTMLElement).style.background = `rgba(0, 0, 0, ${opacity})`;
          console.log('Overlay opacity adjusted');
        } else {
          console.log('No overlay found to adjust');
        }
      };
      
      (window as any).testTourElements = () => {
        console.log('=== TESTING TOUR ELEMENTS ===');
        const tourElements = [
          'body',
          '[data-tour="sidebar-header"]',
          '[data-tour="home-link"]', 
          '[data-tour="wallet-section"]',
          '[data-tour="transactions-section"]',
          '[data-tour="user-management"]'
        ];
        
        tourElements.forEach(selector => {
          const element = document.querySelector(selector);
          if (element) {
            const rect = element.getBoundingClientRect();
            console.log(`✅ ${selector}:`, {
              found: true,
              visible: rect.width > 0 && rect.height > 0,
              position: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
              text: element.textContent?.substring(0, 50)
            });
          } else {
            console.log(`❌ ${selector}: NOT FOUND`);
          }
        });
      };
      
      (window as any).forceVisibleTour = () => {
        console.log('Creating force-visible tour...');
        try {
          const forceDriver = driver({
            steps: [
              {
                element: 'body',
                popover: {
                  title: 'Force Visible Test',
                  description: 'This is a test with forced positioning to ensure visibility.',
                  side: 'over' as const,
                  align: 'center' as const
                }
              }
            ],
            overlayOpacity: 0.6,
            stagePadding: 20,
            showProgress: false,
            allowClose: true
          });
          
          forceDriver.drive();
          console.log('Force-visible tour started');
        } catch (error) {
          console.error('Force-visible tour failed:', error);
        }
      };
    }
  }, []);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Restart tour button clicked');
    
    // Visual feedback
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 200);
    
    restartTour();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleButtonClick}
              variant="outline"
              size="sm"
              disabled={isTourActive}
              className={`flex items-center gap-2 bg-background/90 backdrop-blur-sm border-border/50 hover:bg-background/95 shadow-lg transition-all ${
                buttonClicked ? 'scale-95 bg-primary/20' : ''
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              {isTourActive ? 'Tour Active...' : 'Restart Tour'}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="max-w-xs">
            <p>Restart the guided tour</p>
            <p className="text-xs text-muted-foreground mt-1">
              Keyboard shortcut: {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+H
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
