'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Pencil, Share2, Trash2 } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  status: string;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  signers: string[];
}

interface DocumentPreviewProps {
  document: Document | undefined;
}

export function DocumentPreview({ document }: DocumentPreviewProps) {
  if (!document) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <FileText className="w-12 h-12 text-gray-400" />
            <div className="text-lg font-medium text-gray-900">
              Select a document to preview
            </div>
            <p className="text-sm text-gray-500">
              Choose a document from the list to view its details and manage signatures
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{document.name}</h3>
            <p className="text-sm text-gray-500">
              Uploaded on {new Date(document.uploadDate).toLocaleDateString()}
            </p>
          </div>
          <Badge variant="outline">{document.size}</Badge>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Type</span>
            <span className="font-medium">{document.type}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <Badge>{document.status}</Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Uploaded By</span>
            <span className="font-medium">{document.uploadedBy}</span>
          </div>
        </div>

        {document.signers.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Signers</h4>
            <div className="space-y-1">
              {document.signers.map((signer, index) => (
                <div
                  key={index}
                  className="text-sm px-3 py-2 bg-gray-50 rounded-md flex justify-between items-center"
                >
                  <span>{signer}</span>
                  {document.status === 'Pending Signature' && (
                    <Badge variant="outline" className="text-yellow-600">
                      Pending
                    </Badge>
                  )}
                  {document.status === 'Signed' && (
                    <Badge variant="outline" className="text-green-600">
                      Signed
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button className="w-full bg-[#1eb5b6] hover:bg-[#1eb5b6]/90">
            <Pencil className="w-4 h-4 mr-2" />
            Request Signature
          </Button>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="text-red-600 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 