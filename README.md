# 🌙 Magical Bedtime Stories

Create magical AI-powered bedtime stories for kids using your child’s name, age, and favorite story elements.

🟢 **Live App:** [bedtimestories.pages.dev](https://bedtimestories.pages.dev)  
💻 **Source Code:** [GitHub](https://github.dev/theuntoldcreator/bedtimestories)

---

## ✨ Features

- Custom name and age
- Choose story type: Adventure, Horror, Love, Sci-fi, Fairytales
- Pick up to 3 story elements (e.g., dinosaur, rainbow, spaceship)
- Add custom detail (optional)
- AI-generated story via Groq (GPT-4o)
- Clean, mobile-friendly UI
- Hosted on Cloudflare Pages
- Story served via n8n Webhook

---

## 🔧 Tech Stack

| Layer      | Tool                       |
|------------|----------------------------|
| Frontend   | React, Tailwind, Vite      |
| Backend    | n8n + Groq Chat            |
| Hosting    | Cloudflare Pages, GCP VM   |
| AI Cleanup | Regex via `Set` node       |

---

## 🚀 Quick Start

### 1. Clone the Project

```bash
git clone https://github.com/theuntoldcreator/bedtimestories
cd bedtimestories
```

## 2. Frontend Setup (React)

```bash
npm install
npm run dev         # Local development
``` 

#### Deploy to Cloudflare Pages
Connect this repo to Cloudflare Pages:

Build command: ```npm run build```

Output directory: ```dist```



## 3. Backend Setup (n8n + Groq)
Run n8n in Docker on GCP:
```bash
docker run -d --name n8n \
-p 5678:5678 \
-e N8N_BASIC_AUTH_ACTIVE=false \
-e N8N_CORS_ALLOW_ORIGIN=https://bedtimestories.pages.dev \
-e N8N_CORS_ALLOW_METHODS=GET,POST,OPTIONS \
-e N8N_CORS_ALLOW_HEADERS="Content-Type,Authorization" \
-e WEBHOOK_URL=https://your-domain.com \
n8nio/n8n
```
## 4. Setup n8n Workflow
You can import the full workflow from n8n.json or build it manually with these nodes:

#### A. Webhook – listens to POST from frontend


#### B. AI Agent – receives story prompt


#### C. Groq Chat Model – GPT-4o backend


#### D. Set Node – removes <think>...</think> using:
```bash
{{ $json.output ? $json.output.replace(/<think>[\s\S]*?<\/think>/gi, '').trim() : '' }}
```

#### E. Respond to Webhook – sends JSON back to frontend:
```bash
{
  "post": "Here's your magical bedtime story!",
  "response": "{{ $json.cleanedStory }}"
}
```
✅ Make sure the workflow is active.

🔄 Flow Diagram
![Alt text of the image](https://github.com/theuntoldcreator/bedtimestories/workflow.png)

#### 🧪 Common Issues
### ❌ CORS Error?
Make sure N8N_CORS_ALLOW_ORIGIN=https://bedtimestories.pages.dev is set.

### ❌ Webhook Returns Template?
Ensure your Respond node returns proper JSON and not {{$json.output}}.

## 5. 🛠 Future Ideas
🗣️ Add voice (text-to-speech)
📄 Download as PDF
🖼️ AI-generated story art
🧑‍🎓 Add multi-language support
📄 License
MIT © [TheUntoldCreator](https://github.dev/theuntoldcreator)

“Because every child deserves a magical story made just for them.”

