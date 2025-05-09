const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

// Calculate the appropriate block size based on screen height
function calculateBlockSize() {
    const maxHeight = window.innerHeight * 0.75; // Use 75% of viewport height
    const maxWidth = window.innerWidth * 0.75;  // Use 75% of viewport width (increased from 60%)
    
    // Calculate block size based on height and width constraints
    const byHeight = Math.floor(maxHeight / BOARD_HEIGHT);
    const byWidth = Math.floor(maxWidth / BOARD_WIDTH);
    
    // Use the smaller of the two to ensure it fits in both dimensions
    return Math.min(byHeight, byWidth, 45); // Increased cap to 45px max (from 40px)
}

// Initialize with calculated size, will be updated on resize
let BLOCK_SIZE = calculateBlockSize();

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

// Initialize board differently - each cell will be 0 (empty) or a number representing the piece
// Global board array
let board = [];
function initializeBoard() {
    // Create a completely new board with all cells set to 0
    board = [];
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        // Use explicit zero values for each cell
        let row = [];
        for (let x = 0; x < BOARD_WIDTH; x++) {
            row.push(0);
        }
        board.push(row);
    }
    
    // Log the initial board state
    console.log('Board initialized with dimensions:', BOARD_HEIGHT, 'x', BOARD_WIDTH);
}

// Initialize the board right away
initializeBoard();

// For debugging - log the board state as a visual grid
function logBoard() {
    console.log('===== CURRENT BOARD STATE =====');
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        console.log(board[y].join(' '));
    }
    console.log('==============================');
}
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

// COMPLETE REWRITE of drawBoard for better reliability
function drawBoard() {
    const boardElement = document.getElementById('game-board');
    
    // Create cells if they don't exist
    if (!boardElement.children.length) {
        boardElement.innerHTML = '';
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.setAttribute('data-x', x);
                cell.setAttribute('data-y', y);
                boardElement.appendChild(cell);
            }
        }
    }
    
    // Get all the cells
    const allCells = boardElement.children;
    
    // First, reset all cells to empty state
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].className = 'cell';
        allCells[i].style.background = '';
        allCells[i].style.boxShadow = '';
    }
    
    // Then update each cell based on the board state
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
            const index = y * BOARD_WIDTH + x;
            const cell = allCells[index];
            
            // Apply styling for filled cells
            if (board[y][x] === 1) {
                cell.className = 'cell bg-gradient-to-br from-high-contrast-blue to-neon-blue';
                cell.style.background = 'linear-gradient(45deg, #00FFFF, #0088FF)';
                cell.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.7)';
            }
        }
    }
}

function drawPiece() {
    const boardElement = document.getElementById('game-board');
    const piece = currentPiece;
    
    // First draw the board with frozen pieces
    drawBoard();
    
    // Then draw the active piece (always red)
    for (let y = 0; y < piece.matrix.length; y++) {
        for (let x = 0; x < piece.matrix[y].length; x++) {
            if (piece.matrix[y][x]) {
                const boardY = piece.y + y;
                const boardX = piece.x + x;
                
                // Only draw if within board boundaries
                if (boardY >= 0 && boardY < BOARD_HEIGHT && 
                    boardX >= 0 && boardX < BOARD_WIDTH) {
                    const index = boardY * BOARD_WIDTH + boardX;
                    const cell = boardElement.children[index];
                    cell.className = 'cell bg-gradient-to-br animate-glow';
                    cell.style.background = 'linear-gradient(45deg, #FF0000, #CC0000)';
                    cell.style.boxShadow = '0 0 15px #FF0000';
                }
            }
        }
    }
    
    // Draw next piece preview
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
        // freezePiece() already calls newPiece() at its end
        // clearLines is also called from within freezePiece
    }
}

