# Pha5e Hero Section Recreation

A pixel-perfect recreation of the Phase website hero section, featuring smooth animations, interactive elements, and vector-like transformations.

## Features

### Initial Animation
- Smooth entrance animations for text and images
- Staggered reveal effects
- Fade-in transitions with upward movement
- Dynamic loading screen with progress indicator

### Hover Interactions
- Vector-like image transformations
  - Grayscale effect for non-hovered images
  - Opacity and contrast adjustments
  - Smooth transitions between states
- Interactive text effects
  - Underline animations
  - Scale transformations
  - Color transitions
  - Glitch effects

### Mouse Movement Effects
- Dynamic image following cursor
- Perspective transformations
- Magnetic effect towards cursor
- Smooth rotation based on mouse position
- Depth-based interactions

### Additional Features
- Custom animated cursor
- Responsive design across all devices
- Optimized performance
- Modern CSS animations
- Interactive loading screen

## Technologies Used
- HTML5
- CSS3 (with modern properties)
- JavaScript (ES6+)
- GSAP (GreenSock Animation Platform)
- Bootstrap 5

## Project Structure
```
.
├── index.html          # Main HTML structure
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript and GSAP animations
└── assets/            # Image assets
    ├── hero-1.jpg     # Featured image
    ├── hero-2.jpg     # Grid image 1
    └── hero-3.jpg     # Grid image 2
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory:
   ```bash
   cd phase-hero-section
   ```

3. Add your images to the `assets` folder:
   - Ensure images follow the naming convention: hero-1.jpg, hero-2.jpg, hero-3.jpg
   - Recommended aspect ratio: 16:9 for optimal display

4. Open `index.html` in a modern web browser

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Colors
Modify the root variables in `styles.css`:
```css
:root {
    --primary-color: #000;
    --secondary-color: #fff;
    --accent-color: #888;
}
```

### Animations
Adjust timing in `styles.css`:
```css
:root {
    --transition-duration: 0.6s;
}
```

### Images
- Replace images in the `assets` folder
- Maintain 16:9 aspect ratio
- Recommended resolution: 1920x1080px

## Performance Considerations
- Optimized image loading
- Efficient CSS animations
- Minimal JavaScript overhead
- Responsive image scaling
- Smooth transitions

## Credits
- Design inspiration: Phase Website
- Animation library: GSAP by GreenSock
- UI Framework: Bootstrap 5 
