export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
          created_by: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          is_active?: boolean
        }
      }
      policy_models: {
        Row: {
          id: string
          workspace_id: string
          name: string
          version: string
          description: string | null
          model_type: 'provision_matrix' | 'general_model'
          segments: Json
          default_parameters: Json
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          workspace_id: string
          name: string
          version?: string
          description?: string | null
          model_type: 'provision_matrix' | 'general_model'
          segments?: Json
          default_parameters?: Json
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          workspace_id?: string
          name?: string
          version?: string
          description?: string | null
          model_type?: 'provision_matrix' | 'general_model'
          segments?: Json
          default_parameters?: Json
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
      portfolios: {
        Row: {
          id: string
          workspace_id: string
          policy_model_id: string
          name: string
          reporting_date: string
          status: PortfolioStatus
          final_ecl_amount: number | null
          currency: string
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          workspace_id: string
          policy_model_id: string
          name: string
          reporting_date: string
          status?: PortfolioStatus
          final_ecl_amount?: number | null
          currency?: string
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          workspace_id?: string
          policy_model_id?: string
          name?: string
          reporting_date?: string
          status?: PortfolioStatus
          final_ecl_amount?: number | null
          currency?: string
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      portfolio_staging_data: {
        Row: {
          id: string
          portfolio_id: string
          row_number: number
          customer_id: string | null
          customer_name: string | null
          product_type: string | null
          original_amount: number | null
          current_balance: number | null
          days_past_due: number
          aging_bucket: string | null
          currency: string
          origination_date: string | null
          maturity_date: string | null
          interest_rate: number | null
          collateral_type: string | null
          collateral_value: number | null
          segment_assigned: string | null
          is_validated: boolean
          validation_errors: Json
          raw_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          portfolio_id: string
          row_number: number
          customer_id?: string | null
          customer_name?: string | null
          product_type?: string | null
          original_amount?: number | null
          current_balance?: number | null
          days_past_due?: number
          aging_bucket?: string | null
          currency?: string
          origination_date?: string | null
          maturity_date?: string | null
          interest_rate?: number | null
          collateral_type?: string | null
          collateral_value?: number | null
          segment_assigned?: string | null
          is_validated?: boolean
          validation_errors?: Json
          raw_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          portfolio_id?: string
          row_number?: number
          customer_id?: string | null
          customer_name?: string | null
          product_type?: string | null
          original_amount?: number | null
          current_balance?: number | null
          days_past_due?: number
          aging_bucket?: string | null
          currency?: string
          origination_date?: string | null
          maturity_date?: string | null
          interest_rate?: number | null
          collateral_type?: string | null
          collateral_value?: number | null
          segment_assigned?: string | null
          is_validated?: boolean
          validation_errors?: Json
          raw_data?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      segment_mapping_rules: {
        Row: {
          id: string
          workspace_id: string
          name: string
          description: string | null
          conditions: Json
          target_segment: string
          priority: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          name: string
          description?: string | null
          conditions: Json
          target_segment: string
          priority?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          name?: string
          description?: string | null
          conditions?: Json
          target_segment?: string
          priority?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      portfolio_parameter_overrides: {
        Row: {
          id: string
          portfolio_id: string
          segment: string
          parameter_type: 'pd' | 'lgd' | 'ead' | 'haircut' | 'scenario_weight'
          aging_bucket: string | null
          original_value: number | null
          override_value: number
          reason: string | null
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          portfolio_id: string
          segment: string
          parameter_type: 'pd' | 'lgd' | 'ead' | 'haircut' | 'scenario_weight'
          aging_bucket?: string | null
          original_value?: number | null
          override_value: number
          reason?: string | null
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          portfolio_id?: string
          segment?: string
          parameter_type?: 'pd' | 'lgd' | 'ead' | 'haircut' | 'scenario_weight'
          aging_bucket?: string | null
          original_value?: number | null
          override_value?: number
          reason?: string | null
          created_at?: string
          created_by?: string | null
        }
      }
      ecl_results_unverified: {
        Row: {
          id: string
          portfolio_id: string
          staging_data_id: string | null
          segment: string
          aging_bucket: string | null
          scenario: string
          pd_rate: number | null
          lgd_rate: number | null
          ead_amount: number | null
          ecl_amount: number | null
          calculation_details: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          portfolio_id: string
          staging_data_id?: string | null
          segment: string
          aging_bucket?: string | null
          scenario: string
          pd_rate?: number | null
          lgd_rate?: number | null
          ead_amount?: number | null
          ecl_amount?: number | null
          calculation_details?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          portfolio_id?: string
          staging_data_id?: string | null
          segment?: string
          aging_bucket?: string | null
          scenario?: string
          pd_rate?: number | null
          lgd_rate?: number | null
          ead_amount?: number | null
          ecl_amount?: number | null
          calculation_details?: Json | null
          created_at?: string
        }
      }
      portfolio_review_log: {
        Row: {
          id: string
          portfolio_id: string
          stage: string
          action: string
          details: Json | null
          approved_by: string
          approved_at: string
          comments: string | null
        }
        Insert: {
          id?: string
          portfolio_id: string
          stage: string
          action: string
          details?: Json | null
          approved_by: string
          approved_at?: string
          comments?: string | null
        }
        Update: {
          id?: string
          portfolio_id?: string
          stage?: string
          action?: string
          details?: Json | null
          approved_by?: string
          approved_at?: string
          comments?: string | null
        }
      }
      generated_reports: {
        Row: {
          id: string
          portfolio_id: string
          report_type: 'audit_pdf' | 'excel_macro'
          file_name: string
          file_path: string
          file_size: number | null
          generated_at: string
          generated_by: string | null
        }
        Insert: {
          id?: string
          portfolio_id: string
          report_type: 'audit_pdf' | 'excel_macro'
          file_name: string
          file_path: string
          file_size?: number | null
          generated_at?: string
          generated_by?: string | null
        }
        Update: {
          id?: string
          portfolio_id?: string
          report_type?: 'audit_pdf' | 'excel_macro'
          file_name?: string
          file_path?: string
          file_size?: number | null
          generated_at?: string
          generated_by?: string | null
        }
      }
    }
  }
}

export type PortfolioStatus = 
  | 'pending_raw_data_review'
  | 'pending_mapping'
  | 'pending_segmentation_review'
  | 'pending_parameter_review'
  | 'pending_scenario_review'
  | 'pending_final_approval'
  | 'complete'
  | 'error'

export type Workspace = Database['public']['Tables']['workspaces']['Row']
export type PolicyModel = Database['public']['Tables']['policy_models']['Row']
export type Portfolio = Database['public']['Tables']['portfolios']['Row']
export type StagingData = Database['public']['Tables']['portfolio_staging_data']['Row']
export type MappingRule = Database['public']['Tables']['segment_mapping_rules']['Row']
export type ParameterOverride = Database['public']['Tables']['portfolio_parameter_overrides']['Row']
export type ECLResult = Database['public']['Tables']['ecl_results_unverified']['Row']
export type ReviewLog = Database['public']['Tables']['portfolio_review_log']['Row']
export type GeneratedReport = Database['public']['Tables']['generated_reports']['Row']

// ECL Calculation Types
export interface ECLParameters {
  pd: number // Probability of Default (%)
  lgd: number // Loss Given Default (%)
  ead: number // Exposure at Default (amount)
}

export interface AgingBucket {
  name: string
  min_days: number
  max_days: number | null
}

export interface SegmentConfig {
  name: string
  description: string
  aging_buckets: AgingBucket[]
  base_rates: Record<string, number>
}

export interface MacroScenario {
  name: string
  probability: number
  gdp_growth: number
  inflation: number
  unemployment: number
  multipliers: Record<string, number>
}

export interface HaircutComponents {
  market_volatility: number
  liquidity: number
  legal_uncertainty: number
  time_decay: number
}

export interface CollateralAssessment {
  type: string
  appraised_value: number
  haircut_components: HaircutComponents
  net_recovery_value: number
  lgd_rate: number
}