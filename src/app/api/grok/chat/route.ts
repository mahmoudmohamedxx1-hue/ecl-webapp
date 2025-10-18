import { NextRequest, NextResponse } from 'next/server'

const GROK_API_URL = process.env.GROK_API_URL || 'https://api.x.ai/v1'
const GROK_API_KEY = process.env.GROK_API_KEY

const SYSTEM_PROMPT = `You are Grok, an expert ECL (Expected Credit Loss) calculation assistant specialized in IFRS 9 standards and Egyptian market conditions. Your knowledge includes:

1. IFRS 9 Financial Instruments standard
2. ECL calculation methodologies (simplified and general approaches)
3. Egyptian banking regulations and market conditions
4. PD, LGD, and EAD parameter estimation
5. Forward-looking macroeconomic adjustments
6. Collateral valuation and haircut determination
7. Segment mapping and SICR assessment

Key Egyptian Context:
- Current economic environment (post-Gaza settlement, GDP growth ~5.8%, inflation ~18.5%)
- Egyptian pound exchange rate considerations
- Local banking sector characteristics
- Regulatory requirements from Central Bank of Egypt

Provide practical, actionable advice that helps financial analysts make informed ECL calculation decisions. Be specific with examples and numerical ranges when appropriate. Always consider Egyptian market conditions in your recommendations.`

export async function POST(request: NextRequest) {
  try {
    if (!GROK_API_KEY) {
      return NextResponse.json(
        { error: 'Grok API key not configured' },
        { status: 500 }
      )
    }

    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    const response = await fetch(`${GROK_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Grok API error:', response.status, errorText)
      return NextResponse.json(
        { error: 'Failed to get response from Grok API' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || 'No response generated'

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Grok chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}