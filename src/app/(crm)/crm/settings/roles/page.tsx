"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { createRole, updateRole, deleteRole, Permission } from "@/lib/rbac"
import { RequirePermission } from "@/hooks/use-permissions"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
}

export default function RolesPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Admin",
      description: "Full system access",
      permissions: [
        "view:dashboard",
        "manage:users",
        "manage:roles",
        "manage:permissions",
        "manage:settings",
        "manage:workflows",
        "manage:integrations",
        "manage:api",
        "manage:ai",
        "manage:security",
        "manage:company",
        "manage:team",
        "manage:billing",
        "manage:templates",
        "manage:branding",
        "manage:layout",
        "manage:email",
        "manage:chat",
        "manage:data",
        "manage:reports",
      ],
    },
    {
      id: "2",
      name: "Manager",
      description: "Team management access",
      permissions: [
        "view:dashboard",
        "manage:users",
        "manage:workflows",
        "manage:integrations",
        "manage:team",
        "manage:templates",
        "manage:email",
        "manage:chat",
        "manage:data",
        "manage:reports",
      ],
    },
    {
      id: "3",
      name: "User",
      description: "Basic user access",
      permissions: [
        "view:dashboard",
        "manage:workflows",
        "manage:email",
        "manage:chat",
        "manage:data",
      ],
    },
  ])
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as Permission[],
  })

  const allPermissions: Permission[] = [
    "view:dashboard",
    "manage:users",
    "manage:roles",
    "manage:permissions",
    "manage:settings",
    "manage:workflows",
    "manage:integrations",
    "manage:api",
    "manage:ai",
    "manage:security",
    "manage:company",
    "manage:team",
    "manage:billing",
    "manage:templates",
    "manage:branding",
    "manage:layout",
    "manage:email",
    "manage:chat",
    "manage:data",
    "manage:reports",
  ]

  const handleCreateRole = async () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement API call to create role
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      const newRole: Role = {
        id: Math.random().toString(36).substring(7),
        name: formData.name,
        description: formData.description,
        permissions: formData.permissions,
      }
      setRoles([...roles, newRole])
      resetForm()
      toast({
        title: "Role created",
        description: "Your role has been created successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create role. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateRole = async () => {
    if (!selectedRole) return

    setIsLoading(true)
    try {
      // TODO: Implement API call to update role
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      setRoles(
        roles.map((role) =>
          role.id === selectedRole.id
            ? {
                ...role,
                name: formData.name,
                description: formData.description,
                permissions: formData.permissions,
              }
            : role
        )
      )
      resetForm()
      setIsEditing(false)
      toast({
        title: "Role updated",
        description: "Your role has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update role. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteRole = async (id: string) => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to delete role
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      setRoles(roles.filter((role) => role.id !== id))
      toast({
        title: "Role deleted",
        description: "Your role has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete role. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditRole = (role: Role) => {
    setSelectedRole(role)
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    })
    setIsEditing(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      permissions: [],
    })
    setSelectedRole(null)
    setIsEditing(false)
  }

  return (
    <RequirePermission permission="manage:roles">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Roles & Permissions</h3>
          <p className="text-sm text-muted-foreground">
            Manage user roles and their permissions.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Role" : "Create New Role"}
            </CardTitle>
            <CardDescription>
              {isEditing
                ? "Update your existing role."
                : "Create a new role with specific permissions."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-4">
                {allPermissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission}
                      checked={formData.permissions.includes(permission)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            permissions: [...formData.permissions, permission],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            permissions: formData.permissions.filter(
                              (p) => p !== permission
                            ),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={permission}>{permission}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                onClick={isEditing ? handleUpdateRole : handleCreateRole}
                disabled={isLoading}
              >
                {isLoading
                  ? isEditing
                    ? "Updating..."
                    : "Creating..."
                  : isEditing
                  ? "Update Role"
                  : "Create Role"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Library</CardTitle>
            <CardDescription>
              View and manage your existing roles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{role.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {role.permissions.map((permission) => (
                        <span
                          key={permission}
                          className="rounded-full bg-muted px-2 py-1 text-xs"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditRole(role)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteRole(role.id)}
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
      </div>
    </RequirePermission>
  )
} 