-- ECL Webapp Database Schema
-- IFRS 9 Expected Credit Loss Calculation Platform

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Workspaces: Client organizations
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT TRUE
);

-- Policy Models: ECL calculation templates and parameters
CREATE TABLE policy_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  version TEXT DEFAULT 'v1.0',
  description TEXT,
  model_type TEXT NOT NULL CHECK (model_type IN ('provision_matrix', 'general_model')),
  segments JSONB NOT NULL DEFAULT '[]',
  default_parameters JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Portfolios: ECL calculation runs (e.g., "Q4 2025")
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  policy_model_id UUID NOT NULL REFERENCES policy_models(id),
  name TEXT NOT NULL,
  reporting_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_raw_data_review' CHECK (
    status IN (
      'pending_raw_data_review',
      'pending_mapping',
      'pending_segmentation_review',
      'pending_parameter_review',
      'pending_scenario_review',
      'pending_final_approval',
      'complete',
      'error'
    )
  ),
  final_ecl_amount NUMERIC(15,2),
  currency TEXT DEFAULT 'EGP',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Portfolio Staging Data: Raw data curation workspace
CREATE TABLE portfolio_staging_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  row_number INTEGER NOT NULL,
  customer_id TEXT,
  customer_name TEXT,
  product_type TEXT,
  original_amount NUMERIC(15,2),
  current_balance NUMERIC(15,2),
  days_past_due INTEGER DEFAULT 0,
  aging_bucket TEXT,
  currency TEXT DEFAULT 'EGP',
  origination_date DATE,
  maturity_date DATE,
  interest_rate NUMERIC(8,4),
  collateral_type TEXT,
  collateral_value NUMERIC(15,2),
  segment_assigned TEXT,
  is_validated BOOLEAN DEFAULT FALSE,
  validation_errors JSONB DEFAULT '[]',
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Segment Mapping Rules: Reusable rules for auto-mapping
CREATE TABLE segment_mapping_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  conditions JSONB NOT NULL,
  target_segment TEXT NOT NULL,
  priority INTEGER DEFAULT 100,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio Parameter Overrides: Manual edits for specific runs
CREATE TABLE portfolio_parameter_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  segment TEXT NOT NULL,
  parameter_type TEXT NOT NULL CHECK (
    parameter_type IN ('pd', 'lgd', 'ead', 'haircut', 'scenario_weight')
  ),
  aging_bucket TEXT,
  original_value NUMERIC(10,6),
  override_value NUMERIC(10,6) NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- ECL Results Unverified: Calculation results for review
CREATE TABLE ecl_results_unverified (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  staging_data_id UUID REFERENCES portfolio_staging_data(id),
  segment TEXT NOT NULL,
  aging_bucket TEXT,
  scenario TEXT NOT NULL,
  pd_rate NUMERIC(10,6),
  lgd_rate NUMERIC(10,6),
  ead_amount NUMERIC(15,2),
  ecl_amount NUMERIC(15,2),
  calculation_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio Review Log: Audit trail of manual approvals
CREATE TABLE portfolio_review_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  stage TEXT NOT NULL,
  action TEXT NOT NULL,
  details JSONB,
  approved_by UUID NOT NULL REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  comments TEXT
);

-- Generated Reports: Final PDF/VBA file storage
CREATE TABLE generated_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL CHECK (report_type IN ('audit_pdf', 'excel_macro')),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  generated_by UUID REFERENCES auth.users(id)
);

-- Create indexes for performance
CREATE INDEX idx_portfolios_workspace_id ON portfolios(workspace_id);
CREATE INDEX idx_portfolios_status ON portfolios(status);
CREATE INDEX idx_staging_data_portfolio_id ON portfolio_staging_data(portfolio_id);
CREATE INDEX idx_staging_data_segment ON portfolio_staging_data(segment_assigned);
CREATE INDEX idx_ecl_results_portfolio_id ON ecl_results_unverified(portfolio_id);
CREATE INDEX idx_review_log_portfolio_id ON portfolio_review_log(portfolio_id);
CREATE INDEX idx_mapping_rules_workspace_id ON segment_mapping_rules(workspace_id);

