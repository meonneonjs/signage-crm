"use client";

import { useState } from 'react';
import { Card, Text, Button } from '@tremor/react';

interface ChecklistItem {
  id: keyof typeof checklistLabels;
  checked: boolean;
}

interface QualityChecklistProps {
  checklist: {
    brandingChecked: boolean;
    dimensionsChecked: boolean;
    colorsChecked: boolean;
    typosChecked: boolean;
    layoutChecked: boolean;
    materialsChecked: boolean;
    notesChecked: boolean;
  } | null;
  versionId: string;
}

const checklistLabels = {
  brandingChecked: 'Brand Guidelines Compliance',
  dimensionsChecked: 'Dimensions and Scale',
  colorsChecked: 'Color Accuracy',
  typosChecked: 'Typography and Text',
  layoutChecked: 'Layout and Composition',
  materialsChecked: 'Material Specifications',
  notesChecked: 'Production Notes',
} as const;

export function QualityChecklist({ checklist, versionId }: QualityChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>(
    Object.entries(checklistLabels).map(([id]) => ({
      id: id as keyof typeof checklistLabels,
      checked: checklist ? checklist[id as keyof typeof checklistLabels] : false,
    }))
  );
  const [saving, setSaving] = useState(false);

  const handleToggle = (id: ChecklistItem['id']) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/projects/design/${versionId}/checklist`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          Object.fromEntries(
            items.map(item => [item.id, item.checked])
          )
        ),
      });

      if (!response.ok) {
        throw new Error('Failed to save checklist');
      }

      // Optionally refresh the page or update UI
      window.location.reload();
    } catch (error) {
      console.error('Error saving checklist:', error);
      // Handle error (show message to user)
    } finally {
      setSaving(false);
    }
  };

  const progress = Math.round((items.filter(item => item.checked).length / items.length) * 100);

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <Text className="text-sm font-medium">{progress}% Complete</Text>
      </div>

      {/* Checklist Items */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleToggle(item.id)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Text>{checklistLabels[item.id]}</Text>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          loading={saving}
          disabled={saving}
          onClick={handleSave}
        >
          Save Checklist
        </Button>
      </div>
    </div>
  );
} 