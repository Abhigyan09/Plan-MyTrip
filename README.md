<p><a target="_blank" href="https://app.eraser.io/workspace/ITHfX2CmBRfVZimKKniY" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

# Travel AI Planner

A modern travel planning application that uses AI to help users create personalized travel itineraries.

## Features

- AI-powered travel plan generation
- User authentication with Clerk
- Credit system for plan generation
- Payment integration with Razorpay
- Google Maps integration
- Responsive design for all devices

## Tech Stack

- Next.js 14
- TypeScript
- Convex Backend
- Clerk Authentication
- Google AI (Gemini)
- Razorpay Payment Gateway
- Tailwind CSS

## Prerequisites

- Node.js 18+ and npm
- Clerk account
- Convex account
- Google AI API key
- Razorpay account
- Google Maps API key
- Unsplash API key
- Resend API key

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Convex
CONVEX_DEPLOYMENT=your_deployment
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_HOSTING_URL=http://localhost:3000
CONVEX_DEPLOY_KEY=your_deploy_key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
CLERK_JWT_ISSUER_DOMAIN=your_issuer_domain
CLERK_JWT_TEMPLATE=convex
WEBHOOK_SIGNING_SECRET=your_webhook_secret

# Google AI
GOOGLE_AI_API_KEY=your_gemini_api_key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key

# Unsplash
UNSPLASH_ACCESS_KEY=your_unsplash_key

# Resend
RESEND_API_KEY=your_resend_key

# Razorpay
NEXT_PUBLIC_RAZORPAY_PAYMENT_PAGE_URL=your_razorpay_url
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/travel-ai-planner.git
cd travel-ai-planner
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables in `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add your environment variables in Vercel's project settings
4. Deploy!

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Overview
Travel Planner AI is a Software as a Service (SaaS) product that leverages cutting-edge technologies to streamline the travel planning process.
By simply providing a prompt such as "2 days trip to London with budget $1000," our AI-powered tool generates comprehensive travel plans tailored to your preferences.

![image](https://github.com/hardikverma22/travel-planner-ai/assets/26103679/de21a51b-6d95-427c-a00a-b919dd09c56e "")

## Demo
Check out the live demo [﻿here](https://travelplannerai.online/).

## Key Functional Features
- **Top Spots Unveiled:** Discover hidden gems and popular attractions effortlessly.
- **Tailored Itineraries:** Plan your days seamlessly with custom-tailored schedules.
- **Optimal Timing:** Learn the best time to visit your destinations for an unparalleled experience.
- **Foodie Hotspots:** Indulge in culinary delights with recommendations from local experts.
- **Prime Experiences:** Immerse yourself in unforgettable moments curated just for you.
- **Expense Tracker:** Effectively track your expenses throughout your journey and can revisit later as well.
- **Email Invite:** Invite your friend and colleagues to your desired plan and collaborate together.
## Architecture
![Architecture Diagram](/.eraser/ITHfX2CmBRfVZimKKniY___02a0ac4RaOW4qPyzxPn66zodRbA3___---figure---ve0MOtPUnuyQd2KhDYy9V---figure---s1GcusGonEODvuhKC9v8rQ.png "Architecture Diagram")

![Email Flow](/.eraser/ITHfX2CmBRfVZimKKniY___02a0ac4RaOW4qPyzxPn66zodRbA3___---figure---6HMnI9tpLngtE2PcNIhPL---figure---wYeVIfbY5wm_ADKyKI0VPQ.png "Email Flow")



## Installation
To run the Travel Planner AI, follow these steps:

1. Clone the repository:git clone [﻿https://github.com/hardikverma22/travel-planner-ai](https://github.com/hardikverma22/travel-planner-ai) 
2. Navigate to the project directory:cd travel-planner-ai
3. Install the dependencies:npm install
4. Start the development server:npm run dev
5. Open your browser and visit [﻿http://localhost:3000](http://localhost:3000/)  to see the app in action.
## Technologies Used
- Travel Planner AI is built using cutting-edge technologies to ensure a seamless user experience.
- **Next.js 14:** Leveraging the latest advancements in Next.js for efficient web application development.
- **Tailwind CSS with Shadcn-UI:** Utilizing Tailwind CSS with Shadcn-UI for responsive and visually stunning user interfaces.
- **Convex Backend Platform:** Powering our backend infrastructure for robust performance and scalability.
- **OpenAI APIs:** Harnessing the power of OpenAI's APIs for intelligent content generation and natural language processing.
- **Clerk:** Providing secure authentication solutions to safeguard user accounts and data.
- **Razorpay:** Facilitating seamless payment processing supporting wide range of payment methods.
- **Resend:** For sending email invites using my custom domain.
## Contributing
 Contributions are welcome! If you'd like to contribute to Shoe Forge, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to the main branch of the original repository.




<!--- Eraser file: https://app.eraser.io/workspace/ITHfX2CmBRfVZimKKniY --->