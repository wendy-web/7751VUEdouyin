<template>
  <div>
    <div class="pageTop">
        <button v-if="$route.meta.isBack" @click="back" class="back">
          <span></span>
          &#x3000;&#x3000;
        </button>
        {{$route.meta.name}}
      <div class="right_Link">
        <router-link
          v-if="$route.meta.isLink"
          :to="$route.meta.routerLink"
        >{{$route.meta.routerName}}</router-link>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "pageTop",
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.pageTop {
  position: relative;
  width: 100%;
  background: #DADEEA;
  color: black;
  font-size: 16px;
  z-index: 11;
  text-align: center;
  line-height: 1.2rem;
  .back {
    position: absolute;
    left: 0;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    height: 1rem;
    padding: 0 20px;
    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-width: 2px 0 0 2px;
      border-style: solid;
      border-color: #494949;
      transform: rotate(-45deg);
    }
  }
}
.right_Link{
  color: #000;
  position: absolute;
  right: 5px;
  top: 0;
  a{
    color: #000;
  }
}
</style>