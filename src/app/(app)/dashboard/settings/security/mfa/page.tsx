"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { enableMFA, verifyMFA, generateNewBackupCodes } from "@/lib/mfa"
import { AlertCircle, QrCode, Key } from "lucide-react"
import QRCode from "qrcode"

export default function MFASettingsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [qrCode, setQrCode] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [showBackupCodes, setShowBackupCodes] = useState(false)

  const handleEnableMFA = async () => {
    if (!session?.user?.id) return

    setIsLoading(true)
    try {
      const { secret, backupCodes } = await enableMFA(session.user.id)
      
      // Generate QR code
      const otpauth = `otpauth://totp/SignageCRM:${session.user.email}?secret=${secret}&issuer=SignageCRM`
      const qrCodeDataUrl = await QRCode.toDataURL(otpauth)
      setQrCode(qrCodeDataUrl)
      setBackupCodes(backupCodes)
      setShowBackupCodes(true)

      toast({
        title: "MFA Enabled",
        description: "Please scan the QR code with your authenticator app.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enable MFA.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyAndEnable = async () => {
    if (!session?.user?.id) return

    setIsLoading(true)
    try {
      const isValid = await verifyMFA(session.user.id, verificationCode)
      if (isValid) {
        toast({
          title: "Success",
          description: "MFA has been enabled successfully.",
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

  const handleGenerateNewBackupCodes = async () => {
    if (!session?.user?.id) return

    setIsLoading(true)
    try {
      const newCodes = await generateNewBackupCodes(session.user.id)
      setBackupCodes(newCodes)
      toast({
        title: "Success",
        description: "New backup codes generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate new backup codes.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground">
          Add an extra layer of security to your account.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enable Two-Factor Authentication</CardTitle>
          <CardDescription>
            Protect your account with an authenticator app.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!qrCode ? (
            <Button onClick={handleEnableMFA} disabled={isLoading}>
              {isLoading ? "Enabling..." : "Enable 2FA"}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img src={qrCode} alt="QR Code" className="h-32 w-32" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Scan this QR code with your authenticator app (like Google
                    Authenticator or Authy) to enable two-factor authentication.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="verificationCode">
                  Verification Code
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter code from your app"
                  />
                  <Button
                    onClick={handleVerifyAndEnable}
                    disabled={isLoading}
                  >
                    Verify
                  </Button>
                </div>
              </div>

              {showBackupCodes && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Backup Codes</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateNewBackupCodes}
                      disabled={isLoading}
                    >
                      Generate New Codes
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {backupCodes.map((code, index) => (
                      <div
                        key={index}
                        className="rounded-md bg-muted p-2 font-mono text-sm"
                      >
                        {code}
                      </div>
                    ))}
                  </div>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Save these backup codes</AlertTitle>
                    <AlertDescription>
                      Store these backup codes in a safe place. You can use them
                      to access your account if you lose your authenticator app.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 