# Mapbox Draw App

A React application built with Vite that integrates Mapbox GL JS and Mapbox GL Draw for interactive map drawing functionality. The application uses MobX for state management and modern React practices.

## Features

- Interactive map visualization using Mapbox GL JS
- Drawing tools for creating and editing map features
- State management with MobX
- Modern React development with Vite
- ESLint configuration for code quality

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- A Mapbox access token

## Getting Started

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd mapbox-draw-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Mapbox access token:
   ```
   VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
mapbox-draw-app/
├── src/              # Source files
├── public/           # Static assets
├── .env              # Environment variables
├── vite.config.js    # Vite configuration
└── eslint.config.js  # ESLint configuration
```

## Dependencies

### Main Dependencies
- React 19
- Mapbox GL JS
- Mapbox GL Draw
- MobX
- MobX React Lite

### Development Dependencies
- Vite
- ESLint
- TypeScript types for React

## Configuration

### Vite
The project uses Vite for fast development and building. Configuration can be found in `vite.config.js`.

### ESLint
ESLint is configured for code quality and consistency. Configuration can be found in `eslint.config.js`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
