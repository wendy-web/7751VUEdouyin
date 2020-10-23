<template>
  <div>
      <div>
      <van-nav-bar title="推广海报" left-text left-arrow @click-left="onClickLeft" />
    </div>
    <div class="poster">
          <img src="../../assets/logo1.png" alt />
    </div>
  </div>
</template>

<script>
export default {
methods: {
    onClickLeft() {
     this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.poster{
    width: 100%;
    margin-top: 20px;
}
.poster img{
    max-width: 100%;
}
</style>

