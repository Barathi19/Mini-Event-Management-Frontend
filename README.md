# Mini Event Manager Frontend  

Frontend for the Event Manager app built with **Next.js, TailwindCSS, and Shadcn UI**.  

## Features  

- Browse upcoming events with available slots.  
- Register for an event using a modal form.  
- Create new events via a dedicated page.  
- Responsive UI with Shadcn components.  

## Tech Stack  

- **Framework**: Next.js 14 (App Router)  
- **Styling**: TailwindCSS, Shadcn UI  
- **Validation**: React Hook Form + Yup  
- **Notifications**: Sonner  

## Pages  

- `/events` → Event list (default landing page)  
- `/events/create` → Create new event  
- `/events/:id` → Event details  

## Setup  

```bash
cd frontend
npm install
npm run dev