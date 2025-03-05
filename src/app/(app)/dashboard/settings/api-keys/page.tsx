import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Key, AlertCircle, Copy, Trash2 } from "lucide-react"

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string | null
  permissions: string[]
}

export default function ApiKeysPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [newKeyName, setNewKeyName] = useState("")
  const [showNewKey, setShowNewKey] = useState(false)
  const [newKey, setNewKey] = useState("")

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the API key.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement API call to create API key
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      const mockKey = "sk_test_" + Math.random().toString(36).substring(2, 15)
      setNewKey(mockKey)
      setShowNewKey(true)
      setNewKeyName("")
      toast({
        title: "API Key Created",
        description: "Your new API key has been created successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create API key. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteKey = async (id: string) => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to delete API key
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      setApiKeys(apiKeys.filter((key) => key.id !== id))
      toast({
        title: "API Key Deleted",
        description: "The API key has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete API key. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "Copied",
      description: "API key has been copied to clipboard.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">API Keys</h3>
        <p className="text-sm text-muted-foreground">
          Manage your API keys for external integrations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New API Key</CardTitle>
          <CardDescription>
            Create a new API key for external integrations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="keyName">Key Name</Label>
            <Input
              id="keyName"
              placeholder="Enter a name for your API key"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
          </div>

          <Button onClick={handleCreateKey} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create API Key"}
          </Button>
        </CardContent>
      </Card>

      {showNewKey && (
        <Card>
          <CardHeader>
            <CardTitle>New API Key</CardTitle>
            <CardDescription>
              Make sure to copy your API key now. You won't be able to see it again!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Input value={newKey} readOnly />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleCopyKey(newKey)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {apiKeys.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <Alert>
              <Key className="h-4 w-4" />
              <AlertTitle>No API Keys</AlertTitle>
              <AlertDescription>
                You haven't created any API keys yet. Create one to get started.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Active API Keys</CardTitle>
            <CardDescription>
              Manage your active API keys.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{key.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Created on {new Date(key.createdAt).toLocaleDateString()}
                    </p>
                    {key.lastUsed && (
                      <p className="text-sm text-muted-foreground">
                        Last used on {new Date(key.lastUsed).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopyKey(key.key)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteKey(key.id)}
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
      )}

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Security Notice</AlertTitle>
        <AlertDescription>
          Keep your API keys secure and never share them publicly. If you suspect
          a key has been compromised, delete it immediately and create a new one.
        </AlertDescription>
      </Alert>
    </div>
  )
} 