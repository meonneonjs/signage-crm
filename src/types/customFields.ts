export type CustomFieldType = 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'checkbox' | 'url';

export interface CustomFieldOption {
  id: string;
  label: string;
  value: string;
}

export interface CustomField {
  id: string;
  name: string;
  type: CustomFieldType;
  required: boolean;
  description?: string;
  placeholder?: string;
  options?: CustomFieldOption[]; // For select and multiselect fields
  moduleId?: string; // If this field belongs to a specific module
  entityType: 'client' | 'project' | 'task'; // What type of entity this field is for
}

export interface CustomFieldValue {
  fieldId: string;
  value: string | string[] | number | boolean | Date | null;
}

export interface Module {
  id: string;
  name: string;
  description?: string;
  entityType: 'client' | 'project' | 'task';
  fields: CustomField[];
  active: boolean;
}

// Helper type for entities with custom fields
export interface WithCustomFields {
  customFields: Record<string, CustomFieldValue>;
} 