function freezePiece() {
    console.log('FREEZING PIECE:', currentPiece.type);
    
    // Add piece to the board as permanent blocks
    for (let y = 0; y < currentPiece.matrix.length; y++) {
        for (let x = 0; x < currentPiece.matrix[y].length; x++) {
            if (currentPiece.matrix[y][x]) {
                const boardY = currentPiece.y + y;
                const boardX = currentPiece.x + x;
                
                // Only add cells that are within the board
                if (boardY >= 0 && boardY < BOARD_HEIGHT && 
                    boardX >= 0 && boardX < BOARD_WIDTH) {
                    // Set this position to filled (1)
                    board[boardY][boardX] = 1;
                }
            }
        }
    }
    
    // Debug: Print the board state after freezing
    console.log('BOARD STATE AFTER FREEZING:');
    printBoardState();
    
    // IMPORTANT: Draw the board to show the frozen piece
    drawBoard();
    
    // Check for full rows and clear them
    const clearedLines = clearLines();
    
    if (clearedLines > 0) {
        console.log(`Cleared ${clearedLines} lines!`);
    }
    
    // Always generate a new piece after freezing
    newPiece();
}

// Helper function to check if a row is completely filled
function isRowFull(rowIndex) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
        if (board[rowIndex][x] !== 1) {
            return false;
        }
    }
    return true;
}

// Helper function to print the board state for debugging
function printBoardState() {
    console.log('CURRENT BOARD STATE:');
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        let rowStr = '';
        let filledCount = 0;
        for (let x = 0; x < BOARD_WIDTH; x++) {
            rowStr += board[y][x] === 1 ? 'X' : '.';
            if (board[y][x] === 1) filledCount++;
        }
        console.log(`Row ${y}: ${rowStr} (${filledCount}/${BOARD_WIDTH} filled)`);
    }
}

// Line clearing function with enhanced visual feedback
function clearLines() {
    // Track how many lines we've cleared
    let clearedLines = 0;
    const fullRows = [];
    
    // First, identify which rows are full
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        // Count filled cells in this row
        let filledCells = 0;
        for (let x = 0; x < BOARD_WIDTH; x++) {
            if (board[y][x] === 1) {
                filledCells++;
            }
        }
        
        // If every cell in this row is filled
        if (filledCells === BOARD_WIDTH) {
            fullRows.push(y);
            clearedLines++;
        }
    }
    
    // If we have full rows, handle the clearing with animation
    if (fullRows.length > 0) {
        console.log(`Found ${fullRows.length} full rows to clear:`, fullRows);
        
        // Create visual flash effect for all full rows
        fullRows.forEach(rowIndex => {
            // Create a more intense flash effect
            flashRow(rowIndex);
        });
        
        // Small delay to let the flash animation play before clearing
        setTimeout(() => {
            // Process each full row
            for (let i = 0; i < fullRows.length; i++) {
                const y = fullRows[i];
                
                // Shift all rows above down
                for (let moveY = y; moveY > 0; moveY--) {
                    for (let x = 0; x < BOARD_WIDTH; x++) {
                        board[moveY][x] = board[moveY - 1][x];
                    }
                }
                
                // Clear the top row
                for (let x = 0; x < BOARD_WIDTH; x++) {
                    board[0][x] = 0;
                }
                
                // Adjust the remaining row indices since they all moved down
                for (let j = i + 1; j < fullRows.length; j++) {
                    if (fullRows[j] < fullRows[i]) {
                        fullRows[j]++;
                    }
                }
            }
            
            // Update game state
            linesCleared += clearedLines;
            document.getElementById('lines').textContent = linesCleared;
            
            // Trigger score update
            updateScore(clearedLines);
            
            // Force board redraw
            drawBoard();
            
            // Line clearing sound removed per user request
            // No sound will play when lines are cleared
            
            console.log(`CLEARED ${clearedLines} LINES!`);
            
            // Resume the game by resetting the interval
            clearInterval(gameInterval);
            updateGameSpeed();
        }, 200); // Short delay to allow animation to be visible
    }
    
    return clearedLines;
}

