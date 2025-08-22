import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ModeToggle } from '@/components/layout/mode-toggle';
import { 
  Settings as SettingsIcon, 
  HelpCircle, 
  Palette, 
  Bell, 
  Shield, 
  User,
  RotateCcw,
  CheckCircle
} from 'lucide-react';

export default function Settings() {
  const [tourRestarted, setTourRestarted] = useState(false);

  const handleRestartTour = () => {
    // Remove the tour completion flags from localStorage and sessionStorage
    localStorage.removeItem('tour-completed');
    sessionStorage.removeItem('tour-seen');
    setTourRestarted(true);
    
    // Show success message for a few seconds
    setTimeout(() => {
      setTourRestarted(false);
    }, 3000);
    
    // Reload the page to trigger the tour
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <SettingsIcon className="h-8 w-8" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your account preferences and customize your experience
        </p>
      </div>

      <div className="grid gap-6">
        {/* Guided Tour Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Guided Tour
            </CardTitle>
            <CardDescription>
              Restart the interactive tour to learn about key features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  The guided tour helps new users understand the application features
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">
                    Interactive Learning
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+H
                  </Badge>
                </div>
              </div>
              <Button 
                onClick={handleRestartTour}
                variant="outline"
                className="flex items-center gap-2"
                disabled={tourRestarted}
              >
                {tourRestarted ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Tour Restarted!
                  </>
                ) : (
                  <>
                    <RotateCcw className="h-4 w-4" />
                    Restart Tour
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Switch between light and dark themes
                </p>
                <Badge variant="outline" className="mb-3">
                  Theme Toggle
                </Badge>
              </div>
              <ModeToggle />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Notifications Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Transaction Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified about successful transactions
                  </p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Security Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Important security notifications
                  </p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Updates</p>
                  <p className="text-sm text-muted-foreground">
                    News and promotional content
                  </p>
                </div>
                <Badge variant="secondary">Disabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Security Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">
                    Change your account password
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Account Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account
            </CardTitle>
            <CardDescription>
              Manage your account information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Profile Information</p>
                  <p className="text-sm text-muted-foreground">
                    Update your personal details
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Account Deletion</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
