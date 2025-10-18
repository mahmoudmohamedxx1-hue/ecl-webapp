"use client"

import { useState } from 'react'

interface GrokResponse {
  content: string
  error?: string
}

export function useGrok() {
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (message: string): Promise<string> => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/grok/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: GrokResponse = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      return data.content
    } catch (error) {
      console.error('Grok API error:', error)
      throw new Error('Failed to get response from Grok')
    } finally {
      setIsLoading(false)
    }
  }

  const suggestMacroScenarios = async (context: any): Promise<string> => {
    const message = `Based on the Egyptian economic context and S&P report data, suggest appropriate macro scenarios for ECL calculation. Context: ${JSON.stringify(context)}`
    return sendMessage(message)
  }

  const suggestParameters = async (segment: string, assetType: string): Promise<string> => {
    const message = `Suggest appropriate PD, LGD, and EAD parameters for ${segment} segment, ${assetType} assets in the Egyptian market context.`
    return sendMessage(message)
  }

  const explainCalculation = async (calculation: any): Promise<string> => {
    const message = `Explain this ECL calculation result and validate if it appears reasonable: ${JSON.stringify(calculation)}`
    return sendMessage(message)
  }

  return {
    sendMessage,
    suggestMacroScenarios,
    suggestParameters,
    explainCalculation,
    isLoading,
  }
}