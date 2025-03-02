"use client";

import { useState, useCallback } from 'react';
import { Button, TextInput, Text } from '@tremor/react';
import { useDropzone } from 'react-dropzone';

interface DesignUploaderProps {
  projectId: string;
  nextVersionNumber: number;
}

export function DesignUploader({ projectId, nextVersionNumber }: DesignUploaderProps) {
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
      'application/postscript': ['.ai'],
      'image/vnd.adobe.photoshop': ['.psd'],
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', projectId);
      formData.append('versionNumber', nextVersionNumber.toString());
      formData.append('description', description);

      // Upload to your API endpoint
      const response = await fetch('/api/projects/design/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      // Clear form
      setFile(null);
      setDescription('');

      // Optionally refresh the page or update the UI
      window.location.reload();
    } catch (error) {
      console.error('Upload error:', error);
      // Handle error (show message to user)
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          {file ? (
            <>
              <Text>Selected file: {file.name}</Text>
              <Text className="text-sm text-gray-500">
                Click or drag a new file to replace
              </Text>
            </>
          ) : (
            <>
              <Text>
                {isDragActive
                  ? 'Drop the file here'
                  : 'Drag and drop a design file, or click to select'}
              </Text>
              <Text className="text-sm text-gray-500">
                Supports PNG, JPG, PDF, AI, and PSD files
              </Text>
            </>
          )}
        </div>
      </div>

      <TextInput
        placeholder="Add a description for this version (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex justify-end">
        <Button
          loading={uploading}
          disabled={!file || uploading}
          onClick={handleUpload}
        >
          Upload Version {nextVersionNumber}
        </Button>
      </div>
    </div>
  );
} 