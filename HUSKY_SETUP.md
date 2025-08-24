# Husky Pre-commit Setup

This project uses Husky with pre-commit hooks to ensure code quality before commits. The setup automatically runs TypeScript type checking and ESLint on staged files.

## What it does

- **TypeScript Type Checking**: Runs `tsc --noEmit` on all staged TypeScript files
- **ESLint**: Runs ESLint on staged TypeScript/JavaScript files (fails on errors, allows warnings)
- **Pre-commit Hook**: Automatically runs these checks before each commit
- **PM2 Compatibility**: Excludes `ecosystem.config.js` from linting (needs CommonJS for PM2)

## How it works

1. When you try to commit, Husky automatically runs the pre-commit hook
2. The hook executes `lint-staged` which only checks files that are staged for commit
3. If any TypeScript errors or ESLint errors are found, the commit is blocked
4. Warnings are allowed (they won't block the commit)
5. Only staged files are checked, making it fast and efficient

## Available Scripts

```bash
# Check types before committing
npm run type-check

# Lint all files
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Install Husky (runs automatically after npm install)
npm run prepare
```

## Configuration Files

- **`.husky/pre-commit`**: Defines what runs before each commit
- **`.lintstagedrc.js`**: Configures which checks run on staged files
- **`eslint.config.mjs`**: ESLint configuration with proper ignores
- **`package.json`**: Contains the scripts and Husky configuration

## PM2 Compatibility

The `ecosystem.config.js` file is excluded from ESLint checking because:

- PM2 requires CommonJS format (`module.exports`)
- ESLint is configured to ignore this file
- lint-staged is configured to skip this file during pre-commit checks

## Troubleshooting

### If the pre-commit hook fails:

1. **TypeScript Errors**: Fix any type errors in your code

   ```bash
   npm run type-check
   ```

2. **ESLint Errors**: Fix any linting errors

   ```bash
   npm run lint:fix
   ```

3. **Bypass Hook (Emergency Only)**: If you need to commit despite errors
   ```bash
   git commit --no-verify
   ```

### Common Issues:

- **Permission Denied**: Make sure the `.husky/pre-commit` file is executable

  ```bash
  chmod +x .husky/pre-commit
  ```

- **Husky Not Working**: Reinstall Husky

  ```bash
  npm run prepare
  ```

- **PM2 Issues**: Ensure `ecosystem.config.js` exists and uses CommonJS format

## Adding New Checks

To add new pre-commit checks, edit `.lintstagedrc.js`:

```javascript
module.exports = {
  "**/*.{ts,tsx}": () => "tsc --noEmit",
  "**/*.{ts,tsx,js,jsx}": (filenames) => {
    const filteredFiles = filenames.filter(
      (file) => !file.includes("ecosystem.config.js")
    );
    if (filteredFiles.length === 0) return 'echo "No files to lint"';
    return `eslint --max-warnings 0 ${filteredFiles.join(" ")}`;
  },

  // Add new checks here
  "**/*.{ts,tsx}": () => "npm run test",
  "**/*.{md}": (filenames) => `markdownlint ${filenames.join(" ")}`,
};
```

## Best Practices

1. **Fix Issues Early**: Don't let type errors or linting issues accumulate
2. **Use Auto-fix**: Run `npm run lint:fix` to automatically fix many issues
3. **Check Before Committing**: Run `npm run type-check` and `npm run lint` locally before committing
4. **Keep Dependencies Updated**: Ensure Husky and lint-staged are up to date
5. **PM2 Config**: Keep `ecosystem.config.js` in CommonJS format for PM2 compatibility

## Dependencies

- **husky**: Git hooks manager
- **lint-staged**: Runs linters on staged files
- **typescript**: For type checking
- **eslint**: For code linting
