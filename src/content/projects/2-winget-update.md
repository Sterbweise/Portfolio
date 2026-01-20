---
title: "Winget Update Manager"
description: "PowerShell automation tool for intelligent Windows application lifecycle management using WinGet with advanced features."
publishDate: "2024-01-15"
tags: ["PowerShell", "WinGet", "Automation", "Windows", "DevOps", "System Administration"]
link: "https://github.com/Sterbweise/winget-update"
linkText: "View on GitHub"
featured: true
visibility: public
githubStars: 10
downloads: 350
---

## Overview

**Winget Update Manager** is a comprehensive PowerShell automation tool designed for Windows system administrators and power users who need intelligent, reliable application lifecycle management. Built on top of the Windows Package Manager (WinGet), this tool transforms basic package management into an automation solution with smart detection, persistent exclusion management, and enterprise-ready logging capabilities.

Whether you're managing a single workstation or deploying updates across multiple systems, Winget Update Manager provides the flexibility and control needed to keep your Windows environment secure and up-to-date with minimal manual intervention.

<center>
<img width="656" height="435" alt="image" src="https://github.com/user-attachments/assets/abfdb2de-4c08-444a-82cd-3680b71c6168"/>
</center>

## The Problem It Solves

Managing application updates on Windows can be tedious and time-consuming. While WinGet provides basic package management, it lacks advanced features needed for production environments:

- **No persistent exclusion lists** - You must manually exclude apps every time
- **Limited automation options** - Difficult to integrate into scheduled tasks
- **Poor error handling** - Updates fail silently without clear diagnostics
- **No dry-run capability** - Can't preview changes before applying them
- **Minimal logging** - Hard to troubleshoot issues or track update history

Winget Update Manager addresses all these pain points with a production-ready solution that's both powerful and easy to use.

## Key Features

### 🎯 Smart Exclusion Management

One of the most powerful features is the intelligent exclusion system that supports both temporary and persistent exclusions:

**Temporary Exclusions (Session-Only)**
```powershell
# Exclude apps from current update session only
winget-update -ExcludeApps "Edge, Discord"
```

**Persistent Exclusions (Permanent)**
```powershell
# Smart addition to permanent exclusion list
winget-update -AddPersistentExcludeApps "Chrome"

# Smart removal from permanent exclusion list
winget-update -RemovePersistentExcludeApps "Discord"
```

The system features:
- ✅ **Intelligent name matching** - Use friendly names or exact package IDs
- ✅ **Fuzzy search** - Shows suggestions for ambiguous matches
- ✅ **Automatic persistence** - Saves to `persistent_exclude_apps.txt`
- ✅ **Comma-separated lists** - Exclude multiple apps at once

### 🔧 Multiple Execution Modes

Choose the right mode for your use case:

| Mode               | Description                          | Use Case                      |
| ------------------ | ------------------------------------ | ----------------------------- |
| **normal**         | Interactive updates with prompts     | Manual maintenance sessions   |
| **silent**         | Fully automated, no user interaction | Scheduled tasks, automation   |
| **dry-run**        | Preview changes without applying     | Testing and validation        |
| **force**          | Override safety checks               | Emergency updates             |
| **verbose**        | Maximum logging output               | Debugging and troubleshooting |
| **no-interaction** | Non-interactive with minimal output  | CI/CD pipelines               |
| **full-upgrade**   | Update all packages including pinned | Major system updates          |
| **safe-upgrade**   | Conservative updates only            | Production systems            |

### 🧠 Intelligent Detection

The tool includes sophisticated application detection and matching:

**Smart Name Matching**
```powershell
# Input: "Visual Studio Code"
# Output: Microsoft.VisualStudioCode (exact match found)
```

**Fuzzy Search with Suggestions**
```powershell
# Input: "Chrome"
# Output: Multiple matches with interactive selection
#   1. Google.Chrome
#   2. Google.Chrome.Beta
#   3. Google.Chrome.Dev
```

