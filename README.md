# Faras Alghani's Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive
- 🌙 Dark mode support
- ⚡ Fast and optimized performance
- 🎭 Smooth animations with Framer Motion
- 📊 Dynamic GitHub projects section
- 📧 Contact form
- 🔍 SEO optimized

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Intersection Observer](https://github.com/thebuilder/react-intersection-observer) - Scroll animations
- [Axios](https://axios-http.com/) - HTTP client

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/farasalgh/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

1. Update your personal information in the components:
   - `src/components/Hero.tsx` - Update name and introduction
   - `src/components/About.tsx` - Update bio and skills
   - `src/components/Contact.tsx` - Update social links and email

2. Customize the color scheme in `tailwind.config.ts`

3. Update the GitHub username in `src/components/Projects.tsx` to fetch your repositories

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
