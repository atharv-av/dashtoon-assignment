"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type Show = {
  id: string
  name: string
  description: string
  thumbNailUrl: string | null
}

type ComicData = {
  show: Show
}

export function ComicList() {
  const [comics, setComics] = useState<ComicData[]>([])

  useEffect(() => {
    // In a real application, this would be an API call
    fetch("/api/comics")
      .then((res) => res.json())
      .then((data) => setComics(data))
  }, [])

  return (
    <ScrollArea className="h-[calc(100vh-100px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comics.map((comic) => (
          <Link href={`/comic/${comic.show.id}`} key={comic.show.id}>
            <Card className="hover:bg-accent transition-colors">
              <CardHeader>
                <CardTitle>{comic.show.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{comic.show.description}</p>
                {comic.show.thumbNailUrl && (
                  <img
                    src={comic.show.thumbNailUrl || "/placeholder.svg"}
                    alt={comic.show.name}
                    className="mt-4 w-full h-40 object-cover rounded-md"
                  />
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </ScrollArea>
  )
}

