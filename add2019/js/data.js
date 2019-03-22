const table = {
    "Match #": {
        "type": "number"
    },
    "Team #": {
        "type": "number"
    },
    "Alliance": {
        "opts": ["Red", "Blue"]
    },
    "Sandstorm Bonus": {
        "opts": ["Level 1", "Level 2"]
    },
    "Sandstorm Routine": {
        "opts": ["Autonomous", "Driver Controlled", "Both", "Unsure"]
    },
    "Game Pieces Dropped": {
        "type": "number"
    },
    "Sandstorm Objects": {
        "type": "stack"
    },
    "Sandstorm Cargo-Ship Cargo": {
        "type": "number",
        "parent": "Sandstorm Objects"
    },
    "Sandstorm Cargo-Ship Panels": {
        "type": "number",
        "parent": "Sandstorm Objects"
    },
    "Sandstorm Rocket Cargo": {
        "type": "number",
        "parent": "Sandstorm Objects"
    },
    "Sandstorm Rocket Panels": {
        "type": "number",
        "parent": "Sandstorm Objects"
    },
    "Teleop Objects": {
        "type": "stack"
    },
    "Teleop Cargo-Ship Cargo": {
        "type": "number",
        "parent": "Teleop Objects"
    },
    "Teleop Cargo-Ship Panels": {
        "type": "number",
        "parent": "Teleop Objects"
    },
    "Teleop Rocket Cargo": {
        "type": "number",
        "parent": "Teleop Objects"
    },
    "Teleop Rocket Panels": {
        "type": "number",
        "parent": "Teleop Objects"
    },
    "HAB Climb": {
        "opts": ["Level 1 Park", "Level 2 Climb", "Level 3 Climb", "None"]
    },
    "Break?": {
        "opts": ["No", "Yes"]
    },
    "Notes": {
        "type": "text",
        "optional": true
    }
}