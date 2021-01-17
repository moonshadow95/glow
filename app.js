import { GlowParticle } from "./glow_particles.js";

const COLORS = [
    { r: 0, g: 151, b: 230 }, //blue
    { r: 251, g: 197, b: 49 }, //yellow
    { r: 140, g: 122, b: 230 }, //purple
    { r: 232, g: 65, b: 24 }, //red
    { r: 76, g: 209, b: 55 }, //green
];

class App {
    constructor() {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.totalParticles = 10;
        this.particles = [];
        this.maxRadius = 900;
        this.minRadius = 400;

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.ctx.globalCompositeOperation = "layer";

        this.createParticles();
    }

    createParticles() {
        let curColor = 0;
        this.particles = [];
        for (let i = 0; i < this.totalParticles; i++) {
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                Math.random() * (this.maxRadius - this.minRadius) +
                    this.minRadius,
                COLORS[curColor]
            );

            if (++curColor >= COLORS.length) {
                curColor = 0;
            }

            this.particles[i] = item;
        }
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.totalParticles; i++) {
            const item = this.particles[i];
            item.animate(this.ctx, this.stageWidth, this.stageHeight);
        }
    }
}

window.onload = () => {
    new App();
};
