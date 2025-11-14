
# 🎮 GameHub

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
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

## 💡 Prerequisites

- Modern web browser: Chrome, Firefox, Safari, or Edge

***

## 🚀 Quick Start
Follow these steps to run the GameHub Django project locally:

1️⃣ Clone the Repository

    git clone https://github.com/kaifansariw/GameHub.git
    
    cd GameHub

2️⃣ Install Django

    pip install django

3️⃣ Navigate to the Project Folder

Move into the folder where manage.py is located:

    cd gamehub_project

4️⃣ Run the Development Server

    python manage.py runserver

5️⃣ Open in Browser

Visit:

    http://127.0.0.1:8000/

Your GameHub website will now be live locally 🎮🚀`

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

# ✨ Contributors

#### Thanks to all the wonderful contributors 💖

<a href="https://github.com/kaifansariw/GameHub/graphs/contributors"> <img src="https://contrib.rocks/image?repo=kaifansariw/GameHub" /> </a>

#### See full list of contributor contribution [Contribution Graph]([https://github.com/kaifanasariw/GameHub/graphs/contributors](https://github.com/kaifansariw/GameHub/graphs/contributors))
