# 🎮 GameHub
 
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
![GitHub Repo stars](https://img.shields.io/github/stars/kaifansariw/GameHub?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/kaifansariw/GameHub?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/kaifansariw/GameHub?style=for-the-badge)

> A modern, responsive collection of classic browser games built with vanilla JavaScript, Tailwind CSS, and Django. Play instantly - no downloads required! 🎯

***

## 🧭 Table of Contents

- [💡 About GameHub](#-about-gamehub)
- [🚀 Demo](#-demo)
- [✨ Features](#-features)
- [🎮 Games](#-games)
- [🛠️ Tech Stack](#️-tech-stack)
- [💡 Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [📸 Screenshots](#-screenshots)
- [🔧 Adding New Games](#-adding-new-games)
- [🌟 Contributing](#-contributing)
- [📱 Browser Support](#-browser-support)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)
- [✨ Contributors](#-contributors)


***

## 💡 About GameHub

**GameHub** is a free, open-source collection of classic browser games designed to bring nostalgia, fun, and learning together in one place. Built with modern web technologies and a focus on simplicity, GameHub offers smooth gameplay, responsive design, and clean code that makes it easy for developers to explore, learn, and contribute.

### 🎯 Our Mission

- **Nostalgia Meets Modern Web**: Recreate beloved classic games using cutting-edge web technologies
- **Learn by Playing**: Provide a codebase that's educational, well-documented, and beginner-friendly
- **Open Source First**: Foster a welcoming community where developers can contribute and grow
- **Performance & Accessibility**: Deliver fast, lightweight experiences that work seamlessly across all devices

### 🌟 Why GameHub?

In an era of complex game engines and heavy frameworks, GameHub proves that amazing gaming experiences can be built with vanilla JavaScript, thoughtful design, and attention to performance. Whether you're a student learning web development, a developer looking to contribute to open source, or simply someone who loves classic games, GameHub welcomes you.

### 🚀 Future Vision

- Expand the game library with community contributions
- Add multiplayer capabilities for real-time competition
- Implement achievement systems and global leaderboards
- Create educational tutorials for each game's implementation
- Build a thriving community of game developers and enthusiasts


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

## 💡 Prerequisites

- Modern web browser: Chrome, Firefox, Safari, or Edge

***

## 🚀 Quick Start

Follow these steps to run the GameHub Django project locally:

**1️⃣ Clone the Repository**

```bash
git clone https://github.com/kaifansariw/GameHub.git
cd GameHub
```

**2️⃣ Install Django**

```bash
pip install django
```

**3️⃣ Navigate to the Project Folder**

Move into the folder where manage.py is located:

```bash
cd gamehub_project
```

**4️⃣ Run the Development Server**

```bash
python manage.py runserver
```

**5️⃣ Open in Browser**

Visit:

```
http://127.0.0.1:8000/
```

Your GameHub website will now be live locally 🎮🚀

***

## 📁 Project Structure

```
GameHub/
├── gamehub_project/
│   ├── accounts/                   # Authentication app
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── gamehub_project/            # Core Django settings
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── static/                     # Static files (CSS, JS, Images)
│   │   ├── assets/                 # Game thumbnails & icons
│   │   ├── games/                  # HTML files for games
│   │   ├── scripts/                # All game logic JS files
│   │   │   ├── snake.js
│   │   │   ├── simon.js
│   │   │   ├── rps.js
│   │   │   ├── sudoku.js
│   │   │   ├── memory.js
│   │   │   ├── breakout.js
│   │   │   ├── minesweeper.js
│   │   │   ├── tic-tac-toe.js
│   │   │   ├── audio-system.js
│   │   │   └── audio-ui.js
│   │   ├── main.js
│   │   ├── script1.js
│   │   └── style.css
│   │
│   ├── staticfiles/                # Auto-generated (ignored in git)
│   │
│   ├── templates/                  # Django HTML templates
│   │   ├── index.html              # Homepage
│   │   └── login.html              # Authentication page
│   │
│   ├── db.sqlite3                  # Local database
│   └── manage.py
│
├── .gitignore
├── LICENSE
├── CODE_OF_CONDUCT.md
└── README.md
```

***

## 📸 Screenshots

<details>
  <summary>Homepage</summary>
  <img width="1920" height="872" alt="image" src="https://github.com/user-attachments/assets/2b55d9b8-0edb-4824-bf75-0e5d2808c325" />
</details>

<details>
  <summary>Games Collection</summary>
  <img width="1331" height="870" alt="image" src="https://github.com/user-attachments/assets/6167e112-e281-4269-9d35-0bdc0ac4176b" />
</details>

***

## 🔧 Adding New Games

1. Add a new HTML file in `static/games/`
2. Write the game's JS in `static/scripts/`
3. Register your game in the games array in `static/main.js`:

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

We welcome contributions from developers of all skill levels! Whether you're fixing bugs, adding new games, improving documentation, or suggesting features, your input is valuable.

### How to Contribute

- Fork the repository
- Create a new branch: `git checkout -b feature/YourFeature`
- Commit & push:  
  ```bash
  git commit -m "Add: YourFeature"
  git push origin feature/YourFeature
  ```
- Open a Pull Request

Check out our [Contributing Guidelines](CONTRIBUTING.md) for more details!

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

## ✨ Contributors

Thanks to all the wonderful contributors 💖

<a href="https://github.com/kaifansariw/GameHub/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kaifansariw/GameHub" />
</a>

See full list of contributor contributions: [Contribution Graph](https://github.com/kaifansariw/GameHub/graphs/contributors)

***
 

<div align="center">



<div align="center">


[⭐ Star this repo](https://github.com/kaifansariw/GameHub) • 
[🐛 Report Bug](https://github.com/kaifansariw/GameHub/issues) • 
[✨ Request Feature](https://github.com/kaifansariw/GameHub/issues)

Made with ❤️ by [Kaif Ansari](https://github.com/kaifansariw)

</div>