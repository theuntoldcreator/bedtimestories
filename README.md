# 🌙 Magical Bedtime Stories

Create personalized, AI-generated bedtime stories for children with a magical twist. This project uses a React frontend with form-based customization and a powerful n8n workflow backend powered by Groq AI and webhooks.

🟢 Live Website: [https://bedtimestories.pages.dev](https://bedtimestories.pages.dev)

📦 GitHub Source: [github.dev/theuntoldcreator/bedtimestories](https://github.dev/theuntoldcreator/bedtimestories)

---

## 📸 Preview

![n8n Workflow Overview](./n8n-workflow-preview.png)

---

## 💡 Features

- ✨ Choose from story categories (Adventure, Horror, Love, Sci-fi, Fairy Tales)
- 🌈 Select magical story elements (Rainbow, Dinosaur, Spaceship, etc.)
- 🧒 Personalize with child’s name, age, and custom details
- 🤖 Stories are generated using Groq LLM inside an n8n AI Agent workflow
- 📬 Webhook integration sends story responses back to the frontend in real-time
- ⚡ Fully deployed using Cloudflare Pages

---

## 🧠 Tech Stack

| Frontend        | Backend / AI          |
|-----------------|-----------------------|
| React + Tailwind CSS | n8n (Self-hosted on GCP VM) |
| Zod + React Hook Form | Groq Chat Model via AI Agent |
| Cloudflare Pages (Hosting) | Webhook, AI Agent, Response Nodes |
| Toast Notifications | JSON Clean-up with Set Node |

---

## 🚀 How It Works

1. **User Input**: Form takes child’s name, age, category, story elements, and optional custom input.
2. **POST Webhook**: React app sends the prompt to n8n Webhook URL.
3. **AI Agent**: n8n triggers a Groq AI model via AI Agent with structured instructions.
4. **Clean Output**: Removes `<think>` tags and non-story text.
5. **Send Response**: JSON story is returned to the frontend and displayed in a story card.

---

## 🔁 n8n Workflow Overview

1. `Webhook` → listens for prompt
2. `AI Agent` → calls Groq Chat model with structured system message
3. `Set` → removes `<think>` block with regex in `cleanedStory`
4. `Respond to Webhook` → sends `{ "post": "...", "response": $json.cleanedStory }` to frontend

> 🧪 Sample Regex:  
> `{{$json.output.replace(/<think>[\\s\\S]*?<\\/think>/gi, '').trim()}}`

---

## ⚙️ Deployment Instructions

### Frontend

```bash
npm install
npm run dev # or deploy to Cloudflare Pages
