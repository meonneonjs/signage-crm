"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mail, Send, Server, Shield, AlertCircle } from "lucide-react"

interface EmailSettings {
  smtp: {
    host: string
    port: number
    username: string
    password: string
    encryption: "tls" | "ssl" | "none"
    fromName: string
    fromEmail: string
  }
  notifications: {
    enableEmailNotifications: boolean
    enableEmailDigest: boolean
    digestFrequency: "daily" | "weekly" | "monthly"
    digestTime: string
  }
  templates: {
    useCustomTemplates: boolean
    defaultTemplate: string
  }
}

export default function EmailSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<EmailSettings>({
    smtp: {
      host: "",
      port: 587,
      username: "",
      password: "",
      encryption: "tls",
      fromName: "",
      fromEmail: "",
    },
    notifications: {
      enableEmailNotifications: true,
      enableEmailDigest: true,
      digestFrequency: "daily",
      digestTime: "09:00",
    },
    templates: {
      useCustomTemplates: false,
      defaultTemplate: "default",
    },
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to save email settings
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Settings saved",
        description: "Your email settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save email settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscard = () => {
    setSettings({
      smtp: {
        host: "",
        port: 587,
        username: "",
        password: "",
        encryption: "tls",
        fromName: "",
        fromEmail: "",
      },
      notifications: {
        enableEmailNotifications: true,
        enableEmailDigest: true,
        digestFrequency: "daily",
        digestTime: "09:00",
      },
      templates: {
        useCustomTemplates: false,
        defaultTemplate: "default",
      },
    })
    toast({
      title: "Changes discarded",
      description: "Your email settings have been reset to default values.",
    })
  }

  const handleTestEmail = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to test email configuration
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Test email sent",
        description: "A test email has been sent successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send test email. Please check your configuration.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Email Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure your email settings and notifications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SMTP Configuration</CardTitle>
          <CardDescription>
            Configure your SMTP server settings for sending emails.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="host">SMTP Host</Label>
            <Input
              id="host"
              value={settings.smtp.host}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  smtp: { ...settings.smtp, host: e.target.value },
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="port">Port</Label>
              <Input
                id="port"
                type="number"
                value={settings.smtp.port}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    smtp: { ...settings.smtp, port: parseInt(e.target.value) },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="encryption">Encryption</Label>
              <Select
                value={settings.smtp.encryption}
                onValueChange={(value: "tls" | "ssl" | "none") =>
                  setSettings({
                    ...settings,
                    smtp: { ...settings.smtp, encryption: value },
                  })
                }
              >
                <SelectTrigger id="encryption">
                  <SelectValue placeholder="Select encryption" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tls">TLS</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={settings.smtp.username}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    smtp: { ...settings.smtp, username: e.target.value },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={settings.smtp.password}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    smtp: { ...settings.smtp, password: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromName">From Name</Label>
              <Input
                id="fromName"
                value={settings.smtp.fromName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    smtp: { ...settings.smtp, fromName: e.target.value },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fromEmail">From Email</Label>
              <Input
                id="fromEmail"
                type="email"
                value={settings.smtp.fromEmail}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    smtp: { ...settings.smtp, fromEmail: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <Button onClick={handleTestEmail} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Test Email"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Configure your email notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for important events.
              </p>
            </div>
            <Switch
              checked={settings.notifications.enableEmailNotifications}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    enableEmailNotifications: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Email Digest</Label>
              <p className="text-sm text-muted-foreground">
                Receive a daily digest of notifications.
              </p>
            </div>
            <Switch
              checked={settings.notifications.enableEmailDigest}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    enableEmailDigest: checked,
                  },
                })
              }
            />
          </div>

          {settings.notifications.enableEmailDigest && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="digestFrequency">Digest Frequency</Label>
                <Select
                  value={settings.notifications.digestFrequency}
                  onValueChange={(value: "daily" | "weekly" | "monthly") =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        digestFrequency: value,
                      },
                    })
                  }
                >
                  <SelectTrigger id="digestFrequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="digestTime">Digest Time</Label>
                <Input
                  id="digestTime"
                  type="time"
                  value={settings.notifications.digestTime}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        digestTime: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>
            Configure your email template settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Use Custom Templates</Label>
              <p className="text-sm text-muted-foreground">
                Use custom email templates instead of default ones.
              </p>
            </div>
            <Switch
              checked={settings.templates.useCustomTemplates}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  templates: {
                    ...settings.templates,
                    useCustomTemplates: checked,
                  },
                })
              }
            />
          </div>

          {settings.templates.useCustomTemplates && (
            <div className="space-y-2">
              <Label htmlFor="defaultTemplate">Default Template</Label>
              <Select
                value={settings.templates.defaultTemplate}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    templates: {
                      ...settings.templates,
                      defaultTemplate: value,
                    },
                  })
                }
              >
                <SelectTrigger id="defaultTemplate">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleDiscard}>
          Discard Changes
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Security Notice</AlertTitle>
        <AlertDescription>
          Your SMTP credentials are encrypted and stored securely. Make sure to use
          a secure connection (TLS/SSL) when sending emails.
        </AlertDescription>
      </Alert>
    </div>
  )
} 