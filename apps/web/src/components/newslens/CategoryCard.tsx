import { Card } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { motion } from 'motion/react'

type CategoryCardProps = {
  id: string
  label: string
  icon: string
  description: string
  isSelected?: boolean
  toggleCategory?: (categoryId: string) => void
}
const MotionCard = motion.create(Card)
const CategoryCard = ({
  id,
  label,
  icon,
  description,
  isSelected = false,
  toggleCategory,
}: CategoryCardProps) => {
  return (
    <MotionCard
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={() => toggleCategory?.(id)}
      className={`relative cursor-pointer overflow-hidden rounded-2xl border p-4 transition-colors duration-200 select-none ${
        isSelected
          ? 'border-red-600 bg-red-50/30 shadow-sm ring-2 ring-red-600/20'
          : 'border-zinc-200/80 bg-white hover:border-zinc-300 hover:shadow-md'
      }`}
    >
      <div className="flex flex-col gap-3">
        {/* Top Bar: Icon + Checkbox */}
        <div className="flex w-full items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 p-2 text-zinc-700">
            <img
              src={icon}
              alt={label}
              className="h-full w-full object-contain"
            />
          </div>

          <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleCategory?.(id)}
            className="h-5 w-5 rounded-md border-zinc-300 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600"
          />
        </div>

        {/* Content Section */}
        <div className="mt-1 flex flex-col gap-1 text-left">
          <h3 className="text-base font-semibold tracking-tight text-zinc-900">
            {label}
          </h3>
          <p className="text-xs leading-relaxed text-zinc-500">{description}</p>
        </div>
      </div>
    </MotionCard>
  )
}

export default CategoryCard
