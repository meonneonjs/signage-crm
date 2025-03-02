import { useState } from 'react';
import { Card, Title, Text, Button, Badge } from '@tremor/react';
import { InstallationSchedule, Project, SignageSpecification, Client } from '@prisma/client';
import { CameraIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

type ExtendedInstallationSchedule = InstallationSchedule & {
  project: Project & {
    specifications: SignageSpecification[];
    client: Client;
  };
};

interface InstallationVerificationProps {
  schedule: ExtendedInstallationSchedule;
}

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

const defaultChecklist: ChecklistItem[] = [
  { id: 'site_prep', label: 'Site Preparation Complete', checked: false },
  { id: 'mounting', label: 'Mounting Hardware Secure', checked: false },
  { id: 'alignment', label: 'Sign Level and Aligned', checked: false },
  { id: 'electrical', label: 'Electrical Connections (if applicable)', checked: false },
  { id: 'cleanup', label: 'Site Cleanup Complete', checked: false },
  { id: 'testing', label: 'Functionality Testing Complete', checked: false },
  { id: 'photos', label: 'Documentation Photos Taken', checked: false },
  { id: 'client_approval', label: 'Client Approval Obtained', checked: false },
];

export function InstallationVerification({ schedule }: InstallationVerificationProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(defaultChecklist);
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleCheckItem = (itemId: string) => {
    setChecklist(checklist.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    ));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhotos([...photos, ...Array.from(event.target.files)]);
    }
  };

  const handleSubmit = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('scheduleId', schedule.id);
      formData.append('checklist', JSON.stringify(checklist));
      photos.forEach(photo => formData.append('photos', photo));

      const response = await fetch('/api/installation/verify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit verification');
      }

      // Optionally refresh the page or update UI
      window.location.reload();
    } catch (error) {
      console.error('Error submitting verification:', error);
      // Handle error (show message to user)
    } finally {
      setUploading(false);
    }
  };

  const progress = Math.round((checklist.filter(item => item.checked).length / checklist.length) * 100);

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <Title>Installation Verification</Title>
          <Text>Complete the checklist and upload documentation photos</Text>
        </div>

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

        {/* Checklist */}
        <div className="space-y-2">
          {checklist.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckItem(item.id)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Text>{item.label}</Text>
            </div>
          ))}
        </div>

        {/* Photo Upload */}
        <div>
          <Title className="text-sm">Documentation Photos</Title>
          <div className="mt-2 space-y-4">
            <div className="flex flex-wrap gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Installation photo ${index + 1}`}
                    className="h-24 w-24 object-cover rounded-lg"
                  />
                  <Button
                    size="xs"
                    color="red"
                    variant="secondary"
                    className="absolute -top-2 -right-2"
                    onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <label className="h-24 w-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                <div className="text-center">
                  <CameraIcon className="mx-auto h-8 w-8 text-gray-400" />
                  <Text className="text-sm text-gray-500">Add Photo</Text>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>
            <Text className="text-sm text-gray-500">
              Upload before and after photos of the installation
            </Text>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            loading={uploading}
            disabled={progress < 100 || photos.length === 0 || uploading}
            onClick={handleSubmit}
          >
            Submit Verification
          </Button>
        </div>
      </div>
    </Card>
  );
} 