"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CreditCard, Receipt, Building2, CreditCardIcon, ReceiptIcon, Building2Icon, AlertCircle } from "lucide-react"

interface Plan {
  id: string
  name: string
  price: number
  interval: "month" | "year"
  features: string[]
  current: boolean
}

interface PaymentMethod {
  id: string
  type: "card" | "bank"
  last4: string
  expiry?: string
  brand?: string
  name: string
  default: boolean
}

interface Invoice {
  id: string
  date: string
  amount: number
  status: "paid" | "pending" | "failed"
  pdfUrl: string
}

export default function BillingPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [plans] = useState<Plan[]>([
    {
      id: "starter",
      name: "Starter",
      price: 29,
      interval: "month",
      features: [
        "Up to 5 team members",
        "Basic project management",
        "Email support",
        "1GB storage",
      ],
      current: false,
    },
    {
      id: "professional",
      name: "Professional",
      price: 99,
      interval: "month",
      features: [
        "Up to 20 team members",
        "Advanced project management",
        "Priority support",
        "10GB storage",
        "Custom branding",
      ],
      current: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 299,
      interval: "month",
      features: [
        "Unlimited team members",
        "Enterprise project management",
        "24/7 support",
        "Unlimited storage",
        "Custom branding",
        "API access",
        "Dedicated account manager",
      ],
      current: false,
    },
  ])

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card_1",
      type: "card",
      last4: "4242",
      expiry: "12/24",
      brand: "Visa",
      name: "Visa ending in 4242",
      default: true,
    },
    {
      id: "bank_1",
      type: "bank",
      last4: "9876",
      name: "Bank account ending in 9876",
      default: false,
    },
  ])

  const [invoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      date: "2024-03-01",
      amount: 99,
      status: "paid",
      pdfUrl: "#",
    },
    {
      id: "INV-002",
      date: "2024-02-01",
      amount: 99,
      status: "paid",
      pdfUrl: "#",
    },
  ])

  const handleUpgradePlan = async (planId: string) => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to upgrade plan
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Plan upgraded",
        description: "Your subscription has been upgraded successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upgrade plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPaymentMethod = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to add payment method
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Payment method added",
        description: "Your payment method has been added successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add payment method. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing & Plans</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Manage your subscription plan and billing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-lg border p-4 ${
                  plan.current ? "border-primary" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{plan.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${plan.price}/{plan.interval}
                    </p>
                  </div>
                  {plan.current && (
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      Current
                    </span>
                  )}
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {!plan.current && (
                  <Button
                    className="mt-4 w-full"
                    onClick={() => handleUpgradePlan(plan.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Upgrading..." : "Upgrade Plan"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage your payment methods and billing information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  {method.type === "card" ? (
                    <CreditCardIcon className="h-6 w-6" />
                  ) : (
                    <Building2Icon className="h-6 w-6" />
                  )}
                  <div>
                    <p className="font-medium">{method.name}</p>
                    {method.type === "card" && (
                      <p className="text-sm text-muted-foreground">
                        Expires {method.expiry}
                      </p>
                    )}
                  </div>
                </div>
                {method.default && (
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Default
                  </span>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleAddPaymentMethod}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Payment Method"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View and download your past invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  <ReceiptIcon className="h-6 w-6" />
                  <div>
                    <p className="font-medium">Invoice {invoice.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(invoice.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-medium">${invoice.amount}</p>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      invoice.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Need help?</AlertTitle>
        <AlertDescription>
          If you have any questions about your billing or subscription, please
          contact our support team.
        </AlertDescription>
      </Alert>
    </div>
  )
} 