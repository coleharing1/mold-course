'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Camera, Upload, X, Image as ImageIcon } from 'lucide-react'

interface PhotoUploadProps {
  roomName: string
  photos: string[]
  onPhotosChange: (photos: string[]) => void
}

export function PhotoUpload({ roomName, photos, onPhotosChange }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          onPhotosChange([...photos, result])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    onPhotosChange(newPhotos)
  }

  return (
    <Card className="p-6 mt-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          📸 Photo Documentation
        </h3>
        <p className="text-sm text-gray-600">
          Upload photos of any issues found in {roomName}. Photos help professionals assess the situation.
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-900 font-medium mb-2">
          Drag and drop photos here
        </p>
        <p className="text-sm text-gray-500 mb-4">
          or click to select files
        </p>
        
        <input
          type="file"
          id="photo-upload"
          className="hidden"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
        />
        
        <Button
          variant="outline"
          onClick={() => document.getElementById('photo-upload')?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Select Photos
        </Button>
      </div>

      {/* Photo Preview Grid */}
      {photos.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-900">
              Uploaded Photos ({photos.length})
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPhotosChange([])}
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={photo}
                  alt={`${roomName} photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded">
                  Photo {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Photo Tips:</strong> Take clear, well-lit photos. Include a ruler or common object for scale. 
          Capture wide shots and close-ups of problem areas.
        </p>
      </div>
    </Card>
  )
}