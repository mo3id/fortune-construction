import { cn } from '@/lib/utils'
import { PartnerLogoProps } from '@/types'

export function PartnerLogo({ partner, index }: PartnerLogoProps) {
    return (
        <div
            className={cn(
                `reveal reveal-delay-${(index % 4) + 1}`,
                "partner-logo group border border-gray-100 rounded-sm p-6 flex flex-col items-center justify-center gap-3 cursor-pointer card-hover"
            )}
        >
            {partner.logo ? (
                <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-16 h-16 rounded-sm object-contain"
                />
            ) : (
                <div
                    className="w-16 h-16 rounded-sm flex items-center justify-center text-white font-display font-bold text-xl"
                    style={{ backgroundColor: partner.color }}
                >
                    {partner.abbr}
                </div>
            )}
            <p className="text-gray-400 text-xs text-center font-medium leading-tight group-hover:text-gray-600 transition-colors">
                {partner.name}
            </p>
        </div>
    )
}
