"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define the types for our onboarding data
export interface OnboardingData {
  // Account Setup
  accountSetup: {
    name: string;
    email: string;
    password: string;
    use2FA: boolean;
    acceptedTerms: boolean;
  };
  // Business Profile
  businessProfile: {
    businessName: string;
    industry: string;
    customIndustry?: string;
    businessSize: "solo" | "small" | "medium" | "enterprise";
    locations: Array<{
      address: string;
      isPrimary: boolean;
    }>;
    logo?: string;
    brandColors: {
      primary: string;
      secondary: string;
    };
  };
  // Team Structure
  teamStructure: {
    departments: Array<{
      name: string;
      headCount: number;
    }>;
    commissionStructure: {
      type: "flat" | "percentage" | "tiered" | "none";
      details: any;
    };
  };
  // Client & Project Types
  clientTypes: {
    primaryCategories: ("B2B" | "B2C" | "government")[];
    projectSizes: ("small" | "medium" | "large")[];
    averageTimeline: number;
    recurringClientPercentage: number;
    complexityLevel: number;
  };
  // Sales Process
  salesProcess: {
    leadSources: string[];
    pipelineStages: Array<{
      name: string;
      order: number;
    }>;
    salesCycleLength: number;
    qualificationCriteria: string[];
  };
  // Production Workflow
  productionWorkflow: {
    designSteps: string[];
    approvalSteps: string[];
    productionStages: string[];
    qcCheckpoints: string[];
    installationProcess: string[];
  };
  // Financial Setup
  financialSetup: {
    pricingStructure: string;
    paymentTerms: string[];
    paymentMethods: string[];
    invoicePreferences: any;
  };
  // Integrations
  integrations: {
    currentTools: string[];
    priorities: string[];
  };
  // Dashboard Preferences
  dashboardPreferences: {
    keyMetrics: string[];
    reportingFrequency: string;
    visualPreference: string;
    notifications: any;
  };
  // Feature Priorities
  featurePriorities: Record<string, number>;
}

// Define the initial state
const initialState: OnboardingData = {
  accountSetup: {
    name: "",
    email: "",
    password: "",
    use2FA: false,
    acceptedTerms: false,
  },
  businessProfile: {
    businessName: "",
    industry: "",
    businessSize: "small",
    locations: [],
    brandColors: {
      primary: "#000000",
      secondary: "#ffffff",
    },
  },
  teamStructure: {
    departments: [],
    commissionStructure: {
      type: "none",
      details: {},
    },
  },
  clientTypes: {
    primaryCategories: [],
    projectSizes: [],
    averageTimeline: 0,
    recurringClientPercentage: 0,
    complexityLevel: 1,
  },
  salesProcess: {
    leadSources: [],
    pipelineStages: [],
    salesCycleLength: 0,
    qualificationCriteria: [],
  },
  productionWorkflow: {
    designSteps: [],
    approvalSteps: [],
    productionStages: [],
    qcCheckpoints: [],
    installationProcess: [],
  },
  financialSetup: {
    pricingStructure: "",
    paymentTerms: [],
    paymentMethods: [],
    invoicePreferences: {},
  },
  integrations: {
    currentTools: [],
    priorities: [],
  },
  dashboardPreferences: {
    keyMetrics: [],
    reportingFrequency: "weekly",
    visualPreference: "graphs",
    notifications: {},
  },
  featurePriorities: {},
};

// Define action types
type OnboardingAction = {
  type: string;
  payload: any;
};

// Create the context
type OnboardingContextType = {
  state: OnboardingData;
  dispatch: React.Dispatch<OnboardingAction>;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  saveProgress: () => void;
  loadProgress: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Reducer function
function onboardingReducer(state: OnboardingData, action: OnboardingAction): OnboardingData {
  switch (action.type) {
    case "UPDATE_ACCOUNT_SETUP":
      return {
        ...state,
        accountSetup: { ...state.accountSetup, ...action.payload },
      };
    case "UPDATE_BUSINESS_PROFILE":
      return {
        ...state,
        businessProfile: { ...state.businessProfile, ...action.payload },
      };
    case "UPDATE_TEAM_STRUCTURE":
      return {
        ...state,
        teamStructure: { ...state.teamStructure, ...action.payload },
      };
    case "UPDATE_CLIENT_TYPES":
      return {
        ...state,
        clientTypes: { ...state.clientTypes, ...action.payload },
      };
    case "UPDATE_SALES_PROCESS":
      return {
        ...state,
        salesProcess: { ...state.salesProcess, ...action.payload },
      };
    case "UPDATE_PRODUCTION_WORKFLOW":
      return {
        ...state,
        productionWorkflow: { ...state.productionWorkflow, ...action.payload },
      };
    case "UPDATE_FINANCIAL_SETUP":
      return {
        ...state,
        financialSetup: { ...state.financialSetup, ...action.payload },
      };
    case "UPDATE_INTEGRATIONS":
      return {
        ...state,
        integrations: { ...state.integrations, ...action.payload },
      };
    case "UPDATE_DASHBOARD_PREFERENCES":
      return {
        ...state,
        dashboardPreferences: { ...state.dashboardPreferences, ...action.payload },
      };
    case "UPDATE_FEATURE_PRIORITIES":
      return {
        ...state,
        featurePriorities: { ...state.featurePriorities, ...action.payload },
      };
    case "LOAD_SAVED_STATE":
      return action.payload;
    default:
      return state;
  }
}

// Provider component
export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 11; // Total number of steps in the wizard

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      saveProgress();
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const saveProgress = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("onboardingState", JSON.stringify(state));
      localStorage.setItem("onboardingStep", currentStep.toString());
    }
  };

  const loadProgress = () => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("onboardingState");
      const savedStep = localStorage.getItem("onboardingStep");

      if (savedState) {
        dispatch({ type: "LOAD_SAVED_STATE", payload: JSON.parse(savedState) });
      }
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const value = {
    state,
    dispatch,
    currentStep,
    totalSteps,
    nextStep,
    previousStep,
    goToStep,
    saveProgress,
    loadProgress,
  };

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

// Custom hook for using the onboarding context
export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
} 