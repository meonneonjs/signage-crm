"use client";

import { useOnboarding } from "../OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Trash2 } from "lucide-react";

const teamStructureSchema = z.object({
  departments: z.array(
    z.object({
      name: z.string().min(1, "Department name is required"),
      headCount: z.number().min(1, "Head count must be at least 1"),
    })
  ).min(1, "At least one department is required"),
  commissionStructure: z.object({
    type: z.enum(["flat", "percentage", "tiered", "none"]),
    details: z.object({
      flatRate: z.number().optional(),
      percentage: z.number().optional(),
      tiers: z
        .array(
          z.object({
            threshold: z.number(),
            rate: z.number(),
          })
        )
        .optional(),
    }),
  }),
});

type TeamStructureForm = z.infer<typeof teamStructureSchema>;

const defaultDepartments = [
  "Sales",
  "Design",
  "Production",
  "Installation",
  "Administration",
];

const commissionTypes = [
  { value: "none", label: "No Commission" },
  { value: "flat", label: "Flat Rate" },
  { value: "percentage", label: "Percentage Based" },
  { value: "tiered", label: "Tiered Structure" },
];

export default function TeamStructurePage() {
  const { dispatch, nextStep, previousStep, state } = useOnboarding();
  const router = useRouter();

  const form = useForm<TeamStructureForm>({
    resolver: zodResolver(teamStructureSchema),
    defaultValues: {
      departments: state.teamStructure.departments.length
        ? state.teamStructure.departments
        : defaultDepartments.map((name) => ({ name, headCount: 1 })),
      commissionStructure: state.teamStructure.commissionStructure || {
        type: "none",
        details: {},
      },
    },
  });

  const onSubmit = (data: TeamStructureForm) => {
    dispatch({
      type: "UPDATE_TEAM_STRUCTURE",
      payload: data,
    });
    nextStep();
    router.push("/onboarding/client-types");
  };

  const watchCommissionType = form.watch("commissionStructure.type");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Team Structure</h2>
        <p className="text-muted-foreground">
          Set up your team departments and commission structure
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Departments</h3>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const currentDepartments = form.getValues("departments");
                  form.setValue("departments", [
                    ...currentDepartments,
                    { name: "", headCount: 1 },
                  ]);
                }}
              >
                Add Department
              </Button>
            </div>

            {form.getValues("departments").map((_, index) => (
              <div key={index} className="flex gap-4 items-start">
                <FormField
                  control={form.control}
                  name={`departments.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Department Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Sales" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`departments.${index}.headCount`}
                  render={({ field }) => (
                    <FormItem className="w-32">
                      <FormLabel>Head Count</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-8"
                    onClick={() => {
                      const departments = form.getValues("departments");
                      form.setValue(
                        "departments",
                        departments.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Commission Structure</h3>

            <FormField
              control={form.control}
              name="commissionStructure.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select commission type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {commissionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchCommissionType === "flat" && (
              <FormField
                control={form.control}
                name="commissionStructure.details.flatRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flat Rate Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        placeholder="e.g., 100"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Fixed amount per successful sale
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watchCommissionType === "percentage" && (
              <FormField
                control={form.control}
                name="commissionStructure.details.percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission Percentage (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        step={0.1}
                        placeholder="e.g., 5"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Percentage of the sale value
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watchCommissionType === "tiered" && (
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const currentTiers =
                      form.getValues("commissionStructure.details.tiers") || [];
                    form.setValue("commissionStructure.details.tiers", [
                      ...currentTiers,
                      { threshold: 0, rate: 0 },
                    ]);
                  }}
                >
                  Add Tier
                </Button>

                {(form.getValues("commissionStructure.details.tiers") || []).map(
                  (_, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <FormField
                        control={form.control}
                        name={`commissionStructure.details.tiers.${index}.threshold`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Sales Threshold ($)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={0}
                                step={100}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`commissionStructure.details.tiers.${index}.rate`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Commission Rate (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={0}
                                max={100}
                                step={0.1}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mt-8"
                        onClick={() => {
                          const tiers = form.getValues(
                            "commissionStructure.details.tiers"
                          ) || [];
                          form.setValue(
                            "commissionStructure.details.tiers",
                            tiers.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                previousStep();
                router.push("/onboarding/business-profile");
              }}
            >
              Previous
            </Button>
            <Button type="submit">Continue to Client Types</Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 