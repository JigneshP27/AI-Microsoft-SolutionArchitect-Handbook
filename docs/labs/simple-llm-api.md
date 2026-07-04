---
sidebar_position: 1
title: Build a Simple LLM API
---

# Lab 1 — Build a Simple LLM API in .NET

## 🏢 Business Problem

Your company wants to integrate an AI Chatbot into their internal portal. They want to use the latest .NET 8 features to ensure the code is maintainable and vendor-agnostic. 

You need to build a lightweight API endpoint that takes a user's prompt and returns a response from an LLM.

---

## 🧪 Prerequisites

Before starting this lab, ensure you have:
1. **.NET 8 SDK** installed (`dotnet --version`).
2. An **OpenAI API Key** (or Azure OpenAI endpoint).
3. A code editor like **Visual Studio Code** or **Visual Studio 2022**.

---

## 🛠️ Step-by-Step Instructions

### Step 1: Create the Project

Open your terminal and create a new ASP.NET Core Web API project.

```bash
dotnet new webapi -n SimpleAiApi
cd SimpleAiApi
```

### Step 2: Install Packages

We will use the new `Microsoft.Extensions.AI` package to ensure our API is model-agnostic, and the official `OpenAI` package as our backend provider.

```bash
dotnet add package Microsoft.Extensions.AI
dotnet add package Microsoft.Extensions.AI.OpenAI
dotnet add package OpenAI
```

### Step 3: Configure Dependency Injection

Open `Program.cs`. Delete all the boilerplate code (WeatherForecast) and replace it with the following:

```csharp title="Program.cs"
using Microsoft.Extensions.AI;
using OpenAI;

var builder = WebApplication.CreateBuilder(args);

// 1. Grab your API key from configuration (secrets.json or environment variables)
// NEVER hardcode this in production!
var apiKey = builder.Configuration["OpenAI:ApiKey"] 
             ?? throw new InvalidOperationException("API Key missing.");

// 2. Register the OpenAI Client as an IChatClient
// This abstracts away OpenAI, allowing us to swap it later if needed.
builder.Services.AddChatClient(new OpenAIClient(apiKey).AsChatClient("gpt-4o"));

var app = builder.Build();
```

### Step 4: Create the API Endpoint

Add a Minimal API endpoint that accepts a prompt and returns the AI's response.

```csharp title="Program.cs (Continued)"
// 3. Create a POST endpoint that injects the IChatClient
app.MapPost("/api/chat", async (ChatRequest request, IChatClient chatClient) =>
{
    if (string.IsNullOrWhiteSpace(request.Prompt))
        return Results.BadRequest("Prompt cannot be empty.");

    // Send the prompt to the LLM
    var response = await chatClient.CompleteAsync(request.Prompt);

    // Return the response text
    return Results.Ok(new ChatResponse(response.Message.Text));
});

app.Run();

// DTOs for the API
public record ChatRequest(string Prompt);
public record ChatResponse(string Answer);
```

### Step 5: Test the API

1. Run the application:
   ```bash
   # Set your API key in the environment for local testing
   $env:OpenAI__ApiKey="sk-your-key-here"
   dotnet run
   ```
2. Open a new terminal and test it using `curl` or use a tool like Postman:
   ```bash
   curl -X POST http://localhost:5000/api/chat \
        -H "Content-Type: application/json" \
        -d '{"Prompt":"Explain quantum computing in one sentence."}'
   ```

---

## ✅ Verification

If the lab is successful, your API will return a JSON response similar to this:

```json
{
  "answer": "Quantum computing is a rapidly-emerging technology that harnesses the laws of quantum mechanics to solve problems too complex for classical computers."
}
```

---

## 🎯 Interview Questions

### Q1: Why did we inject `IChatClient` instead of `OpenAIClient` into our endpoint?
**Answer:** Injecting `IChatClient` adheres to the Dependency Inversion Principle. Our API endpoint now has zero knowledge that it is talking to OpenAI. If the company decides to switch to Anthropic or a local Ollama model tomorrow, we only have to change one line of code in `Program.cs` and the endpoint remains completely untouched.

### Q2: What happens if the LLM takes 30 seconds to reply to this Minimal API?
**Answer:** The HTTP request will remain open (blocking the client) for 30 seconds. While this is fine for a quick lab, in a production enterprise environment, this can lead to Load Balancer timeouts (HTTP 504) and thread pool exhaustion. Production systems should use Event-Driven queues or WebSockets (SignalR) for long-running AI tasks.

---

**Next Lab:** [Prompt Engineering →](/docs/labs/prompt-engineering)
