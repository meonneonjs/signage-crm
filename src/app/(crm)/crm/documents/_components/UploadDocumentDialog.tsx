'use client';

import { useState } from 'react';
import { Upload, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const documentTypes = ['Contract', 'Proposal', 'Specification', 'Invoice', 'Report'];

interface UploadFormData {
  title: string;
  type: string;
  description: string;
  signers: string[];
  file: File | null;
}

export function UploadDocumentDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<UploadFormData>({
    title: '',
    type: '',
    description: '',
    signers: [''],
    file: null,
  });
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFormData(prev => ({
      ...prev,
      file,
      title: file.name.split('.').slice(0, -1).join('.'),
    }));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const addSigner = () => {
    setFormData(prev => ({
      ...prev,
      signers: [...prev.signers, ''],
    }));
  };

  const removeSigner = (index: number) => {
    setFormData(prev => ({
      ...prev,
      signers: prev.signers.filter((_, i) => i !== index),
    }));
  };

  const updateSigner = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      signers: prev.signers.map((signer, i) => i === index ? value : signer),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to upload document
    console.log('Upload document:', formData);
    setIsOpen(false);
    setFormData({
      title: '',
      type: '',
      description: '',
      signers: [''],
      file: null,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1eb5b6] hover:bg-[#1eb5b6]/90">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Upload a document and optionally request signatures.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              dragActive ? 'border-[#1eb5b6] bg-[#1eb5b6]/5' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {formData.file ? (
              <div className="space-y-2">
                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                <div className="text-sm font-medium">{formData.file.name}</div>
                <div className="text-xs text-gray-500">
                  {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                <div className="text-sm font-medium">
                  Drag and drop your file here, or click to select
                </div>
                <Input
                  type="file"
                  className="hidden"
                  onChange={handleFileInput}
                  accept=".pdf,.doc,.docx"
                  id="file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Select File
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Document Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Document Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Add a description..."
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Signers</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSigner}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Signer
              </Button>
            </div>
            <div className="space-y-2">
              {formData.signers.map((signer, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={signer}
                    onChange={(e) => updateSigner(index, e.target.value)}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSigner(index)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#1eb5b6] hover:bg-[#1eb5b6]/90"
              disabled={!formData.file}
            >
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 