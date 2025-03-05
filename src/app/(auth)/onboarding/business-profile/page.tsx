"use client";

import { useOnboarding } from "../OnboardingContext";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const businessProfileSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  industry: z.string().min(1, "Please select an industry"),
  customIndustry: z.string().optional(),
  businessSize: z.enum(["solo", "small", "medium", "enterprise"]),
  locations: z.array(
    z.object({
      address: z.string().min(1, "Address is required"),
      isPrimary: z.boolean(),
    })
  ).min(1, "At least one location is required"),
  brandColors: z.object({
    primary: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
    secondary: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
  }),
});

type BusinessProfileForm = z.infer<typeof businessProfileSchema>;

const industries = [
  { value: "signage", label: "Signage Company" },
  { value: "print", label: "Print Shop" },
  { value: "fabrication", label: "Custom Fabrication" },
  { value: "creative", label: "Creative Studio" },
  { value: "other", label: "Other" },
];

const businessSizes = [
  { value: "solo", label: "Solo Practitioner" },
  { value: "small", label: "Small Team (2-10)" },
  { value: "medium", label: "Medium Business (11-50)" },
  { value: "enterprise", label: "Enterprise (50+)" },
];

export default function BusinessProfilePage() {
  const { dispatch, nextStep, previousStep, state } = useOnboarding();
  const router = useRouter();

  const form = useForm<BusinessProfileForm>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      businessName: state.businessProfile.businessName || "",
      industry: state.businessProfile.industry || "",
      customIndustry: state.businessProfile.customIndustry || "",
      businessSize: state.businessProfile.businessSize || "small",
      locations: state.businessProfile.locations.length
        ? state.businessProfile.locations
        : [{ address: "", isPrimary: true }],
      brandColors: {
        primary: state.businessProfile.brandColors.primary || "#000000",
        secondary: state.businessProfile.brandColors.secondary || "#ffffff",
      },
    },
  });

  const onSubmit = (data: BusinessProfileForm) => {
    dispatch({
      type: "UPDATE_BUSINESS_PROFILE",
      payload: data,
    });
    nextStep();
    router.push("/onboarding/team-structure");
  };

  const watchIndustry = form.watch("industry");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Business Profile</h2>
        <p className="text-muted-foreground">
          Tell us about your business so we can customize your experience
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Signs & Graphics" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchIndustry === "other" && (
            <FormField
              control={form.control}
              name="customIndustry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specify Industry</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please specify your industry"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="businessSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Size</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your business size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {businessSizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.getValues("locations").map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`locations.${index}.address`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {index === 0 ? "Primary Location" : `Location ${index + 1}`}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Business St, City, State, ZIP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              form.setValue("locations", [
                ...form.getValues("locations"),
                { address: "", isPrimary: false },
              ])
            }
          >
            Add Another Location
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="brandColors.primary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Brand Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input type="color" {...field} className="w-12 p-1" />
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brandColors.secondary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Brand Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input type="color" {...field} className="w-12 p-1" />
                      <Input
                        type="text"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                previousStep();
                router.push("/onboarding");
              }}
            >
              Previous
            </Button>
            <Button type="submit">Continue to Team Structure</Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 