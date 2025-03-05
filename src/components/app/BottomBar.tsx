'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Calculator,
  Calendar,
  Clock,
  MessagesSquare,
  PenTool,
  Timer,
  Users,
  Bell,
  X,
  Pencil,
  MessageSquare,
  CalendarDays,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PriceCalculator } from "@/components/utilities/PriceCalculator";
import { JobTimer } from "@/components/utilities/JobTimer";
import { QuickNotes } from "@/components/utilities/QuickNotes";
import { QuickChat } from "@/components/utilities/QuickChat";
import { QuickSchedule } from "@/components/utilities/QuickSchedule";
import { TimeTracker } from "@/components/utilities/TimeTracker";
import { TeamStatus } from "@/components/utilities/TeamStatus";
import { Notifications } from "@/components/utilities/Notifications";

interface QuickAction {
  id: string;
  icon: React.ElementType;
  label: string;
  color?: string;
  panel: React.ReactNode;
}

export function BottomBar() {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const quickActions: QuickAction[] = [
    {
      id: 'calculator',
      icon: Calculator,
      label: 'Price Calculator',
      color: 'text-blue-500',
      panel: <PriceCalculator />,
    },
    {
      id: 'timer',
      icon: Timer,
      label: 'Job Timer',
      color: 'text-green-500',
      panel: <JobTimer />,
    },
    {
      id: 'quick-notes',
      icon: Pencil,
      label: 'Quick Notes',
      color: 'text-yellow-500',
      panel: <QuickNotes />
    },
    {
      id: 'quick-chat',
      icon: MessageSquare,
      label: 'Quick Chat',
      color: 'text-green-500',
      panel: <QuickChat />
    },
    {
      id: 'quick-schedule',
      icon: CalendarDays,
      label: 'Quick Schedule',
      color: 'text-orange-500',
      panel: <QuickSchedule />
    },
    {
      id: 'time-tracker',
      icon: Timer,
      label: 'Time Tracker',
      color: 'text-blue-500',
      panel: <TimeTracker />
    },
    {
      id: 'team-status',
      icon: Users,
      label: 'Team Status',
      color: 'text-indigo-500',
      panel: <TeamStatus />
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Notifications',
      color: 'text-red-500',
      panel: <Notifications />
    },
    {
      id: 'support',
      icon: HelpCircle,
      label: 'Get Support',
      color: 'text-purple-500',
      panel: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Need Help?</h3>
            <p className="text-gray-600">Our support team is here to help you with any technical difficulties or feature requests.</p>
            
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat with Support
              </Button>
              
              <Button className="w-full" variant="outline">
                <PenTool className="w-4 h-4 mr-2" />
                Submit Feature Request
              </Button>
              
              <Button className="w-full" variant="outline">
                <HelpCircle className="w-4 h-4 mr-2" />
                View Documentation
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Support Hours</h4>
              <p className="text-sm text-blue-700 mt-1">
                Monday - Friday: 9:00 AM - 6:00 PM EST
              </p>
              <p className="text-sm text-blue-700">
                Emergency Support Available 24/7
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-white border-t flex items-center px-2 z-50">
      <div className="flex items-center gap-1 w-full">
        <div className="flex-1 flex items-center gap-1">
          {quickActions.slice(0, -1).map((action) => (
            <Sheet key={action.id}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-6 px-2 text-xs gap-1 hover:bg-gray-100",
                    action.color
                  )}
                  onClick={() => setActivePanel(action.id)}
                >
                  <action.icon className="h-3 w-3" />
                  {action.label}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
                <SheetHeader>
                  <div className="flex items-center justify-between">
                    <SheetTitle className="flex items-center gap-2">
                      <action.icon className={cn("h-5 w-5", action.color)} />
                      {action.label}
                    </SheetTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActivePanel(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </SheetHeader>
                <div className="p-4 overflow-y-auto">
                  {action.panel}
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
        <div className="flex-shrink-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-6 px-2 text-xs gap-1 hover:bg-gray-100",
                  quickActions[quickActions.length - 1].color
                )}
              >
                <HelpCircle className="h-3 w-3" />
                Get Support
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <SheetTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-purple-500" />
                    Get Support
                  </SheetTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActivePanel(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </SheetHeader>
              <div className="p-4 overflow-y-auto">
                {quickActions[quickActions.length - 1].panel}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
} 