<template>
    <div class="div-class">测试</div>
</template>
<style lang="scss" scoped>
    .div-class {
        width: 100px;
        height: 100px;
        border: 1px solid red;
        position:relative;
    }

    .div-class:hover::after{
        position:absolute;
        display: block;
        content: 'test';
        background-color: blue;
        z-index: 100;
        left: 100px;
        top: 100px;
    }
</style>