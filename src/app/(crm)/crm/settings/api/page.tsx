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
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, AlertCircle, Key, RefreshCw, Copy, Eye, EyeOff, Activity } from "lucide-react"

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string
  expiresAt?: string
  status: "active" | "expired" | "revoked"
  permissions: string[]
  rateLimit: {
    requests: number
    period: "minute" | "hour" | "day"
  }
}

interface ApiSettings {
  apiKeys: ApiKey[]
  globalSettings: {
    enableApi: boolean
    defaultRateLimit: {
      requests: number
      period: "minute" | "hour" | "day"
    }
    requireApiKey: boolean
    allowPublicAccess: boolean
    corsEnabled: boolean
    allowedOrigins: string[]
    allowedMethods: string[]
    allowedHeaders: string[]
    maxRequestSize: number
    timeout: number
    logging: {
      enabled: boolean
      level: "debug" | "info" | "warn" | "error"
      retention: number
    }
  }
}

export default function ApiSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [settings, setSettings] = useState<ApiSettings>({
    apiKeys: [],
    globalSettings: {
      enableApi: true,
      defaultRateLimit: {
        requests: 100,
        period: "minute",
      },
      requireApiKey: true,
      allowPublicAccess: false,
      corsEnabled: true,
      allowedOrigins: [],
      allowedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
      maxRequestSize: 10,
      timeout: 30,
      logging: {
        enabled: true,
        level: "info",
        retention: 30,
      },
    },
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to save API settings
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Settings saved",
        description: "Your API settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscard = () => {
    setSettings({
      apiKeys: [],
      globalSettings: {
        enableApi: true,
        defaultRateLimit: {
          requests: 100,
          period: "minute",
        },
        requireApiKey: true,
        allowPublicAccess: false,
        corsEnabled: true,
        allowedOrigins: [],
        allowedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        maxRequestSize: 10,
        timeout: 30,
        logging: {
          enabled: true,
          level: "info",
          retention: 30,
        },
      },
    })
    toast({
      title: "Changes discarded",
      description: "Your API settings have been reset to default values.",
    })
  }

  const handleAddApiKey = () => {
    const newApiKey: ApiKey = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New API Key",
      key: Math.random().toString(36).substr(2, 32),
      createdAt: new Date().toISOString(),
      lastUsed: "Never",
      status: "active",
      permissions: [],
      rateLimit: {
        requests: 100,
        period: "minute",
      },
    }
    setSettings({
      ...settings,
      apiKeys: [...settings.apiKeys, newApiKey],
    })
  }

  const handleDeleteApiKey = (apiKeyId: string) => {
    setSettings({
      ...settings,
      apiKeys: settings.apiKeys.filter((k) => k.id !== apiKeyId),
    })
  }

  const handleUpdateApiKey = (apiKeyId: string, updates: Partial<ApiKey>) => {
    setSettings({
      ...settings,
      apiKeys: settings.apiKeys.map((k) =>
        k.id === apiKeyId ? { ...k, ...updates } : k
      ),
    })
  }

  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "Copied",
      description: "API key copied to clipboard.",
    })
  }

  const getStatusBadge = (status: ApiKey["status"]) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      expired: "bg-yellow-100 text-yellow-800",
      revoked: "bg-red-100 text-red-800",
    }
    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">API Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Manage API keys, rate limits, and other API-related settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Settings</CardTitle>
          <CardDescription>
            Configure general API settings and defaults.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable API</Label>
              <p className="text-sm text-muted-foreground">
                Enable or disable the API access.
              </p>
            </div>
            <Switch
              checked={settings.globalSettings.enableApi}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  globalSettings: {
                    ...settings.globalSettings,
                    enableApi: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require API Key</Label>
              <p className="text-sm text-muted-foreground">
                Require API key for all requests.
              </p>
            </div>
            <Switch
              checked={settings.globalSettings.requireApiKey}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  globalSettings: {
                    ...settings.globalSettings,
                    requireApiKey: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow Public Access</Label>
              <p className="text-sm text-muted-foreground">
                Allow public access to certain endpoints.
              </p>
            </div>
            <Switch
              checked={settings.globalSettings.allowPublicAccess}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  globalSettings: {
                    ...settings.globalSettings,
                    allowPublicAccess: checked,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable CORS</Label>
              <p className="text-sm text-muted-foreground">
                Enable Cross-Origin Resource Sharing.
              </p>
            </div>
            <Switch
              checked={settings.globalSettings.corsEnabled}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  globalSettings: {
                    ...settings.globalSettings,
                    corsEnabled: checked,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Default Rate Limit</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={settings.globalSettings.defaultRateLimit.requests}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    globalSettings: {
                      ...settings.globalSettings,
                      defaultRateLimit: {
                        ...settings.globalSettings.defaultRateLimit,
                        requests: parseInt(e.target.value),
                      },
                    },
                  })
                }
                min={1}
                className="w-[100px]"
              />
              <Select
                value={settings.globalSettings.defaultRateLimit.period}
                onValueChange={(value: "minute" | "hour" | "day") =>
                  setSettings({
                    ...settings,
                    globalSettings: {
                      ...settings.globalSettings,
                      defaultRateLimit: {
                        ...settings.globalSettings.defaultRateLimit,
                        period: value,
                      },
                    },
                  })
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minute">Per Minute</SelectItem>
                  <SelectItem value="hour">Per Hour</SelectItem>
                  <SelectItem value="day">Per Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Allowed Origins</Label>
            <div className="space-y-2">
              {settings.globalSettings.allowedOrigins.map((origin, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={origin}
                    onChange={(e) => {
                      const newOrigins = [...settings.globalSettings.allowedOrigins]
                      newOrigins[index] = e.target.value
                      setSettings({
                        ...settings,
                        globalSettings: {
                          ...settings.globalSettings,
                          allowedOrigins: newOrigins,
                        },
                      })
                    }}
                    placeholder="https://example.com"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newOrigins = settings.globalSettings.allowedOrigins.filter(
                        (_, i) => i !== index
                      )
                      setSettings({
                        ...settings,
                        globalSettings: {
                          ...settings.globalSettings,
                          allowedOrigins: newOrigins,
                        },
                      })
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSettings({
                    ...settings,
                    globalSettings: {
                      ...settings.globalSettings,
                      allowedOrigins: [...settings.globalSettings.allowedOrigins, ""],
                    },
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Origin
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Allowed Methods</Label>
            <div className="flex flex-wrap gap-2">
              {["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"].map((method) => (
                <Button
                  key={method}
                  variant={
                    settings.globalSettings.allowedMethods.includes(method)
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    const newMethods = settings.globalSettings.allowedMethods.includes(method)
                      ? settings.globalSettings.allowedMethods.filter((m) => m !== method)
                      : [...settings.globalSettings.allowedMethods, method]
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        allowedMethods: newMethods,
                      },
                    })
                  }}
                >
                  {method}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Request Settings</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Max Request Size (MB)</Label>
                <Input
                  type="number"
                  value={settings.globalSettings.maxRequestSize}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        maxRequestSize: parseInt(e.target.value),
                      },
                    })
                  }
                  min={1}
                  max={100}
                />
              </div>
              <div className="space-y-2">
                <Label>Timeout (seconds)</Label>
                <Input
                  type="number"
                  value={settings.globalSettings.timeout}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        timeout: parseInt(e.target.value),
                      },
                    })
                  }
                  min={1}
                  max={300}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Logging</Label>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable Logging</span>
                <Switch
                  checked={settings.globalSettings.logging.enabled}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        logging: {
                          ...settings.globalSettings.logging,
                          enabled: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Log Level</Label>
                <Select
                  value={settings.globalSettings.logging.level}
                  onValueChange={(value: "debug" | "info" | "warn" | "error") =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        logging: {
                          ...settings.globalSettings.logging,
                          level: value,
                        },
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select log level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Log Retention (days)</Label>
                <Input
                  type="number"
                  value={settings.globalSettings.logging.retention}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        logging: {
                          ...settings.globalSettings.logging,
                          retention: parseInt(e.target.value),
                        },
                      },
                    })
                  }
                  min={1}
                  max={365}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage your API keys and their permissions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleAddApiKey} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Generate New API Key
          </Button>

          {settings.apiKeys.map((apiKey) => (
            <Card key={apiKey.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base">
                      <Input
                        value={apiKey.name}
                        onChange={(e) =>
                          handleUpdateApiKey(apiKey.id, { name: e.target.value })
                        }
                        className="h-7 w-[200px]"
                      />
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(apiKey.status)}
                      <span className="text-sm text-muted-foreground">
                        Created {new Date(apiKey.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyApiKey(apiKey.key)}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Key
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteApiKey(apiKey.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type={showKeys[apiKey.id] ? "text" : "password"}
                      value={apiKey.key}
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setShowKeys({
                          ...showKeys,
                          [apiKey.id]: !showKeys[apiKey.id],
                        })
                      }
                    >
                      {showKeys[apiKey.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rate Limit</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={apiKey.rateLimit.requests}
                      onChange={(e) =>
                        handleUpdateApiKey(apiKey.id, {
                          rateLimit: {
                            ...apiKey.rateLimit,
                            requests: parseInt(e.target.value),
                          },
                        })
                      }
                      min={1}
                      className="w-[100px]"
                    />
                    <Select
                      value={apiKey.rateLimit.period}
                      onValueChange={(value: "minute" | "hour" | "day") =>
                        handleUpdateApiKey(apiKey.id, {
                          rateLimit: {
                            ...apiKey.rateLimit,
                            period: value,
                          },
                        })
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minute">Per Minute</SelectItem>
                        <SelectItem value="hour">Per Hour</SelectItem>
                        <SelectItem value="day">Per Day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "read",
                      "write",
                      "delete",
                      "admin",
                      "analytics",
                      "export",
                    ].map((permission) => (
                      <Button
                        key={permission}
                        variant={
                          apiKey.permissions.includes(permission)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          const newPermissions = apiKey.permissions.includes(permission)
                            ? apiKey.permissions.filter((p) => p !== permission)
                            : [...apiKey.permissions, permission]
                          handleUpdateApiKey(apiKey.id, {
                            permissions: newPermissions,
                          })
                        }}
                      >
                        {permission.charAt(0).toUpperCase() + permission.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span>Last used: {apiKey.lastUsed}</span>
                </div>
              </CardContent>
            </Card>
          ))}
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
        <AlertTitle>Security Note</AlertTitle>
        <AlertDescription>
          Keep your API keys secure and never share them. Rotate keys regularly and
          revoke any compromised keys immediately.
        </AlertDescription>
      </Alert>
    </div>
  )
} 