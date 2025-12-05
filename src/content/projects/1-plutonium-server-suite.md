---
title: "Plutonium Linux Server Suite"
description: "Complete automation suite for deploying and managing Call of Duty Plutonium servers on Linux with automated key generation."
publishDate: "2025-03-20"
tags: ["Linux", "Bash", "Docker", "Rust", "Python", "Gaming", "Automation", "Flask API"]
link: "https://github.com/Sterbweise/T6Server"
linkText: "View on GitHub"
featured: true
visibility: public
---

## Overview

**Plutonium Linux Server Suite** is a comprehensive ecosystem of tools designed to simplify the deployment, configuration, and management of Call of Duty game servers on the Plutonium platform for Linux systems. This suite combines automated server installation scripts, key generation utilities, and API services to provide a complete solution for hosting Plutonium multiplayer and zombie servers.

The project addresses the complexity of running Windows-based Call of Duty servers on Linux through Wine, automating everything from system configuration to server key generation, making it accessible even for users without extensive Linux or gaming server experience.

<div style="display: flex; align-items: center;">
    <img src="https://github.com/user-attachments/assets/3ee17ff5-25fa-494e-b874-610507794756" alt="image" style="width: 400px; height: 125px;"/>
    <img src="https://imgur.com/bBrx8Hf.png" alt="Plutonium showLogo" style="width: 400px; height: 125px; margin-left: 10px;"/>
</div>

## The Challenge

Running Call of Duty servers on Linux presents several technical challenges:

- **Windows Compatibility** - Call of Duty servers are Windows applications requiring Wine configuration
- **Complex Dependencies** - Multiple system packages, .NET Framework, and specific Wine versions needed
- **Server Key Generation** - Plutonium requires game ownership for official key generation
- **Manual Configuration** - Extensive manual setup of firewall rules, ports, and server parameters
- **Resource Management** - No built-in monitoring or resource limits for server processes

This suite automates all these pain points into a streamlined, user-friendly solution.

## Project Components

This suite consists of four interconnected repositories working together:

### 1. **T6Server** - Black Ops II Server Installer
Automated Bash script for deploying Call of Duty: Black Ops II (T6) servers on Debian-based Linux systems.

