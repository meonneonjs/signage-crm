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
import { Plus, Trash2, AlertCircle, Zap } from "lucide-react"

interface WorkflowTrigger {
  type: "deal_created" | "deal_updated" | "deal_closed" | "lead_created" | "lead_updated" | "task_completed" | "email_received"
  conditions: {
    field: string
    operator: "equals" | "contains" | "greater_than" | "less_than" | "is_empty" | "is_not_empty"
    value: string
  }[]
}

interface WorkflowAction {
  type: "send_email" | "create_task" | "update_record" | "send_notification" | "create_record" | "webhook"
  config: Record<string, any>
}

interface Workflow {
  id: string
  name: string
  description: string
  enabled: boolean
  trigger: WorkflowTrigger
  actions: WorkflowAction[]
}

interface WorkflowSettings {
  workflows: Workflow[]
  globalSettings: {
    enableWorkflows: boolean
    maxWorkflowsPerUser: number
    allowCustomWorkflows: boolean
    notificationPreferences: {
      email: boolean
      inApp: boolean
      slack: boolean
    }
  }
}

export default function WorkflowSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<WorkflowSettings>({
    workflows: [],
    globalSettings: {
      enableWorkflows: true,
      maxWorkflowsPerUser: 10,
      allowCustomWorkflows: true,
      notificationPreferences: {
        email: true,
        inApp: true,
        slack: false,
      },
    },
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to save workflow settings
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Settings saved",
        description: "Your workflow settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save workflow settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscard = () => {
    setSettings({
      workflows: [],
      globalSettings: {
        enableWorkflows: true,
        maxWorkflowsPerUser: 10,
        allowCustomWorkflows: true,
        notificationPreferences: {
          email: true,
          inApp: true,
          slack: false,
        },
      },
    })
    toast({
      title: "Changes discarded",
      description: "Your workflow settings have been reset to default values.",
    })
  }

  const handleAddWorkflow = () => {
    const newWorkflow: Workflow = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Workflow",
      description: "",
      enabled: true,
      trigger: {
        type: "deal_created",
        conditions: [],
      },
      actions: [],
    }
    setSettings({
      ...settings,
      workflows: [...settings.workflows, newWorkflow],
    })
  }

  const handleDeleteWorkflow = (workflowId: string) => {
    setSettings({
      ...settings,
      workflows: settings.workflows.filter((w) => w.id !== workflowId),
    })
  }

  const handleUpdateWorkflow = (workflowId: string, updates: Partial<Workflow>) => {
    setSettings({
      ...settings,
      workflows: settings.workflows.map((w) =>
        w.id === workflowId ? { ...w, ...updates } : w
      ),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Workflow Automation</h3>
        <p className="text-sm text-muted-foreground">
          Configure automated workflows and triggers for your CRM.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Settings</CardTitle>
          <CardDescription>
            Configure general workflow automation settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Workflows</Label>
              <p className="text-sm text-muted-foreground">
                Enable or disable all workflow automation.
              </p>
            </div>
            <Switch
              checked={settings.globalSettings.enableWorkflows}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  globalSettings: {
                    ...settings.globalSettings,
                    enableWorkflows: checked,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Maximum Workflows per User</Label>
            <Input
              type="number"
              value={settings.globalSettings.maxWorkflowsPerUser}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  globalSettings: {
                    ...settings.globalSettings,
                    maxWorkflowsPerUser: parseInt(e.target.value),
                  },
                })
              }
              min={1}
              max={50}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow Custom Workflows</Label>
              <p className="text-sm text-muted-foreground">
                Allow users to create custom workflows.
              </p>
            </div>
            <Switch
              checked={settings.globalSettings.allowCustomWorkflows}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  globalSettings: {
                    ...settings.globalSettings,
                    allowCustomWorkflows: checked,
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Notification Preferences</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Notifications</span>
                <Switch
                  checked={settings.globalSettings.notificationPreferences.email}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        notificationPreferences: {
                          ...settings.globalSettings.notificationPreferences,
                          email: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">In-App Notifications</span>
                <Switch
                  checked={settings.globalSettings.notificationPreferences.inApp}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        notificationPreferences: {
                          ...settings.globalSettings.notificationPreferences,
                          inApp: checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Slack Notifications</span>
                <Switch
                  checked={settings.globalSettings.notificationPreferences.slack}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      globalSettings: {
                        ...settings.globalSettings,
                        notificationPreferences: {
                          ...settings.globalSettings.notificationPreferences,
                          slack: checked,
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
          <CardTitle>Workflows</CardTitle>
          <CardDescription>
            Manage your automated workflows and triggers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleAddWorkflow} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Workflow
          </Button>

          {settings.workflows.map((workflow) => (
            <Card key={workflow.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base">
                      <Input
                        value={workflow.name}
                        onChange={(e) =>
                          handleUpdateWorkflow(workflow.id, { name: e.target.value })
                        }
                        className="h-7 w-[200px]"
                      />
                    </CardTitle>
                    <CardDescription>
                      <Input
                        value={workflow.description}
                        onChange={(e) =>
                          handleUpdateWorkflow(workflow.id, {
                            description: e.target.value,
                          })
                        }
                        placeholder="Add a description..."
                        className="h-7"
                      />
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={workflow.enabled}
                      onCheckedChange={(checked) =>
                        handleUpdateWorkflow(workflow.id, { enabled: checked })
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteWorkflow(workflow.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Trigger Type</Label>
                  <Select
                    value={workflow.trigger.type}
                    onValueChange={(value: WorkflowTrigger["type"]) =>
                      handleUpdateWorkflow(workflow.id, {
                        trigger: { ...workflow.trigger, type: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deal_created">Deal Created</SelectItem>
                      <SelectItem value="deal_updated">Deal Updated</SelectItem>
                      <SelectItem value="deal_closed">Deal Closed</SelectItem>
                      <SelectItem value="lead_created">Lead Created</SelectItem>
                      <SelectItem value="lead_updated">Lead Updated</SelectItem>
                      <SelectItem value="task_completed">Task Completed</SelectItem>
                      <SelectItem value="email_received">Email Received</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Actions</Label>
                  <div className="space-y-2">
                    {workflow.actions.map((action, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Select
                          value={action.type}
                          onValueChange={(value: WorkflowAction["type"]) => {
                            const newActions = [...workflow.actions]
                            newActions[index] = { ...action, type: value }
                            handleUpdateWorkflow(workflow.id, { actions: newActions })
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="send_email">Send Email</SelectItem>
                            <SelectItem value="create_task">Create Task</SelectItem>
                            <SelectItem value="update_record">Update Record</SelectItem>
                            <SelectItem value="send_notification">Send Notification</SelectItem>
                            <SelectItem value="create_record">Create Record</SelectItem>
                            <SelectItem value="webhook">Webhook</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newActions = workflow.actions.filter((_, i) => i !== index)
                            handleUpdateWorkflow(workflow.id, { actions: newActions })
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
                        const newAction: WorkflowAction = {
                          type: "send_email",
                          config: {},
                        }
                        handleUpdateWorkflow(workflow.id, {
                          actions: [...workflow.actions, newAction],
                        })
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Action
                    </Button>
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
          Workflow automation can significantly impact system performance. Monitor
          your workflows and adjust as needed.
        </AlertDescription>
      </Alert>
    </div>
  )
} 