// Enhanced helper function to create a vibrant neon flash animation for a cleared row
function flashRow(rowIndex) {
    const gameBoard = document.getElementById('game-board');
    
    // Make sure the board has relative positioning for absolute children
    if (gameBoard.style.position !== 'relative') {
        gameBoard.style.position = 'relative';
    }
    
    // Create the horizontal neon flash element
    const rowFlash = document.createElement('div');
    rowFlash.style.position = 'absolute';
    rowFlash.style.left = '0';
    
    // Position it correctly
    const gridGap = 4; // 0.25rem = 4px in Tailwind
    const borderWidth = 2; 
    const paddingOffset = 8;
    
    rowFlash.style.top = `${rowIndex * (BLOCK_SIZE + gridGap) + borderWidth + paddingOffset}px`;
    rowFlash.style.width = `${BLOCK_SIZE * BOARD_WIDTH + (BOARD_WIDTH - 1) * gridGap}px`;
    rowFlash.style.height = `${BLOCK_SIZE}px`;
    
    // More vibrant neon colors
    rowFlash.style.backgroundColor = '#00FFFF';
    rowFlash.style.boxShadow = '0 0 30px 15px #00FFFF, 0 0 40px 20px rgba(0, 255, 255, 0.5)';
    rowFlash.style.zIndex = '1000';
    rowFlash.style.opacity = '0.9';
    rowFlash.style.pointerEvents = 'none';
    
    // Add to the game board
    gameBoard.appendChild(rowFlash);
    
    // Intensify the neon effect with a pulsing animation
    let scale = 1.0;
    let opacity = 0.9;
    let frame = 0;
    const totalFrames = 10;
    
    const pulseEffect = setInterval(() => {
        frame++;
        // Pulse effect
        scale = 1.0 + 0.05 * Math.sin(frame / totalFrames * Math.PI);
        opacity = 0.9 - (frame / totalFrames) * 0.9;
        
        rowFlash.style.transform = `scaleY(${scale})`;
        rowFlash.style.opacity = `${opacity}`;
        
        // Change colors for a vibrant neon effect
        if (frame === Math.floor(totalFrames / 2)) {
            rowFlash.style.backgroundColor = '#FF00FF';
            rowFlash.style.boxShadow = '0 0 30px 15px #FF00FF, 0 0 40px 20px rgba(255, 0, 255, 0.5)';
        }
        
        if (frame >= totalFrames) {
            clearInterval(pulseEffect);
            
            // Final flash effect
            rowFlash.style.transition = 'all 0.2s ease-in-out';
            rowFlash.style.transform = 'scaleY(1.5)';
            rowFlash.style.opacity = '0';
            
            // Remove after animation completes
            setTimeout(() => {
                if (rowFlash.parentNode) {
                    rowFlash.parentNode.removeChild(rowFlash);
                }
            }, 200);
        }
    }, 30);
    
    // Also flash the entire screen for dramatic effect
    const fullScreenFlash = document.createElement('div');
    fullScreenFlash.style.position = 'fixed';
    fullScreenFlash.style.top = '0';
    fullScreenFlash.style.left = '0';
    fullScreenFlash.style.width = '100%';
    fullScreenFlash.style.height = '100%';
    fullScreenFlash.style.backgroundColor = 'rgba(0, 255, 255, 0.2)';
    fullScreenFlash.style.pointerEvents = 'none';
    fullScreenFlash.style.zIndex = '9999';
    fullScreenFlash.style.transition = 'opacity 0.3s ease-in-out';
    document.body.appendChild(fullScreenFlash);
    
    setTimeout(() => {
        fullScreenFlash.style.opacity = '0';
        setTimeout(() => fullScreenFlash.remove(), 300);
    }, 150);
}

