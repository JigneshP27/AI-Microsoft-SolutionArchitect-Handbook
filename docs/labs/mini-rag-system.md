---
sidebar_position: 3
title: Mini RAG System
---

# Lab 3 — Build a Mini RAG System

## 🏢 Business Problem

Your LLM is incredibly smart, but it doesn't know your company's proprietary vacation policy. If a user asks *"How many days off do I get?"*, the LLM hallucinates an answer.

You need to build a **Retrieval-Augmented Generation (RAG)** system that searches a local database for the vacation policy, and injects that text into the LLM's prompt before it answers.

---

## 🧪 Prerequisites

Create a new console application for this lab, as RAG requires several moving parts.
```bash
dotnet new console -n MiniRagLab
cd MiniRagLab
```

You will need the Semantic Kernel memory packages:
```bash
dotnet add package Microsoft.SemanticKernel
dotnet add package Microsoft.SemanticKernel.Plugins.Memory
```

---

## 🛠️ Step-by-Step Instructions

### Step 1: Initialize Semantic Kernel with Memory

Open `Program.cs`. We need to initialize SK with both a Chat Model (for talking) and an Embedding Model (for math).

```csharp title="Program.cs"
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Memory;
using Microsoft.SemanticKernel.Connectors.OpenAI;

var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");

// 1. Build the Kernel with BOTH Chat and Embeddings
var builder = Kernel.CreateBuilder()
    .AddOpenAIChatCompletion("gpt-4o", apiKey)
    .AddOpenAITextEmbeddingGeneration("text-embedding-3-small", apiKey);
    
var kernel = builder.Build();

// 2. Create a Volatile (In-Memory) Vector Database
// In production, you would use Qdrant, Azure AI Search, or pgvector here.
#pragma warning disable SKEXP0001
var memory = new VolatileMemoryStore();
var semanticTextMemory = new MemoryBuilder()
    .WithMemoryStore(memory)
    .WithTextEmbeddingGeneration(kernel.GetRequiredService<ITextEmbeddingGenerationService>())
    .Build();
#pragma warning restore SKEXP0001
```

### Step 2: Ingest the Data

We must generate vector embeddings for our proprietary company data and save it to the Vector DB.

```csharp title="Program.cs (Continued)"
Console.WriteLine("Generating embeddings and saving to database...");

const string collectionName = "HR_Policies";

// 3. Ingesting corporate knowledge
await semanticTextMemory.SaveInformationAsync(
    collection: collectionName, 
    id: "doc1", 
    text: "Employees with less than 5 years of tenure receive 15 days of PTO. Employees with 5+ years receive 20 days.");

await semanticTextMemory.SaveInformationAsync(
    collection: collectionName, 
    id: "doc2", 
    text: "The company provides a $500 annual stipend for home office equipment.");

Console.WriteLine("Data ingested successfully!\n");
```

### Step 3: Retrieve and Augment

Now we take a user's question, search the Vector DB for the most relevant context, and construct the final prompt.

```csharp title="Program.cs (Continued)"
var userQuestion = "How much PTO do I get if I've worked here for 7 years?";

// 4. Retrieve (Vector Search)
Console.WriteLine($"Searching DB for: {userQuestion}");
var searchResults = await semanticTextMemory.SearchAsync(collectionName, userQuestion, limit: 1).ToListAsync();

var retrievedContext = searchResults.FirstOrDefault()?.Metadata.Text ?? "No relevant information found.";
Console.WriteLine($"Found Context: {retrievedContext}\n");

// 5. Augment (Inject into the Prompt)
var strictSystemPrompt = $$"""
    You are an HR Assistant. Answer the user's question using ONLY the provided context.
    If the answer is not in the context, say "I don't know."
    
    [CONTEXT]
    {{retrievedContext}}
    """;

// 6. Generate (Call the LLM)
Console.WriteLine("Generating final answer...");
var result = await kernel.InvokePromptAsync(
    promptTemplate: strictSystemPrompt + "\n\nUser Question: " + userQuestion,
    arguments: new KernelArguments(new OpenAIPromptExecutionSettings { Temperature = 0.0 }));

Console.WriteLine($"\nAI Answer: {result}");
```

---

## ✅ Verification

Run the console application (`dotnet run`). You should see:
1. The search correctly identifies `doc1` as the relevant context.
2. The AI uses the context to answer correctly: *"You receive 20 days of PTO."*

If you change the question to *"Who is the CEO?"*, the Vector DB will return nothing relevant, and the AI should answer *"I don't know."* (This prevents hallucination).

---

## 🎯 Interview Questions

### Q1: Why did we need to inject the `ITextEmbeddingGenerationService` into the Memory Builder?
**Answer:** The Vector Database does not store text; it stores numbers (vectors). When we called `SaveInformationAsync()`, the Memory component silently called the Embedding Model API to convert our English text into an array of 1,536 floats, and stored that array in the database alongside the text.

### Q2: Why is the Temperature set to 0.0 in the generation step?
**Answer:** Because this is a RAG system, we want the LLM to act as a strict, analytical retrieval engine based *only* on the provided context. A temperature of 0.0 eliminates randomness/creativity, mathematically forcing the model to pick the most factual, grounded answer and reducing the chance of hallucination.

### Q3: In a real enterprise system, how does data get into the Vector DB?
**Answer:** You would not hardcode text like we did in Step 2. You would build a background data ingestion pipeline (an ETL/Event-Driven worker) that listens to SharePoint or Azure Blob Storage. When a PDF is uploaded, the worker downloads it, extracts the text, chunks it into paragraphs, generates embeddings for each chunk, and saves them to a persistent Vector DB (like Azure AI Search).

---

**Next Lab:** [Local AI with Ollama →](/docs/labs/local-ai-ollama)
