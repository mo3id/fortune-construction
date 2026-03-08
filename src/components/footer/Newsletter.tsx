export function Newsletter() {
    return (
        <div>
            <p className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Stay Updated</p>
            <p className="text-white/40 text-sm mb-4 leading-relaxed">
                Subscribe for project news and industry updates from our team.
            </p>
            <div className="flex gap-2">
                <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-sm transition-colors text-sm font-semibold">
                    Go
                </button>
            </div>
        </div>
    )
}
