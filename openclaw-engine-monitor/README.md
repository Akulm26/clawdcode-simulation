# OpenClaw Architecture Simulation

A full-stack simulation of the OpenClaw architecture.

## Features
- **Architectural Visualization:** Interactive step-by-step trace of a request through the OpenClaw system.
- **Full-Stack Backend:** Express.js server serving the frontend and handling API requests.
- **Modern Frontend:** React 19 + Vite + Tailwind CSS + Motion for smooth animations.

## Prerequisites
- Node.js 22+

## Setup

1. **Clone and Install:**
   ```bash
   npm install
   ```

2. **Development:**
   ```bash
   npm run dev
   ```

3. **Production Build:**
   ```bash
   npm run build
   npm start
   ```

## Architecture Overview
1. **Gateway Entry:** Normalizes raw input payloads.
2. **Memory Retrieval:** Fetches context from Jira, Calendar, and Slack.
3. **LLM Reasoning:** Decides which tools to call via MCP.
4. **Sandbox Execution:** Securely executes tools with self-correction logic.
5. **MCP Integration:** Synthesizes multi-source data.
6. **Final Delivery:** Presents the personalized response to the user.
