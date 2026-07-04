---
sidebar_position: 2
title: Prompt Engineering Lab
---

# Lab 2 — Prompt Engineering in C#

## 🏢 Business Problem

Your API from Lab 1 works, but the AI is too conversational. When you ask it to extract data, it replies: *"Sure, I'd be happy to help! Here is the data you requested: [Data]. Have a great day!"*

If you try to save that response to a SQL database, the application will crash. You need to engineer the prompt to force the LLM to output structured JSON and absolutely nothing else.

---

## 🧪 Prerequisites

- The `SimpleAiApi` project from Lab 1.

---

## 🛠️ Step-by-Step Instructions

### Step 1: Define the System Prompt

LLMs distinguish between **System Prompts** (developer instructions) and **User Prompts** (user input). We must update our endpoint to send both.

Open `Program.cs` and modify the `/api/chat` endpoint:

```csharp title="Program.cs"
app.MapPost("/api/extract", async (ExtractRequest request, IChatClient chatClient) =>
{
    // 1. Construct a list of Chat Messages
    var messages = new List<ChatMessage>
    {
        // 2. The System Message defines the persona and STRICT rules
        new ChatMessage(ChatRole.System, """
            You are a data extraction assistant.
            Your job is to extract the 'CustomerName' and 'OrderNumber' from the user's text.
            
            RULES:
            1. You MUST respond in pure JSON format.
            2. You MUST NOT include conversational text like "Sure, here is your data".
            3. If you cannot find the data, return {"error": "data missing"}.
            
            EXAMPLE OUTPUT:
            {
                "CustomerName": "John Doe",
                "OrderNumber": "ORD-123"
            }
            """),

        // 3. The User Message is the actual data we want processed
        new ChatMessage(ChatRole.User, request.EmailText)
    };

    // 4. Send the message array to the LLM
    var response = await chatClient.CompleteAsync(messages);

    // 5. In a real app, you would deserialize this JSON to a C# object here
    return Results.Content(response.Message.Text, "application/json");
});

public record ExtractRequest(string EmailText);
```

### Step 2: Test the Endpoint

Run your application and test the new endpoint. Note how we are sending a messy, conversational email to the API.

```bash
curl -X POST http://localhost:5000/api/extract \
     -H "Content-Type: application/json" \
     -d '{"EmailText":"Hi team, this is Jane Smith. I never received my package for order ORD-9982. Please refund me."}'
```

---

## ✅ Verification

If your prompt engineering was successful, the AI will ignore the conversational tone of the email and return *only* a perfectly formatted JSON string:

```json
{
  "CustomerName": "Jane Smith",
  "OrderNumber": "ORD-9982"
}
```

If it returns conversational text, your System Prompt is not strict enough!

---

## 🎯 Interview Questions

### Q1: What is the difference between a System Prompt and a User Prompt?
**Answer:** The System Prompt is controlled exclusively by the developer and sets the rules, boundaries, and persona of the AI. It has a higher weight in the LLM's attention mechanism. The User Prompt is untrusted input from the end-user. Separating them helps prevent the user's instructions from overriding the developer's instructions (Prompt Injection).

### Q2: What technique did we use in the System Prompt above?
**Answer:** We used **Few-Shot Prompting**. By providing a literal `EXAMPLE OUTPUT` in the prompt, we mathematically forced the LLM to recognize the pattern we wanted. LLMs are pattern-completion engines; showing them an example is 10x more effective than just telling them what to do.

### Q3: How do you guarantee the JSON format is perfect every time?
**Answer:** While strict prompting works 95% of the time, to guarantee it, you must use **Structured Outputs** (JSON Mode). In `Microsoft.Extensions.AI` or the OpenAI SDK, you can pass a JSON Schema in the API request settings, forcing the LLM at the hardware level to only generate tokens that conform to your exact schema.

---

**Next Lab:** [Mini RAG System →](/docs/labs/mini-rag-system)
