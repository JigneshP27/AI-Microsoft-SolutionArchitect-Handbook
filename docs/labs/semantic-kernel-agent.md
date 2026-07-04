---
sidebar_position: 5
title: Semantic Kernel Agent Lab
---

# Lab 5 — Semantic Kernel Agent Lab

## 🏢 Business Problem

Your users want to know the weather, but the LLM's training data was cut off in 2023. If they ask, *"What is the weather in London right now?"*, the LLM hallucinates an answer or apologizes.

You need to build an Autonomous Agent. You will give the LLM a "Weather Plugin" (a C# function). The LLM must intelligently decide to pause its generation, call your C# function, read the result, and *then* answer the user.

---

## 🧪 Prerequisites

Create a new console application:
```bash
dotnet new console -n AgentLab
cd AgentLab
```

Install Semantic Kernel (you must use a model that supports Tool Calling, like OpenAI GPT-4 or Azure OpenAI):
```bash
dotnet add package Microsoft.SemanticKernel
```

---

## 🛠️ Step-by-Step Instructions

### Step 1: Create the Native C# Plugin

A Plugin is just a standard C# class. We use the `[KernelFunction]` and `[Description]` attributes to explain to the LLM what the code does. The descriptions are critical—they form the JSON schema sent to the LLM!

```csharp title="Program.cs"
using System.ComponentModel;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.OpenAI;

// 1. Define the Plugin
public class WeatherAndTimePlugin
{
    [KernelFunction, Description("Gets the current date and time.")]
    public string GetCurrentTime()
    {
        Console.WriteLine("\n[API EXECUTED: GetCurrentTime]");
        return DateTime.Now.ToString("F");
    }

    [KernelFunction, Description("Gets the current weather for a specified city.")]
    public string GetWeather([Description("The city to check")] string city)
    {
        Console.WriteLine($"\n[API EXECUTED: GetWeather for {city}]");
        
        // In a real app, you would call a REST API like OpenWeatherMap here.
        if (city.ToLower() == "london")
            return "60°F and rainy.";
            
        return "75°F and sunny.";
    }
}
```

### Step 2: Initialize the Agent

We must configure the Kernel to automatically invoke these functions if the LLM requests them (the ReAct loop).

```csharp title="Program.cs (Continued)"
// 2. Setup the Kernel
var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
var builder = Kernel.CreateBuilder()
    .AddOpenAIChatCompletion("gpt-4o", apiKey); // GPT-4o natively supports tool calling

// 3. Load the Plugin into the Kernel's memory
builder.Plugins.AddFromType<WeatherAndTimePlugin>();
var kernel = builder.Build();

// 4. IMPORTANT: Enable Auto-Function Calling!
var executionSettings = new OpenAIPromptExecutionSettings 
{ 
    ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions 
};
```

### Step 3: Run the ReAct Loop

Let's ask a complex question that requires the LLM to use *multiple* tools sequentially.

```csharp title="Program.cs (Continued)"
// 5. Provide a complex goal
var userPrompt = "What is the exact date today? Also, based on the current weather in London, should I pack an umbrella?";

Console.WriteLine($"User: {userPrompt}");
Console.WriteLine("Agent is thinking (and calling tools)...\n");

// 6. Execute! The Kernel will automatically loop, calling our C# code as needed.
var result = await kernel.InvokePromptAsync(userPrompt, new(executionSettings));

Console.WriteLine($"\nFinal Answer: {result}");
```

---

## ✅ Verification

Run the application (`dotnet run`). Watch the console output carefully. 
You should see:

1. `[API EXECUTED: GetCurrentTime]` (The LLM decided it needed the date).
2. `[API EXECUTED: GetWeather for London]` (The LLM decided it needed the weather).
3. `Final Answer: Today is [Date]. Since it is 60°F and rainy in London, you should definitely pack an umbrella.`

The LLM autonomously gathered facts from your C# code before formulating its response!

---

## 🎯 Interview Questions

### Q1: What exactly happens when `ToolCallBehavior.AutoInvokeKernelFunctions` is enabled?
**Answer:** It enables the ReAct loop. When `InvokePromptAsync` is called, the Kernel serializes your plugin descriptions and sends them to OpenAI. If OpenAI responds with a "ToolCall" JSON object instead of text, the Kernel intercepts it, finds the matching C# function, executes it, appends the result to the chat history, and automatically sends it *back* to OpenAI to get the final answer.

### Q2: Is there a limit to how many tools you should give an Agent?
**Answer:** Yes. Every tool description consumes tokens in the System Prompt context window. Furthermore, if you give an Agent 50 tools, it will suffer from "instruction dilution" and often hallucinate or call the wrong tool. It is best practice to give an Agent 3-5 highly specific tools (Micro-Agents).

### Q3: How do you handle a scenario where a tool requires human approval (e.g., `DeleteDatabaseTable`)?
**Answer:** You must turn *off* `AutoInvokeKernelFunctions`. Instead, you use `ToolCallBehavior.EnableKernelFunctions`. This tells the Kernel to return the LLM's requested Tool Call back to your application code. You can then render an "Approve/Reject" button in the UI. If approved, your C# code manually executes the function and passes the result back to the LLM.

---

**Congratulations!** You have completed Volume 5 — Labs. 🎉
