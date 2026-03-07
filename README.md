# 🎮 GameHub

<div align="center">

![GitHub Repo stars](https://img.shields.io/github/stars/kaifansariw/GameHub?style=for-the-badge&logo=github&color=yellow)
![GitHub forks](https://img.shields.io/github/forks/kaifansariw/GameHub?style=for-the-badge&logo=github&color=blue)
![GitHub contributors](https://img.shields.io/github/contributors/kaifansariw/GameHub?style=for-the-badge&logo=github&color=green)
![GitHub issues](https://img.shields.io/github/issues/kaifansariw/GameHub?style=for-the-badge&logo=github&color=red)
![GitHub pull requests](https://img.shields.io/github/issues-pr/kaifansariw/GameHub?style=for-the-badge&logo=github&color=purple)
![GitHub License](https://img.shields.io/github/license/kaifansariw/GameHub?style=for-the-badge&color=orange)
![Profile Views](https://komarev.com/ghpvc/?username=kaifansariw-gamehub&label=Repository+Views&color=brightgreen&style=for-the-badge)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Django](https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white)](https://www.djangoproject.com/)

**A free, open-source collection of 40+ classic browser games — no downloads, no installs, just instant fun.**

[▶ Play Now](https://kaifansariw.github.io/GameHub/) · [🐛 Report Bug](https://github.com/kaifansariw/GameHub/issues) · [✨ Request Feature](https://github.com/kaifansariw/GameHub/issues)

</div>

---
## Rules For ECWoC26
- It is important to star the repo , otherwise your  contribution will not count.
- You need to make a proper docs for the feature you are trying to implement and share it with me using docs in mail.
- Only the meaningful issue which are important will only be considered , other will be close.
- More priority will be given to the contributors who have lower rank in leaderboard.
***

## 🧭 Table of Contents

- [💡 About GameHub](#-about-gamehub)
- [� View Counter & Analytics](#-view-counter--analytics)
- [🚀 Demo](#-demo)
- [✨ Features](#-features)
- [🎮 Games](#-games)
- [🛠️ Tech Stack](#️-tech-stack)
- [💡 Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [🌐 Deployment Guide](#-deployment-guide)
- [📁 Project Structure](#-project-structure)
- [📸 Screenshots](#-screenshots)
- [🔧 Adding New Games](#-adding-new-games)
- [🌟 Contributing](#-contributing)
- [📱 Browser Support](#-browser-support)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)
- [✨ Contributors](#-contributors)

---

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

---

## � View Counter & Analytics

GameHub includes a **real-time view counter** that tracks project engagement:

| Metric           | Description                         |
| ---------------- | ----------------------------------- |
| **Total Visits** | Cumulative count of all site visits |
| **Today**        | Number of visits in the current day |
| **This Week**    | Rolling 7-day visit count           |
| **This Month**   | Rolling 30-day visit count          |

The view counter is displayed on the homepage hero section and updates in real-time every 30 seconds. It is powered by a Django backend model (`SiteVisit`) that records daily visit counts with zero personal data collection — fully privacy-friendly.

**How it works:**

- Each page load records one visit to the current day's counter
- Stats are served via lightweight JSON API endpoints (`/accounts/site-visit/` and `/accounts/site-stats/`)
- The counter animates on load and auto-refreshes without page reload
- Admin dashboard at `/admin/` shows full visit history with date filtering

---

## 🚀 Demo

- **[Play Now](https://kaifansariw.github.io/GameHub/)**

---

## ✨ Features

- 🎮 **40+ Browser Games**: From classics like Snake and Tetris to unique originals
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile
- 🎨 **Modern Glassmorphism UI**: Built using Tailwind CSS and DaisyUI
- ⚡ **Fast & Lightweight**: Pure vanilla JS, zero frameworks
- 💾 **Score Persistence**: Progress saved in LocalStorage
- 🔍 **Real-time Search**: Instantly filter and find games
- 📊 **View Counter**: Real-time visit tracking with daily/weekly/monthly stats
- 🏆 **Leaderboard**: Compete with other players for top scores
- ✨ **Smooth Animations**: Animate.css and AOS integration
- 🔒 **User Authentication**: Register, login, and track personal progress

---

## 🎮 Games

| Game                    | Description                           | Features                                   |
| ----------------------- | ------------------------------------- | ------------------------------------------ |
| **Rock Paper Scissors** | Classic hand game                     | Win/loss stats, animations                 |
| **2048 Game**           | Tile sliding number puzzle            | Score tracking, smooth animations          |
| **Sudoku Puzzle**       | Number placement puzzle               | Multiple difficulties, hints               |
| **Minesweeper**         | Mine avoidance logic game             | Flagging cells, timer                      |
| **Breakout**            | Brick-breaking arcade game            | Paddle control, increasing difficulty      |
| **Balloon Popper**      | Pop balloons before time runs out     | Timer-based gameplay, score system         |
| **Boom Runner**         | Dodge bombs and survive               | Reflex-based controls, speed increase      |
| **Brick Breaker**       | Break bricks using a paddle           | Power-ups, levels                          |
| **Bubble Shooter**      | Match and pop colored bubbles         | Aim mechanics, combo scoring               |
| **Candy Match Mania**   | Match candies to score points         | Chain reactions, colorful UI               |
| **Code Unlock**         | Crack codes using logic               | Pattern recognition, increasing difficulty |
| **Color Grid**          | Color-matching puzzle                 | Visual logic, timed challenges             |
| **Dodge Square**        | Avoid obstacles and survive           | Fast-paced movement, reflex testing        |
| **Firefly Flow**        | Guide fireflies through patterns      | Precision control, calming visuals         |
| **Flappy Block**        | Navigate obstacles by flapping        | Score tracking, increasing difficulty      |
| **Freeze Frame**        | Stop motion at the right moment       | Timing-based gameplay                      |
| **Fruit Slice**         | Slice fruits with precision           | Swipe controls, combo points               |
| **Glow Chain**          | Trigger glowing chain reactions       | Visual effects, chain mechanics            |
| **Glow Drops**          | Tap glowing drops before disappearing | Speed-based taps, score counter            |
| **Glow Tap**            | Tap glowing circles in time           | Timing accuracy, reflex training           |
| **Gravity Flip Ball**   | Flip gravity to move the ball         | Physics-based gameplay, level progression  |
| **Hangman Hero**        | Guess the hidden words                | Vocabulary building, hint system           |
| **Jump Counter**        | Jump to increase your score           | Score tracking, timing precision           |
| **Jump Tag**            | Tag targets by jumping                | Movement accuracy, reflex-based            |
| **Logic Path**          | Guide the ball using logic            | Puzzle-solving, progressive levels         |
| **Memory Blink**        | Remember blinking patterns            | Memory training, increasing speed          |
| **Pattern Memory**      | Remember and repeat patterns          | Sequence memory, difficulty scaling        |
| **Pipe Twister**        | Rotate pipes to connect flows         | Logic rotation puzzles                     |
| **Reaction Speed Test** | Test your reaction speed              | Tap-time measurement, instant feedback     |
| **Sand Draw**           | Draw freely in virtual sand           | Relaxing UI, creative drawing              |
| **Sliding Puzzle**      | Slide blocks to complete image        | Logical movement, image puzzles            |
| **Speed Tap Grid**      | Tap targets quickly on a grid         | Reflex speed, time challenge               |
| **Symbol Swap**         | Swap symbols to match rows            | Pattern logic, strategic thinking          |
| **Tap Counter**         | Tap repeatedly to score               | Speed tracking, real-time counter          |
| **Tetris**              | Classic falling block puzzle          | Line clearing, increasing speed            |
| **Tower of Hanoi**      | Solve disk puzzle in minimum moves    | Algorithmic thinking, step counter         |
| **Typing Sprint**       | Type words quickly to score           | Speed tracking, accuracy scoring           |
| **Vortex Jump**         | Jump through twisting vortex paths    | Precision jumps, reaction timing           |
| **Word Chain**          | Form chains of related words          | Vocabulary skills, word logic              |
| **Word Scramble**       | Unscramble letters to form words      | Time-based challenges, hints               |
| **Typing Speed Test**   | Measure typing speed and accuracy     | WPM tracking, clean UI                     |

---

## 🛠️ Tech Stack

| Layer          | Technology                                     |
| -------------- | ---------------------------------------------- |
| **Backend**    | Django 5.x, Python 3.x                         |
| **Frontend**   | HTML5, CSS3, JavaScript (Vanilla)              |
| **Styling**    | Tailwind CSS, DaisyUI                          |
| **Animations** | Animate.css, AOS (Animate On Scroll)           |
| **Icons**      | Font Awesome 6                                 |
| **Storage**    | LocalStorage API, SQLite (Django)              |
| **Analytics**  | Built-in SiteVisit model (daily view tracking) |
- **[Play Now]()**
***

## ✨ Features

- 5 Classic Games: Tic Tac Toe, Snake, Simon Says, Memory Flip, Rock Paper Scissors
- Fully Responsive: Optimized for desktop, tablet, and mobile
- Modern Glassmorphism UI: Built using Tailwind CSS and DaisyUI 
- Fast & Lightweight: Pure vanilla JS, zero frameworks
- Score Persistence: Progress saved in LocalStorage
- Real-time Search: Instantly filter and find games
- Smooth Animations
***

## 🎮 Games

| Game                     | Description                              | Features                                         |
|--------------------------|------------------------------------------|--------------------------------------------------|
| **Rock Paper Scissors**  | Classic hand game                        | Win/loss stats, animations                       |
| **2048 Game**            | Tile sliding number puzzle               | Score tracking, smooth animations                |
| **Sudoku Puzzle**        | Number placement puzzle                  | Multiple difficulties, hints                     |
| **Minesweeper**          | Mine avoidance logic game                | Flagging cells, timer                            |
| **Breakout**             | Brick-breaking arcade game               | Paddle control, increasing difficulty            |
| **Balloon Popper**       | Pop balloons before time runs out        | Timer-based gameplay, score system               |
| **Boom Runner**          | Dodge bombs and survive                  | Reflex-based controls, speed increase            |
| **Brick Breaker**        | Break bricks using a paddle              | Power-ups, levels                                |
| **Bubble Shooter**       | Match and pop colored bubbles            | Aim mechanics, combo scoring                     |
| **Candy Match Mania**    | Match candies to score points            | Chain reactions, colorful UI                     |
| **Code Unlock**          | Crack codes using logic                  | Pattern recognition, increasing difficulty       |
| **Color Grid**           | Color-matching puzzle                    | Visual logic, timed challenges                   |
| **Dodge Square**         | Avoid obstacles and survive              | Fast-paced movement, reflex testing              |
| **Firefly Flow**         | Guide fireflies through patterns         | Precision control, calming visuals               |
| **Flappy Block**         | Navigate obstacles by flapping           | Score tracking, increasing difficulty            |
| **Freeze Frame**         | Stop motion at the right moment          | Timing-based gameplay                            |
| **Fruit Slice**          | Slice fruits with precision              | Swipe controls, combo points                     |
| **Glow Chain**           | Trigger glowing chain reactions          | Visual effects, chain mechanics                  |
| **Glow Drops**           | Tap glowing drops before disappearing    | Speed-based taps, score counter                  |
| **Glow Tap**             | Tap glowing circles in time              | Timing accuracy, reflex training                 |
| **Gravity Flip Ball**    | Flip gravity to move the ball            | Physics-based gameplay, level progression        |
| **Hangman Hero**         | Guess the hidden words                   | Vocabulary building, hint system                 |
| **Jump Counter**         | Jump to increase your score              | Score tracking, timing precision                 |
| **Jump Tag**             | Tag targets by jumping                   | Movement accuracy, reflex-based                  |
| **Logic Path**           | Guide the ball using logic               | Puzzle-solving, progressive levels               |
| **Memory Blink**         | Remember blinking patterns               | Memory training, increasing speed                |
| **Pattern Memory**       | Remember and repeat patterns             | Sequence memory, difficulty scaling              |
| **Pipe Twister**         | Rotate pipes to connect flows            | Logic rotation puzzles                           |
| **Reaction Speed Test**  | Test your reaction speed                 | Tap-time measurement, instant feedback           |
| **Sand Draw**            | Draw freely in virtual sand              | Relaxing UI, creative drawing                    |
| **Sliding Puzzle**       | Slide blocks to complete image           | Logical movement, image puzzles                  |
| **Speed Tap Grid**       | Tap targets quickly on a grid            | Reflex speed, time challenge                     |
| **Symbol Swap**          | Swap symbols to match rows               | Pattern logic, strategic thinking                |
| **Tap Counter**          | Tap repeatedly to score                  | Speed tracking, real-time counter                |
| **Tetris**               | Classic falling block puzzle             | Line clearing, increasing speed                  |
| **Tower of Hanoi**       | Solve disk puzzle in minimum moves       | Algorithmic thinking, step counter               |
| **Typing Sprint**        | Type words quickly to score              | Speed tracking, accuracy scoring                 |
| **Vortex Jump**          | Jump through twisting vortex paths       | Precision jumps, reaction timing                 |
| **Word Chain**           | Form chains of related words             | Vocabulary skills, word logic                    |
| **Word Scramble**        | Unscramble letters to form words         | Time-based challenges, hints                     |
| **Typing Speed Test**    | Measure typing speed and accuracy        | WPM tracking, clean UI                           |


***

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Styling:** Tailwind CSS, DaisyUI
- **Animations:**
- **Icons:** Font Awesome
- **Storage:** LocalStorage API

---

## 💡 Prerequisites

- **Python 3.8+** — [Download Python](https://www.python.org/downloads/)
- **pip** — Python package manager (comes with Python)
- **Git** — [Download Git](https://git-scm.com/downloads)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

---

## 🚀 Quick Start

Follow these steps to run the GameHub Django project locally:

**1️⃣ Clone the Repository**

```bash
git clone https://github.com/kaifansariw/GameHub.git
cd GameHub
git clone <YOUR_FORK_URL>
cd <DIRECTORY_NAME>
```

**2️⃣ Create a Virtual Environment (Recommended)**

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

**3️⃣ Install Dependencies**

```bash
pip install django
```

**4️⃣ Navigate to the Project Folder**

**3️⃣ Navigate to the Project Folder**
```bash
cd gamehub_project
```

**5️⃣ Run Database Migrations**

```bash
python manage.py makemigrations
python manage.py migrate
python 
```

**6️⃣ Create a Superuser (Optional — for admin access)**

```bash
python manage.py createsuperuser
```

**7️⃣ Run the Development Server**

```bash
python manage.py runserver
```

**8️⃣ Open in Browser**

```
http://127.0.0.1:8000/        # Homepage
http://127.0.0.1:8000/admin/  # Admin panel (view counter stats)
```

Your GameHub website will now be live locally 🎮🚀

---

## 🌐 Deployment Guide

<details>
<summary><strong>Deploy on Railway</strong></summary>

1. Push your code to GitHub
2. Go to [Railway](https://railway.app/) and create a new project
3. Connect your GitHub repository
4. Add environment variables:
   - `SECRET_KEY` — a strong random secret key
   - `DEBUG` — `False`
   - `ALLOWED_HOSTS` — your Railway domain
5. Railway will auto-detect Django and deploy

</details>

<details>
<summary><strong>Deploy on Render</strong></summary>

1. Push your code to GitHub
2. Go to [Render](https://render.com/) and create a new Web Service
3. Connect your repository
4. Set build command: `pip install django`
5. Set start command: `cd gamehub_project && python manage.py migrate && python manage.py runserver 0.0.0.0:$PORT`
6. Add environment variables (`SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS`)

</details>

<details>
<summary><strong>Deploy on PythonAnywhere</strong></summary>

1. Create a free account at [PythonAnywhere](https://www.pythonanywhere.com/)
2. Upload your code or clone from GitHub via Bash console
3. Set up a new web app with Django
4. Configure WSGI file to point to `gamehub_project.wsgi`
5. Set `ALLOWED_HOSTS` to include your PythonAnywhere domain
6. Run `python manage.py migrate` in the Bash console
7. Reload the web app

</details>

---

## 📁 Project Structure

```
GameHub/
├── gamehub_project/
│   ├── accounts/                   # User auth & analytics app
│   │   ├── migrations/             # Database migrations
│   │   ├── models.py               # Profile & SiteVisit models
│   │   ├── views.py                # Auth, leaderboard, view counter APIs
│   │   ├── urls.py                 # URL routing for accounts
│   │   ├── admin.py                # Admin panel registration
│   │   └── apps.py                 # App configuration
│   │
│   ├── gamehub_project/            # Core Django settings
│   │   ├── settings.py             # Project settings
│   │   ├── urls.py                 # Root URL configuration
│   │   ├── wsgi.py                 # WSGI entry point
│   │   └── asgi.py                 # ASGI entry point
│   │
│   ├── static/                     # Static files (CSS, JS, Images)
│   │   ├── assets/                 # Game thumbnails & icons
│   │   ├── games/                  # 40+ game HTML files & folders
│   │   ├── scripts/                # Game logic JS files
│   │   ├── style.css               # Main stylesheet
│   │   ├── main.js                 # Core app JavaScript
│   │   └── service-worker.js       # PWA service worker
│   │
│   ├── templates/                  # Django HTML templates
│   │   ├── index.html              # Homepage with view counter
│   │   ├── login.html              # Authentication page
│   │   ├── leaderboard.html        # Player leaderboard
│   │   └── offline.html            # Offline fallback page
│   │
│   ├── db.sqlite3                  # Local database
│   └── manage.py                   # Django management CLI
│
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

---

## 📸 Screenshots

<details>
  <summary>🏠 Homepage with View Counter</summary>
  <p><em>The hero section displays real-time visit statistics (Total, Today, Weekly, Monthly) with animated counters.</em></p>
</details>

<details>
  <summary>🎮 Games Collection</summary>
  <p><em>Browse 40+ games in a responsive grid with search, categories, and instant play.</em></p>
</details>

---

## 🔧 Adding New Games

1. Add a new HTML file in `static/games/` (or a subfolder like `static/games/YourGame/index.html`)
2. Write the game's JS logic in the same file or in `static/scripts/`
3. Register your game in the `games` array in `static/main.js`:

```javascript
{
    id: 'your-game',
    title: 'Your Game',
    description: 'A brief description of the game',
    image: '/static/assets/your-game.png',
    file: '/static/games/your-game.html',
    category: 'arcade'  // arcade, puzzle, strategy, memory, action
}
```

4. Add a thumbnail image in `static/assets/`
5. Test locally, then open a Pull Request!

---

## 🌟 Contributing

We welcome contributions from developers of all skill levels! Whether you're fixing bugs, adding new games, improving documentation, or suggesting features, your input is valuable.

### How to Contribute

1. **Fork** the repository
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/GameHub.git
   ```
3. **Create** a feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
4. **Make** your changes and test locally
5. **Commit** and **push**:
   ```bash
   git commit -m "Add: YourFeature"
   git push origin feature/YourFeature
   ```
6. **Open** a Pull Request on the main repository

### Contribution Ideas

- 🎮 Add a new browser game
- 🐛 Fix bugs or improve existing games
- 📝 Improve documentation
- 🎨 Enhance UI/UX design
- ⚡ Optimize performance
- 🌐 Add internationalization support

Check out our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) for more details!

---

## 📱 Browser Support

| Browser | Supported |
| ------- | :-------: |
| Chrome  |    ✅     |
| Firefox |    ✅     |
| Safari  |    ✅     |
| Edge    |    ✅     |
| Mobile  |    ✅     |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use, modify, and distribute.

---

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) — Tailwind CSS component library
- [Animate.css](https://animate.style/) — CSS animation library
- [AOS](https://michalsnik.github.io/aos/) — Animate On Scroll library
- [Font Awesome](https://fontawesome.com/) — Icon library
- [Django](https://www.djangoproject.com/) — Python web framework

---

## ✨ Contributors

Thanks to all the wonderful contributors 💖

<a href="https://github.com/kaifansariw/GameHub/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kaifansariw/GameHub" />
</a>

See full list of contributions: [Contribution Graph](https://github.com/kaifansariw/GameHub/graphs/contributors)

---

<div align="center">

[⭐ Star this repo](https://github.com/kaifansariw/GameHub) · [🐛 Report Bug](https://github.com/kaifansariw/GameHub/issues) · [✨ Request Feature](https://github.com/kaifansariw/GameHub/issues)

Made with ❤️ by [Kaif Ansari](https://github.com/kaifansariw) and the open-source community

</div>
