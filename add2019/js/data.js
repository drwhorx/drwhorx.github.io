const table = {
    "Team #": {
        "type": "number"
    },
    "Match #": {
        "type": "number"
    },
    "Alliance": {
        "opts": ["Red", "Blue"]
    },
    "Sandstorm Bonus": {
        "opts": ["Level 1", "Level 2", "None"]
    },
    "Game Pieces Dropped": {
        "type": "number"
    },
    "Sandstorm Objects": {
        "type": "stack"
    },
    "Sandstorm Low Cargo": {
        "type": "number",
        "parent": "Sandstorm Objects"
    },
    "Sandstorm Low Panels": {
        "type": "number",
        "parent": "Sandstorm Objects"
    },
    "Sandstorm High Cargo": {
        "type": "number",
        "parent": "Sandstorm Objects"
    },
    "Sandstorm High Panels": {
        "type": "number",
        "parent": "Sandstorm Objects"
    },
    "Teleop Objects": {
        "type": "stack"
    },
    "Teleop Low Cargo": {
        "type": "number",
        "parent": "Teleop Objects"
    },
    "Teleop Low Panels": {
        "type": "number",
        "parent": "Teleop Objects"
    },
    "Teleop High Cargo": {
        "type": "number",
        "parent": "Teleop Objects"
    },
    "Teleop High Panels": {
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