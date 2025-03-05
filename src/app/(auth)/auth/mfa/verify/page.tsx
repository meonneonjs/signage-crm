"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { verifyMFA, verifyBackupCode } from "@/lib/mfa"
import { AlertCircle } from "lucide-react"

export default function MFAVerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showBackupCode, setShowBackupCode] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) return

    setIsLoading(true)
    try {
      const isValid = showBackupCode
        ? await verifyBackupCode(session.user.id, code)
        : await verifyMFA(session.user.id, code)

      if (isValid) {
        // Set MFA verification cookie
        document.cookie = "mfa_verified=true; path=/"
        
        const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
        router.push(callbackUrl)
        
        toast({
          title: "Success",
          description: "MFA verification successful.",
        })
      } else {
        toast({
          title: "Error",
          description: "Invalid verification code.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify MFA code.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enter your verification code to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">
                {showBackupCode ? "Backup Code" : "Verification Code"}
              </Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
                required
              />
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowBackupCode(!showBackupCode)}
              >
                {showBackupCode
                  ? "Use Authenticator App"
                  : "Use Backup Code"}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>

          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Need help?</AlertTitle>
            <AlertDescription>
              If you're having trouble with your authenticator app, you can use a
              backup code. Contact your administrator if you need assistance.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
} 