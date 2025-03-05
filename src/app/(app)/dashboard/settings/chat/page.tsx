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
import { Bell, MessageSquare, Zap, AlertCircle } from "lucide-react"

interface ChatSettings {
  notifications: {
    enableDesktopNotifications: boolean
    enableSound: boolean
    enableMessagePreview: boolean
    notificationTypes: {
      newMessage: boolean
      mentions: boolean
      groupMessages: boolean
      offlineMessages: boolean
    }
  }
  appearance: {
    theme: "light" | "dark" | "system"
    fontSize: "small" | "medium" | "large"
    messageDensity: "compact" | "comfortable" | "spacious"
    showAvatars: boolean
    showTimestamps: boolean
  }
  integrations: {
    enableSlack: boolean
    enableTeams: boolean
    enableEmail: boolean
    autoReply: {
      enabled: boolean
      message: string
      delay: number
    }
  }
}

export default function ChatSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<ChatSettings>({
    notifications: {
      enableDesktopNotifications: true,
      enableSound: true,
      enableMessagePreview: true,
      notificationTypes: {
        newMessage: true,
        mentions: true,
        groupMessages: true,
        offlineMessages: true,
      },
    },
    appearance: {
      theme: "system",
      fontSize: "medium",
      messageDensity: "comfortable",
      showAvatars: true,
      showTimestamps: true,
    },
    integrations: {
      enableSlack: false,
      enableTeams: false,
      enableEmail: true,
      autoReply: {
        enabled: false,
        message: "I'm currently away. I'll get back to you soon.",
        delay: 5,
      },
    },
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to save chat settings
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Settings saved",
        description: "Your chat settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save chat settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscard = () => {
    setSettings({
      notifications: {
        enableDesktopNotifications: true,
        enableSound: true,
        enableMessagePreview: true,
        notificationTypes: {
          newMessage: true,
          mentions: true,
          groupMessages: true,
          offlineMessages: true,
        },
      },
      appearance: {
        theme: "system",
        fontSize: "medium",
        messageDensity: "comfortable",
        showAvatars: true,
        showTimestamps: true,
      },
      integrations: {
        enableSlack: false,
        enableTeams: false,
        enableEmail: true,
        autoReply: {
          enabled: false,
          message: "I'm currently away. I'll get back to you soon.",
          delay: 5,
        },
      },
    })
    toast({
      title: "Changes discarded",
      description: "Your chat settings have been reset to default values.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Chat Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure your chat preferences and notifications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage how you receive chat notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Desktop Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive desktop notifications for new messages.
              </p>
            </div>
            <Switch
              checked={settings.notifications.enableDesktopNotifications}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    enableDesktopNotifications: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sound Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Play a sound when receiving new messages.
              </p>
            </div>
            <Switch
              checked={settings.notifications.enableSound}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    enableSound: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Message Preview</Label>
              <p className="text-sm text-muted-foreground">
                Show message preview in notifications.
              </p>
            </div>
            <Switch
              checked={settings.notifications.enableMessagePreview}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    enableMessagePreview: checked,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Notification Types</Label>
            <div className="space-y-2">
              {Object.entries(settings.notifications.notificationTypes).map(
                ([type, enabled]) => (
                  <div key={type} className="flex items-center justify-between">
                    <Label className="capitalize">
                      {type.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            notificationTypes: {
                              ...settings.notifications.notificationTypes,
                              [type]: checked,
                            },
                          },
                        })
                      }
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how your chat interface looks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              value={settings.appearance.theme}
              onValueChange={(value: "light" | "dark" | "system") =>
                setSettings({
                  ...settings,
                  appearance: {
                    ...settings.appearance,
                    theme: value,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Font Size</Label>
            <Select
              value={settings.appearance.fontSize}
              onValueChange={(value: "small" | "medium" | "large") =>
                setSettings({
                  ...settings,
                  appearance: {
                    ...settings.appearance,
                    fontSize: value,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Message Density</Label>
            <Select
              value={settings.appearance.messageDensity}
              onValueChange={(value: "compact" | "comfortable" | "spacious") =>
                setSettings({
                  ...settings,
                  appearance: {
                    ...settings.appearance,
                    messageDensity: value,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select message density" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="comfortable">Comfortable</SelectItem>
                <SelectItem value="spacious">Spacious</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Avatars</Label>
              <p className="text-sm text-muted-foreground">
                Display user avatars in messages.
              </p>
            </div>
            <Switch
              checked={settings.appearance.showAvatars}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  appearance: {
                    ...settings.appearance,
                    showAvatars: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Timestamps</Label>
              <p className="text-sm text-muted-foreground">
                Display message timestamps.
              </p>
            </div>
            <Switch
              checked={settings.appearance.showTimestamps}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  appearance: {
                    ...settings.appearance,
                    showTimestamps: checked,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>
            Connect your chat with other platforms.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Slack Integration</Label>
              <p className="text-sm text-muted-foreground">
                Connect with Slack for cross-platform messaging.
              </p>
            </div>
            <Switch
              checked={settings.integrations.enableSlack}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  integrations: {
                    ...settings.integrations,
                    enableSlack: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Microsoft Teams</Label>
              <p className="text-sm text-muted-foreground">
                Connect with Microsoft Teams.
              </p>
            </div>
            <Switch
              checked={settings.integrations.enableTeams}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  integrations: {
                    ...settings.integrations,
                    enableTeams: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Integration</Label>
              <p className="text-sm text-muted-foreground">
                Forward chat messages to email.
              </p>
            </div>
            <Switch
              checked={settings.integrations.enableEmail}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  integrations: {
                    ...settings.integrations,
                    enableEmail: checked,
                  },
                })
              }
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Reply</Label>
                <p className="text-sm text-muted-foreground">
                  Enable automatic replies when away.
                </p>
              </div>
              <Switch
                checked={settings.integrations.autoReply.enabled}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    integrations: {
                      ...settings.integrations,
                      autoReply: {
                        ...settings.integrations.autoReply,
                        enabled: checked,
                      },
                    },
                  })
                }
              />
            </div>

            {settings.integrations.autoReply.enabled && (
              <>
                <div className="space-y-2">
                  <Label>Auto-Reply Message</Label>
                  <Input
                    value={settings.integrations.autoReply.message}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        integrations: {
                          ...settings.integrations,
                          autoReply: {
                            ...settings.integrations.autoReply,
                            message: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Delay (minutes)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={settings.integrations.autoReply.delay}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        integrations: {
                          ...settings.integrations,
                          autoReply: {
                            ...settings.integrations.autoReply,
                            delay: parseInt(e.target.value),
                          },
                        },
                      })
                    }
                  />
                </div>
              </>
            )}
          </div>
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
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>
          Some settings may require a page refresh to take effect. Make sure to
          save your changes before refreshing.
        </AlertDescription>
      </Alert>
    </div>
  )
} 