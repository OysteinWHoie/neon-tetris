const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 40; // Increased from 30px to match CSS

const SHAPES = {
    I: [[1, 1, 1, 1]],
    J: [[1, 0, 0], [1, 1, 1]],
    L: [[0, 0, 1], [1, 1, 1]],
    O: [[1, 1], [1, 1]],
    S: [[0, 1, 1], [1, 1, 0]],
    T: [[0, 1, 0], [1, 1, 1]],
    Z: [[1, 1, 0], [0, 1, 1]]
};

// All pieces use red color
const PIECE_COLORS = {
    I: ['#FF0000', '#CC0000'], // Red gradient
    J: ['#FF0000', '#CC0000'], // Red gradient
    L: ['#FF0000', '#CC0000'], // Red gradient
    O: ['#FF0000', '#CC0000'], // Red gradient
    S: ['#FF0000', '#CC0000'], // Red gradient
    T: ['#FF0000', '#CC0000'], // Red gradient
    Z: ['#FF0000', '#CC0000']  // Red gradient
};

let board = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
let currentPiece = null;
let nextPiece = null; // Track the next piece
let currentRotation = 0;
let currentX = 0;
let currentY = 0;
let score = 0;
let level = 1;
let linesCleared = 0;
let gameInterval;
let gameOver = false;
let startTime = 0; // Track when the game started
let speedFactor = 1.0; // Gradually increases to make game faster

function createPiece(type) {
    return {
        type: type,
        matrix: SHAPES[type],
        colors: PIECE_COLORS[type],
        x: Math.floor(BOARD_WIDTH / 2) - Math.floor(SHAPES[type][0].length / 2),
        y: 0
    };
}

function drawBoard() {
    const boardElement = document.getElementById('game-board');
    
    // Create cells if they don't exist
    if (!boardElement.children.length) {
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                boardElement.appendChild(cell);
            }
        }
    }
    
    // Update cell states
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
            const cell = boardElement.children[y * BOARD_WIDTH + x];
            cell.className = 'cell';
            cell.style.background = '';
            if (board[y][x]) {
                cell.className += ' bg-gradient-to-br from-high-contrast-blue to-neon-blue animate-glow';
                cell.style.background = 'linear-gradient(45deg, #00FFFF, #0088FF)';
            }
        }
    }
}

function drawPiece() {
    const boardElement = document.getElementById('game-board');
    const piece = currentPiece;
    
    // Clear all cells first
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
            const cell = boardElement.children[y * BOARD_WIDTH + x];
            cell.className = 'cell';
            cell.style.background = '';
            cell.style.boxShadow = '';
        }
    }
    
    // Draw frozen pieces
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
            if (board[y][x]) {
                const cell = boardElement.children[y * BOARD_WIDTH + x];
                cell.className += ' bg-gradient-to-br from-high-contrast-blue to-neon-blue animate-glow';
                cell.style.background = 'linear-gradient(45deg, #00FFFF, #0088FF)';
                cell.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.7)';
            }
        }
    }
    
    // Draw current piece (always red)
    for (let y = 0; y < piece.matrix.length; y++) {
        for (let x = 0; x < piece.matrix[y].length; x++) {
            if (piece.matrix[y][x]) {
                const index = (piece.y + y) * BOARD_WIDTH + (piece.x + x);
                const cell = boardElement.children[index];
                cell.className = 'cell bg-gradient-to-br animate-glow';
                cell.style.background = 'linear-gradient(45deg, #FF0000, #CC0000)';
                cell.style.boxShadow = '0 0 15px #FF0000';
            }
        }
    }
    
    // Draw next piece
    drawNextPiece();
}

function rotatePiece() {
    if (gameOver) return;
    
    const piece = currentPiece;
    const newMatrix = piece.matrix[0].map((_, i) => 
        piece.matrix.map(row => row[i]).reverse()
    );
    
    if (!checkCollision(piece.x, piece.y, newMatrix)) {
        // Clear the board before rotating the piece
        drawBoard();
        piece.matrix = newMatrix;
        drawPiece();
    }
}