-- Update timestamps trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add update triggers
CREATE TRIGGER update_workspaces_updated_at 
  BEFORE UPDATE ON workspaces 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_policy_models_updated_at 
  BEFORE UPDATE ON policy_models 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at 
  BEFORE UPDATE ON portfolios 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_staging_data_updated_at 
  BEFORE UPDATE ON portfolio_staging_data 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_mapping_rules_updated_at 
  BEFORE UPDATE ON segment_mapping_rules 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Row Level Security Policies
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_staging_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE segment_mapping_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_parameter_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecl_results_unverified ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_review_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_reports ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (authenticated users can access their data)
CREATE POLICY "Users can view workspaces they have access to" ON workspaces
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can manage portfolios in their workspaces" ON portfolios
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can manage policy models" ON policy_models
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can manage staging data" ON portfolio_staging_data
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can manage mapping rules" ON segment_mapping_rules
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can manage parameter overrides" ON portfolio_parameter_overrides
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view ECL results" ON ecl_results_unverified
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view review logs" ON portfolio_review_log
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view generated reports" ON generated_reports
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Insert default policy models based on Egyptian ECL guidelines
INSERT INTO workspaces (id, name, description) 
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Demo Workspace', 'Demonstration workspace for ECL calculations');

INSERT INTO policy_models (id, workspace_id, name, model_type, segments, default_parameters) 
VALUES 
  (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Egyptian SME Matrix v1.0',
    'provision_matrix',
    '[
      {"name": "Government", "description": "Government entities and public sector"},
      {"name": "Corporate", "description": "Large corporate clients (revenue > EGP 100M)"},
      {"name": "SME", "description": "Small and medium enterprises"},
      {"name": "Retail", "description": "Retail distributors and individual clients"}
    ]',
    '{
      "aging_buckets": ["0-30", "31-60", "61-90", "91-180", ">180"],
      "base_rates": {
        "Government": {"0-30": 0.07, "31-60": 0.15, "61-90": 0.43, "91-180": 1.34, ">180": 4.86},
        "Corporate": {"0-30": 0.50, "31-60": 1.50, "61-90": 3.50, "91-180": 8.00, ">180": 25.00},
        "SME": {"0-30": 1.50, "31-60": 3.50, "61-90": 7.00, "91-180": 15.00, ">180": 45.00},
        "Retail": {"0-30": 2.50, "31-60": 5.50, "61-90": 12.00, "91-180": 28.00, ">180": 65.00}
      },
      "forward_looking_multipliers": {
        "GDP_sensitivity": -0.20,
        "Inflation_sensitivity": 0.12,
        "Unemployment_sensitivity": 0.15
      }
    }'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Egyptian General Model v1.0',
    'general_model',
    '[
      {"name": "Secured-RealEstate", "description": "Loans secured by real estate"},
      {"name": "Secured-Equipment", "description": "Loans secured by equipment"},
      {"name": "Unsecured-Corporate", "description": "Unsecured corporate loans"},
      {"name": "RelatedParty-Parent", "description": "Related party loans to parent companies"},
      {"name": "RelatedParty-Subsidiary", "description": "Related party loans to subsidiaries"}
    ]',
    '{
      "pd_ranges": {
        "Investment_Grade": {"12m": 0.15, "lifetime": 0.60},
        "Sub_Investment": {"12m": 2.50, "lifetime": 7.50},
        "Speculative": {"12m": 8.00, "lifetime": 24.00}
      },
      "lgd_rates": {
        "Secured-RealEstate": 25,
        "Secured-Equipment": 55,
        "Unsecured-Corporate": 65,
        "RelatedParty-Parent": 10,
        "RelatedParty-Subsidiary": 45
      },
      "haircut_components": {
        "RealEstate": {"market_volatility": 15, "liquidity": 20, "legal": 10, "time_decay": 5},
        "Equipment": {"market_volatility": 25, "liquidity": 30, "legal": 15, "time_decay": 10}
      }
    }'
  );