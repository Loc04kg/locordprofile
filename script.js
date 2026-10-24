document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.profile-card');

    // 3D tilt effect on mouse move over the card
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const xAxis = ((centerX - x) / centerX) * 10; // Max 10 deg rotation
        const yAxis = ((y - centerY) / centerY) * 10;

        card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Reset rotation on mouse leave
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        card.style.transition = 'transform 0.5s ease';
    });

    // Remove transition when moving to keep it snappy
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });

    // --- Snake Avatar Frame Animation ---
    const snake = document.querySelector('.snake');
    if (snake) {
        const length = snake.getTotalLength();
        // Set dasharray to create the snake body (e.g., body takes up half the circle)
        snake.style.strokeDasharray = `${length * 0.6} ${length * 0.4}`;
        snake.style.strokeDashoffset = length;

        function animate() {
            // Get the current dashoffset
            let currentOffset = parseFloat(snake.style.strokeDashoffset) || length;
            currentOffset -= 2; // Speed of the snake

            if (currentOffset <= -length) {
                currentOffset = length;
            }

            snake.style.strokeDashoffset = currentOffset;
            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- Custom Cursor Logic (PC Only) ---
    // Only run logic if the device supports hover (pointer: fine)
    if (window.matchMedia("(pointer: fine)").matches) {
        let lastCursorSparkleTime = 0;

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // --- White/Green Bling Bling at Cursor ---
            const now = Date.now();
            if (now - lastCursorSparkleTime > 40) { // Create particle every 40ms
                const sparkle = document.createElement('div');
                sparkle.classList.add('cursor-sparkle');

                const offsetX = (Math.random() - 0.5) * 30;
                const offsetY = (Math.random() - 0.5) * 30;

                sparkle.style.left = `${posX + offsetX}px`;
                sparkle.style.top = `${posY + offsetY}px`;

                const size = Math.random() * 8 + 4; // 4px to 12px
                sparkle.style.width = `${size}px`;
                sparkle.style.height = `${size}px`;

                const duration = Math.random() * 1 + 0.5; // 0.5s to 1.5s
                sparkle.style.animation = `cursor-sparkle-fall ${duration}s ease-in forwards`;

                document.body.appendChild(sparkle);

                setTimeout(() => sparkle.remove(), duration * 1000);

                lastCursorSparkleTime = now;
            }
        });
    }

    // --- Electric Sparks synchronized with Name flickering ---
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        function spawnSparks(count) {
            const rect = nameElement.getBoundingClientRect();
            for (let i = 0; i < count; i++) {
                const sparkle = document.createElement('div');
                sparkle.classList.add('sparkle');

                const offsetX = Math.random() * rect.width;
                const offsetY = Math.random() * 10;

                sparkle.style.left = `${rect.left + offsetX}px`;
                sparkle.style.top = `${rect.bottom - 15 + offsetY}px`;

                const height = Math.random() * 20 + 10;
                sparkle.style.width = `2px`;
                sparkle.style.height = `${height}px`;

                const duration = Math.random() * 0.5 + 0.3;
                sparkle.style.animation = `sparkle-fall ${duration}s ease-in forwards`;

                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), duration * 1000);
            }
        }

        function triggerFlicker() {
            // Không chạy hiệu ứng nếu đang ở tab khác
            if (document.hidden) {
                setTimeout(triggerFlicker, 2000);
                return;
            }

            // Turn off (flicker)
            nameElement.classList.add('flicker-off');
            // Drop sparks exactly when it breaks
            spawnSparks(Math.floor(Math.random() * 4) + 2); // 2 to 5 sparks

            // Turn back on quickly
            setTimeout(() => {
                nameElement.classList.remove('flicker-off');

                // Double flicker chance
                if (Math.random() > 0.5) {
                    setTimeout(() => {
                        nameElement.classList.add('flicker-off');
                        spawnSparks(Math.floor(Math.random() * 3) + 1); // 1 to 3 sparks
                        setTimeout(() => nameElement.classList.remove('flicker-off'), 50);
                    }, 50);
                }
            }, 50 + Math.random() * 100); // Off duration: 50-150ms

            // Schedule next flicker in 2 to 5 seconds
            setTimeout(triggerFlicker, 2000 + Math.random() * 3000);
        }

        // Start flicker loop
        setTimeout(triggerFlicker, 1500);
    }

    // --- Green Fire Effect at Bottom ---
    const fireContainer = document.querySelector('.fire-container');
    if (fireContainer) {
        // Create 40 flames for the background effect
        for (let i = 0; i < 40; i++) {
            const flame = document.createElement('div');
            flame.classList.add('fire-flame');

            // Randomize position across width
            flame.style.left = `${Math.random() * 100}%`;

            // Randomize size
            const size = Math.random() * 100 + 50; // 50px to 150px
            flame.style.width = `${size}px`;
            flame.style.height = `${size * 1.5}px`; // Make flames taller than they are wide

            // Randomize animation delay and duration to create organic movement
            flame.style.animationDelay = `${Math.random() * 3}s`;
            flame.style.animationDuration = `${Math.random() * 2 + 1.5}s`; // 1.5s to 3.5s

            fireContainer.appendChild(flame);
        }
    }

    // --- Starry Background Effect ---
    const starContainer = document.querySelector('.star-container');
    if (starContainer) {
        // 1. Create static background stars (Constellations)
        for (let i = 0; i < 60; i++) {
            const star = document.createElement('div');
            star.classList.add('static-star');
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 30}%`; // Tập trung ở 30% nửa trên màn hình

            const size = Math.random() * 2 + 1; // 1px to 3px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;

            starContainer.appendChild(star);
        }

        // 2. Spawn shooting stars (Sao băng)
        setInterval(() => {
            // Không render sao băng khi người dùng chuyển sang tab khác để tiết kiệm CPU
            if (document.hidden || Math.random() > 0.3) return; // 30% chance

            const fallingStar = document.createElement('div');
            fallingStar.classList.add('falling-star');

            // Bắt đầu từ góc trên bên phải, ngoài rìa màn hình
            fallingStar.style.left = `${Math.random() * 50 + 50}%`; // 50% đến 100% chiều ngang
            fallingStar.style.top = `${Math.random() * 20 - 20}%`; // -20% đến 0% chiều dọc (nằm trên khuất màn hình)

            // Tốc độ cực nhanh (0.4s - 0.9s)
            const duration = Math.random() * 0.5 + 0.4;
            fallingStar.style.animationDuration = `${duration}s`;

            starContainer.appendChild(fallingStar);

            // Clean up
            setTimeout(() => {
                fallingStar.remove();
            }, duration * 1000);
        }, 1500);
    }

    // --- Music Player Logic (Playlist) ---
    const musicPlayer = document.querySelector('.music-player');
    if (musicPlayer) {
        const audio = document.getElementById('bgm');
        const playBtn = document.getElementById('music-play-btn');
        const prevBtn = document.getElementById('music-prev-btn');
        const nextBtn = document.getElementById('music-next-btn');
        const playIcon = playBtn.querySelector('i');
        const progressContainer = document.getElementById('music-progress-container');
        const progressBar = document.getElementById('music-progress-bar');
        const titleDisplay = document.querySelector('.music-title');

        // Cài đặt mức âm lượng
        audio.volume = 0.5;

        // Chỉ cần điền tên file .mp3 của bạn vào đây
        const playlistFiles = [
            'Lost Sky - Dreams pt. II (feat. Sara Skinner) _ Trap _ NCS - Copyright Free Music.mp3',
            'I Love You 3000 - Stephanie Poetri.mp3'
        ];

        let currentTrackIndex = 0;

        // Tự động định dạng tên hiển thị từ tên file (xóa đuôi .mp3 và dấu gạch ngang/dưới)
        function formatTitle(filename) {
            return filename.replace('.mp3', '').replace(/[-_]/g, ' ');
        }

        function loadTrack(index) {
            const filename = playlistFiles[index];
            audio.src = filename;
            titleDisplay.textContent = formatTitle(filename);
            progressBar.style.width = '0%';
        }

        // Tải bài hát đầu tiên
        loadTrack(currentTrackIndex);

        // Thử phát nhạc ngay khi vừa vào trang (Autoplay)
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay thành công
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                musicPlayer.classList.remove('paused');
            }).catch(error => {
                // Trình duyệt chặn Autoplay (Chrome/Firefox thường yêu cầu người dùng tương tác trước)
                // Tạo một sự kiện để phát nhạc ngay lần click chuột đầu tiên của người dùng vào bất cứ đâu trên trang
                const startAudioOnFirstInteraction = () => {
                    audio.play();
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                    musicPlayer.classList.remove('paused');
                    document.removeEventListener('click', startAudioOnFirstInteraction);
                };
                document.addEventListener('click', startAudioOnFirstInteraction);
            });
        }

        function togglePlay() {
            if (audio.paused) {
                audio.play();
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                musicPlayer.classList.remove('paused');
            } else {
                audio.pause();
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
                musicPlayer.classList.add('paused');
            }
        }

        playBtn.addEventListener('click', togglePlay);

        function nextTrack() {
            currentTrackIndex = (currentTrackIndex + 1) % playlistFiles.length;
            loadTrack(currentTrackIndex);
            if (!musicPlayer.classList.contains('paused')) {
                audio.play();
            }
        }

        function prevTrack() {
            currentTrackIndex = (currentTrackIndex - 1 + playlistFiles.length) % playlistFiles.length;
            loadTrack(currentTrackIndex);
            if (!musicPlayer.classList.contains('paused')) {
                audio.play();
            }
        }

        nextBtn.addEventListener('click', nextTrack);
        prevBtn.addEventListener('click', prevTrack);

        // Tự động chuyển bài khi kết thúc
        audio.addEventListener('ended', nextTrack);

        // Cập nhật thanh tiến trình liên tục theo thời gian bài hát
        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${progressPercent}%`;
            }
        });

        // Tua bài hát khi click vào thanh tiến trình
        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;
            if (duration) {
                audio.currentTime = (clickX / width) * duration;
            }
        });

        // Xử lý thanh âm lượng
        const volumeSlider = document.getElementById('volume-slider');
        const volumeIcon = document.getElementById('volume-icon');

        volumeSlider.addEventListener('input', (e) => {
            const vol = e.target.value;
            audio.volume = vol;

            // Đổi icon theo mức âm lượng
            if (vol == 0) {
                volumeIcon.className = 'fa-solid fa-volume-xmark';
            } else if (vol < 0.5) {
                volumeIcon.className = 'fa-solid fa-volume-low';
            } else {
                volumeIcon.className = 'fa-solid fa-volume-high';
            }
        });
    }
});
// --- Auto-update Valorant Rank via HenrikDev API ---
    const VALORANT_NAME = 'Locord';
    const VALORANT_TAG = '2004';
    const VALORANT_REGION = 'ap';
    const HENRIK_API_KEY = 'HDEV-dc0f73e5-4f8f-44e3-9861-d6114d1c7aeb';

    async function updateValorantRank() {
        const rankEl = document.getElementById('valorant-rank');
        if (!rankEl) return;

        try {
            const url = `https://api.henrikdev.xyz/valorant/v3/mmr/${VALORANT_REGION}/pc/${encodeURIComponent(VALORANT_NAME)}/${encodeURIComponent(VALORANT_TAG)}`;
            const res = await fetch(url, {
                headers: {
                    'Authorization': HENRIK_API_KEY
                }
            });

            if (!res.ok) throw new Error(`API error ${res.status}`);

            const json = await res.json();
            const current = json?.data?.current;

            if (current && current.tier) {
                const tierName = current.tier.name || 'Unrated';
                const rr = current.rr != null ? ` ${current.rr}RR` : '';
                rankEl.textContent = `${tierName}${rr}`;

                // Cập nhật class màu theo rank
                rankEl.className = '';
                const lower = tierName.toLowerCase();
                if (lower.includes('iron')) rankEl.classList.add('rank-iron');
                else if (lower.includes('bronze')) rankEl.classList.add('rank-bronze');
                else if (lower.includes('silver')) rankEl.classList.add('rank-silver');
                else if (lower.includes('gold')) rankEl.classList.add('rank-gold');
                else if (lower.includes('platinum')) rankEl.classList.add('rank-platinum');
                else if (lower.includes('diamond')) rankEl.classList.add('rank-diamond');
                else if (lower.includes('ascendant')) rankEl.classList.add('rank-ascendant');
                else if (lower.includes('immortal')) rankEl.classList.add('rank-immortal');
                else if (lower.includes('radiant')) rankEl.classList.add('rank-radiant');
                else rankEl.classList.add('rank-unrated');
            } else {
                rankEl.textContent = 'Unrated';
                rankEl.classList.add('rank-unrated');
            }
        } catch (err) {
            console.error('Failed to fetch Valorant rank:', err);
            rankEl.textContent = 'Gold 3'; // fallback
            rankEl.classList.add('rank-gold');
        }
    }

    updateValorantRank();
