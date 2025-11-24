# PlotTrust - Real Estate Verification Platform

A modern web application for land property verification in Gujarat, India. PlotTrust helps users verify property details, analyze legal documents, and visualize properties on interactive maps with TP (Town Planning) scheme overlays.

## 🌟 Features

### Core Functionality
- **Land-Only Focus**: Specialized in land property verification (Agricultural, Non-Agricultural, Industrial, Residential)
- **Government Data Simulation**: Mock verification against Survey Numbers, TP Schemes, and Final Plot Numbers
- **Interactive Maps**: Leaflet-based maps with satellite/street view toggle and TP map overlay with opacity control
- **Document Analysis**: Upload and analyze 7/12 or Index-2 documents for instant legal reports
- **Unit Converter**: Convert between Vigha, Guntha, and Square Feet (Gujarat standards)

### User Experience
- **Multilingual Support**: English, Gujarati (ગુજરાતી), and Hindi (हिंदी)
- **Mobile-First Design**: Responsive design optimized for mobile devices
- **Modern UI**: Glassmorphism effects, smooth animations, and premium aesthetics
- **Secure Authentication**: Phone-based OTP verification with mock Google Sign-In

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Maps**: Leaflet & React-Leaflet
- **Icons**: Lucide React
- **State Management**: React Context API

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/plot-trust.git

# Navigate to project directory
cd plot-trust

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Usage

1. **Sign In**: Enter your phone number to receive an OTP (check console for the OTP)
2. **Browse Properties**: View your watchlist of land properties
3. **Map View**: Visualize properties on an interactive map with TP overlay
4. **Add Property**: Search for properties by Village and Survey Number
5. **Analyze Documents**: Upload property documents for instant verification
6. **Convert Units**: Use the built-in converter for Vigha ↔ Guntha ↔ Sqft

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Key Components

- **Authentication**: Phone OTP and Google Sign-In (mock)
- **Dashboard**: Central hub with bottom navigation
- **Property List**: Card-based property display with status badges
- **Map View**: Interactive Leaflet map with custom markers
- **Unit Converter**: Real-time bidirectional conversion
- **Document Analyzer**: Simulated document verification

## 🌍 Conversion Standards (Gujarat)

- 1 Vigha = 3,025 Square Feet
- 1 Guntha = 1,089 Square Feet
- 1 Vigha ≈ 2.78 Guntha

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for real estate verification in India.

---

**Note**: This is a demonstration project with simulated data. For production use, integrate with actual government APIs and databases.