**Repository**: [github.com/Sterbweise/T6Server](https://github.com/Sterbweise/T6Server)

**Key Features**:
- One-command installation and uninstallation
- Automated system updates and dependency management
- UFW firewall configuration with automatic port rules
- Wine installation for Windows application support
- .NET Framework setup for IW4MAdmin integration
- Multi-language support (English/French)
- MOD support with custom maps and game modes
- CPU and memory usage limits
- Comprehensive logging and error handling

### 2. **T5Server** - Black Ops Server Installer
Simplified installation script for Call of Duty: Black Ops (T5) servers on Linux.

**Repository**: [github.com/Sterbweise/T5Server](https://github.com/Sterbweise/T5Server)

**Key Features**:
- Streamlined installation process for T5 servers
- Automated Wine and dependency configuration
- Network and firewall setup
- Server binary installation
- Directory structure management
- Troubleshooting guides for common issues

### 3. **Plutonium Key Generator** - CLI Key Generation Tool
Rust-based command-line utility for generating temporary Plutonium server keys without game ownership.

**Repository**: [github.com/Sterbweise/plutonium-key-generator](https://github.com/Sterbweise/plutonium-key-generator)

**Key Features**:
- Interactive command-line interface
- Support for multiple Call of Duty titles
- Zombie and Multiplayer mode support
- 48-hour temporary keys for testing
- Cross-platform (Windows/Linux binaries)
- API integration for automated key generation
- User-friendly prompts and error handling

**Supported Games**:
- Call of Duty: Black Ops ✅ (Fully supported)
- Call of Duty: Black Ops II ✅ (Fully supported)
- Call of Duty: World at War (API support pending)
- Call of Duty: Modern Warfare 3 (API support pending)

### 4. **Plutonium Key Generator API** - Flask-based Key Service
Containerized Python Flask API providing automated server key generation backend.

**Repository**: [github.com/Sterbweise/plutonium-key-generator-api](https://github.com/Sterbweise/plutonium-key-generator-api)

**Key Features**:
- RESTful API for key generation
- Docker containerization for easy deployment
- Automated Selenium-based key extraction
- Environment-based configuration
- Rate limiting and security features
- JSON response format
- Integration with Rust CLI client

## How It All Works Together

The suite follows a complete workflow from server installation to key generation:

```
1. Server Installation (T6Server/T5Server)
   ↓
   - Install Wine, dependencies, .NET Framework
   - Configure firewall and network ports
   - Set up directory structure
   - Download server binaries

2. Key Generation (CLI Tool)
   ↓
   - User runs plutonium-key-generator
   - Selects game and mode (Multiplayer/Zombie)
   - Enters server name

3. API Processing (Flask API)
   ↓
   - Receives request from CLI tool
   - Uses Selenium to automate Plutonium platform
   - Generates temporary 48-hour server key
   - Returns key to CLI tool

4. Server Configuration
   ↓
   - Apply generated key to server config
   - Launch server with monitoring
   - Server appears in Plutonium server list
```

## Technical Implementation

### Architecture

**Server Installers (Bash)**:
- Modular script design with functions for each setup step
- Error handling and rollback capabilities
- System health monitoring
- Resource usage tracking with limits

**Key Generator CLI (Rust)**:
- Cross-platform compilation (Windows/Linux)
- HTTP client for API communication
- Interactive terminal UI with prompts
- JSON serialization/deserialization

**Key Generator API (Python/Flask)**:
- Selenium WebDriver for browser automation
- Docker containerization with Alpine Linux
- Environment variable configuration
- RESTful endpoint design

### Technology Stack

| Component             | Technologies                      |
| --------------------- | --------------------------------- |
| **T6/T5 Server**      | Bash, Wine, UFW, systemd          |
| **Key Generator CLI** | Rust, reqwest, serde_json         |
| **Key Generator API** | Python, Flask, Selenium, Docker   |
| **Infrastructure**    | Linux (Debian-based), Docker, Git |

## Installation & Usage

### Quick Start - T6 Server

```bash
# Clone the repository
git clone https://github.com/Sterbweise/T6Server.git
cd T6Server

# Run the installer
sudo bash install.sh

# Follow the interactive prompts
# Server will be configured automatically
```

### Quick Start - Key Generation

**Download Pre-built Binary**:
```bash
# Linux
wget https://github.com/Sterbweise/plutonium-key-generator/releases/latest/download/plutonium-key-generator
chmod +x plutonium-key-generator
./plutonium-key-generator

# Windows
# Download plutonium-key-generator.exe from releases
# Double-click to run
```

**API Integration**:
```bash
# Clone and run the API
git clone https://github.com/Sterbweise/plutonium-key-generator-api.git
cd plutonium-key-generator-api

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Run with Docker
docker-compose up -d
```

## Use Cases

### Game Server Hosting
Host your own Call of Duty servers for private matches, custom game modes, or community events without needing to own the game.

### Development & Testing
Quickly spin up test servers for mod development, plugin testing, or server configuration experiments with temporary keys.

### Educational Projects
Learn about Linux system administration, Wine configuration, API development, and automation scripting through a practical project.

### Community Gaming
Set up dedicated servers for gaming communities with custom maps, mods, and configurations.

## Key Features Across the Suite

### 🔧 **Automation-First Design**
Every component is designed for minimal manual intervention - from one-command server installation to automated key generation.

### 🐧 **Linux-Optimized**
Built specifically for Debian-based Linux systems with proper Wine configuration, dependency management, and system integration.

### 🔒 **Security Conscious**
Includes firewall configuration, resource limits, proper permission handling, and secure API communication.

### 📊 **Monitoring & Logging**
Comprehensive logging, system health monitoring, CPU/memory tracking, and detailed error reporting.

### 🌍 **Multi-Language Support**
Server installers support both English and French interfaces for broader accessibility.

### 🎮 **Game Mode Flexibility**
Support for both Multiplayer and Zombie modes across supported Call of Duty titles.

## System Requirements

### For Server Installation
- **OS**: Debian-based Linux (Ubuntu 20.04+, Debian 11+)
- **RAM**: Minimum 2GB, recommended 4GB+
- **Storage**: 20GB+ free space
- **Network**: Static IP or dynamic DNS recommended
- **Ports**: 4976-4977 (T6), 4970-4971 (T5)

### For Key Generator
- **OS**: Windows 10+ or Linux (any distribution)
- **Network**: Internet connection for API access
- **Dependencies**: None (standalone binaries)

### For API Deployment
- **Docker**: Version 20.10+
- **Docker Compose**: Version 1.29+
- **RAM**: 512MB minimum
- **Network**: Public IP for remote access (optional)

## Project Evolution

This suite evolved from personal need to community tool:

1. **Initial Problem**: Difficulty setting up Plutonium servers on Linux
2. **First Solution**: Manual Bash scripts for T6 server setup
3. **Expansion**: Added T5 support and improved automation
4. **Key Challenge**: Server key generation required game ownership
5. **Innovation**: Developed Rust CLI + Python API for automated key generation
6. **Refinement**: Dockerized API, improved error handling, added monitoring

## Important Disclaimers

⚠️ **Game Ownership**: If you own the game, please use the official Plutonium platform for key generation: [platform.plutonium.pw/serverkeys](https://platform.plutonium.pw/serverkeys)

⚠️ **Temporary Keys**: Generated keys are valid for 48 hours only, suitable for testing and temporary setups.

⚠️ **Educational Purpose**: This project is intended for educational and development purposes. Users should comply with all applicable laws and terms of service.

⚠️ **No Warranty**: This software is provided as-is without any warranties. Use at your own risk.


## Contributing

Contributions are welcome across all repositories! Whether it's:
- 🐛 Bug fixes and issue reports
- ✨ New features and enhancements
- 📝 Documentation improvements
- 🌍 Additional language support
- 🎮 Support for additional Call of Duty titles

## License

All components are open source under the MIT License.

## Support & Resources

- **T6Server Issues**: [github.com/Sterbweise/T6Server/issues](https://github.com/Sterbweise/T6Server/issues)
- **T5Server Issues**: [github.com/Sterbweise/T5Server/issues](https://github.com/Sterbweise/T5Server/issues)
- **Key Generator Issues**: [github.com/Sterbweise/plutonium-key-generator/issues](https://github.com/Sterbweise/plutonium-key-generator/issues)
- **API Issues**: [github.com/Sterbweise/plutonium-key-generator-api/issues](https://github.com/Sterbweise/plutonium-key-generator-api/issues)

---

**Project Status**: Active Development | **Stars**: 45+ | **Forks**: 20+ | **Languages**: Bash, Rust, Python
