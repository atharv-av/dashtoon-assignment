import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Sample data - this would normally come from your API
const sampleShow = {
  "show": {
    "id": "SHO3kU52JVCdeZ7q16Q",
    "name": "I see it all...",
    "creator": "neek",
    "description": "The eye that sees through everything, welcomes you to the lives in the shadows.",
    "genre": "Psychological, Horror",
    "rating": 5.0,
    "episodes": [
      {
        "id": "EPIg89rpK9WQU4Rcl0H",
        "name": "Delicacy",
        "panels": [
          {
            "id": "PANFGm1S0bXijlBOFsp",
            "imageUrl": "https://content.dashtoon.ai/panel-images/PANFGm1S0bXijlBOFsp.png",
            "sequence": 1,
            "metadata": { "height": 1250, "width": 800 }
          },
          // ... other panels
        ]
      }
    ],
    "metadata": [
      {
        "type": "BANNER_THUMBNAIL_V2",
        "value": "https://content.dashtoon.ai/show-thumbnails/SHO3kU52JVCdeZ7q16QnQoplMMvfsiEs8AQ.png"
      }
    ]
  }
};

// Create an array of sample shows for testing
const sampleShows = [sampleShow.show];

const StoryViewer = ({ episode, onClose }) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Load last position from localStorage
    const saved = localStorage.getItem('comicReaderPosition');
    if (saved) {
      const { episodeIndex } = JSON.parse(saved);
      setCurrentEpisodeIndex(episodeIndex);
    }
  }, []);

  // Save position when it changes
  useEffect(() => {
    localStorage.setItem('comicReaderPosition', JSON.stringify({
      episodeIndex: currentEpisodeIndex
    }));
  }, [currentEpisodeIndex]);

  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchMove = (e) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = () => {
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    const minSwipeDistance = 50;

    // Only handle horizontal swipes if they're more significant than vertical movement
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0 && currentShowIndex > 0) {
        // Swipe right - previous show
        setCurrentShowIndex(prev => prev - 1);
        setCurrentEpisodeIndex(0);
      } else if (deltaX < 0 && currentShowIndex < sampleShows.length - 1) {
        // Swipe left - next show
        setCurrentShowIndex(prev => prev + 1);
        setCurrentEpisodeIndex(0);
      }
    }
  };

  const handleScroll = (e) => {
    if (!scrollRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
    const isAtTop = scrollTop <= 50;

    if (isAtBottom && currentEpisodeIndex < currentShow.episodes.length - 1) {
      setCurrentEpisodeIndex(prev => prev + 1);
    } else if (isAtTop && currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(prev => prev - 1);
    }
  };

    function setCurrentEpisodeIndex(index: any) {
        throw new Error('Function not implemented.');
    }

  return (
    <div className="h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800/80 backdrop-blur-sm p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <SheetTrigger asChild onClick={() => setIsMenuOpen(true)}>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <div>
              <h1 className="font-bold text-lg">{episode.name}</h1>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="h-[calc(100vh-4rem)] mt-16"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ScrollArea 
          ref={scrollRef}
          className="h-full"
          onScrollCapture={handleScroll}
        >
          <div className="flex flex-col items-center gap-2 p-4">
            {episode?.panels?.sort((a, b) => a.sequence - b.sequence)
              .map((panel) => (
                <motion.div
                  key={panel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-2xl"
                >
                  <img
                    src={panel.imageUrl}
                    alt={`Panel ${panel.sequence}`}
                    className="w-full rounded-lg shadow-lg"
                    style={{
                      aspectRatio: `${panel.metadata.width} / ${panel.metadata.height}`
                    }}
                    loading="lazy"
                  />
                </motion.div>
            ))}
          </div>
        </ScrollArea>
      </motion.div>

      {/* Episodes Menu */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="left" className="bg-gray-800 text-white w-80">
          <SheetHeader>
            <SheetTitle className="text-white">Episodes</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            {currentShow.episodes.map((episode, index) => (
              <Button
                key={episode.id}
                variant={currentEpisodeIndex === index ? "secondary" : "ghost"}
                className="w-full justify-start mb-2"
                onClick={() => {
                  setCurrentEpisodeIndex(index);
                  setIsMenuOpen(false);
                }}
              >
                {episode.name}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default StoryViewer;