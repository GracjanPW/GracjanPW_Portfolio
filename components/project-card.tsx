import Link from "next/link"
import { ArrowUpRight, Code2, GitFork, Star } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  name: string
  description: string
  language: string | null
  stars: number
  forks: number
  url: string
}

export function ProjectCard({ name, description, language, stars, forks, url }: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col bg-zinc-900/50 border-zinc-800 backdrop-blur-sm overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-2 text-zinc-100">
          <span className="truncate">{name}</span>
        </CardTitle>
        <CardDescription className="line-clamp-2 h-10 text-zinc-400">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {language && (
          <div className="flex items-center gap-1.5 text-sm text-zinc-400 mb-2">
            <Code2 className="w-4 h-4 text-purple-400" />
            <span>{language}</span>
          </div>
        )}
        <div className="flex items-center gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-purple-400" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-4 h-4 text-purple-400" />
            <span>{forks}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white hover:border-purple-500 transition-all duration-300"
          asChild
        >
          <Link href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <span>View Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
