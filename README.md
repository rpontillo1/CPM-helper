# CPM Helper

CPM Helper is an interactive web application designed to simplify **Critical Path Method (CPM)** calculations for project scheduling. Instead of manually calculating scheduling values for every activity, users can enter their project tasks and dependencies and let the application calculate the project schedule.

## 🔗 Live Demo

[View CPM Helper](https://rpon-pert.vercel.app)

## ✨ Features

- Add project activities with custom IDs, descriptions, and durations
- Define predecessor relationships between activities
- Automatically calculate:
  - **Early Start (ES)**
  - **Early Finish (EF)**
  - **Late Start (LS)**
  - **Late Finish (LF)**
  - **Slack**
- Identify activities that make up the **Critical Path**
- Determine the total expected **project duration**
- View entered activities in an organized task table
- Visualize project scheduling information
- Easily modify project data and recalculate the schedule

## 🧠 What is the Critical Path Method?

The **Critical Path Method (CPM)** is a project management technique used to determine the sequence of activities that controls the minimum amount of time required to complete a project.

Activities with **zero slack** form the **critical path**. If an activity on the critical path is delayed, the completion of the entire project may also be delayed.

CPM Helper automates these calculations, making it easier to experiment with project networks and understand how individual activities affect the overall project schedule.

## 🛠️ Built With

- React
- JavaScript
- Tailwind CSS
- Vercel

## 🎯 Purpose

I created CPM Helper to turn the process of solving Critical Path Method problems into a more interactive experience. The project combines project management concepts with web development by implementing CPM scheduling logic in JavaScript and presenting the results through a simple visual interface.

It is particularly useful for students learning **operations management, project management, PERT, and CPM**, as well as anyone who wants a quick way to analyze a project network.

## 🚀 Running Locally

Clone the repository:

```bash
git clone <your-repository-url>
cd <repository-folder>
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL displayed in your terminal.
