import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Icon } from "@iconify/react";

const VSCodeEditor = () => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const codeLines = [
    "const developer = {",
    "  Status: true, //Available-For-New-Opportunities",
    '  name: "Muhammad Shamroz Khan",',
    '  role: "Full Stack Web Developer",',
    '  experience: "1+ years",',
    '  email: "shvmroz@gmail.com",',
    '  phone: "+923066520002", //Whats-App',
    '  location: "Pakistan",',
    "  skills: {",
    '    frontend: ["React.js", "Next.js", "JavaScript", "TypeScript"],',
    '    styling: ["Material-UI", "Bootstrap", "Tailwind CSS"],',
    "  },",
    "};",
    // "",
    // 'console.log("Welcome to my portfolio!");',
  ];

  useEffect(() => {
    const typeCode = () => {
      if (currentLineIndex < codeLines.length) {
        const currentLine = codeLines[currentLineIndex];
        if (currentCharIndex < currentLine.length) {
          setDisplayedCode((prev) => prev + currentLine[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          setDisplayedCode((prev) => prev + "\n");
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }
      }
    };
    const timer = setTimeout(typeCode, 50);
    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, codeLines]);

  const getTokenColor = (token, isNested = false) => {
    // comments → always gray
    if (/^\/\/.*$/.test(token) || /^\/\*[\s\S]*\*\/$/.test(token))
      return "#75715E";
    if (/^(developer)$/.test(token)) return "#FFFFFF"; // parent object white
    if (/^(skills)$/.test(token) || isNested) return "#FFA500"; // nested objects orange

    // property names
    if (
      /^(name|role|experience|email|phone|location|frontend|styling|backend|tools|Status)$/.test(
        token
      )
    )
      return "#FFA500"; // orange

    // strings (text in quotes)
    if (/^".*"$/.test(token) || /^'.*'$/.test(token)) return "#E6DB74"; // yellow

    // array brackets
    if (/^[\[\]]$/.test(token)) return "#3B82F6"; // blue

    // curly braces
    if (/^[{}]$/.test(token)) return "#C678DD"; // violet pink

    // equals sign
    if (/^=$/.test(token)) return "#D81B60"; // dark pink

    // punctuation (commas, colons)
    if (/^[,:]$/.test(token)) return "#D81B60";

    // keywords
    if (
      /^(const|let|var|function|return|if|else|for|while|switch|)$/.test(token)
    )
      return "#F92672";

    if (/^(console)$/.test(token)) return "#ffff";
    if (/^(log)$/.test(token)) return "#BBE57F";

    // booleans / nullish
    if (/^(true|false|null|undefined|NaN|Infinity)$/.test(token))
      return "#C678DD";

    // numbers
    if (/^\d+(\.\d+)?$/.test(token)) return "#AE81FF";

    // known methods / globals
    if (
      /^(console|log|map|filter|reduce|forEach|push|pop|shift|unshift|slice|splice|keys|values)$/.test(
        token
      )
    )
      return "#FD971F";

    // fallback text
    return "#FFFFFF"; // default white
  };

  const renderCodeWithSyntaxHighlight = (code) => {
    const lines = code.split("\n");
    let insideString = false; // track if we are inside quotes
    return lines.map((line, lineIndex) => {
      const tokens = line.split(/(\s+|[{}[\]();,.:"])/);
      return (
        <div key={lineIndex} style={{ display: "flex", minHeight: "20px" }}>
          <span
            style={{
              color: "#858585",
              marginRight: "16px",
              minWidth: "24px",
              textAlign: "right",
              fontSize: "14px",
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            }}
          >
            {lineIndex + 1}
          </span>
          <span
            style={{
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              fontSize: "14px",
            }}
          >
            {tokens.map((token, tokenIndex) => {
              // toggle string state on quote characters
              if (token === '"' || token === "'") {
                insideString = !insideString;
                return (
                  <span key={tokenIndex} style={{ color: "#E6DB74" }}>
                    {token}
                  </span>
                );
              }

              return (
                <span
                  key={tokenIndex}
                  style={{
                    color: insideString
                      ? "#E6DB74"
                      : getTokenColor(token.trim()),
                  }}
                >
                  {token}
                </span>
              );
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <Paper
      sx={{
        backgroundColor: "#1E1E1E", // dark background
        border: "1px solid #333333",
        borderRadius: "8px",
        overflow: "hidden",
        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      }}
    >
      {/* VS Code Header */}
      <Box
        sx={{
          backgroundColor: "#2D2D30",
          borderBottom: "1px solid #333333",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#FF5F57",
            }}
          />
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#FFBD2E",
            }}
          />
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#28CA42",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
          <Icon
            icon="vscode-icons:file-type-js-official"
            width={16}
            height={16}
          />
          <Typography
            variant="body2"
            sx={{
              color: "#CCCCCC",
              fontSize: "13px",
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            }}
          >
            developer.js
          </Typography>
        </Box>
      </Box>

      {/* Code Content */}
      <Box
        sx={{
          padding: "16px",
          width: "100%",
          minHeight: "355px",
          backgroundColor: "#1E1E1E",
          position: "relative",
        }}
      >
        <Box sx={{ lineHeight: 1.5 }}>
          {renderCodeWithSyntaxHighlight(displayedCode)}
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "20px",
              backgroundColor: "#FFFFFF",
              animation: "blink 1s infinite",
              marginLeft: "2px",
            }}
          />
        </Box>
      </Box>

      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
    </Paper>
  );
};

export default VSCodeEditor;