function movePiece(dx) {
    if (gameOver) return;
    
    const piece = currentPiece;
    if (!checkCollision(piece.x + dx, piece.y, piece.matrix)) {
        // Clear the board before moving the piece
        drawBoard();
        piece.x += dx;
        drawPiece();
    }
}

function checkCollision(x, y, matrix) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col]) {
                const newX = x + col;
                const newY = y + row;
                
                if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
                    return true;
                }
                if (newY >= 0 && board[newY][newX]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function dropPiece() {
    if (gameOver) return;
    
    const piece = currentPiece;
    if (!checkCollision(piece.x, piece.y + 1, piece.matrix)) {
        piece.y++;
        drawPiece();
    } else {
        freezePiece();
        // clearLines is now called from within freezePiece
        newPiece();
    }
}

function freezePiece() {
    const piece = currentPiece;
    
    // Update the board array
    for (let row = 0; row < piece.matrix.length; row++) {
        for (let col = 0; col < piece.matrix[row].length; col++) {
            if (piece.matrix[row][col]) {
                const x = piece.x + col;
                const y = piece.y + row;
                if (y >= 0) {
                    board[y][x] = 1;
                }
            }
        }
    }
    
    // Draw the piece
    drawPiece();
    
    // Check for full rows after freezing - this is important!
    const linesCleared = clearLines();
    
    // Debug logging
    console.log("Piece frozen, lines cleared:", linesCleared);
}

function clearLines() {
    // Find full rows
    const fullRows = [];
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        if (board[y].every(cell => cell === 1)) {
            fullRows.push(y);
        }
    }
    
    // Debug output
    console.log("CHECKING FOR FULL ROWS:", fullRows);
    console.log("Current board state:", JSON.stringify(board));
    
    // If there are full rows, animate them before clearing
    if (fullRows.length > 0) {
        console.log("ANIMATING ROWS:", fullRows);
        
        // Temporarily pause the game interval
        clearInterval(gameInterval);
        
        // Add a full-screen flash effect
        const fullScreenFlash = document.createElement('div');
        fullScreenFlash.style.position = 'fixed';
        fullScreenFlash.style.top = '0';
        fullScreenFlash.style.left = '0';
        fullScreenFlash.style.width = '100%';
        fullScreenFlash.style.height = '100%';
        fullScreenFlash.style.backgroundColor = 'rgba(0, 255, 255, 0.3)';
        fullScreenFlash.style.pointerEvents = 'none';
        fullScreenFlash.style.zIndex = '9999';
        fullScreenFlash.style.transition = 'opacity 0.3s ease-in-out';
        document.body.appendChild(fullScreenFlash);
        
        setTimeout(() => {
            fullScreenFlash.style.opacity = '0';
            setTimeout(() => fullScreenFlash.remove(), 300);
        }, 100);
        
        // Create bright colored rectangles directly on the game board
        const gameBoard = document.getElementById('game-board');
        const boardRect = gameBoard.getBoundingClientRect();
        
        // Create flash elements for each row
        fullRows.forEach(rowIndex => {
            // Create a flash element
            const rowFlash = document.createElement('div');
            rowFlash.style.position = 'absolute';
            rowFlash.style.left = '0';
            
            // Account for grid gap and borders to fix vertical positioning
            // The game board uses a grid with gap-1 (0.25rem or 4px in Tailwind)
            const gridGap = 4; // 0.25rem = 4px in Tailwind
            const borderWidth = 2; // 2px for the board border
            const paddingOffset = 8; // 2 * p-2 (padding of the game board, 0.5rem = 8px)
            
            // Calculate exact position for perfect alignment
            rowFlash.style.top = `${rowIndex * (BLOCK_SIZE + gridGap) + borderWidth + paddingOffset}px`;
            rowFlash.style.width = `${BLOCK_SIZE * BOARD_WIDTH + (BOARD_WIDTH - 1) * gridGap}px`;
            rowFlash.style.height = `${BLOCK_SIZE}px`;
            rowFlash.style.backgroundColor = '#00FFFF';
            rowFlash.style.boxShadow = '0 0 30px 15px #00FFFF';
            rowFlash.style.transition = 'all 0.5s ease-in-out';
            rowFlash.style.zIndex = '1000';
            rowFlash.style.pointerEvents = 'none';
            
            // Make the game board position relative for proper absolute positioning
            if (gameBoard.style.position !== 'relative') {
                gameBoard.style.position = 'relative';
            }
            
            // Add the flash directly to the game board
            gameBoard.appendChild(rowFlash);
            
            // Start the animation
            setTimeout(() => {
                rowFlash.style.transform = 'scale(1.5)';
                rowFlash.style.opacity = '0';
                rowFlash.style.backgroundColor = '#FF00FF';
                rowFlash.style.boxShadow = '0 0 50px 25px #FF00FF';
            }, 100);
        });
    }
    
    if (linesCleared > 0) {
        // Update score and level
        updateScore(linesCleared);
        
        // Re-draw the board
        drawBoard();
        
        // Play line clear sound
        if (synth) {
            synth.playLineClearSound(linesCleared);
        }
        
        // Update game speed after clearing lines
        clearInterval(gameInterval);
        updateGameSpeed();
    }
    
    return linesCleared;
}

