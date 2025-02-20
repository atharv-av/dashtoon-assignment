"use client";

import { useEffect, useRef, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Show } from '@/@types/comic';

interface StoryViewProps {
  story: Show;
  initialPanelIndex: number;
  onPanelChange: (index: number) => void;
}

export default function StoryView({
  story,
  initialPanelIndex,
  onPanelChange,
}: StoryViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPanel, setCurrentPanel] = useState(initialPanelIndex);
  const episodes = story.episodes[0]?.panels || [];
  const sortedPanels = episodes.sort((a, b) => a.sequence - b.sequence);

  useEffect(() => {
    if (containerRef.current) {
      const panelHeight = window.innerHeight;
      containerRef.current.scrollTo({
        top: initialPanelIndex * panelHeight,
        behavior: 'auto',
      });
    }
  }, [story.id, initialPanelIndex]);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const newIndex = Math.round(scrollTop / window.innerHeight);
      if (newIndex !== currentPanel) {
        setCurrentPanel(newIndex);
        onPanelChange(newIndex);
      }
    }
  };

  const progress = (currentPanel / (sortedPanels.length - 1)) * 100;

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute top-0 left-0 z-10 w-full p-2 bg-background/80">
        <Progress value={progress} className="h-2" />
      </div>
      
      <div
        ref={containerRef}
        className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory"
        onScroll={handleScroll}
      >
        {sortedPanels.map((panel, index) => (
          <section
            key={panel.id}
            className="h-screen w-screen snap-start flex items-center justify-center bg-black"
          >
            <img
              src={panel.imageUrl}
              alt={`Panel ${index + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </section>
        ))}
      </div>
    </div>
  );
}