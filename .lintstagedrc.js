module.exports = {
  // Run TypeScript type checking on all staged TypeScript files
  "**/*.{ts,tsx}": () => "tsc --noEmit",

  // Run ESLint on staged TypeScript/JavaScript files (only fail on errors, not warnings)
  // Exclude ecosystem.config.js as it needs CommonJS for PM2 compatibility
  "**/*.{ts,tsx,js,jsx}": (filenames) => {
    const filteredFiles = filenames.filter(
      (file) => !file.includes("ecosystem.config.js")
    );
    if (filteredFiles.length === 0) return 'echo "No files to lint"';
    return `eslint --max-warnings 0 ${filteredFiles.join(" ")}`;
  },

  // Run Prettier on staged files (optional, uncomment if you want formatting)
  // '**/*.{ts,tsx,js,jsx,json,css,md}': (filenames) => `prettier --write ${filenames.join(' ')}`,
};
