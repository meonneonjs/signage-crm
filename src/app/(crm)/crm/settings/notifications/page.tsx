import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell, Mail, MessageSquare, Calendar, FileText, Users } from "lucide-react"

interface NotificationPreferences {
  email: {
    enabled: boolean
    types: {
      deals: boolean
      tasks: boolean
      mentions: boolean
      updates: boolean
      marketing: boolean
    }
  }
  push: {
    enabled: boolean
    types: {
      deals: boolean
      tasks: boolean
      mentions: boolean
      updates: boolean
      marketing: boolean
    }
  }
  desktop: {
    enabled: boolean
    types: {
      deals: boolean
      tasks: boolean
      mentions: boolean
      updates: boolean
      marketing: boolean
    }
  }
}

export default function NotificationsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: {
      enabled: true,
      types: {
        deals: true,
        tasks: true,
        mentions: true,
        updates: true,
        marketing: false,
      },
    },
    push: {
      enabled: true,
      types: {
        deals: true,
        tasks: true,
        mentions: true,
        updates: true,
        marketing: false,
      },
    },
    desktop: {
      enabled: true,
      types: {
        deals: true,
        tasks: true,
        mentions: true,
        updates: true,
        marketing: false,
      },
    },
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to save notification preferences
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Preferences saved",
        description: "Your notification preferences have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notification preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscard = () => {
    setPreferences({
      email: {
        enabled: true,
        types: {
          deals: true,
          tasks: true,
          mentions: true,
          updates: true,
          marketing: false,
        },
      },
      push: {
        enabled: true,
        types: {
          deals: true,
          tasks: true,
          mentions: true,
          updates: true,
          marketing: false,
        },
      },
      desktop: {
        enabled: true,
        types: {
          deals: true,
          tasks: true,
          mentions: true,
          updates: true,
          marketing: false,
        },
      },
    })
    toast({
      title: "Changes discarded",
      description: "Your notification preferences have been reset to default values.",
    })
  }

  const renderNotificationType = (
    channel: keyof NotificationPreferences,
    type: keyof NotificationPreferences["email"]["types"]
  ) => {
    const icons = {
      deals: <FileText className="h-4 w-4" />,
      tasks: <Calendar className="h-4 w-4" />,
      mentions: <MessageSquare className="h-4 w-4" />,
      updates: <Bell className="h-4 w-4" />,
      marketing: <Mail className="h-4 w-4" />,
    }

    const labels = {
      deals: "Deals",
      tasks: "Tasks",
      mentions: "Mentions",
      updates: "Updates",
      marketing: "Marketing",
    }

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icons[type]}
          <Label>{labels[type]}</Label>
        </div>
        <Switch
          checked={preferences[channel].types[type]}
          onCheckedChange={(checked) =>
            setPreferences({
              ...preferences,
              [channel]: {
                ...preferences[channel],
                types: {
                  ...preferences[channel].types,
                  [type]: checked,
                },
              },
            })
          }
          disabled={!preferences[channel].enabled}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Manage how you receive notifications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Receive notifications via email.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email.
              </p>
            </div>
            <Switch
              checked={preferences.email.enabled}
              onCheckedChange={(checked) =>
                setPreferences({
                  ...preferences,
                  email: {
                    ...preferences.email,
                    enabled: checked,
                  },
                })
              }
            />
          </div>

          {preferences.email.enabled && (
            <div className="space-y-4">
              {renderNotificationType("email", "deals")}
              {renderNotificationType("email", "tasks")}
              {renderNotificationType("email", "mentions")}
              {renderNotificationType("email", "updates")}
              {renderNotificationType("email", "marketing")}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>
            Receive push notifications in your browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications in your browser.
              </p>
            </div>
            <Switch
              checked={preferences.push.enabled}
              onCheckedChange={(checked) =>
                setPreferences({
                  ...preferences,
                  push: {
                    ...preferences.push,
                    enabled: checked,
                  },
                })
              }
            />
          </div>

          {preferences.push.enabled && (
            <div className="space-y-4">
              {renderNotificationType("push", "deals")}
              {renderNotificationType("push", "tasks")}
              {renderNotificationType("push", "mentions")}
              {renderNotificationType("push", "updates")}
              {renderNotificationType("push", "marketing")}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Desktop Notifications</CardTitle>
          <CardDescription>
            Receive desktop notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Desktop Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive desktop notifications.
              </p>
            </div>
            <Switch
              checked={preferences.desktop.enabled}
              onCheckedChange={(checked) =>
                setPreferences({
                  ...preferences,
                  desktop: {
                    ...preferences.desktop,
                    enabled: checked,
                  },
                })
              }
            />
          </div>

          {preferences.desktop.enabled && (
            <div className="space-y-4">
              {renderNotificationType("desktop", "deals")}
              {renderNotificationType("desktop", "tasks")}
              {renderNotificationType("desktop", "mentions")}
              {renderNotificationType("desktop", "updates")}
              {renderNotificationType("desktop", "marketing")}
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
    </div>
  )
} 