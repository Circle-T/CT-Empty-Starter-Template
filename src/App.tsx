import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "@/components/theme-provider"
import {
  Sparkles,
  ArrowRight,
  Zap,
  Code2,
  Layers,
  Globe,
  ChevronRight,
  Sun,
  Moon,
  Monitor,
} from "lucide-react"

const SUGGESTIONS = [
  "Build me a SaaS dashboard with auth and billing",
  "Create a REST API for a task management app",
  "Design a landing page with animations and dark mode",
  "Scaffold a React app with Drizzle ORM and SQLite",
]

const FEATURES = [
  {
    icon: Zap,
    label: "Instant scaffolding",
    description: "Full-stack projects in seconds, not hours.",
  },
  {
    icon: Code2,
    label: "Type-safe by default",
    description: "TypeScript strict mode across every layer.",
  },
  {
    icon: Layers,
    label: "Production-ready",
    description: "Auth, DB, API, and CI/CD wired together.",
  },
  {
    icon: Globe,
    label: "Azure-native deploy",
    description: "One command to Container Apps or Web App.",
  },
]

type ThemeOption = "light" | "dark" | "system"

const THEME_OPTIONS: { value: ThemeOption; icon: React.ElementType; label: string }[] = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const current = THEME_OPTIONS.find((o) => o.value === theme) ?? THEME_OPTIONS[2]
  const Icon = current.icon

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        className="gap-1.5 text-muted-foreground"
        aria-label="Toggle theme"
      >
        <Icon className="w-4 h-4" />
        <span className="hidden sm:inline">{current.label}</span>
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[120px] rounded-lg border border-border bg-background shadow-md py-1">
          {THEME_OPTIONS.map(({ value, icon: OptionIcon, label }) => (
            <button
              key={value}
              onClick={() => { setTheme(value); setOpen(false) }}
              className={[
                "flex w-full items-center gap-2 px-3 py-1.5 text-sm transition-colors",
                "hover:bg-muted hover:text-foreground",
                theme === value
                  ? "text-accent font-medium"
                  : "text-muted-foreground",
              ].join(" ")}
            >
              <OptionIcon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [prompt, setPrompt] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [promptOpen, setPromptOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }, [prompt])

  // Focus textarea when panel opens
  useEffect(() => {
    if (promptOpen) {
      setTimeout(() => textareaRef.current?.focus(), 50)
    }
  }, [promptOpen])

  const handleSuggestion = useCallback((text: string) => {
    setPrompt(text)
    textareaRef.current?.focus()
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!prompt.trim()) return
    setSubmitted(true)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e as unknown as React.FormEvent)
    }
    if (e.key === "Escape") {
      setPromptOpen(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent">
            <Sparkles className="w-7 h-7" />
          </span>
          <h2 className="text-xl font-semibold text-foreground">
            Building your workspace…
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            "{prompt}"
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSubmitted(false)
              setPrompt("")
            }}
          >
            Start over
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-foreground text-background text-xs font-bold">
            🏭
          </span>
          <span className="font-semibold text-sm tracking-tight">
            Dark Factory
          </span>
        </div>
        <nav className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm">Sign in</Button>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 gap-12">
        <div className="flex flex-col items-center gap-5 text-center max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground font-medium">
            <Sparkles className="w-3 h-3 text-accent" />
            Autonomous development platform
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Describe what you want to{" "}
            <span className="text-accent">build</span>
          </h1>

          <p className="text-base text-muted-foreground max-w-md">
            Dark Factory scaffolds, codes, and deploys full-stack applications
            from a single prompt. Production-ready from day one.
          </p>
        </div>

        {/* Prompt box — collapsed by default */}
        <div className="w-full max-w-2xl flex flex-col items-center gap-3">
          {/* Toggle trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPromptOpen((v) => !v)}
            className="gap-2 text-muted-foreground border-border hover:border-accent hover:text-accent transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {promptOpen ? "Hide prompt" : "Start prompting"}
            <ChevronRight
              className={[
                "w-3.5 h-3.5 transition-transform duration-200",
                promptOpen ? "rotate-90" : "",
              ].join(" ")}
            />
          </Button>

          {/* Collapsible panel */}
          <div
            className={[
              "w-full flex flex-col gap-3 overflow-hidden transition-all duration-300",
              promptOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none",
            ].join(" ")}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="relative rounded-xl border border-border bg-surface shadow-sm focus-within:ring-2 focus-within:ring-accent focus-within:border-accent transition-all">
                <Textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe the app you want to build…"
                  rows={3}
                  className="resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base px-4 pt-4 pb-12 rounded-xl placeholder:text-muted-foreground/60"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    ⌘ Enter to send
                  </span>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!prompt.trim()}
                    className="gap-1.5"
                  >
                    Generate
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSuggestion(s)}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {s}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
          {FEATURES.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4"
            >
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-md bg-accent/10 text-accent">
                <Icon className="w-4 h-4" />
              </span>
              <p className="text-xs font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground">
        Circle T Dark Factory &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
