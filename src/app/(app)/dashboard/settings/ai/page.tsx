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
import { Plus, Trash2, AlertCircle, Bot, Zap, Brain, MessageSquare, FileText, Sparkles } from "lucide-react"

interface AiModel {
  id: string
  name: string
  provider: "openai" | "anthropic" | "google" | "azure"
  model: string
  status: "active" | "inactive" | "error"
  maxTokens: number
  temperature: number
  costPer1kTokens: number
  capabilities: string[]
}

interface AiSettings {
  models: AiModel[]
  globalSettings: {
    enableAi: boolean
    defaultModel: string
    maxTokens: number
    temperature: number
    features: {
      chat: boolean
      email: boolean
      documents: boolean
      analytics: boolean
      recommendations: boolean
      automation: boolean
    }
    privacy: {
      dataRetention: number
      anonymizeData: boolean
      allowTraining: boolean
    }
    performance: {
      responseTimeout: number
      maxConcurrentRequests: number
      cacheResponses: boolean
    }
    costs: {
      monthlyBudget: number
      alertThreshold: number
      optimizeUsage: boolean
    }
  }
}

export default function AiSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<AiSettings>({
    models: [],
    globalSettings: {
      enableAi: true,
      defaultModel: "",
      maxTokens: 2000,
      temperature: 0.7,
      features: {
        chat: true,
        email: true,
        documents: true,
        analytics: true,
        recommendations: true,
        automation: true,
      },
      privacy: {
        dataRetention: 30,
        anonymizeData: true,
        allowTraining: false,
      },
      performance: {
        responseTimeout: 30,
        maxConcurrentRequests: 10,
        cacheResponses: true,
      },
      costs: {
        monthlyBudget: 100,
        alertThreshold: 80,
        optimizeUsage: true,
      },
    },
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to save AI settings
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Settings saved",
        description: "Your AI settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save AI settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscard = () => {
    setSettings({
      models: [],
      globalSettings: {
        enableAi: true,
        defaultModel: "",
        maxTokens: 2000,
        temperature: 0.7,
        features: {
          chat: true,
          email: true,
          documents: true,
          analytics: true,
          recommendations: true,
          automation: true,
        },
        privacy: {
          dataRetention: 30,
          anonymizeData: true,
          allowTraining: false,
        },
        performance: {
          responseTimeout: 30,
          maxConcurrentRequests: 10,
          cacheResponses: true,
        },
        costs: {
          monthlyBudget: 100,
          alertThreshold: 80,
          optimizeUsage: true,
        },
      },
    })
    toast({
      title: "Changes discarded",
      description: "Your AI settings have been reset to default values.",
    })
  }

  const handleAddModel = () => {
    const newModel: AiModel = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Model",
      provider: "openai",
      model: "gpt-4",
      status: "inactive",
      maxTokens: 2000,
      temperature: 0.7,
      costPer1kTokens: 0.03,
      capabilities: [],
    }
    setSettings({
      ...settings,
      models: [...settings.models, newModel],
    })
  }

  const handleDeleteModel = (modelId: string) => {
    setSettings({
      ...settings,
      models: settings.models.filter((m) => m.id !== modelId),
    })
  }

  const handleUpdateModel = (modelId: string, updates: Partial<AiModel>) => {
    setSettings({
      ...settings,
      models: settings.models.map((m) =>
        m.id === modelId ? { ...m, ...updates } : m
      ),
    })
  }

  const getStatusBadge = (status: AiModel["status"]) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      error: "bg-red-100 text-red-800",
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
        <h3 className="text-lg font-medium">AI Assistant</h3>
        <p className="text-sm text-muted-foreground">
          Configure AI-powered features and models for your CRM.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Settings</CardTitle>
          <CardDescription>
            Configure general AI settings and defaults.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable AI</Label>
              <p className="text-sm text-muted-foreground">
                Enable or disable all AI-powered features.
              </p>
            </div>
            <Switch
              checked={settings.globalSettings.enableAi}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  globalSettings: {
                    ...settings.globalSettings,
                    enableAi: checked,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Default Model</Label>
            <Select
              value={settings.globalSettings.defaultModel}
              onValueChange={(value) =>
                setSettings({
                  ...settings,
                  globalSettings: {
                    ...settings.globalSettings,
                    defaultModel: value,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select default model" />
              </SelectTrigger>
              <SelectContent>
                {settings.models.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Model Parameters</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Max Tokens</Label>
                <Input
                  type="number"
                  value={settings.globalSettings.maxTokens}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        maxTokens: parseInt(e.target.value),
                      },
                    })
                  }
                  min={1}
                  max={8000}
                />
              </div>
              <div className="space-y-2">
                <Label>Temperature</Label>
                <Input
                  type="number"
                  value={settings.globalSettings.temperature}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        temperature: parseFloat(e.target.value),
                      },
                    })
                  }
                  min={0}
                  max={2}
                  step={0.1}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Features</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Chat Assistant</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable AI-powered chat support.
                  </p>
                </div>
                <Switch
                  checked={settings.globalSettings.features.chat}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        features: {
                          ...settings.globalSettings.features,
                          chat: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Assistant</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable AI-powered email assistance.
                  </p>
                </div>
                <Switch
                  checked={settings.globalSettings.features.email}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        features: {
                          ...settings.globalSettings.features,
                          email: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Document Analysis</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable AI-powered document processing.
                  </p>
                </div>
                <Switch
                  checked={settings.globalSettings.features.documents}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        features: {
                          ...settings.globalSettings.features,
                          documents: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable AI-powered analytics.
                  </p>
                </div>
                <Switch
                  checked={settings.globalSettings.features.analytics}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        features: {
                          ...settings.globalSettings.features,
                          analytics: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Recommendations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable AI-powered recommendations.
                  </p>
                </div>
                <Switch
                  checked={settings.globalSettings.features.recommendations}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        features: {
                          ...settings.globalSettings.features,
                          recommendations: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automation</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable AI-powered automation.
                  </p>
                </div>
                <Switch
                  checked={settings.globalSettings.features.automation}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        features: {
                          ...settings.globalSettings.features,
                          automation: checked,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Privacy Settings</Label>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Data Retention (days)</Label>
                <Input
                  type="number"
                  value={settings.globalSettings.privacy.dataRetention}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        privacy: {
                          ...settings.globalSettings.privacy,
                          dataRetention: parseInt(e.target.value),
                        },
                      },
                    })
                  }
                  min={1}
                  max={365}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anonymize Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Remove personally identifiable information.
                  </p>
                </div>
                <Switch
                  checked={settings.globalSettings.privacy.anonymizeData}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        privacy: {
                          ...settings.globalSettings.privacy,
                          anonymizeData: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Training</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow data to be used for model training.
                  </p>
                </div>
                <Switch
                  checked={settings.globalSettings.privacy.allowTraining}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        privacy: {
                          ...settings.globalSettings.privacy,
                          allowTraining: checked,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Performance</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Response Timeout (seconds)</Label>
                <Input
                  type="number"
                  value={settings.globalSettings.performance.responseTimeout}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        performance: {
                          ...settings.globalSettings.performance,
                          responseTimeout: parseInt(e.target.value),
                        },
                      },
                    })
                  }
                  min={1}
                  max={300}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Concurrent Requests</Label>
                <Input
                  type="number"
                  value={settings.globalSettings.performance.maxConcurrentRequests}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        performance: {
                          ...settings.globalSettings.performance,
                          maxConcurrentRequests: parseInt(e.target.value),
                        },
                      },
                    })
                  }
                  min={1}
                  max={100}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cache Responses</Label>
                  <p className="text-sm text-muted-foreground">
                    Cache AI responses for better performance.
                  </p>
                </div>
                <Switch
                  checked={settings.globalSettings.performance.cacheResponses}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        performance: {
                          ...settings.globalSettings.performance,
                          cacheResponses: checked,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cost Management</Label>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Monthly Budget ($)</Label>
                  <Input
                    type="number"
                    value={settings.globalSettings.costs.monthlyBudget}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        globalSettings: {
                          ...settings.globalSettings,
                          costs: {
                            ...settings.globalSettings.costs,
                            monthlyBudget: parseInt(e.target.value),
                          },
                        },
                      })
                    }
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Alert Threshold (%)</Label>
                  <Input
                    type="number"
                    value={settings.globalSettings.costs.alertThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        globalSettings: {
                          ...settings.globalSettings,
                          costs: {
                            ...settings.globalSettings.costs,
                            alertThreshold: parseInt(e.target.value),
                          },
                        },
                      })
                    }
                    min={0}
                    max={100}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Optimize Usage</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically optimize AI usage to stay within budget.
                  </p>
                </div>
                <Switch
                  checked={settings.globalSettings.costs.optimizeUsage}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        costs: {
                          ...settings.globalSettings.costs,
                          optimizeUsage: checked,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Models</CardTitle>
          <CardDescription>
            Configure and manage AI models and their capabilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleAddModel} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Model
          </Button>

          {settings.models.map((model) => (
            <Card key={model.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base">
                      <Input
                        value={model.name}
                        onChange={(e) =>
                          handleUpdateModel(model.id, { name: e.target.value })
                        }
                        className="h-7 w-[200px]"
                      />
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(model.status)}
                      <span className="text-sm text-muted-foreground">
                        {model.provider.charAt(0).toUpperCase() + model.provider.slice(1)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteModel(model.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Model Configuration</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Provider</Label>
                      <Select
                        value={model.provider}
                        onValueChange={(value: AiModel["provider"]) =>
                          handleUpdateModel(model.id, { provider: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="openai">OpenAI</SelectItem>
                          <SelectItem value="anthropic">Anthropic</SelectItem>
                          <SelectItem value="google">Google</SelectItem>
                          <SelectItem value="azure">Azure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Model</Label>
                      <Input
                        value={model.model}
                        onChange={(e) =>
                          handleUpdateModel(model.id, { model: e.target.value })
                        }
                        placeholder="e.g., gpt-4"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Model Parameters</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Max Tokens</Label>
                      <Input
                        type="number"
                        value={model.maxTokens}
                        onChange={(e) =>
                          handleUpdateModel(model.id, {
                            maxTokens: parseInt(e.target.value),
                          })
                        }
                        min={1}
                        max={8000}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Temperature</Label>
                      <Input
                        type="number"
                        value={model.temperature}
                        onChange={(e) =>
                          handleUpdateModel(model.id, {
                            temperature: parseFloat(e.target.value),
                          })
                        }
                        min={0}
                        max={2}
                        step={0.1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Cost per 1k Tokens ($)</Label>
                      <Input
                        type="number"
                        value={model.costPer1kTokens}
                        onChange={(e) =>
                          handleUpdateModel(model.id, {
                            costPer1kTokens: parseFloat(e.target.value),
                          })
                        }
                        min={0}
                        step={0.001}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Capabilities</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "chat",
                      "completion",
                      "embedding",
                      "fine-tuning",
                      "vision",
                      "audio",
                    ].map((capability) => (
                      <Button
                        key={capability}
                        variant={
                          model.capabilities.includes(capability)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          const newCapabilities = model.capabilities.includes(capability)
                            ? model.capabilities.filter((c) => c !== capability)
                            : [...model.capabilities, capability]
                          handleUpdateModel(model.id, {
                            capabilities: newCapabilities,
                          })
                        }}
                      >
                        {capability.charAt(0).toUpperCase() + capability.slice(1)}
                      </Button>
                    ))}
                  </div>
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
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>
          AI features may impact system performance and costs. Monitor usage and
          adjust settings as needed.
        </AlertDescription>
      </Alert>
    </div>
  )
} 