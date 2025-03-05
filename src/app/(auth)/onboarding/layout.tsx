"use client";

import { OnboardingProvider } from "./OnboardingContext";
import { Progress } from "@/components/ui/progress";
import { useOnboarding } from "./OnboardingContext";

function ProgressIndicator() {
  const { currentStep, totalSteps } = useOnboarding();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full px-4 py-2">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}

function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto py-8">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-2">
              Welcome to AtellierCRM
            </h1>
            <p className="text-muted-foreground text-center mb-6">
              Let's set up your CRM to match your business needs
            </p>
            <ProgressIndicator />
          </div>
          <div className="p-6 pt-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingWithProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      <OnboardingLayout>{children}</OnboardingLayout>
    </OnboardingProvider>
  );
} 