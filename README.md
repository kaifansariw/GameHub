
# 🎮 GameHub

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
![GitHub Repo stars](https://img.shields.io/github/stars/kaifansariw/GameHub?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/kaifansariw/GameHub?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/kaifansariw/GameHub?style=for-the-badge)

## 📋 Table of Contents

- [🚀 Demo](#-demo)
- [✨ Features](#-features)
- [🎮 Games](#-games)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [📸 Screenshots](#-screenshots)
- [💡 Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [🔧 Adding New Games](#-adding-new-games)
- [🌟 Contributing](#-contributing)
- [📱 Browser Support](#-browser-support)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

***

## 🚀 Demo

- **[Play Now](https://gamehub-codesocial.netlify.app/)**
- **[Mobile Demo](https://gamehub-codesocial.netlify.app/)**

***

## ✨ Features

- 5 Classic Games: Tic Tac Toe, Snake, Simon Says, Memory Flip, Rock Paper Scissors
- Fully Responsive: Optimized for desktop, tablet, and mobile
- Modern Glassmorphism UI: Built using Tailwind CSS and DaisyUI 
- Fast & Lightweight: Pure vanilla JS, zero frameworks
- Score Persistence: Progress saved in LocalStorage
- Real-time Search: Instantly filter and find games
- Smooth Animations: AOS.js and Animate.css integration

***

## 🎮 Games

| Game                     | Description              | Features                              |
|--------------------------|-------------------------|---------------------------------------|
| **Tic Tac Toe**          | Classic 3x3 grid        | Score tracking, animations            |
| **Snake**                | Canvas arcade game      | Keyboard/touch controls, high scores  |
| **Simon Says**           | Pattern memory challenge| Progressive difficulty, feedback      |
| **Memory Flip**          | Card matching puzzle    | Move counter, best score              |
| **Rock Paper Scissors**  | VS Computer             | Win/loss stats, animations            |

***

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Styling:** Tailwind CSS, DaisyUI
- **Animations:** AOS.js, Animate.css
- **Icons:** Font Awesome
- **Storage:** LocalStorage API

***

## 📁 Project Structure

```
GameHub/
├── index.html             # Homepage
├── style.css              # Custom styles
├── main.js                # Main logic
├── games/                 # Game HTML pages
│   ├── tic-tac-toe.html
│   ├── snake.html
│   ├── simon.html
│   ├── memory.html
│   └── rps.html
└── scripts/               # Game logic scripts
    ├── tic-tac-toe.js
    ├── snake.js
    ├── simon.js
    ├── memory.js
    └── rps.js
```

***

## 📸 Screenshots

<details>
  <summary>Homepage</summary>
  <img width="1908" height="876" alt="image" src="https://github.com/user-attachments/assets/1ea35951-840a-4045-b84a-7ba70b667e80" />
</details>

<details>
  <summary>Games Collection</summary>
  <img width="1601" height="874" alt="image" src="https://github.com/user-attachments/assets/796aa9c5-2ffb-4ef8-9144-3e423a5af1e1" />
</details>

***

## 💡 Prerequisites

- Modern web browser: Chrome, Firefox, Safari, or Edge

***

## 🚀 Quick Start

### 1️⃣ Clone the repository

```bash
git clone https://github.com/kaifansariw/GameHub.git
cd GameHub
```

### 2️⃣ Open in your browser (Option 1: Direct file open)

| OS               | Command / Method                   |
|------------------|------------------------------------|
| **Windows**      | Double-click `index.html` <br> _or in CMD:_<br> `start index.html` |
| **macOS**        | Double-click `index.html` <br> _or in Terminal:_<br> `open index.html` |
| **Linux**        | Double-click `index.html` <br> _or in Terminal:_<br> `xdg-open index.html` |

No setup, build, or dependencies required—just open and play.

***

## 🔧 Adding New Games

1. Add a new HTML file in `/games/`
2. Write the game's JS in `/scripts/`
3. Register your game in the games array in `main.js`:

```javascript
{
    id: 'your-game',
    title: 'Your Game',
    description: 'Game description',
    image: 'path/to/image',
    file: 'games/your-game.html',
    category: 'arcade'
}
```

***

## 🌟 Contributing

- Fork the repository
- Create a new branch: `git checkout -b feature/YourFeature`
- Commit & push:  
  `git commit -m "Add: YourFeature"`  
  `git push origin feature/YourFeature`
- Open a Pull Request

***

## 📱 Browser Support

| Browser  | Supported |
|----------|:---------:|
| Chrome   | ✅        |
| Firefox  | ✅        |
| Safari   | ✅        |
| Edge     | ✅        |
| Mobile   | ✅        |

***

## 📄 License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).

***

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [AOS.js](https://michalsnik.github.io/aos/)
- [Font Awesome](https://fontawesome.com/)

***

<div align="center">

[⭐ Star this repo](https://github.com/kaifansariw/GameHub) - 
[🐛 Report Bug](https://github.com/kaifansariw/GameHub/issues) - 
[✨ Request Feature](https://github.com/kaifansariw/GameHub/issues)  
Made with ❤️ by [Kaif Ansari](https://github.com/kaifansariw)

</div>

