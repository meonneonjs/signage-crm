"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Plus, FileText, Mail, Trash2, Edit2, AlertCircle } from "lucide-react"

interface Template {
  id: string
  name: string
  type: "email" | "document"
  category: string
  content: string
  variables: string[]
  createdAt: string
  updatedAt: string
}

export default function TemplatesPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Welcome Email",
      type: "email",
      category: "Onboarding",
      content: "Welcome to our platform! We're excited to have you on board.",
      variables: ["name", "company"],
      createdAt: "2024-03-01",
      updatedAt: "2024-03-01",
    },
    {
      id: "2",
      name: "Project Proposal",
      type: "document",
      category: "Sales",
      content: "Thank you for your interest in our services. Here's our proposal.",
      variables: ["client_name", "project_name", "amount"],
      createdAt: "2024-03-01",
      updatedAt: "2024-03-01",
    },
  ])
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "email" as "email" | "document",
    category: "",
    content: "",
    variables: [] as string[],
  })

  const handleCreateTemplate = async () => {
    if (!formData.name.trim() || !formData.category.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement API call to create template
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      const newTemplate: Template = {
        id: Math.random().toString(36).substring(7),
        name: formData.name,
        type: formData.type,
        category: formData.category,
        content: formData.content,
        variables: formData.variables,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setTemplates([...templates, newTemplate])
      resetForm()
      toast({
        title: "Template created",
        description: "Your template has been created successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create template. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateTemplate = async () => {
    if (!selectedTemplate) return

    setIsLoading(true)
    try {
      // TODO: Implement API call to update template
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      setTemplates(
        templates.map((template) =>
          template.id === selectedTemplate.id
            ? {
                ...template,
                name: formData.name,
                type: formData.type,
                category: formData.category,
                content: formData.content,
                variables: formData.variables,
                updatedAt: new Date().toISOString(),
              }
            : template
        )
      )
      resetForm()
      setIsEditing(false)
      toast({
        title: "Template updated",
        description: "Your template has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update template. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTemplate = async (id: string) => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to delete template
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      setTemplates(templates.filter((template) => template.id !== id))
      toast({
        title: "Template deleted",
        description: "Your template has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete template. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditTemplate = (template: Template) => {
    setSelectedTemplate(template)
    setFormData({
      name: template.name,
      type: template.type,
      category: template.category,
      content: template.content,
      variables: template.variables,
    })
    setIsEditing(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      type: "email",
      category: "",
      content: "",
      variables: [],
    })
    setSelectedTemplate(null)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Templates</h3>
        <p className="text-sm text-muted-foreground">
          Manage your email and document templates.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit Template" : "Create New Template"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Update your existing template."
              : "Create a new template for emails or documents."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Template Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "email" | "document") =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="document">Document</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={10}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
            <Button
              onClick={isEditing ? handleUpdateTemplate : handleCreateTemplate}
              disabled={isLoading}
            >
              {isLoading
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update Template"
                : "Create Template"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Template Library</CardTitle>
          <CardDescription>
            View and manage your existing templates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  {template.type === "email" ? (
                    <Mail className="h-6 w-6" />
                  ) : (
                    <FileText className="h-6 w-6" />
                  )}
                  <div>
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {template.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditTemplate(template)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTemplate(template.id)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Template Variables</AlertTitle>
        <AlertDescription>
          Use variables in your templates by wrapping them in curly braces, e.g.,
          {"{name}"}. Available variables will be replaced with actual values when
          the template is used.
        </AlertDescription>
      </Alert>
    </div>
  )
} 