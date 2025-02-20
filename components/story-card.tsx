import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StoryCard = ({ show, onClick }) => {
  const bannerThumbnail = show.metadata.find(
    (m) => m.type === "BANNER_THUMBNAIL_V2"
  )?.value;

  return (
    <Card
      className="bg-gray-800 border-gray-700 hover:border-purple-500 cursor-pointer transition-all"
      onClick={onClick}
    >
      <CardHeader className="relative p-0">
        <img
          src={bannerThumbnail || "/api/placeholder/400/200"}
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
          <Badge variant="outline">★ {show.rating}</Badge>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2">{show.description}</p>
        <div className="mt-2 text-sm text-gray-500">by {show.creator}</div>
      </CardContent>
    </Card>
  );
};

export default StoryCard;
