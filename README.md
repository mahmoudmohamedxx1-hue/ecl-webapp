# ECL Webapp - IFRS 9 Expected Credit Loss Calculation Platform

A comprehensive, AI-powered web application for financial analysts to calculate Expected Credit Loss (ECL) according to IFRS 9 standards. Built as a "human-in-the-loop" workbench with three mandatory manual review gates.

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js with TypeScript
- **UI Library**: shadcn/ui components with Tailwind CSS
- **Layout**: Persistent sidebar navigation with main content area
- **AI Assistant**: Grok integration with floating chat interface

### Backend Services
- **Database**: Supabase PostgreSQL with real-time subscriptions
- **Authentication**: Supabase Auth
- **AI Brain**: Grok API integration for contextual assistance
- **Background Processing**: Inngest for asynchronous tasks
- **File Storage**: Supabase Storage for Excel files and reports

## 📋 Features

### Core Workflow
1. **Data Curation Gate**: Upload and validate receivables data
2. **Segment Mapping Gate**: Auto-map assets to risk segments
3. **Calculation Review Gate**: Multi-step ECL calculation and approval

### AI-Powered Assistance
- **Contextual Chat**: "Grok, what's a typical haircut for commercial real estate?"
- **Magic Buttons**: AI suggestions for macro scenarios and parameters
- **Automated Auditing**: Sanity checks and validation
- **Report Generation**: Automated PDF reports and VBA macros

### Professional Features
- Multi-workspace support for different clients
- Comprehensive audit trails
- Real-time collaboration
- Export to Excel and PDF
- Regulatory compliance tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Grok API access
- Inngest account

### Installation

```bash
# Clone the repository
git clone https://github.com/mahmoudmohamedxx1-hue/ecl-webapp.git
cd ecl-webapp

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run database migrations
npm run db:migrate

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

### Core Tables
- **workspaces**: Client organizations
- **portfolios**: ECL calculation runs
- **policy_models**: ECL calculation templates and parameters
- **portfolio_staging_data**: Raw data curation workspace
- **segment_mapping_rules**: Automated mapping configurations
- **portfolio_parameter_overrides**: Manual parameter adjustments
- **ecl_results_unverified**: Calculation results for review
- **portfolio_review_log**: Complete audit trail
- **generated_reports**: Final PDF and VBA file storage

## 🎯 Usage

### 1. Create Workspace
Set up a new client workspace for ECL calculations.

### 2. Start ECL Run
Initiate a new ECL calculation cycle (e.g., "Q4 2025").

### 3. Gate 1: Data Curation
- Upload receivables Excel file
- Clean and validate data in interactive grid
- Run validation checks
- Approve and lock data

### 4. Gate 2: Segment Mapping
- Review auto-mapped segments
- Manually assign unmapped items
- Bulk operations for efficiency
- Confirm segment assignments

### 5. Gate 3: Calculation Review
- **3a**: Review segmentation totals
- **3b**: Override default parameters (PD, LGD, haircuts)
- **3c**: Review scenario calculations
- **3d**: Final approval and ECL lock

### 6. Generate Reports
Download comprehensive audit reports and Excel macros.

## 🤖 Grok AI Integration

### Chat Assistant Features
- Answer methodology questions
- Provide regulatory guidance
- Suggest parameter values
- Explain calculation results

### Magic Button Examples
- "Suggest Macro Scenarios" based on S&P Egypt report
- "Auto-fill LGD Haircuts" using market data
- "Generate Parameter Explanations" for audit documentation

## 📁 Project Structure

```
ecl-webapp/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layout/         # Layout components
│   │   ├── gates/          # ECL workflow gates
│   │   └── charts/         # Data visualization
│   ├── lib/                # Utilities and configurations
│   │   ├── supabase/       # Database client
│   │   ├── grok/           # AI integration
│   │   └── inngest/        # Background jobs
│   └── types/              # TypeScript definitions
├── supabase/
│   ├── migrations/         # Database schema
│   └── functions/          # Edge functions
├── inngest/                # Background job definitions
and docs/                   # Documentation
```

## 🔧 Configuration

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Grok AI
GROK_API_KEY=your_grok_api_key
GROK_API_URL=https://api.x.ai/v1

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

## 📈 Features Roadmap

- [ ] Advanced scenario modeling
- [ ] Real-time collaboration
- [ ] Mobile-responsive design
- [ ] Advanced data visualization
- [ ] Integration with accounting systems
- [ ] Multi-currency support
- [ ] Advanced AI recommendations

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📞 Support

For support and questions, please open an issue or contact our team.

---

**Built for Egyptian financial institutions with IFRS 9 compliance requirements**