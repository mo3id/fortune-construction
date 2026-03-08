import { cn } from '@/lib/utils'
import { ProjectFilterProps } from '@/types'

export function ProjectFilter({
    categories,
    activeCategory,
    onCategoryChange,
}: ProjectFilterProps) {
    return (
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={cn(
                        'px-6 py-2.5 text-sm font-semibold tracking-wide rounded-sm border transition-all duration-200',
                        activeCategory === cat
                            ? 'bg-orange-500 border-orange-500 text-white'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-500'
                    )}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}
