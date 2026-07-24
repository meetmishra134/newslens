import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import CategoryCard from '#/components/newslens/CategoryCard'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '#/components/ui/button'

const Categories = [
  {
    id: 'tech',
    label: 'Technology',
    icon: '../../images/tech.png',
    description: 'AI, startups, software & hardware',
  },
  {
    id: 'sports',
    label: 'Sports',
    icon: '../../images/sports.png',
    description: 'Football, basketball, tennis & more',
  },
  {
    id: 'world',
    label: 'World News',
    icon: '../../images/globe.png',
    description: 'Geopolitics, climate & global events',
  },
  {
    id: 'politics',
    label: 'Politics & Policy',
    icon: '../../images/politics.png',
    description: 'Elections, legislation & government',
  },
  {
    id: 'health',
    label: 'Health & Science',
    icon: '../../images/health.png',
    description: 'Medicine, space & scientific research',
  },
  {
    id: 'entertainment',
    label: 'Culture & Media',
    icon: '../../images/entertainment.png',
    description: 'Movies, gaming, arts & pop culture',
  },
]
export const Route = createFileRoute('/onboarding')({
  component: RouteComponent,
})

function RouteComponent() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId),
      )
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }
  return (
    <div className="flex min-h-screen flex-col justify-center bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold tracking-wider text-red-600 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-red-500" /> Tailoring NewsLens
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            What topics interest you most?
          </h1>
          <p className="mt-2 text-base text-zinc-600 sm:text-lg">
            Select 3 or more topics to help AI curate your personalized daily
            digest.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              label={category.label}
              icon={category.icon}
              description={category.description}
              toggleCategory={toggleCategory}
              isSelected={selectedCategories.includes(category.id)}
            />
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            className="ml-1 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-800"
          >
            Skip for now
          </button>
          <Button
            disabled={selectedCategories.length < 3}
            className={`${selectedCategories.length >= 3 ? 'bg-primary' : 'bg-muted'} inline-flex items-center rounded-full px-6 py-5 font-medium text-white hover:bg-[#c93f3e]`}
          >
            Continue
            {selectedCategories.length > 0 && ` (${selectedCategories.length})`}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
