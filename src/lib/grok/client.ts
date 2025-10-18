// Grok AI Client Library
// Provides structured interaction with Grok for ECL-specific tasks

interface GrokRequest {
  message: string
  context?: any
}

interface GrokResponse {
  content: string
  suggestions?: string[]
  confidence?: number
}

class GrokClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = '/api/grok'
  }

  async chat(message: string, context?: any): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, context }),
    })

    if (!response.ok) {
      throw new Error(`Grok API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.content
  }

  // ECL-specific helper methods
  async suggestSegments(portfolioData: any[]): Promise<string> {
    const message = `
      Analyze this portfolio data and suggest appropriate segment mappings based on IFRS 9 requirements and Egyptian market practices:
      
      Sample data:
      ${JSON.stringify(portfolioData.slice(0, 5), null, 2)}
      
      Provide specific segment names and mapping criteria.
    `
    return this.chat(message)
  }

  async validateParameters(params: {
    segment: string
    pd: number
    lgd: number
    ead: number
  }): Promise<string> {
    const message = `
      Validate these ECL parameters for the Egyptian market:
      - Segment: ${params.segment}
      - PD: ${params.pd}%
      - LGD: ${params.lgd}%
      - EAD: ${params.ead.toLocaleString()} EGP
      
      Are these parameters reasonable? Provide feedback and suggestions.
    `
    return this.chat(message)
  }

  async suggestHaircuts(collateralType: string, value: number): Promise<string> {
    const message = `
      For ${collateralType} collateral worth ${value.toLocaleString()} EGP in Egypt, 
      suggest appropriate haircut components:
      - Market volatility
      - Liquidity discount
      - Legal uncertainty
      - Time decay
      
      Provide specific percentages and reasoning.
    `
    return this.chat(message)
  }

  async explainSICR(customerData: any): Promise<string> {
    const message = `
      Analyze this customer data for Significant Increase in Credit Risk (SICR):
      ${JSON.stringify(customerData, null, 2)}
      
      Should this be staged as Stage 1 or Stage 2? Explain the reasoning.
    `
    return this.chat(message)
  }

  async generateAuditNote(calculation: any): Promise<string> {
    const message = `
      Generate an audit note explaining this ECL calculation:
      ${JSON.stringify(calculation, null, 2)}
      
      Include methodology, assumptions, and validation comments.
    `
    return this.chat(message)
  }
}

export const grokClient = new GrokClient()
export default grokClient