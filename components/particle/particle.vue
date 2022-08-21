<template>
    <canvas ref="canvas" id="canvas" :width="state.width" :height="state.height"></canvas>
</template>

<script lang="ts" setup>
// 获取dom
const canvas = ref(null);
// let log = ref(null);
interface stateInit {
    width: number,
    height: number
}
const state = reactive<stateInit>({
    width: 500,
    height: 500,
})
const ctx = ref(null);
onMounted(() => {
    ctx.value = canvas.value.getContext('2d');
    setCanvasSize();
    window.onresize = () => {
        setCanvasSize();
    }
    raf();
})
const colors = reactive(['#ed1941', '#f05b72', '#ef4136', '#f15a22', '#8e3e1f', '#fcaf17', '#b76f40', '#00ae9d', '#009ad6', '#1d953f', '#426ab3', '#6950a1', '#74787c', '#2a5caa']);
// 设置canvas宽高
const setCanvasSize = (): void => {
    state.width = window.innerWidth;
    state.height = window.innerHeight - 40;
}
/**
 * 获取min（包含） - max（不包含）之间的随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns 
 */
const getRandom = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}
/**
 * 获取两点距离
 * @param {object} a 第一个点的位置
 * @param {object} b 第二个点的位置
 * @returns
 */
interface pos {
    x: number,
    y: number
}
const getDistance = (a: pos, b: pos): number => {
    const x = a.x - b.x;
    const y = a.y - b.y;
    return Math.hypot(x, y); // Math.sqrt(x * x + y * y);
}
// 创建粒子函数
interface particle {
    radius: number,
    x: number,
    y: number,
    speedX: number,
    speedY: number,
    color: string
}
const create = (): particle => {
    // 粒子半径
    let radius = getRandom(2.2, 4);
    // 粒子位置
    let x = getRandom(0 + radius, state.width - radius);
    let y = getRandom(0 + radius, state.height - radius);
    // 粒子运动速度
    let speedX = getRandom(-1, 1);
    let speedY = getRandom(-1, 1);
    // 粒子颜色
    let color = colors[Math.floor(getRandom(0, colors.length))];
    return {
        radius,
        x,
        y,
        speedX,
        speedY,
        color
    }
}
// 绘制粒子函数
const draw = (particle: particle): void => {
    // const ctx = canvas.value.getContext('2d');
    ctx.value.beginPath();
    ctx.value.fillStyle = particle.color;
    ctx.value.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
    ctx.value.fill();
}
// 连线粒子函数
const link = (particle: particle): void => {
    // const ctx = canvas.value.getContext('2d');
    for (const p of particles) {
        const distance = getDistance(particle, p);
        if (distance < 150) {
            ctx.value.beginPath();
            ctx.value.lineWidth = 0.1;
            ctx.value.strokeStyle = particle.color;
            ctx.value.moveTo(particle.x, particle.y);
            ctx.value.lineTo(p.x, p.y);
            ctx.value.stroke();
        }
    }
}
// 移动粒子函数
const move = (particle: particle): void => {
    // 碰撞边界后反弹
    if (particle.x <= particle.radius || particle.x + particle.radius >= state.width) {
        particle.speedX *= -1;
    }
    if (particle.y <= particle.radius || particle.y + particle.radius >= state.height) {
        particle.speedY *= -1;
    }
    particle.x += particle.speedX;
    particle.y += particle.speedY;
}
// 粒子数组
const particles: particle[] = [];
for (let i = 0; i < 88; i++) {
    let particle = create();
    particles.push(particle);
}
// 动画
const raf = (): void => {
    step()
    // window.requestAnimationFrame(step);
}
const step = (): void => {
    // const ctx = canvas.value.getContext('2d');
    // 清空画布
    ctx.value.clearRect(0, 0, state.width, state.height);
    // 更新粒子
    for (const particle of particles) {
        move(particle);
        draw(particle);
        link(particle);
    }
    window.requestAnimationFrame(step);
}
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}

canvas {
    display: block;
}

</style>