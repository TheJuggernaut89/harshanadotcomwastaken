import Phaser from 'phaser';

export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        // --- Create Visual Assets ---
        const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xffffff, 0.5);
        graphics.fillCircle(4, 4, 4);
        graphics.generateTexture('particle', 8, 8);
        graphics.clear();

        // Create Sprite
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setDragX(1500);

        // --- Particle Emitters ---
        this.trailEmitter = scene.add.particles(0, 0, 'particle', {
            speed: 50,
            scale: { start: 0.6, end: 0 },
            alpha: { start: 0.6, end: 0 },
            tint: 0xF4A261, // Sandy orange
            lifespan: 300,
            on: false
        });

        this.jumpEmitter = scene.add.particles(0, 0, 'particle', {
            speed: { min: -100, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            alpha: { start: 0.8, end: 0 },
            tint: 0x2A9D8F, // Teal
            lifespan: 400,
            quantity: 15,
            on: false
        });

        this.doubleJumpEmitter = scene.add.particles(0, 0, 'particle', {
            speed: { min: -150, max: 150 },
            angle: { min: 0, max: 360 },
            scale: { start: 1.2, end: 0 },
            alpha: { start: 1, end: 0 },
            tint: 0xE63946, // Primary red
            lifespan: 500,
            quantity: 20,
            on: false
        });

        // Physics Config
        this.speed = 380;
        this.jumpForce = -600;
        this.wallJumpForce = { x: 450, y: -650 };
        this.gravity = 1500;

        // Jump System
        this.maxJumps = 2; // Ground jump + 1 air jump
        this.jumpsRemaining = this.maxJumps;
        this.coyoteTime = 150;
        this.coyoteTimer = 0;
        this.jumpBuffer = 150;
        this.jumpBufferTimer = 0;

        // Wall Jump System
        this.isWallJumping = false;
        this.wallJumpLockTime = 200; // ms to lock input after wall jump
        this.wallJumpLockTimer = 0;
        this.lastWallDirection = 0; // -1 left, 1 right

        // Dash System
        this.isDashing = false;
        this.canDash = true;
        this.dashCooldown = 600;

        // Setup Inputs
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.keys = scene.input.keyboard.addKeys('W,A,S,D,SPACE,SHIFT');
    }

    update(time, delta) {
        const onGround = this.sprite.body.blocked.down || this.sprite.body.touching.down;
        const onLeftWall = this.sprite.body.blocked.left || this.sprite.body.touching.left;
        const onRightWall = this.sprite.body.blocked.right || this.sprite.body.touching.right;
        const onWall = (onLeftWall || onRightWall) && !onGround;

        // Reset jumps when grounded
        if (onGround) {
            this.jumpsRemaining = this.maxJumps;
            this.coyoteTimer = this.coyoteTime;
        } else {
            this.coyoteTimer -= delta;
        }

        // Track wall direction for wall jump
        if (onLeftWall) this.lastWallDirection = -1;
        if (onRightWall) this.lastWallDirection = 1;

        // Decrease wall jump lock timer
        if (this.wallJumpLockTimer > 0) {
            this.wallJumpLockTimer -= delta;
        }

        // --- Jump Buffering ---
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
            this.jumpBufferTimer = this.jumpBuffer;
        } else {
            this.jumpBufferTimer -= delta;
        }

        // --- Horizontal Movement (with wall jump lock) ---
        if (!this.isDashing && this.wallJumpLockTimer <= 0) {
            if (this.cursors.left.isDown || this.keys.A.isDown) {
                this.sprite.setVelocityX(-this.speed);
                this.sprite.setFlipX(true);
                this.sprite.setAngle(-5);
            } else if (this.cursors.right.isDown || this.keys.D.isDown) {
                this.sprite.setVelocityX(this.speed);
                this.sprite.setFlipX(false);
                this.sprite.setAngle(5);
            } else {
                this.sprite.setVelocityX(0);
                this.sprite.setAngle(0);
            }
        }

        // --- Squish and Stretch ---
        if (onGround) {
            this.sprite.setScale(1, 1);
        } else {
            const velY = this.sprite.body.velocity.y;
            const stretch = Phaser.Math.Clamp(Math.abs(velY) / 1000, 0, 0.4);
            if (velY < 0) {
                this.sprite.setScale(1 - stretch, 1 + stretch);
            } else {
                this.sprite.setScale(1 + stretch, 1 - stretch);
            }
        }

        // --- Wall Jump ---
        if (this.jumpBufferTimer > 0 && onWall && !onGround) {
            this.executeWallJump();
        }
        // --- Regular Jump (Ground or Air) ---
        else if (this.jumpBufferTimer > 0 && this.jumpsRemaining > 0) {
            this.executeJump();
        }

        // --- Variable Jump Height ---
        if (this.sprite.body.velocity.y < 0 && !(this.cursors.up.isDown || this.keys.SPACE.isDown)) {
            this.sprite.setVelocityY(this.sprite.body.velocity.y * 0.6);
        }

        // --- Dash ---
        if (Phaser.Input.Keyboard.JustDown(this.keys.SHIFT) && this.canDash) {
            this.executeDash();
        }

        // --- Wall Sliding ---
        if (onWall && this.sprite.body.velocity.y > 0) {
            this.sprite.setVelocityY(150);
            this.sprite.setAngle(this.lastWallDirection * 15); // Lean into wall

            // Wall slide particles
            if (time % 100 < 20) {
                const px = onLeftWall ? this.sprite.x - 16 : this.sprite.x + 16;
                this.trailEmitter.emitParticleAt(px, this.sprite.y);
            }
        }
    }

    executeJump() {
        const isDoubleJump = this.jumpsRemaining < this.maxJumps;

        this.sprite.setVelocityY(this.jumpForce);
        this.jumpsRemaining--;
        this.jumpBufferTimer = 0;
        this.coyoteTimer = 0;

        // Visual feedback
        if (isDoubleJump) {
            this.doubleJumpEmitter.emitParticleAt(this.sprite.x, this.sprite.y);
            this.scene.cameras.main.shake(150, 0.003);
        } else {
            this.jumpEmitter.emitParticleAt(this.sprite.x, this.sprite.y + 16);
            this.scene.cameras.main.shake(100, 0.002);
        }

        this.sprite.setScale(0.8, 1.2);
    }

    executeWallJump() {
        // Jump away from wall
        const jumpDirection = -this.lastWallDirection;

        this.sprite.setVelocityX(jumpDirection * this.wallJumpForce.x);
        this.sprite.setVelocityY(this.wallJumpForce.y);

        // Reset jumps
        this.jumpsRemaining = this.maxJumps - 1;
        this.jumpBufferTimer = 0;

        // Lock horizontal input briefly
        this.wallJumpLockTimer = this.wallJumpLockTime;
        this.isWallJumping = true;

        // Visual feedback
        this.doubleJumpEmitter.emitParticleAt(this.sprite.x, this.sprite.y);
        this.scene.cameras.main.shake(200, 0.005);

        this.scene.time.delayedCall(this.wallJumpLockTime, () => {
            this.isWallJumping = false;
        });
    }

    executeDash() {
        this.isDashing = true;
        this.canDash = false;

        let dashDir = 0;
        if (this.cursors.left.isDown || this.keys.A.isDown) dashDir = -1;
        else if (this.cursors.right.isDown || this.keys.D.isDown) dashDir = 1;
        else dashDir = this.sprite.flipX ? -1 : 1;

        this.sprite.setVelocityX(dashDir * 1100);
        this.sprite.setVelocityY(-100);
        this.sprite.body.setAllowGravity(false);

        // Dash Juice
        this.scene.cameras.main.shake(150, 0.006);
        this.trailEmitter.start();
        this.trailEmitter.startFollow(this.sprite);

        this.scene.time.delayedCall(200, () => {
            this.isDashing = false;
            this.sprite.body.setAllowGravity(true);
            this.trailEmitter.stop();
        });

        this.scene.time.delayedCall(this.dashCooldown, () => {
            this.canDash = true;
        });
    }
}