function updateScore(linesJustCleared) {
    // Points for each line cleared (using Tetris scoring)
    const points = {
        1: 100,
        2: 300,
        3: 500,
        4: 800
    };
    
    // Update score based on lines cleared and level
    const pointsEarned = (points[linesJustCleared] || 0) * level;
    score += pointsEarned;
    document.getElementById('score').textContent = score;
    
    console.log(`Scored ${pointsEarned} points for clearing ${linesJustCleared} lines at level ${level}`);
    
    // Check for level up
    const oldLevel = level;
    if (linesCleared >= level * 10) {
        level++;
        document.getElementById('level').textContent = level;
        console.log(`Level up! Now at level ${level}`);
        
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
    // If we have a next piece prepared, use it as current piece
    if (nextPiece) {
        currentPiece = nextPiece;
    } else {
        // First piece of the game - create a random one
        currentPiece = createPiece(getRandomPieceType());
    }
    
    // Always generate a new piece for the "next" preview
    nextPiece = createPiece(getRandomPieceType());
    
    // Position the piece at the top center of the board
    currentPiece.x = Math.floor(BOARD_WIDTH / 2) - Math.floor(currentPiece.matrix[0].length / 2);
    currentPiece.y = 0;
    
    // Draw both the board (with frozen pieces) and the active piece
    drawBoard();
    drawPiece();
    drawNextPiece(); // Update the next piece preview
    
    // Check if the game is over (collision at the starting position)
    if (checkCollision(currentPiece.x, currentPiece.y, currentPiece.matrix)) {
        gameOver = true;
        clearInterval(gameInterval);
        
        // Play game over sound
        if (synth) {
            synth.playGameOverSound();
            synth.stopBackgroundMusic();
        }
        
        // Show the start screen with 3D animation again
        document.getElementById('start-screen').style.display = 'flex';
        
        // Show game over message
        setTimeout(() => {
            alert('Game Over!');
        }, 300);
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
    
        // Reset the board to all zeros
    initializeBoard();
    console.log('Board reset to all zeros');
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
    
    // No need to restart background music - it's already playing
    // Just ensure audio context is running
    if (synth && synth.audioContext && synth.audioContext.state === 'suspended') {
        synth.audioContext.resume();
    }
}

// Function to resize the game board based on screen size
function resizeGame() {
    // Update block size
    BLOCK_SIZE = calculateBlockSize();
    
    // Resize the game board
    const boardElement = document.getElementById('game-board');
    boardElement.style.gridTemplateRows = `repeat(${BOARD_HEIGHT}, ${BLOCK_SIZE}px)`;
    boardElement.style.gridTemplateColumns = `repeat(${BOARD_WIDTH}, ${BLOCK_SIZE}px)`;
    
    // Update cell sizes
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.width = `${BLOCK_SIZE}px`;
        cell.style.height = `${BLOCK_SIZE}px`;
    });
    
    // Redraw the board and pieces
    if (currentPiece) {
        drawBoard();
        drawPiece();
    }
}

