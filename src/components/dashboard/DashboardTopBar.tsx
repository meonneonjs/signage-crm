'use client';

import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

type SearchResult = {
  contacts: Array<{
    id: string;
    name: string;
    email: string;
    company: string;
    type: string;
  }>;
  deals: Array<{
    id: string;
    name: string;
    amount: number;
    stage: string;
  }>;
  activities: Array<{
    id: string;
    title: string;
    type: string;
    dueDate: Date;
  }>;
};

export function DashboardTopBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery) {
        setResults(null);
        return;
      }

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleResultClick = (type: string, id: string) => {
    router.push(`/dashboard/${type}/${id}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="h-16 border-b bg-white px-4">
      <div className="flex h-full items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-full max-w-md" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              placeholder="Search across CRM..."
              className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {isOpen && results && (
              <div className="absolute left-0 right-0 top-full mt-1 max-h-96 overflow-y-auto rounded-md border bg-white shadow-lg">
                {results.contacts.length > 0 && (
                  <div className="p-2">
                    <h3 className="px-2 py-1 text-xs font-semibold text-gray-500">Contacts</h3>
                    {results.contacts.map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => handleResultClick("contacts", contact.id)}
                        className="w-full rounded px-2 py-1 text-left text-sm hover:bg-gray-100"
                      >
                        {contact.name} - {contact.company}
                      </button>
                    ))}
                  </div>
                )}
                {results.deals.length > 0 && (
                  <div className="p-2">
                    <h3 className="px-2 py-1 text-xs font-semibold text-gray-500">Deals</h3>
                    {results.deals.map((deal) => (
                      <button
                        key={deal.id}
                        onClick={() => handleResultClick("deals", deal.id)}
                        className="w-full rounded px-2 py-1 text-left text-sm hover:bg-gray-100"
                      >
                        {deal.name} - ${deal.amount}
                      </button>
                    ))}
                  </div>
                )}
                {results.activities.length > 0 && (
                  <div className="p-2">
                    <h3 className="px-2 py-1 text-xs font-semibold text-gray-500">Activities</h3>
                    {results.activities.map((activity) => (
                      <button
                        key={activity.id}
                        onClick={() => handleResultClick("activities", activity.id)}
                        className="w-full rounded px-2 py-1 text-left text-sm hover:bg-gray-100"
                      >
                        {activity.title} - {activity.type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/landing" />
        </div>
      </div>
    </div>
  );
} 