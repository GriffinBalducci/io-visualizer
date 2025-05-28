# 🧪 The I/O Visualizer

The **I/O Visualizer** is a fluid balance tracking tool that helps you visualize fluid intake and output data using interactive graphics. This project provides a clear, real-time representation of a patient's fluid status using a tank view and a seesaw-style scale view.

## 🚀 Live Demo

https://io-visualizer.vercel.app/

## 🛠 Features

- 💧 **Tank View**: Graphically displays intake and output fluid levels by type with color-coded segments.
- ⚖️ **Scale View**: A simple seesaw scale that tilts based on net fluid gain or loss.
- 🕒 **Timeframe Filter**: View data from the last 10 minutes, 1 hour, 4 hours, 12 hours, 24 hours, or all time.
- ⏰ **Date & Time Input**: Backdate entries using the datetime picker.
- ✅ **Type Selection**: Categorize fluids (oral, parenteral, output types like emesis, stool, etc.)
- 📊 **Volume Controls**: Easily add fluid volumes using a clean UI.

## 📦 Technologies Used

- React + TypeScript
- [Mantine](https://mantine.dev/) for UI components
- CSS Modules for styling

## 📂 Folder Structure

```
/src
  /components
    Tanks.tsx
    Utils.tsx
  /styles
    App.module.css
    Tanks.module.css
  App.tsx
  main.tsx
```

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/io-visualizer.git
cd io-visualizer
npm install
```

### Running the App

```bash
npm run dev
```

Open your browser and go to `http://localhost:5173`

## 📝 Future Features

- Save data between sessions (localStorage or backend)
- Export to PDF or CSV
- Color and Size Customization
- Chart-based trend view

## 🤝 Contributing

Pull requests welcome! Feel free to fork the repo and submit improvements or ideas.

## 📄 License

MIT License.

