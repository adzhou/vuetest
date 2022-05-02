<template>
  <div class="witem" @click="clickHere(boxItem.url)" >
    <img class="imgLeft" :src="boxItem.namepic" />
    <span class="title" >{{
      boxItem.name
    }}</span>
    <el-tooltip
      class="item_tips"
      effect="dark"
      :content="boxItem.tips"
      placement="right-start"
    >
    <img class="imgRight" :src="boxItem.tipspic" />
    <!-- <img class="imgRightCross" src="boxItem.tipspic" /> -->
    <!-- <v-icon name="LaWindowCloseSolid"></v-icon> -->
    <svg aria-hidden="true" width="10.08" height="10.08" viewBox="0 0 32 32" fill="#222F3D" class="ov-icon" style="font-size:2.88em;" data-v-5862ef01=""><path d="M5 5v22h22V5zm2 2h18v18H7zm4.688 3.313l-1.407 1.406L14.562 16l-4.343 4.344 1.406 1.406 4.344-4.344 4.312 4.313 1.407-1.407L17.375 16l4.25-4.25-1.406-1.406-4.25 4.25z"></path></svg>
    </el-tooltip>
  </div>
</template>

<script>


export default {
  name: "witem",

  props: {
    boxItem: {
      type: Object,
      required: false,
      default: () => [
        {
          id: 1,
          name: "xxxxx",
          namepic: "/static/icon/a1.png",
          tips: "东方财富是财经网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "http://www.eastmoney.com",
        },
      ],
    },
  },
  components: {},
  data() {
    return {
            //public文件夹路径
      publicPath: process.env.BASE_URL,
      // imgLeft: require("@/assets/logo.png"),
      // imgRight: require("@/assets/logo.png"),
      // title: "这是测试Item",
      // tips: "我是tips,我是tips我是tips我是tips我是tips我是tips我是tips我是tips",
    };
  },
  methods: {
    clickHere: function (param) {
      console.log("参数：");
      console.log(param);
      javascript: window.open(param);
    },
  },
};
</script>

<style lang="less" scoped>
.witem {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: center;
  justify-content: space-between;

  color: #c00824;
  background-color: rgb(233, 238, 242);
  border-color: #c00824;
  padding-left: 2px; //这个很关键, 否则, 按钮不会缩小
  padding-right: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
  margin: 1px;
  // border-style: solid dashed;
  // padding: 0px 0px 0px 0px;
  border-style: dotted;

  border-width: thin;

  &:hover {
    color: rgb(240, 248, 255);
    background-color: #f6e7e7;
    border-color: #7e0606;
  }
  &:active {
    color: rgb(240, 248, 255);
    background-color: #7e0606;
    border-color: #7e0606;
  }
  span {
    color: #000000;
    font-size: 12px;
    font-family: LiSu;
    flex-shrink: 1;
  }
}

.imgLeft {
  width: 20px;
  height: 20px;
}
.title {
  font-family: LiSu;
  font-size: 16px;
}
.item_tips {
  font-family: LiSu;
  font-size: 12px;
}
.imgRight {
  width: 10px;
  height: 10px;
}
</style>

<style lang="less">
//箭头
.el-tooltip__popper {
  margin: 0px 0px 0px 0px;
  padding: 4px 0px 4px 8px;

  width: 100px;
  height: auto;
  font-family: LiSu;
  font-size: 8px;
  background: rgba(0, 0, 0, 0.65) !important;
}
//箭头
.el-tooltip__popper[x-placement^="bottom"] .popper__arrow:after {
  border-bottom-color: rgb(94, 5, 5) !important;
}
.el-tooltip__popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: rgb(94, 5, 5) !important;
}
</style>


