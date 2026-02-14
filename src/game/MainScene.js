import Phaser from 'phaser';
import Player from './Player';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });

        // Player (Primary Red)
        graphics.fillStyle(0xE63946);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('player', 32, 32);
        graphics.clear();

        // Solid Platform (Navy)
        graphics.fillStyle(0x1D3557);
        graphics.fillRect(0, 0, 120, 24);
        graphics.generateTexture('platform', 120, 24);
        graphics.clear();

        // Jump-Through Platform (Teal - lighter)
        graphics.fillStyle(0x2A9D8F);
        graphics.fillRect(0, 0, 120, 16);
        graphics.generateTexture('platform_jumpthrough', 120, 16);
        graphics.clear();

        // Bouncy Platform (Sandy/Orange)
        graphics.fillStyle(0xF4A261);
        graphics.fillRect(0, 0, 120, 24);
        graphics.generateTexture('platform_bouncy', 120, 24);
        graphics.clear();

        // Moving Platform (Teal)
        graphics.fillStyle(0x2A9D8F);
        graphics.fillRect(0, 0, 120, 24);
        graphics.generateTexture('platform_moving', 120, 24);
        graphics.clear();

        // Token (Glowing Teal)
        graphics.fillStyle(0x2A9D8F);
        graphics.fillCircle(12, 12, 12);
        graphics.generateTexture('token', 24, 24);
        graphics.clear();

        // Hazard (Primary Red Triangle)
        graphics.fillStyle(0xE63946);
        graphics.beginPath();
        graphics.moveTo(20, 0);
        graphics.lineTo(40, 40);
        graphics.lineTo(0, 40);
        graphics.closePath();
        graphics.fillPath();
        graphics.generateTexture('hazard', 40, 40);
    }

    create() {
        const { width, height } = this.scale;
        const worldWidth = 5000;
        const worldHeight = 1400;

        // Background gradient (Navy to darker navy)
        const bg = this.add.rectangle(0, 0, worldWidth, worldHeight, 0x0f1a2e).setOrigin(0);

        // --- Parallax Stars (Malaysian flag colors) ---
        this.createMalaysianParallax(worldWidth, worldHeight);

        // --- Groups ---
        this.platforms = this.physics.add.staticGroup();
        this.jumpThroughPlatforms = this.physics.add.staticGroup();
        this.bouncyPlatforms = this.physics.add.staticGroup();
        this.movingPlatforms = this.physics.add.group({ allowGravity: false, immovable: true });
        this.tokens = this.physics.add.group();
        this.hazards = this.physics.add.group({ allowGravity: false, immovable: true });

        // --- Narrative Level Design ---
        this.createResumeJourney(worldWidth, worldHeight);

        // --- Player ---
        this.player = new Player(this, 150, worldHeight - 200);

        // --- Collisions ---
        this.physics.add.collider(this.player.sprite, this.platforms);
        this.physics.add.collider(this.player.sprite, this.bouncyPlatforms, this.onBouncyPlatform, null, this);
        this.physics.add.collider(this.player.sprite, this.movingPlatforms);
        this.physics.add.collider(this.tokens, this.platforms);
        this.physics.add.collider(this.player.sprite, this.jumpThroughPlatforms, null, this.jumpThroughCheck, this);

        this.physics.add.overlap(this.player.sprite, this.tokens, this.collectToken, null, this);
        this.physics.add.overlap(this.player.sprite, this.hazards, () => this.resetPlayer(), null, this);
        this.physics.add.overlap(this.player.sprite, this.goal, this.reachGoal, null, this);

        // --- Camera & World ---
        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

        // --- UI ---
        this.setupUI();

        // --- Story Labels ---
        this.createStoryLabels(worldHeight);
    }

    createMalaysianParallax(w, h) {
        // Stars in Malaysian flag colors (yellow, red, blue)
        const colors = [0xFFD700, 0xE63946, 0x1D3557, 0x2A9D8F];
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * w;
            const y = Math.random() * h;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const star = this.add.circle(x, y, Math.random() * 3, color, Math.random() * 0.6);
            star.setScrollFactor(Math.random() * 0.4);
        }

        // Silhouettes of KL skyline (Petronas Towers inspired)
        for (let i = 0; i < 15; i++) {
            const buildingHeight = 300 + Math.random() * 500;
            const rect = this.add.rectangle(i * 400, h - buildingHeight / 2, 150, buildingHeight, 0x0a0a0a);
            rect.setScrollFactor(0.5);

            // Twin towers at specific position
            if (i === 7 || i === 8) {
                rect.setFillStyle(0x1a1a1a);
                rect.setSize(120, buildingHeight + 100);
            }
        }
    }

    createResumeJourney(w, h) {
        const floor = h - 50;

        // === ACT 1: BODYGUARD ERA (Singapore) ===
        this.platforms.create(200, floor, 'platform').setScale(3, 1).refreshBody();

        // "Training" obstacles (wall jump tutorial)
        this.platforms.create(500, floor - 150, 'platform').setScale(0.5, 4).refreshBody();
        this.platforms.create(700, floor - 300, 'platform').setScale(0.5, 4).refreshBody();
        this.createJumpThroughPlatform(600, floor - 450);
        this.createToken(600, floor - 490, "BODYGUARD REFLEXES");

        // === ACT 2: CUSTOMER SERVICE (The Patience Test) ===
        // Moving platforms = "Dealing with difficult customers"
        this.createMovingPlatform(1000, floor - 200, 200, 0);
        this.createMovingPlatform(1300, floor - 350, -150, 0);
        this.createToken(1300, floor - 400, "CRISIS MANAGEMENT");

        // Hazards = "Angry customers"
        this.createHazard(1150, floor - 80, "KAREN");

        // === ACT 3: JUNGLEWALLA (Eco-Tourism Vibes) ===
        // Bouncy platforms = "Jungle adventure"
        this.createBouncyPlatform(1700, floor - 100);
        this.createBouncyPlatform(1900, floor - 250);
        this.createToken(1900, floor - 450, "EVENT MANAGEMENT");

        // Jump-through platforms = "Tree canopy"
        this.createJumpThroughPlatform(2100, floor - 300);
        this.createJumpThroughPlatform(2300, floor - 450);

        // === ACT 4: CREAM OF CREAMS (Cheesecake Obsession) ===
        // Platforms shaped like cheesecake layers
        this.platforms.create(2600, floor - 100, 'platform').setScale(2, 0.5).refreshBody();
        this.platforms.create(2700, floor - 200, 'platform').setScale(1.8, 0.5).refreshBody();
        this.platforms.create(2800, floor - 300, 'platform').setScale(1.6, 0.5).refreshBody();

        this.createToken(2800, floor - 350, "VIRAL CAMPAIGNS");
        this.createToken(2900, floor - 250, "150% ENGAGEMENT");

        // Hazard = "Lactose Intolerance"
        this.createHazard(2750, floor - 80, "LACTOSE");

        // === ACT 5: AI AUTOMATION ERA (The Future) ===
        // Complex moving platform puzzle = "AI complexity"
        this.createMovingPlatform(3200, floor - 200, 0, -200);
        this.createMovingPlatform(3500, floor - 400, 200, 0);
        this.createMovingPlatform(3800, floor - 300, -200, 0);

        this.createToken(3500, floor - 600, "AI AUTOMATION");
        this.createToken(3800, floor - 500, "N8N WORKFLOWS");

        // === ACT 6: IMPOSTER SYNDROME BOSS FIGHT ===
        // Wall jump challenge = "Overcoming self-doubt"
        this.platforms.create(4200, floor - 100, 'platform').setScale(0.5, 8).refreshBody();
        this.platforms.create(4400, floor - 300, 'platform').setScale(0.5, 8).refreshBody();
        this.platforms.create(4200, floor - 500, 'platform').setScale(0.5, 8).refreshBody();

        // Multiple hazards = "Imposter thoughts"
        this.createHazard(4300, floor - 200, "NOT GOOD ENOUGH");
        this.createHazard(4300, floor - 400, "FAKE IT");

        this.createJumpThroughPlatform(4300, floor - 650);
        this.createToken(4300, floor - 700, "SELF-BELIEF");

        // === FINAL PLATFORM: PORTFOLIO ===
        this.platforms.create(4700, floor - 400, 'platform').setScale(3, 1).refreshBody();

        // Goal
        this.goal = this.add.text(4750, floor - 500, '🎯', { fontSize: '80px' }).setOrigin(0.5);
        this.physics.add.existing(this.goal, true);
        this.tweens.add({
            targets: this.goal,
            scale: 1.3,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    createStoryLabels(h) {
        const floor = h - 50;
        const style = { fontSize: '16px', fill: '#F4A261', fontFamily: 'Courier', fontStyle: 'bold' };
        const styleSmall = { fontSize: '11px', fill: '#2A9D8F', fontFamily: 'Courier', fontStyle: 'italic' };

        // Act labels
        this.add.text(200, floor - 250, 'ACT 1: BODYGUARD\n"Can protect VIP, can lah!"', style).setScrollFactor(1);
        this.add.text(1000, floor - 500, 'ACT 2: CUSTOMER SERVICE\n"Smile through the pain"', style).setScrollFactor(1);
        this.add.text(1700, floor - 600, 'ACT 3: JUNGLEWALLA\n"From city to jungle"', style).setScrollFactor(1);
        this.add.text(2600, floor - 500, 'ACT 4: CHEESECAKE ERA\n"Viral or bust!"', style).setScrollFactor(1);
        this.add.text(3200, floor - 700, 'ACT 5: AI AUTOMATION\n"Robots are friends"', style).setScrollFactor(1);
        this.add.text(4200, floor - 800, 'BOSS: IMPOSTER SYNDROME\n"Am I qualified? Yes lah!"', style).setScrollFactor(1);

        // Funny commentary
        this.add.text(600, floor - 550, '"Wall jump training\nlike Jackie Chan"', styleSmall).setScrollFactor(1);
        this.add.text(1150, floor - 150, '"Angry customer\navoid at all costs"', styleSmall).setScrollFactor(1);
        this.add.text(2750, floor - 150, '"Too much cheesecake\n= danger"', styleSmall).setScrollFactor(1);
        this.add.text(4300, floor - 250, '"Self-doubt is\nthe real enemy"', styleSmall).setScrollFactor(1);
    }

    createToken(x, y, label) {
        const token = this.tokens.create(x, y, 'token');
        token.label = label;
        token.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    }

    createHazard(x, y, label) {
        const h = this.hazards.create(x, y, 'hazard');
        h.label = label;
        this.tweens.add({
            targets: h,
            angle: 360,
            duration: 2000,
            repeat: -1
        });
    }

    createJumpThroughPlatform(x, y) {
        const platform = this.jumpThroughPlatforms.create(x, y, 'platform_jumpthrough');
        platform.body.checkCollision.down = false;
        platform.body.checkCollision.left = false;
        platform.body.checkCollision.right = false;
        return platform;
    }

    createBouncyPlatform(x, y) {
        return this.bouncyPlatforms.create(x, y, 'platform_bouncy');
    }

    createMovingPlatform(x, y, dx, dy) {
        const p = this.movingPlatforms.create(x, y, 'platform_moving');
        this.tweens.add({
            targets: p.body.velocity,
            x: dx,
            y: dy,
            duration: 2500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    jumpThroughCheck(player, platform) {
        const playerBottom = player.body.y + player.body.height;
        const platformTop = platform.body.y;

        if (this.player.cursors.down.isDown && Phaser.Input.Keyboard.JustDown(this.player.keys.SPACE)) {
            return false;
        }

        return playerBottom <= platformTop + 5 && player.body.velocity.y >= 0;
    }

    onBouncyPlatform(player, platform) {
        if (player.body.velocity.y > 0) {
            player.setVelocityY(-850);
            this.cameras.main.shake(200, 0.008);

            this.tweens.add({
                targets: platform,
                scaleY: 0.6,
                duration: 100,
                yoyo: true
            });
        }
    }

    setupUI() {
        this.score = 0;
        this.maxScore = 11; // Total collectibles

        this.scoreText = this.add.text(20, 20, 'CAREER PROGRESS: 0%', {
            fontSize: '26px',
            fill: '#E63946',
            fontFamily: 'Courier',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 4
        }).setScrollFactor(0);

        this.infoText = this.add.text(20, 60, '🎮 [SPACE] Jump x2 | [SHIFT] Dash | Wall Jump = Can!', {
            fontSize: '13px',
            fill: '#F4A261',
            fontFamily: 'Courier',
            stroke: '#000',
            strokeThickness: 2
        }).setScrollFactor(0);

        this.storyText = this.add.text(20, 90, '📖 From Bodyguard to AI Marketer - A Malaysian Story', {
            fontSize: '12px',
            fill: '#2A9D8F',
            fontFamily: 'Courier',
            fontStyle: 'italic'
        }).setScrollFactor(0);
    }

    update(time, delta) {
        this.player.update(time, delta);

        if (this.player.sprite.y > this.physics.world.bounds.height + 100) {
            this.resetPlayer();
        }
    }

    collectToken(player, token) {
        token.disableBody(true, true);
        this.score++;

        const percentage = Math.round((this.score / this.maxScore) * 100);
        this.scoreText.setText(`CAREER PROGRESS: ${percentage}%`);

        // Floating text with actual label
        const label = token.label || 'SKILL UNLOCKED';
        const txt = this.add.text(token.x, token.y, `+ ${label}`, {
            fontSize: '16px',
            fill: '#2A9D8F',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 3
        });

        this.tweens.add({
            targets: txt,
            y: txt.y - 60,
            alpha: 0,
            duration: 1000,
            onComplete: () => txt.destroy()
        });

        this.cameras.main.flash(200, 42, 157, 143, 0.15); // Teal flash
    }

    resetPlayer() {
        this.cameras.main.shake(300, 0.01);
        this.cameras.main.fade(200, 230, 57, 70, false, (cam, pct) => { // Primary red fade
            if (pct >= 1) this.scene.restart();
        });
    }

    reachGoal() {
        this.events.emit('game-complete');
        this.scoreText.setText('CAREER PROGRESS: 100% - PORTFOLIO UNLOCKED! 🎉');
        this.storyText.setText('🏆 "Wah, you made it! Now hire me lah!"');
        this.scene.pause();
    }
}
