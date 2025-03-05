'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertCircle,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function BusinessRulesPage() {
  const [activeTab, setActiveTab] = useState('lead-scoring');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Business Rules</h2>
        <p className="text-sm text-gray-500">
          Configure automated rules and scoring systems for your business processes
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="lead-scoring">Lead Scoring</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
          <TabsTrigger value="approval">Approval Workflows</TabsTrigger>
          <TabsTrigger value="notifications">Notification Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="lead-scoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Scoring Rules</CardTitle>
              <CardDescription>
                Define criteria that automatically score leads based on their characteristics and behaviors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Scoring Criteria</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Criterion
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Example Scoring Rule */}
                  <Card className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="grid grid-cols-4 gap-4">
                          <Select defaultValue="website_visits">
                            <SelectTrigger>
                              <SelectValue placeholder="Select criterion" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="website_visits">Website Visits</SelectItem>
                              <SelectItem value="email_opens">Email Opens</SelectItem>
                              <SelectItem value="form_submissions">Form Submissions</SelectItem>
                              <SelectItem value="company_size">Company Size</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select defaultValue="greater_than">
                            <SelectTrigger>
                              <SelectValue placeholder="Select operator" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="greater_than">Greater than</SelectItem>
                              <SelectItem value="less_than">Less than</SelectItem>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="contains">Contains</SelectItem>
                            </SelectContent>
                          </Select>

                          <Input type="number" placeholder="Value" defaultValue="5" />

                          <Input type="number" placeholder="Points" defaultValue="10" />
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Active</Badge>
                          <span className="text-sm text-gray-500">
                            Last modified: 2 days ago
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-4">Scoring Thresholds</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Cold Lead (0-30)</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input type="number" placeholder="Min" defaultValue="0" />
                        <Input type="number" placeholder="Max" defaultValue="30" />
                      </div>
                    </div>
                    <div>
                      <Label>Warm Lead (31-70)</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input type="number" placeholder="Min" defaultValue="31" />
                        <Input type="number" placeholder="Max" defaultValue="70" />
                      </div>
                    </div>
                    <div>
                      <Label>Hot Lead (71-100)</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input type="number" placeholder="Min" defaultValue="71" />
                        <Input type="number" placeholder="Max" defaultValue="100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure additional scoring parameters and behaviors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Score Decay</Label>
                    <p className="text-sm text-gray-500">
                      Automatically reduce scores over time for inactive leads
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Negative Scoring</Label>
                    <p className="text-sm text-gray-500">
                      Allow negative points for undesirable behaviors
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Score History</Label>
                    <p className="text-sm text-gray-500">
                      Keep a detailed history of score changes
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>
                Create rules that automatically trigger actions based on specific conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Automation rules content */}
              <div className="text-sm text-gray-500">
                Configure automation rules here...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approval" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approval Workflows</CardTitle>
              <CardDescription>
                Set up approval chains for important business processes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Approval workflows content */}
              <div className="text-sm text-gray-500">
                Configure approval workflows here...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Rules</CardTitle>
              <CardDescription>
                Define when and how to notify team members about important events
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Notification rules content */}
              <div className="text-sm text-gray-500">
                Configure notification rules here...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between pt-6 border-t">
        <Button variant="outline">Cancel Changes</Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Publish Changes</Button>
        </div>
      </div>
    </div>
  );
} 