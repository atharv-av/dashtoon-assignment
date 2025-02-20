import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { History } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent } from "./ui/card";

const ReadingHistory = ({ shows, onSelectShow }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <History className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gray-800 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Reading History</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-4">
          {shows.map(show => (
            <Card 
              key={show.id}
              className="mb-2 bg-gray-700 hover:bg-gray-600 cursor-pointer"
              onClick={() => onSelectShow(show)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={show.metadata.find(m => m.type === 'WIDGET_THUMBNAIL_V2')?.value || '/api/placeholder/100/100'}
                    alt={show.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{show.name}</h3>
                    <p className="text-sm text-gray-400">
                      {show.episodes.length} episodes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default ReadingHistory