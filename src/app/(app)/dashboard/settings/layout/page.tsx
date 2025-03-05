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
import { Layout, Menu, Maximize2, Minimize2, AlertCircle } from "lucide-react"

interface LayoutSettings {
  navigation: {
    position: "left" | "top"
    collapsed: boolean
    showLabels: boolean
    showIcons: boolean
    showBadges: boolean
  }
  content: {
    maxWidth: "sm" | "md" | "lg" | "xl" | "full"
    padding: "none" | "sm" | "md" | "lg"
    showBreadcrumbs: boolean
    showPageTitle: boolean
    showActions: boolean
  }
  sidebar: {
    position: "left" | "right"
    width: "sm" | "md" | "lg"
    showCollapseButton: boolean
    showScrollbar: boolean
    showSectionLabels: boolean
  }
  header: {
    fixed: boolean
    showSearch: boolean
    showNotifications: boolean
    showUserMenu: boolean
    showBreadcrumbs: boolean
  }
  footer: {
    show: boolean
    showLinks: boolean
    showCopyright: boolean
    showVersion: boolean
  }
}

export default function LayoutSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<LayoutSettings>({
    navigation: {
      position: "left",
      collapsed: false,
      showLabels: true,
      showIcons: true,
      showBadges: true,
    },
    content: {
      maxWidth: "lg",
      padding: "md",
      showBreadcrumbs: true,
      showPageTitle: true,
      showActions: true,
    },
    sidebar: {
      position: "left",
      width: "md",
      showCollapseButton: true,
      showScrollbar: true,
      showSectionLabels: true,
    },
    header: {
      fixed: true,
      showSearch: true,
      showNotifications: true,
      showUserMenu: true,
      showBreadcrumbs: true,
    },
    footer: {
      show: true,
      showLinks: true,
      showCopyright: true,
      showVersion: true,
    },
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to save layout settings
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Settings saved",
        description: "Your layout settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save layout settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscard = () => {
    setSettings({
      navigation: {
        position: "left",
        collapsed: false,
        showLabels: true,
        showIcons: true,
        showBadges: true,
      },
      content: {
        maxWidth: "lg",
        padding: "md",
        showBreadcrumbs: true,
        showPageTitle: true,
        showActions: true,
      },
      sidebar: {
        position: "left",
        width: "md",
        showCollapseButton: true,
        showScrollbar: true,
        showSectionLabels: true,
      },
      header: {
        fixed: true,
        showSearch: true,
        showNotifications: true,
        showUserMenu: true,
        showBreadcrumbs: true,
      },
      footer: {
        show: true,
        showLinks: true,
        showCopyright: true,
        showVersion: true,
      },
    })
    toast({
      title: "Changes discarded",
      description: "Your layout settings have been reset to default values.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Layout & UI</h3>
        <p className="text-sm text-muted-foreground">
          Customize the layout and appearance of your application.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Navigation</CardTitle>
          <CardDescription>
            Configure the main navigation settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Position</Label>
            <Select
              value={settings.navigation.position}
              onValueChange={(value: "left" | "top") =>
                setSettings({
                  ...settings,
                  navigation: {
                    ...settings.navigation,
                    position: value,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left Side</SelectItem>
                <SelectItem value="top">Top Bar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Collapsed Navigation</Label>
              <p className="text-sm text-muted-foreground">
                Start with navigation collapsed.
              </p>
            </div>
            <Switch
              checked={settings.navigation.collapsed}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  navigation: {
                    ...settings.navigation,
                    collapsed: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Labels</Label>
              <p className="text-sm text-muted-foreground">
                Display navigation item labels.
              </p>
            </div>
            <Switch
              checked={settings.navigation.showLabels}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  navigation: {
                    ...settings.navigation,
                    showLabels: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Icons</Label>
              <p className="text-sm text-muted-foreground">
                Display navigation item icons.
              </p>
            </div>
            <Switch
              checked={settings.navigation.showIcons}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  navigation: {
                    ...settings.navigation,
                    showIcons: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Badges</Label>
              <p className="text-sm text-muted-foreground">
                Display notification badges.
              </p>
            </div>
            <Switch
              checked={settings.navigation.showBadges}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  navigation: {
                    ...settings.navigation,
                    showBadges: checked,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Area</CardTitle>
          <CardDescription>
            Customize the main content area layout.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Maximum Width</Label>
            <Select
              value={settings.content.maxWidth}
              onValueChange={(value: "sm" | "md" | "lg" | "xl" | "full") =>
                setSettings({
                  ...settings,
                  content: {
                    ...settings.content,
                    maxWidth: value,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select max width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra Large</SelectItem>
                <SelectItem value="full">Full Width</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Content Padding</Label>
            <Select
              value={settings.content.padding}
              onValueChange={(value: "none" | "sm" | "md" | "lg") =>
                setSettings({
                  ...settings,
                  content: {
                    ...settings.content,
                    padding: value,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select padding" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Breadcrumbs</Label>
              <p className="text-sm text-muted-foreground">
                Display navigation breadcrumbs.
              </p>
            </div>
            <Switch
              checked={settings.content.showBreadcrumbs}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  content: {
                    ...settings.content,
                    showBreadcrumbs: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Page Title</Label>
              <p className="text-sm text-muted-foreground">
                Display the current page title.
              </p>
            </div>
            <Switch
              checked={settings.content.showPageTitle}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  content: {
                    ...settings.content,
                    showPageTitle: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Actions</Label>
              <p className="text-sm text-muted-foreground">
                Display page action buttons.
              </p>
            </div>
            <Switch
              checked={settings.content.showActions}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  content: {
                    ...settings.content,
                    showActions: checked,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sidebar</CardTitle>
          <CardDescription>
            Configure the sidebar appearance and behavior.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Position</Label>
            <Select
              value={settings.sidebar.position}
              onValueChange={(value: "left" | "right") =>
                setSettings({
                  ...settings,
                  sidebar: {
                    ...settings.sidebar,
                    position: value,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left Side</SelectItem>
                <SelectItem value="right">Right Side</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Width</Label>
            <Select
              value={settings.sidebar.width}
              onValueChange={(value: "sm" | "md" | "lg") =>
                setSettings({
                  ...settings,
                  sidebar: {
                    ...settings.sidebar,
                    width: value,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Collapse Button</Label>
              <p className="text-sm text-muted-foreground">
                Display sidebar collapse button.
              </p>
            </div>
            <Switch
              checked={settings.sidebar.showCollapseButton}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  sidebar: {
                    ...settings.sidebar,
                    showCollapseButton: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Scrollbar</Label>
              <p className="text-sm text-muted-foreground">
                Display sidebar scrollbar.
              </p>
            </div>
            <Switch
              checked={settings.sidebar.showScrollbar}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  sidebar: {
                    ...settings.sidebar,
                    showScrollbar: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Section Labels</Label>
              <p className="text-sm text-muted-foreground">
                Display sidebar section labels.
              </p>
            </div>
            <Switch
              checked={settings.sidebar.showSectionLabels}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  sidebar: {
                    ...settings.sidebar,
                    showSectionLabels: checked,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Header</CardTitle>
          <CardDescription>
            Customize the header appearance and features.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Fixed Header</Label>
              <p className="text-sm text-muted-foreground">
                Keep header fixed at the top.
              </p>
            </div>
            <Switch
              checked={settings.header.fixed}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  header: {
                    ...settings.header,
                    fixed: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Search</Label>
              <p className="text-sm text-muted-foreground">
                Display search bar in header.
              </p>
            </div>
            <Switch
              checked={settings.header.showSearch}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  header: {
                    ...settings.header,
                    showSearch: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Display notification bell in header.
              </p>
            </div>
            <Switch
              checked={settings.header.showNotifications}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  header: {
                    ...settings.header,
                    showNotifications: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show User Menu</Label>
              <p className="text-sm text-muted-foreground">
                Display user menu in header.
              </p>
            </div>
            <Switch
              checked={settings.header.showUserMenu}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  header: {
                    ...settings.header,
                    showUserMenu: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Breadcrumbs</Label>
              <p className="text-sm text-muted-foreground">
                Display breadcrumbs in header.
              </p>
            </div>
            <Switch
              checked={settings.header.showBreadcrumbs}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  header: {
                    ...settings.header,
                    showBreadcrumbs: checked,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Footer</CardTitle>
          <CardDescription>
            Configure the footer appearance and content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Footer</Label>
              <p className="text-sm text-muted-foreground">
                Display the footer.
              </p>
            </div>
            <Switch
              checked={settings.footer.show}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  footer: {
                    ...settings.footer,
                    show: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Links</Label>
              <p className="text-sm text-muted-foreground">
                Display footer links.
              </p>
            </div>
            <Switch
              checked={settings.footer.showLinks}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  footer: {
                    ...settings.footer,
                    showLinks: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Copyright</Label>
              <p className="text-sm text-muted-foreground">
                Display copyright information.
              </p>
            </div>
            <Switch
              checked={settings.footer.showCopyright}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  footer: {
                    ...settings.footer,
                    showCopyright: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Version</Label>
              <p className="text-sm text-muted-foreground">
                Display application version.
              </p>
            </div>
            <Switch
              checked={settings.footer.showVersion}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  footer: {
                    ...settings.footer,
                    showVersion: checked,
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

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>
          Some layout changes may require a page refresh to take effect. Make sure
          to save your changes before refreshing.
        </AlertDescription>
      </Alert>
    </div>
  )
} 