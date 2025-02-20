import type React from "react"
import type { Show } from "@/@types/comic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StoryCardProps {
  show: Show
  onClick: () => void
  isActive?: boolean
}

const StoryCard: React.FC<StoryCardProps> = ({ show, onClick, isActive }) => {
  return (
    <Card
      className={cn(
        "bg-gray-900 border-gray-800 hover:border-purple-500 cursor-pointer transition-all duration-300",
        "hover:transform hover:scale-[1.02] hover:shadow-xl",
        isActive && "border-purple-500 ring-2 ring-purple-500/50"
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
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent p-4">
          <CardTitle className="text-gray-100">{show.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex gap-2 mb-2 flex-wrap">
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-200">
            {show.genre}
          </Badge>
          <Badge variant="outline" className="text-gray-300 border-gray-700">
            ★ {show.rating.toFixed(1)}
          </Badge>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2">{show.description}</p>
        <div className="mt-2 text-sm text-gray-500">by {show.creator}</div>
      </CardContent>
    </Card>
  )
}

export default StoryCard