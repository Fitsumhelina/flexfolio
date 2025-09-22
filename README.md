# FlexFolio - Portfolio Builder SaaS

A modern, no-code portfolio builder that allows users to create stunning portfolio websites in minutes. Built with Next.js, TypeScript, and MongoDB.

## 🚀 Features

- **Free Forever**: No payment required, completely free to use
- **No Code Required**: Drag-and-drop interface for easy customization
- **Beautiful Templates**: Professionally designed portfolio templates
- **Custom URLs**: Get your own unique URL like `flexfolio.com/username`
- **Real-time Preview**: See changes instantly as you build
- **Responsive Design**: Works perfectly on all devices
- **Fast Performance**: Built with Next.js for optimal speed

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **UI Components**: Radix UI, Lucide React
- **Authentication**: Custom JWT-based auth (demo implementation)
- **Database**: MongoDB with Mongoose


## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flexfolio
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Add your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/flexfolio
```

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How It Works

### For Users

1. **Sign Up**: Create a free account with email and username
2. **Choose Template**: Select from beautiful portfolio templates
3. **Customize**: Edit your about section, add projects and skills
4. **Publish**: Your portfolio goes live at `flexfolio.com/username`

### For Developers

The platform is built with a modular architecture:

- **Landing Page**: Showcases the platform with demo portfolio
- **Authentication**: User registration and login system
- **Dashboard**: Portfolio management interface
- **Dynamic Routing**: User portfolios accessible via `/username`
- **API Routes**: RESTful endpoints for data management

## 🔧 Key Features

### User Registration & Authentication
- Email-based registration
- Username validation
- Secure password handling (demo implementation)
- Session management with localStorage

### Portfolio Management
- About section editor with live preview
- Project management (coming soon)
- Skills management (coming soon)
- Theme customization (coming soon)

### Dynamic Portfolio Display
- Custom URLs for each user
- Responsive design
- SEO-friendly structure
- Fast loading times

## 🎨 Customization

The platform supports extensive customization:

- **Themes**: Multiple color schemes and layouts
- **Content**: Full control over about, projects, and skills
- **Styling**: Custom CSS support (coming soon)
- **Domain**: Custom domain support (coming soon)

## 📱 Demo

Visit the live demo at [https://dev-fitsum.vercel.app](https://dev-fitsum.vercel.app) to see a sample portfolio.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support, email support@flexfolio.com or create an issue in the repository.

---

Built with ❤️ using Next.js and modern web technologies.