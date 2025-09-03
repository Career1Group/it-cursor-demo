# Model Context Protocol MCP

# Warum MCP?

Anthropic: 24.11.2024 https://www.anthropic.com/news/model-context-protocol 

Offener Standard

**2025 Year of the LLM Agent**

**Ohne MCP:** Anpassungen im Tool muessen in dem AI System gemacht werden.

[**Mit MCP:](https://modelcontextprotocol.io/docs/getting-started/intro)**  

- Tools koennen in anderen Systemen leicht wiederverwendet werden, Baukastenprinzip
- Tools/ LLM System kann unabhaengig skalieren
- MCP Tool Marketplace
- USB - C fuer LLM Systeme
    
     
    

[https://modelcontextprotocol.io/docs/getting-started/intro](https://modelcontextprotocol.io/docs/getting-started/intro)

## Wie funktioniert MCP?

![image.png](Model%20Context%20Protocol%20MCP%20253c837ff7da80b98c57fa78aea62350/image.png)

### Kommunikation

Lokale MCP Server: **StdIO**

Remote MCP Server: **HTTP**, **SSE**

Via  JSON-RPC Messages 

**Software mit integriertem MCP client** (noch nicht so viele): Windsurf/Cursor, Claude Desktop, LibreChat, elevenLabs Voice chat, n8n MCP Client Node

 [https://www.pulsemcp.com/clients](https://www.pulsemcp.com/clients)

### Ablauf

1. Initiale Verbindung und Handshake bei Host start.
2. MCP Server sendet  Capabilities
3. Client bestaetigt mit ‘initialized’
4. MCP Version negotiation
5. Operationen
6. Shutdown

![image.png](Model%20Context%20Protocol%20MCP%20253c837ff7da80b98c57fa78aea62350/image%201.png)

![image.png](Model%20Context%20Protocol%20MCP%20253c837ff7da80b98c57fa78aea62350/image%202.png)

## Probleme mit MCP

**Simples Protokol**

- Keine Auth (wurde nachgezogen)
- Keine granulare Kontrolle
- Keine Kostenkontrolle
- Unstrukturierter Text als Input (Validierung)
- Einfache Transportprotokolle gewaehlt (StdIO anstatt Sockets, SSE statt Websockets)

### **Prinzipielles Probleme (nicht nur MCP)**: Maechtige KI Systeme einfach und schnell bauen

**Prominente Security Fails:**

[https://towardsdatascience.com/the-mcp-security-survival-guide-best-practices-pitfalls-and-real-world-lessons/?_hsmi=375817800](https://towardsdatascience.com/the-mcp-security-survival-guide-best-practices-pitfalls-and-real-world-lessons/?_hsmi=375817800)

- **Anthropic** 0.0.0.0:Day  (MCP Inspector offen, ohne Auth → Remote Code Execution)
- **Trend Micro** (Prompt Injection ueber Ticket System,  nicht Prod ready SQL MCP Server → Agent loescht DB eintraege, sendet email mit Kundendaten)
- **Asana** ( Tenants nicht abgetrennt → Daten von anderen Unternehmen konnten extrahiert werden)
- **Atlassian** ( Prompt Injection →  weitere Jira Funktionen die nicht im Server als Tool exponiert waren)

### MCP sicher verwenden (gilt eigentlich fuer alle Softwareprojekte)

- Input von externen Usern validieren um Code Injection zu vermeiden
- Per Client ein eigener API Key
- MCP Server und Code Libraries nur aus vertrauenswuerdigen Quellen verwenden
- “Least Privilige”  - MCP Server behandeln als wuerde sich Malware verstecken
- Genau pruefen was die Tools machen koennen
- Funktionen klein halten pro Server
- Server abtrennen von anderen wichtigen Systemen

**MCP spezifisch:**

- Menschen sollen kritische Funktionen bestaetigen muessen
- Bei Systemen mit Userverifizierung für Tools: OAuth2-Userverifizierung (*aud* und *iss* claim) für jeden Service