function updateScore(lines) {
    // Points for each line cleared (using Tetris scoring)
    const points = {
        1: 100,
        2: 300,
        3: 500,
        4: 800
    };
    
    // Update score based on lines cleared and level
    score += points[lines] * level;
    document.getElementById('score').textContent = score;
    
    // Track total lines cleared
    linesCleared += lines;
    document.getElementById('lines').textContent = linesCleared;
    
    // Check for level up
    const oldLevel = level;
    if (linesCleared >= level * 10) {
        level++;
        document.getElementById('level').textContent = level;
        
        // Update game speed after level up
        clearInterval(gameInterval);
        updateGameSpeed();
        
        // Play level up sound effect
        if (synth && level > oldLevel) {
            synth.playLevelUpSound();
        }
    }
}

// Generate a random piece type
function getRandomPieceType() {
    const types = Object.keys(SHAPES);
    return types[Math.floor(Math.random() * types.length)];
}

// Function to draw the next piece in the sidebar
function drawNextPiece() {
    if (!nextPiece) return;
    
    const nextPieceElement = document.getElementById('next-piece');
    
    // Clear the next piece container
    nextPieceElement.innerHTML = '';
    
    // Set up the grid directly in the container
    const pieceGrid = document.createElement('div');
    const maxWidth = Math.max(...nextPiece.matrix.map(row => row.length));
    const height = nextPiece.matrix.length;
    
    pieceGrid.style.display = 'grid';
    pieceGrid.style.gridTemplateColumns = `repeat(${maxWidth}, 20px)`;
    pieceGrid.style.gridTemplateRows = `repeat(${height}, 20px)`;
    pieceGrid.style.gap = '0';
    
    // Create the cells for the next piece
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < maxWidth; x++) {
            const cell = document.createElement('div');
            cell.style.width = '20px';
            cell.style.height = '20px';
            cell.style.margin = '0';
            
            // If this position has a block in the next piece, color it
            if (nextPiece.matrix[y] && nextPiece.matrix[y][x]) {
                cell.style.background = `linear-gradient(45deg, ${nextPiece.colors[0]}, ${nextPiece.colors[1]})`;
                cell.style.boxShadow = `0 0 5px ${nextPiece.colors[0]}`;
                cell.style.animation = 'pulse 2s infinite';
                // No border to make the piece look connected
            } else {
                // Make empty cells truly transparent
                cell.style.background = 'transparent';
                cell.style.border = 'none';
            }
            
            pieceGrid.appendChild(cell);
        }
    }
    
    // Add the grid directly to the container and center it
    nextPieceElement.style.display = 'flex';
    nextPieceElement.style.justifyContent = 'center';
    nextPieceElement.style.alignItems = 'center';
    nextPieceElement.appendChild(pieceGrid);
}

