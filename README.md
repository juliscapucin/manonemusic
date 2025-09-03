# ManOne Music

A modern portfolio website showcasing the work of music producer and sound designer **Matt Rudge** (aka ManOneMusic). The site features an immersive experience highlighting original music compositions, sound design work, and audio identity services for films, commercials, releases, and creative projects.

## About ManOne Music

ManOne Music specializes in creating tailored sound design and audio identities that capture the spirit of brands and resonate with audiences. Led by composer Matt Rudge, the studio offers:

- **Original Music Composition** - Custom scores for films, commercials, and media projects
- **Sound Design** - Immersive audio experiences and sound effects
- **Audio Branding** - Unique sonic identities for brands and products
- **Music Production** - Professional recording, mixing, and mastering services

## Features

- 🎵 **Portfolio Showcase** - Organized sections for films, commercials, releases, and projects
- 🎨 **Immersive Design** - Custom animations and smooth interactions using GSAP
- 📱 **Responsive Experience** - Optimized for all devices and screen sizes
- 🎬 **Media Integration** - Embedded video players for Vimeo and other platforms
- 🎛️ **Content Management** - Powered by Sanity CMS for easy content updates
- ⚡ **Performance** - Built with Next.js for optimal loading and SEO

## Tech Stack

- **Framework**: [Next.js 15.3.1](https://nextjs.org/) with React 19.1.0
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [Sanity](https://www.sanity.io/)
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Media Players**: Vimeo Player, React Player
- **Font**: PP Supply Mono (custom font)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/juliscapucin/manonemusic.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd manonemusic
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add your Sanity configuration:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_dataset_name
   ```

## Development

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

3. **Access Sanity Studio**
   
   Visit [http://localhost:3000/admin](http://localhost:3000/admin) to manage content through the Sanity Studio interface.

### Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── app/
│   ├── (sanity)/          # Sanity Studio admin interface
│   └── (site)/            # Main website pages
├── components/            # Reusable React components
├── sanity/               # Sanity CMS configuration and schemas
├── types/                # TypeScript type definitions
└── utils/                # Utility functions and constants

public/
├── fonts/                # Custom fonts (PP Supply Mono)
└── ...                   # Static assets
```

## Deployment

The application is optimized for deployment on [Vercel](https://vercel.com/), the platform created by the makers of Next.js:

1. **Deploy to Vercel**
   ```bash
   vercel deploy
   ```

2. **Set Environment Variables**
   
   Configure your Sanity environment variables in the Vercel dashboard.

3. **Custom Domain** (Optional)
   
   Configure your custom domain in the Vercel project settings.

For other deployment platforms, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Contributing

This is a personal portfolio website for ManOne Music. If you'd like to report issues or suggest improvements, please open an issue in the GitHub repository.

## Contact

- **Website**: [ManOne Music](https://manonemusic.com) *(when deployed)*
- **Location**: London
- **Email**: Contact through the website's contact form

---

Built with ❤️ using Next.js and modern web technologies to showcase exceptional music and sound design.
