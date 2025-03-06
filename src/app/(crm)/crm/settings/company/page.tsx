"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Mail, Phone, Globe, MapPin } from "lucide-react"

interface CompanyData {
  name: string
  description: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    city: string
    state: string
    country: string
    postalCode: string
  }
  logo: string | null
}

export default function CompanyProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [company, setCompany] = useState<CompanyData>({
    name: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    logo: null,
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to save company profile
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Profile saved",
        description: "Your company profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save company profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscard = () => {
    setCompany({
      name: "",
      description: "",
      email: "",
      phone: "",
      website: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
      logo: null,
    })
    toast({
      title: "Changes discarded",
      description: "Your company profile has been reset to default values.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Company Profile</h3>
        <p className="text-sm text-muted-foreground">
          Manage your company information and settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Update your company's basic information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              value={company.name}
              onChange={(e) =>
                setCompany({ ...company, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={company.description}
              onChange={(e) =>
                setCompany({ ...company, description: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Update your company's contact details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                className="pl-9"
                value={company.email}
                onChange={(e) =>
                  setCompany({ ...company, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                className="pl-9"
                value={company.phone}
                onChange={(e) =>
                  setCompany({ ...company, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="website"
                type="url"
                className="pl-9"
                value={company.website}
                onChange={(e) =>
                  setCompany({ ...company, website: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
          <CardDescription>
            Update your company's physical address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="street"
                className="pl-9"
                value={company.address.street}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    address: {
                      ...company.address,
                      street: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={company.address.city}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    address: {
                      ...company.address,
                      city: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={company.address.state}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    address: {
                      ...company.address,
                      state: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={company.address.country}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    address: {
                      ...company.address,
                      country: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={company.address.postalCode}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    address: {
                      ...company.address,
                      postalCode: e.target.value,
                    },
                  })
                }
              />
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
    </div>
  )
} 