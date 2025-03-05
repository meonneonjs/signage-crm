"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Image, Palette, Type, Upload, AlertCircle } from "lucide-react"

interface BrandingData {
  logo: string | null
  favicon: string | null
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  fontSizes: {
    base: string
    heading: string
  }
}

export default function BrandingPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [branding, setBranding] = useState<BrandingData>({
    logo: null,
    favicon: null,
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    fontFamily: "Inter",
    fontSizes: {
      base: "16px",
      heading: "24px",
    },
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to save branding settings
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Branding saved",
        description: "Your branding settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save branding settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscard = () => {
    setBranding({
      logo: null,
      favicon: null,
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      fontFamily: "Inter",
      fontSizes: {
        base: "16px",
        heading: "24px",
      },
    })
    toast({
      title: "Changes discarded",
      description: "Your branding settings have been reset to default values.",
    })
  }

  const handleImageUpload = (type: "logo" | "favicon", file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setBranding({
        ...branding,
        [type]: reader.result as string,
      })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Branding</h3>
        <p className="text-sm text-muted-foreground">
          Customize your company's visual identity.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Logo & Favicon</CardTitle>
          <CardDescription>
            Upload your company logo and favicon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Company Logo</Label>
            <div className="flex items-center space-x-4">
              {branding.logo ? (
                <div className="relative h-20 w-20">
                  <img
                    src={branding.logo}
                    alt="Company logo"
                    className="h-full w-full object-contain"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                    onClick={() =>
                      setBranding({ ...branding, logo: null })
                    }
                  >
                    ×
                  </Button>
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-dashed">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload("logo", file)
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Favicon</Label>
            <div className="flex items-center space-x-4">
              {branding.favicon ? (
                <div className="relative h-10 w-10">
                  <img
                    src={branding.favicon}
                    alt="Favicon"
                    className="h-full w-full object-contain"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                    onClick={() =>
                      setBranding({ ...branding, favicon: null })
                    }
                  >
                    ×
                  </Button>
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed">
                  <Image className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload("favicon", file)
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
          <CardDescription>
            Set your brand colors.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="primaryColor"
                type="color"
                value={branding.primaryColor}
                onChange={(e) =>
                  setBranding({ ...branding, primaryColor: e.target.value })
                }
                className="h-10 w-20 p-1"
              />
              <Input
                type="text"
                value={branding.primaryColor}
                onChange={(e) =>
                  setBranding({ ...branding, primaryColor: e.target.value })
                }
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="secondaryColor"
                type="color"
                value={branding.secondaryColor}
                onChange={(e) =>
                  setBranding({ ...branding, secondaryColor: e.target.value })
                }
                className="h-10 w-20 p-1"
              />
              <Input
                type="text"
                value={branding.secondaryColor}
                onChange={(e) =>
                  setBranding({ ...branding, secondaryColor: e.target.value })
                }
                className="flex-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>
            Customize your font settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Font Family</Label>
            <Input
              id="fontFamily"
              value={branding.fontFamily}
              onChange={(e) =>
                setBranding({ ...branding, fontFamily: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Font Sizes</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="baseFontSize">Base Font Size</Label>
                <Input
                  id="baseFontSize"
                  value={branding.fontSizes.base}
                  onChange={(e) =>
                    setBranding({
                      ...branding,
                      fontSizes: {
                        ...branding.fontSizes,
                        base: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="headingFontSize">Heading Font Size</Label>
                <Input
                  id="headingFontSize"
                  value={branding.fontSizes.heading}
                  onChange={(e) =>
                    setBranding({
                      ...branding,
                      fontSizes: {
                        ...branding.fontSizes,
                        heading: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
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
        <AlertTitle>Preview</AlertTitle>
        <AlertDescription>
          Your branding changes will be reflected across the application. Make sure
          to test the changes in different contexts to ensure consistency.
        </AlertDescription>
      </Alert>
    </div>
  )
} 