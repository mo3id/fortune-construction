import { Wrench, BarChart3, ShieldCheck } from 'lucide-react'

const WHY_US = [
    { icon: <Wrench className="w-5 h-5" />, title: 'Certified Engineering Teams', desc: 'Licensed engineers and qualified technicians on every project.' },
    { icon: <BarChart3 className="w-5 h-5" />, title: 'On-Time Delivery', desc: 'Industry-leading project management ensuring schedule adherence.' },
    { icon: <ShieldCheck className="w-5 h-5" />, title: 'Quality Assurance', desc: 'Rigorous QA processes at every stage from foundation to finish.' },
]

export function WhyUs() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_US.map((item) => (
                <div key={item.title} className="reveal flex items-start gap-4 p-6 bg-gray-50 rounded-sm">
                    <div className="text-orange-500 mt-0.5 flex-shrink-0">{item.icon}</div>
                    <div>
                        <p className="font-semibold text-navy-700 mb-1">{item.title}</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
