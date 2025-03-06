import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DesignImage {
  id: string;
  url: string;
  caption: string;
}

interface DesignViewerProps {
  images: DesignImage[];
}

export function DesignViewer({ images }: DesignViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Design Preview</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={zoomOut}
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
              <span className="sr-only">Zoom out</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={zoomIn}
              disabled={zoom >= 3}
            >
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Zoom in</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreen}
            >
              <Maximize2 className="h-4 w-4" />
              <span className="sr-only">Toggle fullscreen</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden">
        <div
          className="h-full w-full transition-transform duration-200"
          style={{
            transform: `scale(${zoom})`,
          }}
        >
          <Image
            src={currentImage.url}
            alt={currentImage.caption}
            fill
            className="object-contain"
          />
        </div>

        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={previousImage}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {currentImage.caption}
          </p>
          {images.length > 1 && (
            <p className="text-sm text-muted-foreground">
              {currentImageIndex + 1} of {images.length}
            </p>
          )}
        </div>
        {images.length > 1 && (
          <div className="mt-4 flex gap-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setZoom(1);
                }}
                className={cn(
                  'h-16 w-16 overflow-hidden rounded-md border transition-colors',
                  index === currentImageIndex && 'border-primary'
                )}
              >
                <Image
                  src={image.url}
                  alt={image.caption}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 