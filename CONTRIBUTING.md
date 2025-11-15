# 🌟 Contributing to GameHub

Thank you for your interest in contributing!  
This project welcomes improvements of all kinds — new games, UI enhancements, bug fixes, documentation upgrades, and performance improvements.

---

## 🧭 How to Contribute

Follow these steps to add your contribution:

### 1. Fork the Repository

Click the **Fork** button on the GitHub repo.

### 2. Clone Your Fork

```bash
git clone https://github.com/<your-username>/GameHub.git
cd GameHub
```

### 3. Create a New Branch

```bash
git checkout -b feature/YourFeature
```

### 4. Make Your Changes

Add code, improve UI, fix bugs, or update documentation.

### 5. Commit Your Changes

```bash
git commit -m "Add: YourFeature description"
```

### 6. Push to Your Branch

```bash
git push origin feature/YourFeature
```

### 7. Submit a Pull Request

---

## 🎮 Adding a New Game

Follow this structure to add a game:

### 1. Add Game HTML

Place your game file in:

```
/static/games/
```

### 2. Add Game Logic (JavaScript)

Place the JS file in:

```
/static/scripts/
```

### 3. Add a Thumbnail Image

Place the image in:

```
/static/assets/
```

### 4. Register Your Game in `main.js`

Add a new entry inside the games array:

```javascript
{
  id: 'your-game',
  title: 'Your Game',
  description: 'Short description',
  image: 'assets/your-thumbnail.png',
  file: 'games/your-game.html',
  category: 'arcade'
}
```

---

## 🧪 Code Style Guidelines

- Keep functions small and readable
- Use meaningful variable and function names
- Comment complex logic
- Avoid unnecessary dependencies
- Maintain consistent code formatting

---

## 🐛 Reporting Bugs

Found a bug?  
Open an issue here:

https://github.com/kaifansariw/GameHub/issues

Include:

- Expected behavior
- Actual behavior
- Steps to reproduce
- Screenshots (if applicable)

---

## ⭐ Pull Request Requirements

Before opening a PR, make sure:

- Your feature runs without errors
- Files are placed in correct folders
- Add screenshots for UI changes
- PR description explains the changes clearly
- No unnecessary large files added

### Example PR description:

```markdown
### Summary

- Added a new game: Space Runner
- Added HTML, JS logic, and thumbnail
- Updated games list in main.js

### Screenshots

![image](URL_TO_IMAGE)

### Issue Reference

Fixes #14
```

---

## 🤝 Community Standards

This project follows the Code of Conduct in `CODE_OF_CONDUCT.md`.

## ❤️ Thanks

Your contributions make GameHub better for everyone.
