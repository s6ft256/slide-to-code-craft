import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { X, Upload, File, Image, FileText, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFileUpload, FileUploadOptions, UploadedFile } from '@/hooks/use-file-upload';

interface FileUploaderProps {
  options?: FileUploadOptions;
  onFilesChange?: (files: UploadedFile[]) => void;
  className?: string;
  showPreview?: boolean;
  showProgress?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  options,
  onFilesChange,
  className,
  showPreview = true,
  showProgress = true
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    files,
    isUploading,
    progress,
    error,
    uploadFiles,
    removeFile,
    clearAll,
    formatFileSize
  } = useFileUpload(options);

  React.useEffect(() => {
    onFilesChange?.(files);
  }, [files, onFilesChange]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      uploadFiles(fileList);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      uploadFiles(droppedFiles);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-4 w-4" />;
    } else if (fileType.includes('pdf')) {
      return <FileText className="h-4 w-4" />;
    } else {
      return <File className="h-4 w-4" />;
    }
  };

  const downloadFile = (file: UploadedFile) => {
    const link = document.createElement('a');
    link.href = file.dataUrl;
    link.download = file.name;
    link.click();
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer transition-colors",
          "hover:border-gray-400 hover:bg-gray-50",
          isUploading && "pointer-events-none opacity-50"
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600 mb-1">
          {isUploading ? "Uploading files..." : "Click to upload or drag and drop files here"}
        </p>
        <p className="text-xs text-gray-500">
          {options?.allowedTypes?.length 
            ? `Supported: ${options.allowedTypes.map(type => type.split('/')[1]).join(', ')}`
            : "Images, PDFs, Documents supported"
          }
        </p>
        {options?.maxSize && (
          <p className="text-xs text-gray-500 mt-1">
            Max size: {formatFileSize(options.maxSize)}
          </p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple={options?.multiple}
        accept={options?.allowedTypes?.join(',')}
        onChange={handleFileSelect}
      />

      {/* Progress Bar */}
      {showProgress && isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* File List */}
      {showPreview && files.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Uploaded Files ({files.length})</h4>
            {files.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="text-xs"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {files.map((file) => (
              <Card key={file.id} className="p-3">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-3">
                    {/* File Icon/Preview */}
                    <div className="flex-shrink-0">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={file.dataUrl}
                          alt={file.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadFile(file)}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;