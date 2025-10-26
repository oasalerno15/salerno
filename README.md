# Living Fluid Hero Component

A beautiful, interactive 3D hero section built with React Three Fiber, featuring fluid animations and responsive design.

## 🚀 Features

- **Interactive 3D Fluid Animation**: Mouse-responsive fluid surface using custom shaders
- **Framer Motion Integration**: Smooth text animations and transitions
- **Dark Mode Support**: Automatic theme detection with different color schemes
- **Responsive Design**: Works beautifully on all screen sizes
- **TypeScript Support**: Fully typed for better development experience
- **Tailwind CSS**: Modern styling with utility classes
- **shadcn/ui Integration**: Clean component architecture

## 🛠️ Tech Stack

- **Next.js 15** with App Router
- **React Three Fiber** for 3D rendering
- **Three.js** for 3D graphics and shaders
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **shadcn/ui** for component structure
- **TypeScript** for type safety

## 📦 Installation

The project is already set up with all dependencies. To run it:

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Usage

### Basic Usage

```tsx
import { LivingFluidHero } from "@/components/ui/living-fluid-hero";

export default function HomePage() {
  return <LivingFluidHero />;
}
```

### Available Routes

- `/` - Main page with hero and info section
- `/demo` - Clean demo page with just the hero component

## 🔧 Component Structure

### File Organization

```
src/
├── components/
│   └── ui/
│       └── living-fluid-hero.tsx    # Main component
├── app/
│   ├── page.tsx                     # Home page
│   ├── demo/
│   │   └── page.tsx                 # Demo page
│   ├── layout.tsx                   # Root layout
│   └── globals.css                  # Global styles
└── lib/
    └── utils.ts                     # Utility functions
```

### Component Features

1. **FluidMaterial**: Custom shader material with:
   - Simplex noise for fluid motion
   - Mouse interaction
   - Color customization
   - Dynamic blending modes

2. **FluidScene**: 3D scene component with:
   - Icosahedron geometry
   - Real-time animation
   - Mouse tracking
   - Theme-responsive colors

3. **HeroNav**: Navigation component with:
   - Fade-in animation
   - Brand logo
   - Responsive design

4. **LivingFluidHero**: Main component with:
   - Animated text reveals
   - Call-to-action button
   - Full-screen layout

## 🎨 Customization

### Colors

The component automatically adapts to light/dark mode:

**Light Mode:**
- Primary: Orange (#ffae00 → #ff5e00)
- Blending: Normal

**Dark Mode:**
- Primary: Purple (#8A2BE2 → #4B0082)
- Blending: Additive
- Transparency: Enabled

### Shader Parameters

You can customize the fluid behavior by modifying:

```tsx
// In FluidMaterial
{
  uTime: 0,              // Animation time
  uMouse: Vector2,       // Mouse position
  uColorA: Color,        // Primary color
  uColorB: Color,        // Secondary color
}
```

### Animation Timing

Customize text and button animations:

```tsx
// Text stagger delay
delay: i * 0.1 + 1.5

// Button fade-in delay
delay: 2.5
```

## 🔍 Development

### Adding New Dependencies

```bash
# Three.js related
npm install three @types/three
npm install @react-three/fiber @react-three/drei

# Animation
npm install framer-motion

# UI Components (if needed)
npx shadcn@latest add button
```

### Custom Shader Development

The component uses a custom shader material. To modify:

1. Edit the vertex shader for geometry manipulation
2. Edit the fragment shader for color/appearance
3. Add new uniforms as needed
4. Update TypeScript types accordingly

### Performance Optimization

- Uses `useMemo` for color calculations
- Implements proper cleanup for event listeners
- Leverages Suspense for loading states
- Optimized geometry with controlled subdivision

## 🐛 Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure all Three.js types are properly defined
2. **Shader Compilation**: Check browser console for WebGL errors
3. **Performance**: Reduce geometry subdivision if needed
4. **Mobile Compatibility**: Ensure WebGL support on target devices

### ESLint Configuration

The project includes proper ESLint rules for:
- TypeScript strict mode
- React best practices
- Three.js custom materials

## 📱 Browser Support

- Modern browsers with WebGL support
- Mobile browsers (iOS Safari, Chrome Android)
- Progressive enhancement for older browsers

## 🚦 Getting Started

1. **View the Demo**: Visit `http://localhost:3000` after running `npm run dev`
2. **Explore the Code**: Check `/src/components/ui/living-fluid-hero.tsx`
3. **Customize**: Modify colors, animations, or geometry as needed
4. **Deploy**: Build with `npm run build` and deploy to your platform

## 📄 License

This project is part of a coding demonstration and is available for educational purposes.

---

Built with ❤️ using Next.js, React Three Fiber, and modern web technologies.