// 1. ENTER BUTTON & MUSIC AUTO-PLAY
const enterBtn = document.getElementById('enter-btn');
const introOverlay = document.getElementById('intro-overlay');
const audioPlayer = document.getElementById('backgroundMusic');
const muteBtn = document.getElementById('muteBtn');

enterBtn.addEventListener('click', () => {
    introOverlay.style.opacity = '0';
    setTimeout(() => {
        introOverlay.style.display = 'none';
    }, 1000);

    audioPlayer.volume = 0.5;
    audioPlayer.play().catch(error => console.log("Audio play failed:", error));
});

muteBtn.addEventListener('click', () => {
    if (audioPlayer.muted) {
        audioPlayer.muted = false;
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        audioPlayer.muted = true;
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});

// 2. YOUR ORIGINAL STORY
const storyParts = [
    "Who could've thought that a dare would give me the chance to meet a beautiful soul ",
    "From the witty banter that has me laughing my heart out",
    "To the kisses that have me melting into you.",
    "and the hugs that have me never wanting to let go.",
    "The cuddles that have me wishing to never get out of bed",
    "My tulip in a garden of roses.",
    "I relish every single moment.",
    "It might not be the grandest of moments but every hour in your presence feels like mere minutes",
    "<span class='story-text final'>Tee, my beautiful tulip with a heart as deep as the stories you love—will you be my Valentine?</span>"
];

let currentPart = 0;
const storyContent = document.getElementById('story-content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const responseButtons = document.getElementById('response-buttons');

function updateStory() {
    storyContent.innerHTML = `<p class="story-text">${storyParts[currentPart]}</p>`;
    
    // Manage Buttons
    prevBtn.disabled = currentPart === 0;
    
    if (currentPart === storyParts.length - 1) {
        nextBtn.style.display = 'none';
        responseButtons.style.display = 'flex';
    } else {
        nextBtn.style.display = 'block';
        responseButtons.style.display = 'none';
    }
}

// Button Events
prevBtn.addEventListener('click', () => { 
    if(currentPart > 0) { currentPart--; updateStory(); } 
});

nextBtn.addEventListener('click', () => { 
    if(currentPart < storyParts.length - 1) { currentPart++; updateStory(); } 
});

// 3. RESPONSE LOGIC (Restored "No" Button Playfulness)
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const letterContainer = document.getElementById('letter-container');

yesBtn.addEventListener('click', () => {
    responseButtons.style.display = 'none';
    letterContainer.style.display = 'block';
    
    // Confetti effect
    for(let i=0; i<50; i++) {
        createHeart();
    }
});

noBtn.addEventListener('click', () => {
    // Show the "Persistent Suitor" text
    storyContent.innerHTML = `
        <p class="story-text final">
            <i class="fas fa-book" style="color:#e84393;"></i><br><br>
            "Then the story takes an unexpected twist..."<br><br>
            "She was cursed to eat aged bread and supreme for the rest of time.'"<br><br>
            Do not press the no button.<br><br>
            <button id="try-again" class="btn" style="margin-top:20px;">
                <i class="fas fa-redo"></i> Try a different ending?
            </button>
        </p>
    `;
    responseButtons.style.display = 'none';
    
    // Add event listener to the new "Try Again" button
    document.getElementById('try-again').addEventListener('click', () => {
        updateStory(); // This reloads the current part (the Question)
        responseButtons.style.display = 'flex';
    });
});

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '0';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    heart.style.animation = 'float 3s linear';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
}

// Initialize
updateStory();