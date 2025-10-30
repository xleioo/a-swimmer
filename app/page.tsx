import { ThemeToggle } from "@/components/theme-toggle"
import { formatDate } from "@/lib/utils"
import { docs } from "@source/index"
import Hero from "@/components/hero"

export default function HomePage() {
  // Sort changelogs by date (newest first)
  const sortedChangelogs = docs
    .filter((doc) => doc && (doc as any).date)
    .sort((a, b) => {
      const dateA = new Date((a as any).date as string).getTime()
      const dateB = new Date((b as any).date as string).getTime()
      return dateB - dateA
    })

  return (
    <div className="min-h-screen bg-background relative">
      {/* Set theme to dark unconditionally */}

      {/* Hero Section */}
      <Hero />

      {/* Timeline */}
      <div id="changelog" className="max-w-5xl mx-auto px-6 lg:px-10 pt-10">
        <div className="relative">
          {sortedChangelogs.map((changelog) => {
            const MDX = (changelog as any).body
            const date = new Date((changelog as any).date as string)
            const formattedDate = formatDate(date)

            return (
              <div key={(changelog as any).path} className="relative">
                <div className="flex flex-col md:flex-row gap-y-6">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="md:sticky md:top-8 pb-10">
                      <time className="text-sm font-medium text-muted-foreground block mb-3">
                        {formattedDate}
                      </time>

                      {(changelog as any).version && (
                        <div className="inline-flex relative z-10 items-center justify-center w-10 h-10 text-foreground border border-border rounded-lg text-sm font-bold">
                          {(changelog as any).version}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="flex-1 md:pl-8 relative pb-10">
                    {/* Vertical timeline line */}
                    <div className="hidden md:block absolute top-2 left-0 w-px h-full bg-border">
                      {/* Timeline dot */}
                      <div className="hidden md:block absolute -translate-x-1/2 size-3 bg-primary rounded-full z-10" />
                    </div>

                    <div className="space-y-6">
                      <div className="relative z-10 flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold tracking-tight text-balance">
                          {(changelog as any).title}
                        </h2>

                        {/* Tags */}
                        {(changelog as any).tags &&
                          Array.isArray((changelog as any).tags) &&
                          (changelog as any).tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {((changelog as any).tags as string[]).map((tag: string) => (
                                <span
                                  key={tag}
                                  className="h-6 w-fit px-2 text-xs font-medium bg-muted text-muted-foreground rounded-full border flex items-center justify-center"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>
                      <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-img:rounded-lg prose-img:shadow-lg">
                        <MDX />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
