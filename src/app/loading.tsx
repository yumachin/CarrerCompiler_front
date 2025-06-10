"use client"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          {/* Animated Cube Logo */}
          <div className="relative">
            <div
              className="w-12 h-12 bg-white/20 border-2 border-white/40 rounded-lg animate-spin"
              style={{ animationDuration: "3s" }}
            >
              <div className="absolute inset-2 bg-white/30 rounded animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wider">CAREER_COMPILER</h1>
        </div>

        {/* Loading Animation */}
        <div className="space-y-6">
          {/* Code-like Loading Animation */}
          <div className="bg-black/20 rounded-lg p-6 font-mono text-left max-w-md mx-auto">
            <div className="space-y-2 text-green-300">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">{">"}</span>
                <span className="animate-pulse">Initializing career data...</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">{">"}</span>
                <span className="animate-pulse delay-300">Loading user profile...</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">{">"}</span>
                <span className="animate-pulse delay-500">Compiling opportunities...</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">{">"}</span>
                <span className="animate-pulse delay-700">Ready to launch!</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-300 h-full rounded-full animate-pulse"
                style={{
                  animation: "loading-progress 2s ease-in-out infinite",
                  width: "70%",
                }}
              />
            </div>
          </div>

          {/* Loading Message */}
          <p className="text-white/80 text-lg">あなたのキャリアを準備中...</p>

          {/* Spinning Dots */}
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white/60 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-lg rotate-12 animate-pulse" />
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/20 rounded-lg -rotate-12 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/20 rounded-lg rotate-45 animate-pulse delay-500" />
        <div className="absolute bottom-20 left-1/3 w-20 h-20 border border-white/20 rounded-lg -rotate-6 animate-pulse delay-700" />
      </div>

      <style jsx>{`
        @keyframes loading-progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}
