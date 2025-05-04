import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github, Mail, MapPin, Code, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"

export const metadata: Metadata = {
  title: "Gracjan PW | Portfolio",
  description: "Personal portfolio showcasing my projects and skills",
}

async function getGithubUser(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching GitHub user:", error)
    return null
  }
}

async function getGithubRepos(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return []
  }
}

export default async function PortfolioPage() {
  const username = "GracjanPW"
  const userData = await getGithubUser(username)
  const repos = await getGithubRepos(username)

  const skills = [
    { name: "JavaScript", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "React", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "Node.js", category: "backend" },
    { name: "Express", category: "backend" },
    { name: "MongoDB", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
    { name: "Git", category: "tools" },
    { name: "Docker", category: "tools" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "HTML/CSS", category: "frontend" },
  ]

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-zinc-950 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-zinc-950/0 to-zinc-950/0" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              {userData?.avatar_url ? (
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000"></div>
                  <Image
                    src={userData.avatar_url || "/placeholder.svg"}
                    alt={`${username}'s profile picture`}
                    width={240}
                    height={240}
                    className="rounded-full relative border-2 border-zinc-800 group-hover:border-purple-500 transition-all duration-300"
                    priority
                  />
                </div>
              ) : (
                <div className="w-60 h-60 rounded-full bg-zinc-800 flex items-center justify-center relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000"></div>
                  <span className="text-4xl font-bold text-zinc-300 relative">{username.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <div className="inline-block mb-2 px-3 py-1 rounded-full bg-zinc-800/50 text-purple-400 text-sm font-medium">
                Software Developer
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                {userData?.name || username}
              </h1>
              <h2 className="text-xl md:text-2xl text-zinc-400 mb-6">
                {userData?.bio || "Building digital experiences with code"}
              </h2>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                {userData?.location && (
                  <div className="flex items-center gap-1 text-zinc-400 bg-zinc-800/50 px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span>{userData.location}</span>
                  </div>
                )}
                <Link
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors bg-zinc-800/50 px-3 py-1 rounded-full hover:bg-zinc-800"
                >
                  <Github className="w-4 h-4 text-purple-400" />
                  <span>{username}</span>
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                  <Link href="#contact" className="flex items-center gap-2">
                    Get in touch
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white"
                >
                  <Link href="#projects" className="flex items-center gap-2">
                    View projects
                    <Code className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-zinc-950/0 to-zinc-950/0" />
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-block mb-2 px-3 py-1 rounded-full bg-zinc-800/50 text-purple-400 text-sm font-medium mx-auto block text-center">
            About Me
          </div>
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Who I Am
          </h2>
          <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <CardContent className="pt-6">
              <p className="text-lg leading-relaxed text-zinc-300">
                {userData?.bio ||
                  `Hi, I'm ${userData?.name || username}. I'm a passionate software developer with a focus on creating efficient, 
                  user-friendly applications. I enjoy working with modern web technologies and am constantly 
                  learning new skills to improve my craft.`}
              </p>
              <p className="text-lg leading-relaxed mt-4 text-zinc-300">
                With a strong foundation in both frontend and backend development, I strive to build complete solutions
                that solve real-world problems. I'm particularly interested in web technologies, cloud computing, and
                open-source development.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-zinc-950/0 to-zinc-950/0" />
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-block mb-2 px-3 py-1 rounded-full bg-zinc-800/50 text-purple-400 text-sm font-medium mx-auto block text-center">
            My Work
          </div>
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos && repos.length > 0
              ? repos.map((repo: any) => (
                  <ProjectCard
                    key={repo.id}
                    name={repo.name}
                    description={repo.description || "No description available"}
                    language={repo.language}
                    stars={repo.stargazers_count}
                    forks={repo.forks_count}
                    url={repo.html_url}
                  />
                ))
              : Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="h-[250px] flex items-center justify-center bg-zinc-900/50 border-zinc-800">
                      <CardContent>
                        <p className="text-zinc-500">Project information unavailable</p>
                      </CardContent>
                    </Card>
                  ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white"
            >
              <Link
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>View all projects on GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/10 via-zinc-950/0 to-zinc-950/0" />
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-block mb-2 px-3 py-1 rounded-full bg-zinc-800/50 text-purple-400 text-sm font-medium mx-auto block text-center">
            Expertise
          </div>
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Technical Skills
          </h2>
          <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-zinc-200">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((skill) => skill.category === "frontend")
                      .map((skill) => (
                        <SkillBadge key={skill.name} name={skill.name} />
                      ))}
                  </div>
                </div>
                <Separator className="bg-zinc-800" />
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-zinc-200">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((skill) => skill.category === "backend")
                      .map((skill) => (
                        <SkillBadge key={skill.name} name={skill.name} />
                      ))}
                  </div>
                </div>
                <Separator className="bg-zinc-800" />
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-zinc-200">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((skill) => skill.category === "tools")
                      .map((skill) => (
                        <SkillBadge key={skill.name} name={skill.name} />
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-zinc-950/0 to-zinc-950/0" />
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-block mb-2 px-3 py-1 rounded-full bg-zinc-800/50 text-purple-400 text-sm font-medium mx-auto block text-center">
            Contact
          </div>
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Get In Touch
          </h2>
          <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2 space-y-4">
                  <p className="text-lg text-zinc-300">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your
                    vision.
                  </p>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span>{userData?.email || "contact@example.com"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Github className="w-5 h-5 text-purple-400" />
                    <Link
                      href={`https://github.com/${username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      github.com/{username}
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                    size="lg"
                    asChild
                  >
                    <Link
                      href={`mailto:${userData?.email || "contact@example.com"}`}
                      className="flex items-center justify-center gap-2"
                    >
                      Send me an email
                      <Mail className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto text-center text-zinc-500">
          <p>
            © {new Date().getFullYear()} {userData?.name || username}. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
