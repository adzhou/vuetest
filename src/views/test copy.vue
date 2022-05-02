<template>
  <div>
    <div class="container">
      <!-- The input -->
      <input placeholder="Placeholder" class="container__input" />

      <!-- The label -->
      <label class="container__label">Placeholder</label>

            <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>

      <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>

    </div>

    <div class="container">
      <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>

      <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>
      <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>
      <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>
      <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>
      <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>
      <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>
      <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>
      <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>
      <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>
      <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>
      <div class="item">
        <img src="/static/icon/logo.png" alt="logo" />
      </div>
    </div>
  </div>
</template>


<script src="">
// import {getUserIP} from '../utils/ip'

export default {
  data() {
    return {
      ip: returnCitySN["cip"],
    };
  },
  methods: {},
  mounted() {
    // getUserIP((ip) => {
    //   this.ip = ip;
    // });
  },
};
</script>
<style lang="less" scoped>
// .container {
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: row;
//   justify-content: start;
//   align-items: stretch;
//   align-content: stretch;
// }
// .container:after {
//   display: block;
//   // content: " placeholder ";
//   margin: 10px;
//   flex: 999 999 auto;
// }
// .item {
//   flex: 1 0 auto;
//   margin: 10px;
// }

.container {
  position: relative;
}

/*
Show the label at desired position when the 
placeholder of input isn't shown
*/
.container__input:not(:placeholder-shown) + .container__label {
  background: #fff;
  transform: translate(0, -50%);
  opacity: 1;
}

.container__label {
  /* Position the label */
  left: 8px;
  position: absolute;
  top: 0;

  /* Hide it by default */
  opacity: 0;
  transition: all 200ms;
}
</style>