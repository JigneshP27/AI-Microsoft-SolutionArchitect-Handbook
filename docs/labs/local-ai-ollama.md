---
sidebar_position: 4
title: Local AI with Ollama
---

# Lab 4 — Local AI with Ollama

## 🏢 Business Problem

Your company is testing a massive AI pipeline. Developers are hitting F5 (Debug) 200 times a day, sending thousands of tokens to Azure OpenAI. The monthly bill for development alone is $5,000. 

Furthermore, you are testing a feature that parses internal financial PDFs, which the legal team forbids sending over the internet.

You need to run an open-source LLM entirely on your local machine for zero-cost, air-gapped development.

---

## 🧪 Prerequisites

1. Download and install **Ollama** from [ollama.com](https://ollama.com). (Available for Windows, Mac, and Linux).
2. Create a new .NET console application:
   ```bash
   dotnet new console -n OllamaLab
   cd OllamaLab
   ```
3. Install the specific Semantic Kernel Ollama connector:
   ```bash
   dotnet add package Microsoft.SemanticKernel
   dotnet add package Microsoft.SemanticKernel.Connectors.Ollama --prerelease
   ```

---

## 🛠️ Step-by-Step Instructions

### Step 1: Pull the Open Source Model

Open your terminal (PowerShell, bash, or Command Prompt). You do not need .NET for this step.

Run the following command to download **LLaMA 3.1** (Meta's 8-billion parameter open-source model). Note: This will download approximately 4.7 GB of data.

```bash
ollama pull llama3.1
```

Once the download is complete, verify the model is running on your local machine:

```bash
ollama run llama3.1
```
*(You can type "Hello" directly in the terminal to test it, then type `/bye` to exit).*

### Step 2: Configure Semantic Kernel to use Localhost

Ollama runs a background service on your machine exposing an API at `http://localhost:11434`. This API intentionally mimics the OpenAI schema!

Open `Program.cs` and configure Semantic Kernel:

```csharp title="Program.cs"
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;

Console.WriteLine("Connecting to local Ollama instance...");

var builder = Kernel.CreateBuilder();

// Tell SK to use the local Ollama endpoint instead of cloud servers
#pragma warning disable SKEXP0070 // Suppress experimental warning
builder.AddOllamaChatCompletion(
    modelId: "llama3.1",
    endpoint: new Uri("http://localhost:11434")
);
#pragma warning restore SKEXP0070

var kernel = builder.Build();
var chatService = kernel.GetRequiredService<IChatCompletionService>();
```

### Step 3: Execute the Local Chat

Add the chat loop to interact with your local, free model.

```csharp title="Program.cs (Continued)"
var history = new ChatHistory();
history.AddSystemMessage("You are a cynical, grumpy AI assistant.");

Console.WriteLine("System Ready. Type your message (or 'exit' to quit):");

while (true)
{
    Console.Write("\nUser > ");
    var userInput = Console.ReadLine();
    
    if (string.IsNullOrWhiteSpace(userInput)) continue;
    if (userInput.ToLower() == "exit") break;

    history.AddUserMessage(userInput);

    Console.WriteLine("AI > Thinking...");
    
    // This API call never leaves your machine!
    var response = await chatService.GetChatMessageContentAsync(history);
    
    Console.WriteLine($"\nAI > {response.Content}");
    
    history.AddAssistantMessage(response.Content);
}
```

---

## ✅ Verification

Run the application (`dotnet run`) and ask it a question. 

1. **Verify Privacy:** Disconnect your computer from the Wi-Fi entirely. Ask the AI another question. It will still answer perfectly!
2. **Verify Cost:** You have consumed exactly $0.00 in API tokens.
3. **Verify Performance:** Open Task Manager (Windows) or Activity Monitor (Mac). Watch your CPU/GPU spike when you hit Enter. The AI math is happening on your local silicon.

---

## 🎯 Interview Questions

### Q1: Why did we have to add `#pragma warning disable SKEXP0070`?
**Answer:** Microsoft frequently releases new connectors (like Ollama or HuggingFace) into Semantic Kernel as "Experimental" features. Because the API signatures might change in future minor updates, the compiler warns you. Suppressing it acknowledges you accept the risk of breaking changes in future NuGet updates.

### Q2: What happens if your developer laptop doesn't have a dedicated GPU?
**Answer:** Ollama is highly optimized. If you lack a GPU (VRAM), it will offload the mathematical matrix multiplications to your system RAM and CPU. The model will still run successfully, but token generation will be significantly slower (e.g., 5 tokens/sec on CPU vs 40 tokens/sec on GPU).

### Q3: How do you architect a system so developers use Ollama locally, but Production uses Azure OpenAI?
**Answer:** Use Dependency Injection and `appsettings.json`. You read a configuration flag (e.g., `"UseLocalAI": true`). If true, you register `AddOllamaChatCompletion()`. If false, you register `AddAzureOpenAIChatCompletion()`. The rest of your application code simply requests `IChatCompletionService` and has no idea which backend is powering it.

---

**Next Lab:** [Semantic Kernel Agent Lab →](/docs/labs/semantic-kernel-agent)
