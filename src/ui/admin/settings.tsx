import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Bell,
  Palette,
  Database,
  Users,
  Globe,
  FileText,
  Key,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Lock,
} from "lucide-react";

export function AdminSettings() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600 mt-1">
            Configure your platform settings and preferences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Platform Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="PetZap" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-url">Platform URL</Label>
                  <Input id="platform-url" defaultValue="https://petzap.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" defaultValue="admin@petzap.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-users">Maximum Users</Label>
                  <Input id="max-users" type="number" defaultValue="10000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-verification">User Verification</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="user-verification"
                      defaultChecked
                    />
                    <Label htmlFor="user-verification">
                      Require email verification
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="auto-approval">Auto Approval</Label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="auto-approval" />
                    <Label htmlFor="auto-approval">
                      Auto-approve new users
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">
                    Session Timeout (minutes)
                  </Label>
                  <Input id="session-timeout" type="number" defaultValue="60" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Authentication & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-password-length">
                    Minimum Password Length
                  </Label>
                  <Input
                    id="min-password-length"
                    type="number"
                    defaultValue="8"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-complexity">
                    Password Complexity
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="require-uppercase"
                        defaultChecked
                      />
                      <Label htmlFor="require-uppercase">
                        Require uppercase letters
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="require-numbers"
                        defaultChecked
                      />
                      <input
                        type="checkbox"
                        id="require-numbers"
                        defaultChecked
                      />
                      <Label htmlFor="require-numbers">Require numbers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="require-symbols" />
                      <Label htmlFor="require-symbols">
                        Require special characters
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-attempts">Max Login Attempts</Label>
                  <Input id="login-attempts" type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lockout-duration">
                    Lockout Duration (minutes)
                  </Label>
                  <Input
                    id="lockout-duration"
                    type="number"
                    defaultValue="15"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                API & Access Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="api-rate-limit">
                    API Rate Limit (requests/min)
                  </Label>
                  <Input id="api-rate-limit" type="number" defaultValue="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jwt-expiry">JWT Token Expiry (hours)</Label>
                  <Input id="jwt-expiry" type="number" defaultValue="24" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cors-origins">Allowed CORS Origins</Label>
                  <Input
                    id="cors-origins"
                    defaultValue="https://petzap.com,https://app.petzap.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ip-whitelist">IP Whitelist</Label>
                  <Input
                    id="ip-whitelist"
                    placeholder="Enter IP addresses separated by commas"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">New User Registration</h4>
                    <p className="text-sm text-gray-500">
                      Notify admins when new users register
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notify-new-users"
                      defaultChecked
                    />
                    <Label htmlFor="notify-new-users">Enable</Label>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Pet Adoption Requests</h4>
                    <p className="text-sm text-gray-500">
                      Notify when users request pet adoptions
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notify-adoptions"
                      defaultChecked
                    />
                    <Label htmlFor="notify-adoptions">Enable</Label>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">System Alerts</h4>
                    <p className="text-sm text-gray-500">
                      Critical system notifications and warnings
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-system" defaultChecked />
                    <Label htmlFor="notify-system">Enable</Label>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Weekly Reports</h4>
                    <p className="text-sm text-gray-500">
                      Send weekly platform activity reports
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-reports" />
                    <Label htmlFor="notify-reports">Enable</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Theme & Branding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <Input
                    id="primary-color"
                    type="color"
                    defaultValue="#3B82F6"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <Input
                    id="secondary-color"
                    type="color"
                    defaultValue="#6B7280"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme-mode">Theme Mode</Label>
                  <select
                    id="theme-mode"
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo-upload">Upload Logo</Label>
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Third-Party Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">S</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Stripe Payment Gateway</h4>
                      <p className="text-sm text-gray-500">
                        Process payments and subscriptions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">Connected</Badge>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">E</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Email Service (SendGrid)</h4>
                      <p className="text-sm text-gray-500">
                        Send transactional emails
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Pending</Badge>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">A</span>
                    </div>
                    <div>
                      <h4 className="font-medium">
                        Analytics (Google Analytics)
                      </h4>
                      <p className="text-sm text-gray-500">
                        Track user behavior and metrics
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Not Connected</Badge>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                  <Input id="cache-ttl" type="number" defaultValue="3600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-file-size">
                    Max File Upload Size (MB)
                  </Label>
                  <Input id="max-file-size" type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">
                    Backup Frequency (days)
                  </Label>
                  <Input id="backup-frequency" type="number" defaultValue="7" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="maintenance-mode" />
                    <Label htmlFor="maintenance-mode">
                      Enable maintenance mode
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Export Data</h4>
                  <p className="text-sm text-gray-500">
                    Download all platform data as CSV/JSON
                  </p>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Import Data</h4>
                  <p className="text-sm text-gray-500">
                    Import users, pets, and other data
                  </p>
                </div>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-red-600">Clear All Data</h4>
                  <p className="text-sm text-gray-500">
                    ⚠️ This action cannot be undone
                  </p>
                </div>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional Content for Scrolling */}
      <div className="space-y-6">
        {Array.from({ length: 8 }, (_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Additional Settings Section {i + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                This is additional content to demonstrate the scroll animation
                and navbar behavior. As you scroll down, the navbar will hide
                smoothly, and when you scroll up, it will reappear.
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
