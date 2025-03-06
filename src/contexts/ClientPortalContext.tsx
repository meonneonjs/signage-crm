'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface BrandingConfig {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  companyName: string;
}

interface ClientPortalContextType {
  branding: BrandingConfig;
  updateBranding: (config: Partial<BrandingConfig>) => void;
  isLoading: boolean;
}

const defaultBranding: BrandingConfig = {
  logo: '/brand/default-logo.png',
  primaryColor: '#000000',
  secondaryColor: '#ffffff',
  companyName: 'Client Portal'
};

const ClientPortalContext = createContext<ClientPortalContextType | undefined>(undefined);

export function ClientPortalProvider({ children }: { children: ReactNode }) {
  const [branding, setBranding] = useState<BrandingConfig>(defaultBranding);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load branding configuration from API or local storage
    const loadBranding = async () => {
      try {
        // TODO: Replace with actual API call
        const storedBranding = localStorage.getItem('clientPortalBranding');
        if (storedBranding) {
          setBranding(JSON.parse(storedBranding));
        }
      } catch (error) {
        console.error('Error loading branding:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBranding();
  }, []);

  const updateBranding = (config: Partial<BrandingConfig>) => {
    setBranding(prev => {
      const newBranding = { ...prev, ...config };
      localStorage.setItem('clientPortalBranding', JSON.stringify(newBranding));
      return newBranding;
    });
  };

  return (
    <ClientPortalContext.Provider value={{ branding, updateBranding, isLoading }}>
      {children}
    </ClientPortalContext.Provider>
  );
}

export function useClientPortal() {
  const context = useContext(ClientPortalContext);
  if (context === undefined) {
    throw new Error('useClientPortal must be used within a ClientPortalProvider');
  }
  return context;
} 