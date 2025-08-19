import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Icon } from '@iconify/react';
import { useThemeMode } from '../../../context/ThemeContext';

const VSCodeEditor = () => {
  const { isDarkMode } = useThemeMode();
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const codeLines = [
    'const developer = {',
    '  name: "Muhammad Shamroz Khan",',
    '  role: "Full Stack Web Developer",',
    '  experience: "3+ years",',
    '  location: "Pakistan",',
    '  skills: {',
    '    frontend: ["React.js", "Next.js", "JavaScript", "TypeScript"],',
    '    styling: ["Material-UI", "Bootstrap", "Tailwind CSS"],',
    '    backend: ["Node.js", "Express.js", "MongoDB", "PostgreSQL"],',
    '    tools: ["Git", "Docker", "AWS", "VS Code"]',
    '  },',
    '  passion: "Building amazing web experiences",',
    '  currentStatus: "Available for opportunities"',
    '};',
    '',
    'console.log("Welcome to my portfolio!");',
    'console.log(developer);'
  ];

  useEffect(() => {
    const typeCode = () => {
      if (currentLineIndex < codeLines.length) {
        const currentLine = codeLines[currentLineIndex];
        
        if (currentCharIndex < currentLine.length) {
          setDisplayedCode(prev => prev + currentLine[currentCharIndex]);
          setCurrentCharIndex(prev => prev + 1);
        } else {
          // Move to next line
          setDisplayedCode(prev => prev + '\n');
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }
      }
    };

    const timer = setTimeout(typeCode, 50); // Typing speed
    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, codeLines]);

  const getTokenColor = (token) => {
    if (token.match(/^(const|let|var|function|return|if|else|for|while)$/)) {
      return '#C586C0'; // Keywords - purple
    }
    if (token.match(/^".*"$/)) {
      return '#CE9178'; // Strings - orange
    }
    if (token.match(/^\d+$/)) {
      return '#B5CEA8'; // Numbers - light green
    }
    if (token.match(/^(true|false|null|undefined)$/)) {
      return '#569CD6'; // Booleans - blue
    }
    if (token.match(/^(console|log)$/)) {
      return '#DCDCAA'; // Methods - yellow
    }
    return isDarkMode ? '#D4D4D4' : '#333333'; // Default text
  };

  const renderCodeWithSyntaxHighlight = (code) => {
    const lines = code.split('\n');
    return lines.map((line, lineIndex) => {
      const tokens = line.split(/(\s+|[{}[\]();,.:"])/);
      return (
        <div key={lineIndex} style={{ display: 'flex', minHeight: '20px' }}>
          <span style={{ 
            color: isDarkMode ? '#858585' : '#999999', 
            marginRight: '16px', 
            minWidth: '24px',
            textAlign: 'right',
            fontSize: '14px',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace'
          }}>
            {lineIndex + 1}
          </span>
          <span style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace', fontSize: '14px' }}>
            {tokens.map((token, tokenIndex) => (
              <span key={tokenIndex} style={{ color: getTokenColor(token.trim()) }}>
                {token}
              </span>
            ))}
          </span>
        </div>
      );
    });
  };

  return (
    <Paper
      sx={{
        backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
        border: isDarkMode ? '1px solid #333333' : '1px solid #E1E4E8',
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      }}
    >
      {/* VS Code Header */}
      <Box
        sx={{
          backgroundColor: isDarkMode ? '#2D2D30' : '#F3F3F3',
          borderBottom: isDarkMode ? '1px solid #333333' : '1px solid #E1E4E8',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#FF5F57',
            }}
          />
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#FFBD2E',
            }}
          />
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#28CA42',
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
          <Icon 
            icon="vscode-icons:file-type-js-official" 
            width={16} 
            height={16} 
          />
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? '#CCCCCC' : '#333333',
              fontSize: '13px',
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
          padding: '16px',
          backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
          minHeight: '400px',
          position: 'relative',
        }}
      >
        <Box sx={{ lineHeight: 1.5 }}>
          {renderCodeWithSyntaxHighlight(displayedCode)}
          {/* Cursor */}
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '20px',
              backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
              animation: 'blink 1s infinite',
              marginLeft: '2px',
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