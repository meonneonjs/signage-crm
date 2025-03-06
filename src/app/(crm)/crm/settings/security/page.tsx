import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Shield, Key } from "lucide-react"

interface SecurityData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  twoFactorEnabled: boolean
}

export default function SecurityPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [security, setSecurity] = useState<SecurityData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  })

  const handlePasswordChange = async () => {
    if (security.newPassword !== security.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement API call to change password
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      setSecurity({
        ...security,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTwoFactorToggle = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to toggle 2FA
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      setSecurity({
        ...security,
        twoFactorEnabled: !security.twoFactorEnabled,
      })
      toast({
        title: "Two-factor authentication updated",
        description: security.twoFactorEnabled
          ? "Two-factor authentication has been disabled."
          : "Two-factor authentication has been enabled.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update two-factor authentication. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account security settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={security.currentPassword}
              onChange={(e) =>
                setSecurity({ ...security, currentPassword: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={security.newPassword}
              onChange={(e) =>
                setSecurity({ ...security, newPassword: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={security.confirmPassword}
              onChange={(e) =>
                setSecurity({ ...security, confirmPassword: e.target.value })
              }
            />
          </div>

          <Button onClick={handlePasswordChange} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Require a code from your authenticator app to sign in.
              </p>
            </div>
            <Switch
              checked={security.twoFactorEnabled}
              onCheckedChange={handleTwoFactorToggle}
              disabled={isLoading}
            />
          </div>

          {security.twoFactorEnabled && (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Two-Factor Authentication Enabled</AlertTitle>
              <AlertDescription>
                You will need to enter a code from your authenticator app when
                signing in.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage your active sessions across devices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Active Sessions</AlertTitle>
            <AlertDescription>
              You are currently signed in on this device only.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage your API keys for external integrations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Key className="h-4 w-4" />
            <AlertTitle>No API Keys</AlertTitle>
            <AlertDescription>
              You haven't created any API keys yet.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
} 