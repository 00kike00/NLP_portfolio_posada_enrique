'use client'

import { useState } from 'react'

interface ScheduleItem {
  time: string
  task: string
}

interface PlannerResponse {
  schedule: ScheduleItem[]
  priorities: string[]
  reasoning: string
}

export default function Home() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<PlannerResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const organizeDay = async () => {
    if (!input.trim()) {
      setError('Please enter your daily plan first')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/organize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: input }),
      })

      if (!response.ok) {
        throw new Error('Failed to organize your day')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const regenerate = () => {
    organizeDay()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Daily Planner
          </h1>
          <p className="text-lg text-gray-600">
            Transform your messy notes into an organized daily schedule
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="mb-6">
            <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-2">
              Your Daily Plan
            </label>
            <textarea
              id="plan"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your messy daily plan here... Example: 'need to email boss, call dentist, workout, buy groceries, finish project report, meet friend for coffee'"
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <button
            onClick={organizeDay}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Thinking...' : 'Organize my day'}
          </button>
        </div>

        {result && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Organized Day</h2>
                <button
                  onClick={regenerate}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
                >
                  Regenerate
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h3>
                  <div className="space-y-3">
                    {result.schedule.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-20 text-sm font-medium text-blue-600">
                          {item.time}
                        </div>
                        <div className="flex-1 text-gray-900">
                          {item.task}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Tasks</h3>
                  <div className="space-y-2">
                    {result.priorities.map((priority, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="text-gray-900">{priority}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Reasoning</h3>
                  <div className="p-4 bg-blue-50 rounded-lg text-gray-700">
                    {result.reasoning}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
