import { useState, useCallback } from 'react';
import { useToast } from './use-toast';

export interface FileUploadOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  multiple?: boolean;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl: string;
  uploadedAt: string;
}

export interface FileUploadState {
  files: UploadedFile[];
  isUploading: boolean;
  progress: number;
  error: string | null;
}

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

export const useFileUpload = (options: FileUploadOptions = {}) => {
  const { toast } = useToast();
  const {
    maxSize = DEFAULT_MAX_SIZE,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    multiple = false
  } = options;

  const [state, setState] = useState<FileUploadState>({
    files: [],
    isUploading: false,
    progress: 0,
    error: null
  });

  const validateFile = useCallback((file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum allowed size of ${(maxSize / 1024 / 1024).toFixed(2)}MB`;
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`;
    }

    return null;
  }, [maxSize, allowedTypes]);

  const processFile = useCallback((file: File): Promise<UploadedFile> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        const uploadedFile: UploadedFile = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: reader.result as string,
          uploadedAt: new Date().toISOString()
        };
        resolve(uploadedFile);
      };

      reader.onerror = () => {
        reject(new Error(`Failed to read file: ${file.name}`));
      };

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setState(prev => ({ ...prev, progress }));
        }
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const uploadFiles = useCallback(async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    
    if (!multiple && files.length > 1) {
      toast({
        title: "Upload Error",
        description: "Only one file is allowed",
        variant: "destructive",
      });
      return;
    }

    setState(prev => ({
      ...prev,
      isUploading: true,
      progress: 0,
      error: null
    }));

    try {
      const uploadedFiles: UploadedFile[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
          throw new Error(validationError);
        }

        // Process file
        const uploadedFile = await processFile(file);
        uploadedFiles.push(uploadedFile);
        
        // Update progress
        setState(prev => ({
          ...prev,
          progress: Math.round(((i + 1) / files.length) * 100)
        }));
      }

      setState(prev => ({
        ...prev,
        files: multiple ? [...prev.files, ...uploadedFiles] : uploadedFiles,
        isUploading: false,
        progress: 100
      }));

      toast({
        title: "Upload Successful",
        description: `${uploadedFiles.length} file(s) uploaded successfully`,
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      
      setState(prev => ({
        ...prev,
        isUploading: false,
        progress: 0,
        error: errorMessage
      }));

      toast({
        title: "Upload Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [multiple, validateFile, processFile, toast]);

  const removeFile = useCallback((fileId: string) => {
    setState(prev => ({
      ...prev,
      files: prev.files.filter(file => file.id !== fileId),
      error: null
    }));
    
    toast({
      title: "File Removed",
      description: "File has been removed successfully",
    });
  }, [toast]);

  const clearAll = useCallback(() => {
    setState({
      files: [],
      isUploading: false,
      progress: 0,
      error: null
    });
  }, []);

  const getFilesByType = useCallback((type: string) => {
    return state.files.filter(file => file.type.includes(type));
  }, [state.files]);

  const getTotalSize = useCallback(() => {
    return state.files.reduce((total, file) => total + file.size, 0);
  }, [state.files]);

  return {
    ...state,
    uploadFiles,
    removeFile,
    clearAll,
    getFilesByType,
    getTotalSize,
    formatFileSize: (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
  };
};