**Automatic Categorization**
- 🔴 **High Priority**: Development tools, security software
- 🟡 **Medium Priority**: Browsers, productivity apps
- 🟢 **Low Priority**: Entertainment, gaming applications


### 📊 Comprehensive Logging

Enterprise-grade logging capabilities:
- **Detailed operation logs** - Track every update action
- **Error diagnostics** - Clear error messages with resolution steps
- **Update history** - Maintain audit trail of all changes
- **Performance metrics** - Monitor update duration and success rates

### 🤖 Automation Integration

Designed for seamless integration with Windows automation tools:

**Windows Task Scheduler Integration**
```powershell
$action = New-ScheduledTaskAction -Execute "powershell.exe" `
    -Argument "-Command winget-update -Mode silent"
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At "2:00 AM"
Register-ScheduledTask -TaskName "WingetUpdateManager" `
    -Action $action -Trigger $trigger -RunLevel Highest
```

**PowerShell Profile Aliases**
```powershell
# Add to $PROFILE for custom shortcuts
function Update-Apps { winget-update -Mode silent }
function Preview-Updates { winget-update -Mode dry-run }
function Update-Verbose { winget-update -Mode verbose }
```

### ⚙️ Advanced Parameters

Fine-tune behavior with custom parameters:

```powershell
# Pass custom parameters to WinGet
winget-update -CustomParams "--include-unknown --force"

# Production automation example
winget-update -Mode silent `
    -ExcludeApps "Microsoft.VisualStudio.2022.Community" `
    -CustomParams "--accept-source-agreements"

# Maximum logging for debugging
winget-update -Mode verbose `
    -CustomParams "--include-unknown --verbose-logs"
```

## Technical Implementation

### Architecture

The tool is built with a modular architecture:

1. **Core Engine** - Handles WinGet interaction and update orchestration
2. **Exclusion Manager** - Manages temporary and persistent exclusions
3. **Detection Engine** - Intelligent package name resolution
4. **Logging System** - Comprehensive activity tracking
5. **Error Handler** - Robust error recovery and reporting

### File Structure

```
winget-update/
├── winget-update.ps1          # Main script
├── persistent_exclude_apps.txt # Permanent exclusion list
├── logs/                       # Update logs directory
└── README.md                   # Documentation
```

### Error Handling

Robust error handling for common scenarios:
- ✅ Missing WinGet installation detection
- ✅ Network connectivity issues
- ✅ Package manifest errors
- ✅ Interactive installer detection
- ✅ Permission elevation requirements

## Use Cases

### Power User
Keep personal system up-to-date with minimal effort, exclude specific applications from updates, and preview changes before applying them.

## Installation

**One-Line Installation**
```powershell
irm https://raw.githubusercontent.com/Sterbweise/winget-update/main/install.ps1 | iex
```

**Manual Installation**
1. Download the latest release from GitHub
2. Extract to a directory in your PATH
3. Run `winget-update -Mode dry-run` to test

## Quick Start

```powershell
# Preview available updates
winget-update -Mode dry-run

# Update all apps (interactive)
winget-update

# Silent update (for automation)
winget-update -Mode silent

# Update with exclusions
winget-update -ExcludeApps "Microsoft.Edge,Discord.Discord"

# Add permanent exclusion
winget-update -AddPersistentExcludeApps "Chrome"
```

## Technologies Used

- **PowerShell 5.1+** - Core scripting language
- **Windows Package Manager (WinGet)** - Package management backend
- **Windows Task Scheduler** - Automation integration
- **Git** - Version control and collaboration

## Future Enhancements

- Currently, there are no planned future enhancements for this repository. My focus has shifted to contributing to and collaborating with the [UniGetUI](https://github.com/marticliment/UniGetUI) project, which I consider a more advanced and complete solution for package management.


## License

This project is open source and available under the MIT License.

---

**Project Status**: Archived | **Latest Release**: v3.1.0 | **Stars**: 10+
