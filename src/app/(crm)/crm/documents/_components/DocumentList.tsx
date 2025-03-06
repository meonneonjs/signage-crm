'use client';

import { Badge } from "@/components/ui/badge";
import { FileIcon, FileText, File } from 'lucide-react';

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

interface DocumentListProps {
  documents: Document[];
  selectedDocument: string | null;
  onSelectDocument: (id: string) => void;
  getStatusColor: (status: string) => string;
}

export function DocumentList({
  documents,
  selectedDocument,
  onSelectDocument,
  getStatusColor,
}: DocumentListProps) {
  const getDocumentIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      return <FileText className="w-5 h-5 text-blue-500" />;
    }
    return <File className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="rounded-md border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
            <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
            <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
            <th className="h-12 px-4 text-left align-middle font-medium">Uploaded By</th>
            <th className="h-12 px-4 text-right align-middle font-medium">Size</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr
              key={doc.id}
              className={`border-b hover:bg-muted/50 cursor-pointer ${
                selectedDocument === doc.id ? 'bg-muted/50' : ''
              }`}
              onClick={() => onSelectDocument(doc.id)}
            >
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {getDocumentIcon(doc.name)}
                  <div>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-xs text-gray-500">
                      Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-4">{doc.type}</td>
              <td className="p-4">
                <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
              </td>
              <td className="p-4">{doc.uploadedBy}</td>
              <td className="p-4 text-right">{doc.size}</td>
            </tr>
          ))}
          {documents.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No documents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 