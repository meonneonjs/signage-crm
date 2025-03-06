import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface PreferencesData {
  theme: "light" | "dark" | "system"
  language: string
  notifications: {
    email: boolean
    push: boolean
    desktop: boolean
    marketing: boolean
  }
}

export default function PreferencesPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [preferences, setPreferences] = useState<PreferencesData>({
    theme: "system",
    language: "en",
    notifications: {
      email: true,
      push: true,
      desktop: true,
      marketing: false,
    },
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to save preferences
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Preferences saved",
        description: "Your preferences have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscard = () => {
    setPreferences({
      theme: "system",
      language: "en",
      notifications: {
        email: true,
        push: true,
        desktop: true,
        marketing: false,
      },
    })
    toast({
      title: "Changes discarded",
      description: "Your preferences have been reset to default values.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Manage your application preferences and settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how the application looks and feels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={preferences.theme}
              onValueChange={(value: "light" | "dark" | "system") =>
                setPreferences({ ...preferences, theme: value })
              }
            >
              <SelectTrigger id="theme">
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
            <Label htmlFor="language">Language</Label>
            <Select
              value={preferences.language}
              onValueChange={(value) =>
                setPreferences({ ...preferences, language: value })
              }
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Configure how you want to receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email.
              </p>
            </div>
            <Switch
              checked={preferences.notifications.email}
              onCheckedChange={(checked) =>
                setPreferences({
                  ...preferences,
                  notifications: {
                    ...preferences.notifications,
                    email: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications in your browser.
              </p>
            </div>
            <Switch
              checked={preferences.notifications.push}
              onCheckedChange={(checked) =>
                setPreferences({
                  ...preferences,
                  notifications: {
                    ...preferences.notifications,
                    push: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Desktop Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive desktop notifications.
              </p>
            </div>
            <Switch
              checked={preferences.notifications.desktop}
              onCheckedChange={(checked) =>
                setPreferences({
                  ...preferences,
                  notifications: {
                    ...preferences.notifications,
                    desktop: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new features and updates.
              </p>
            </div>
            <Switch
              checked={preferences.notifications.marketing}
              onCheckedChange={(checked) =>
                setPreferences({
                  ...preferences,
                  notifications: {
                    ...preferences.notifications,
                    marketing: checked,
                  },
                })
              }
            />
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
    </div>
  )
} 