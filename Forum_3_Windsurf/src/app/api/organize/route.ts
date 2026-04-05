import { NextRequest, NextResponse } from 'next/server'

interface ScheduleItem {
  time: string
  task: string
}

interface PlannerResponse {
  schedule: ScheduleItem[]
  priorities: string[]
  reasoning: string
}

// Mock function to simulate LLM response
// In production, you would integrate with OpenAI or another LLM service
function generateMockResponse(plan: string): PlannerResponse {
  // Simple mock logic based on common tasks
  const tasks = plan.toLowerCase()
  
  const mockResponse: PlannerResponse = {
    schedule: [
      { time: "09:00–09:30", task: "Morning routine & coffee" },
      { time: "09:30–10:30", task: "Check and respond to important emails" },
      { time: "10:30–11:00", task: "Make important phone calls" },
      { time: "11:00–12:00", task: "Focus work on priority project" },
      { time: "12:00–13:00", task: "Lunch break" },
      { time: "13:00–14:00", task: "Run errands (groceries, etc.)" },
      { time: "14:00–15:30", task: "Continue focused work" },
      { time: "15:30–16:00", task: "Exercise/walk" },
      { time: "16:00–17:00", task: "Meetings and collaboration" },
      { time: "17:00–18:00", task: "Wrap up and plan tomorrow" }
    ],
    priorities: [
      "Complete urgent project tasks",
      "Respond to important communications",
      "Handle time-sensitive appointments",
      "Maintain work-life balance with exercise",
      "Prepare for the next day"
    ],
    reasoning: "I've organized your day to start with high-energy tasks when you're fresh, included breaks to maintain productivity, grouped similar activities together, and ensured a balance between focused work and necessary errands. The schedule builds in buffer time and ends with planning for tomorrow."
  }

  // Customize based on input keywords
  if (tasks.includes('gym') || tasks.includes('workout')) {
    mockResponse.schedule[7] = { time: "15:30–16:30", task: "Gym workout" }
  }
  
  if (tasks.includes('meeting') || tasks.includes('call')) {
    mockResponse.schedule[8] = { time: "16:00–17:00", task: "Scheduled meetings/calls" }
  }

  return mockResponse
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan } = body

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan is required' },
        { status: 400 }
      )
    }

    // For now, use mock response
    // In production, you would call OpenAI API here:
    /*
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Convert the following unstructured daily plan into: 1. A realistic schedule with time blocks, 2. A prioritized task list, 3. Brief reasoning for the order. Make the schedule practical, balanced, and not overloaded. Return as JSON with format: {schedule: [{time: \"...\", task: \"...\"}], priorities: [...], reasoning: \"...\"}"
        },
        {
          role: "user",
          content: plan
        }
      ],
      temperature: 0.7,
    })

    const result = JSON.parse(response.choices[0].message.content)
    */

    const result = generateMockResponse(plan)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error organizing day:', error)
    return NextResponse.json(
      { error: 'Failed to organize your day' },
      { status: 500 }
    )
  }
}