function newPiece() {
    // If nextPiece exists, make it the current piece
    if (nextPiece) {
        currentPiece = nextPiece;
    } else {
        // For the first piece
        currentPiece = createPiece(getRandomPieceType());
    }
    
    // Generate the next piece
    nextPiece = createPiece(getRandomPieceType());
    
    // Draw the board first to show all frozen pieces
    drawBoard();
    
    // Then draw the new piece and next piece
    drawPiece();
    
    if (checkCollision(currentPiece.x, currentPiece.y, currentPiece.matrix)) {
        gameOver = true;
        
        // Play game over sound
        if (synth) {
            synth.playGameOverSound();
            synth.stopBackgroundMusic();
        }
        
        setTimeout(() => {
            alert('Game Over!');
        }, 500); // Slight delay to allow the sound to start playing
    }
}

function startGame() {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
    
    // Reset game speed factor and start time
    speedFactor = 1.0;
    startTime = Date.now();
    
    board = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
    score = 0;
    level = 1;
    linesCleared = 0;
    gameOver = false;
    nextPiece = null; // Reset next piece
    
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    document.getElementById('lines').textContent = linesCleared;
    
    // Initialize the board first
    drawBoard();
    
    // Generate the next piece
    nextPiece = createPiece(getRandomPieceType());
    
    // Then create a new piece
    newPiece();
    
    // Start with base speed depending on level
    updateGameSpeed();
    
    // Start background music with proper initialization
    if (synth) {
        synth.start(); // Initialize audio context and mark user interaction
        synth.startBackgroundMusic();
    }
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    // Initialize board cells with proper sizing
    const boardElement = document.getElementById('game-board');
    boardElement.style.gridTemplateRows = `repeat(${BOARD_HEIGHT}, ${BLOCK_SIZE}px)`;
    boardElement.style.gridTemplateColumns = `repeat(${BOARD_WIDTH}, ${BLOCK_SIZE}px)`;
    
    // Initialize audio system and mark that we have user interaction
    if (synth) {
        // Add click/keydown listeners to the entire document for audio initialization
        const initAudio = () => {
            synth.start();
            document.removeEventListener('click', initAudio);
            document.removeEventListener('keydown', initAudio);
        };
        document.addEventListener('click', initAudio);
        document.addEventListener('keydown', initAudio);
        console.log('Audio system ready - click or press a key to initialize');
    }
    
    // Add event listeners
    document.getElementById('start').addEventListener('click', startGame);
    document.addEventListener('keydown', (e) => {
        if (gameOver) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                movePiece(-1);
                break;
            case 'ArrowRight':
                movePiece(1);
                break;
            case 'ArrowDown':
                dropPiece();
                break;
            case 'ArrowUp':
                rotatePiece();
                break;
        }
    });
    
    // Initialize game board
    drawBoard();
});

// Update game speed based on level and time played
function updateGameSpeed() {
    // Calculate time-based speed factor
    // Increase speed by 1% for every 10 seconds of gameplay
    const timeElapsed = (Date.now() - startTime) / 1000; // in seconds
    speedFactor = 1.0 + (timeElapsed / 10) * 0.01; // 1% faster per 10 seconds
    
    // Cap the speed factor at 2.0 (twice as fast as normal)
    speedFactor = Math.min(speedFactor, 2.0);
    
    // Calculate base interval for the current level
    const baseInterval = 1000 - (level - 1) * 100; // Normal level-based speed
    
    // Apply speed factor to make game gradually faster
    const adjustedInterval = Math.max(50, Math.floor(baseInterval / speedFactor));
    
    // Set the new game interval
    gameInterval = setInterval(dropPiece, adjustedInterval);
    
    // For debugging
    console.log(`Speed updated: Level ${level}, SpeedFactor ${speedFactor.toFixed(2)}, Interval ${adjustedInterval}ms`);
}
