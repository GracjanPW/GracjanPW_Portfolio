import { Badge } from "@/components/ui/badge"

interface SkillBadgeProps {
  name: string
}

export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="px-3 py-1 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white hover:text-white border-zinc-700 hover:border-purple-500 transition-all duration-300"
    >
      {name}
    </Badge>
  )
}
