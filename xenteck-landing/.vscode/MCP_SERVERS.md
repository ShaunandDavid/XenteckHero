# MCP Servers Configuration

This document explains the MCP (Model Context Protocol) servers configured in this project and where to find more information about them.

## What is MCP?

MCP (Model Context Protocol) is an open standard that allows AI assistants like Claude to interact with external tools, data sources, and APIs. MCP servers act as bridges between the AI assistant and various services.

## Configured Servers

### 1. Rube (`rube`)
- **Purpose**: Connects your AI to 500+ business and productivity apps
- **Apps**: Gmail, Slack, GitHub, Notion, Airtable, Google Drive, and many more
- **Source**: https://rube.app/mcp
- **GitHub**: https://github.com/ComposioHQ/Rube
- **Documentation**: https://mcpmarket.com/server/rube

### 2. OpenAI (`openai`)
- **Purpose**: Allows Claude to interact with OpenAI's GPT models (GPT-4o, GPT-4o-mini, o1-preview, o1-mini)
- **Package**: `@mzxrai/mcp-openai`
- **npm**: https://www.npmjs.com/package/@mzxrai/mcp-openai
- **GitHub**: https://github.com/mzxrai/mcp-openai
- **Setup**: Requires `OPENAI_API_KEY` environment variable

#### OpenAI Server Configuration

To use the OpenAI MCP server, you need to:
1. Get an OpenAI API key from https://platform.openai.com/api-keys
2. Replace `"your-openai-api-key-here"` in `mcp.json` with your actual API key

**Note**: For security, consider using environment variables instead of hardcoding the API key. You can set it in your shell:
```bash
export OPENAI_API_KEY="sk-..."
```

Then update the mcp.json to reference it (if your MCP client supports this):
```json
"env": {
  "OPENAI_API_KEY": "${OPENAI_API_KEY}"
}
```

### About Claude MCP Server

**Note**: There is no separate "Claude MCP server" to add because Claude Desktop/Claude Code IS the client that uses these MCP servers. The MCP servers you configure here are tools that Claude can access, not separate Claude instances.

## How to Use

Once configured, restart your AI assistant (Claude Desktop, VS Code with Claude, etc.) and the MCP servers will be available for use. You can ask your assistant to use specific tools like:
- "Use Rube to send an email via Gmail"
- "Ask GPT-4o what it thinks about this code"
- "Connect to my Slack and get recent messages"

## Finding More MCP Servers

Here are some resources to discover additional MCP servers:

- **MCP Directory**: https://www.mcplist.ai/
- **Glama MCP Servers**: https://glama.ai/mcp/servers
- **Awesome MCP Servers (GitHub)**: https://github.com/win4r/Awesome-Claude-MCP-Servers
- **Official MCP Registry**: https://github.com/modelcontextprotocol/servers
- **ClaudeLog MCP Directory**: https://claudelog.com/claude-code-mcps/awesome-mcp-servers/

## Common MCP Servers

Some popular MCP servers you might want to add:

- **Filesystem**: `@modelcontextprotocol/server-filesystem` - Access local files
- **GitHub**: `@modelcontextprotocol/server-github` - Interact with GitHub repos
- **Google Drive**: `@modelcontextprotocol/server-google-drive` - Access Google Drive
- **Postgres**: `@modelcontextprotocol/server-postgres` - Query PostgreSQL databases
- **Slack**: `@modelcontextprotocol/server-slack` - Send/read Slack messages
- **Brave Search**: `@modelcontextprotocol/server-brave-search` - Web search
- **Memory**: `@modelcontextprotocol/server-memory` - Persistent memory for AI

## Installation Format

All MCP servers follow this format in `mcp.json`:

```json
{
  "servers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "package-name@latest"],
      "env": {
        "REQUIRED_ENV_VAR": "value"
      }
    }
  }
}
```

## Security Notes

- Only install MCP servers from trusted sources
- Never commit API keys to version control
- Use environment variables for sensitive credentials
- Review the permissions each MCP server requires before installing
