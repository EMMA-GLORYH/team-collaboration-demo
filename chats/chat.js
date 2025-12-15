const chatForm = document.getElementById("chatForm");
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const usernameInput = document.getElementById("username");
const imageInput = document.getElementById("imageInput");
const shareScreenBtn = document.getElementById("shareScreenBtn");

function addMessage(content, type = "user") {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.appendChild(content);
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener("submit", e => {
    e.preventDefault();
    const msg = chatInput.value.trim();
    const user = usernameInput.value.trim();
    if (!msg || !user) return;

    const span = document.createElement("span");
    span.textContent = `${user}: ${msg}`;
    addMessage(span);

    chatInput.value = "";
});

/* Image sharing */
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    addMessage(img);
});

/* Screen sharing */
shareScreenBtn.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        });

        const video = document.createElement("video");
        video.srcObject = stream;
        video.autoplay = true;
        video.controls = true;
        video.style.width = "100%";

        addMessage(video, "system");
    } catch (err) {
        alert("Screen sharing cancelled or not supported.");
    }
});