// Create a falling Tetris piece
function createFallingPiece() {
    // Use the same piece types as the actual game
    const pieceTypes = Object.keys(SHAPES);
    const pieceType = pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
    
    // Create piece container
    const piece = document.createElement('div');
    piece.className = `falling-piece`;
    
    // Get the shape matrix for this piece type
    const shape = SHAPES[pieceType];
    
    // Calculate piece dimensions based on the actual game block size
    const cellSize = BLOCK_SIZE;
    const width = shape[0].length * cellSize;
    const height = shape.length * cellSize;
    
    // Set the piece dimensions
    piece.style.width = `${width}px`;
    piece.style.height = `${height}px`;
    
    // Create cells based on the actual piece shape
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                const cell = document.createElement('div');
                cell.className = 'tetris-cell';
                cell.style.width = `${cellSize}px`;
                cell.style.height = `${cellSize}px`;
                cell.style.position = 'absolute';
                cell.style.top = `${y * cellSize}px`;
                cell.style.left = `${x * cellSize}px`;
                cell.style.backgroundColor = '#FF0000';
                cell.style.boxShadow = '0 0 15px rgba(255, 50, 50, 1)';
                cell.style.border = '2px solid rgba(255, 50, 50, 1)';
                piece.appendChild(cell);
            }
        }
    }
    
    // Get the container and game board dimensions
    const container = document.getElementById('falling-pieces-container');
    const gameBoard = document.getElementById('game-board');
    const boardWidth = gameBoard.offsetWidth;
    const boardHeight = gameBoard.offsetHeight;
    
    // Calculate a random horizontal position that keeps the piece within the grid
    const maxX = boardWidth - parseInt(piece.style.width);
    const randomX = Math.floor(Math.random() * maxX);
    
    // Set the piece position to start at the top of the grid
    piece.style.position = 'absolute';
    piece.style.left = `${randomX}px`;
    piece.style.top = '0px'; // Start at the very top of the grid
    
    // Add the piece to the container
    container.appendChild(piece);
    
    // Set up the animation
    const duration = 3 + Math.random() * 4; // Between 3 and 7 seconds
    const startTime = performance.now();
    
    // Calculate the total distance the piece needs to travel
    // From just above the top of the grid to just below the bottom
    const startPosition = 0; // Start exactly at the top of the grid
    const endPosition = boardHeight; // End at the bottom of the grid
    const pieceHeight = parseInt(piece.style.height);
    const totalDistance = endPosition - startPosition + pieceHeight; // Add piece height to ensure it goes fully off-screen
    
    function animatePiece(timestamp) {
        // Calculate progress
        const elapsed = timestamp - startTime;
        const progress = elapsed / (duration * 1000);
        
        if (progress < 1) {
            // Calculate new position - start at the top (0) and move down
            const newY = progress * totalDistance;
            
            // Set the position
            piece.style.top = `${newY}px`;
            
            // Create the clipping effect when the piece reaches the bottom
            if (newY + pieceHeight > boardHeight) {
                // Calculate how much of the piece is below the bottom edge
                const overflow = (newY + pieceHeight) - boardHeight;
                const clipPercentage = Math.min(98, (overflow / pieceHeight) * 100); // Cap at 98% to avoid flickering
                
                // Apply clipping to gradually hide the piece as it goes below the grid
                piece.style.clipPath = `inset(0 0 ${clipPercentage}% 0)`;
            }
            
            // Continue animation
            requestAnimationFrame(animatePiece);
        } else {
            // Animation complete, remove the piece
            if (piece.parentNode) {
                piece.parentNode.removeChild(piece);
            }
        }
    }
    
    // Start the animation
    requestAnimationFrame(animatePiece);
    
    return piece;
}

// Start the falling pieces animation
function startFallingPiecesAnimation() {
    // Create initial pieces
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createFallingPiece(), i * 500);
    }
    
    // Continue creating pieces at random intervals
    const animationInterval = setInterval(() => {
        // Only create new pieces if the start screen is visible
        const startScreen = document.getElementById('start-screen');
        if (startScreen && startScreen.style.display !== 'none') {
            createFallingPiece();
        }
    }, 1000); // New piece every second
    
    // Store the interval ID on the window object so it can be cleared if needed
    window.fallingPiecesInterval = animationInterval;
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    // Initialize board cells with proper sizing
    const boardElement = document.getElementById('game-board');
    boardElement.style.gridTemplateRows = `repeat(${BOARD_HEIGHT}, ${BLOCK_SIZE}px)`;
    boardElement.style.gridTemplateColumns = `repeat(${BOARD_WIDTH}, ${BLOCK_SIZE}px)`;
    
    // Initialize audio system and start music immediately
    if (synth) {
        // Start audio system immediately
        synth.start();
        // Start background music as soon as the page loads
        synth.startBackgroundMusic();
        console.log('Audio system initialized and background music started');
    }
    
    // Falling pieces animation disabled
    // startFallingPiecesAnimation();
    
    // Add event listeners
    document.getElementById('start').addEventListener('click', function() {
        // Hide the entire start screen when clicked
        document.getElementById('start-screen').style.display = 'none';
        // Then start the game
        startGame();
    });
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
    
    // Add window resize event listener
    window.addEventListener('resize', () => {
        // Debounce resize to avoid excessive calculations
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(resizeGame, 250);
    });
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
