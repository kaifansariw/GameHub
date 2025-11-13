# 🎮 GameHub

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
![GitHub Repo stars](https://img.shields.io/github/stars/kaifansariw/GameHub?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/kaifansariw/GameHub?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/kaifansariw/GameHub?style=for-the-badge)


A futuristic browser gaming platform with 5 classic games, glassmorphism UI, and smooth animations. Built with vanilla HTML, CSS & JavaScript..

## 🚀 Demo

[**🎮 Play Now**](https://gamehub-codesocial.netlify.app/) | [**📱 Mobile Demo**](https://gamehub-codesocial.netlify.app/)

## ✨ Features

- 🎯 **5 Classic Games** - Tic Tac Toe, Snake, Simon Says, Memory Flip, Rock Paper Scissors
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile
- 🎨 **Modern UI** - Built with Tailwind CSS and DaisyUI
- ⚡ **Fast & Lightweight** - No frameworks, pure vanilla JS
- 💾 **Score Persistence** - LocalStorage saves your progress
- 🔍 **Real-time Search** - Filter games instantly
- 🎭 **Smooth Animations** - AOS and Animate.css effects

## 🎮 Games

| Game | Description | Features |
|------|-------------|----------|
| 🎯 **Tic Tac Toe** | Classic 3x3 grid | Score tracking, animations |
| 🐍 **Snake** | Canvas-based arcade | Keyboard/touch controls, high scores |
| 🎵 **Simon Says** | Memory pattern game | Progressive difficulty, visual feedback |
| 🧠 **Memory Flip** | Card matching | Move counter, best score tracking |
| ✂️ **Rock Paper Scissors** | VS Computer | Win/loss statistics, animations |

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Tailwind CSS, DaisyUI
- **Animations**: AOS.js, Animate.css
- **Icons**: Font Awesome
- **Storage**: LocalStorage API

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/GameHub.git

# Navigate to project directory
cd GameHub

# Open in browser
open index.html
```

**That's it!** No build process or dependencies required.

## 📁 Project Structure

```
GameHub/
├── 📄 index.html          # Homepage
├── 🎨 style.css           # Custom styles
├── ⚡ main.js             # Main logic
├── 🎮 games/              # Game pages
│   ├── tic-tac-toe.html
│   ├── snake.html
│   ├── simon.html
│   ├── memory.html
│   └── rps.html
└── 📜 scripts/            # Game logic
    ├── tic-tac-toe.js
    ├── snake.js
    ├── simon.js
    ├── memory.js
    └── rps.js
```

## 🎨 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Homepage
![Homepage](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=GameHub+Homepage)

### Games
![Games](https://via.placeholder.com/800x400/059669/FFFFFF?text=Game+Collection)

</details>

## 🔧 Adding New Games

1. **Create game HTML** in `/games/` folder
2. **Create game script** in `/scripts/` folder  
3. **Add to games array** in `main.js`:

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

## 🌟 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📱 Browser Support

| Browser | Support |
|---------|--------|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |
| Mobile | ✅ |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [DaisyUI](https://daisyui.com/) for beautiful UI components
- [AOS](https://michalsnik.github.io/aos/) for scroll animations
- [Font Awesome](https://fontawesome.com/) for icons

---

<div align="center">

**[⭐ Star this repo](https://github.com/your-username/GameHub)** • **[🐛 Report Bug](https://github.com/your-username/GameHub/issues)** • **[✨ Request Feature](https://github.com/your-username/GameHub/issues)**

Made with ❤️ by [Kaif Ansari](https://github.com/kaifansariw)

</div>
