import type React from "react";
import type { Show } from "@/@types/comic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  show: Show;
  onClick: () => void;
  isActive?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ show, onClick, isActive }) => {
  return (
    <Card
      className={cn(
        "bg-gray-800 border-gray-700 hover:border-purple-500 cursor-pointer transition-all",
        isActive && "border-purple-500"
      )}
      onClick={onClick}
    >
      <CardHeader className="relative p-0">
        <img
          src={
            show.episodes.length > 0
              ? show.episodes[0].panels[0].imageUrl
              : "/placeholder.svg?height=200&width=400"
          }
          alt={show.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
          <CardTitle className="text-white">{show.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex gap-2 mb-2">
          <Badge variant="secondary">{show.genre}</Badge>
          <Badge variant="outline">★ {show.rating.toFixed(1)}</Badge>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2">{show.description}</p>
        <div className="mt-2 text-sm text-gray-500">by {show.creator}</div>
      </CardContent>
    </Card>
  );
};

export default StoryCard;
