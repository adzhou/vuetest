<template>
  <div class="witem"  v-if="isShow">
    <img class="imgLeft" :src="boxItem.namepic" @click="clickHere(boxItem.url)" />
    <span class="title" @click="clickHere(boxItem.url)">{{ boxItem.name }}</span>
    <el-tooltip
      class="item_tips"
      effect="dark"
      :content="boxItem.tips"
      placement="right-start"
    >
      <img class="imgRight" :src="boxItem.tipspic" @click="clickHere(boxItem.url)" />
    </el-tooltip>
    <svg
      @click="removeItem()"
      aria-hidden="true"
      width="20.08"
      height="20.08"
      viewBox="0 0 32 32"
      fill="#222F3D"
      class="ov-icon"
      style="font-size: 2.88em"
      data-v-5862ef01=""
    >
      <path
        d="M5 5v22h22V5zm2 2h18v18H7zm4.688 3.313l-1.407 1.406L14.562 16l-4.343 4.344 1.406 1.406 4.344-4.344 4.312 4.313 1.407-1.407L17.375 16l4.25-4.25-1.406-1.406-4.25 4.25z"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "witem",


  props: {
    tagItem: {
        type: Object,
        required: false,
        default: () => ({})
    },
    boxItem: {
      type: Object,
      required: false,
      default: () => ({
       
      }),
    },
  },
  components: {},
  data() {
    return {

      isShow:true,
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
    removeItem() {
      //       console.log( this.tagItem);
      //       console.log( this.boxItem);
            
      // this.tagItem.boxItems.forEach((item, index) => {
      //   if (item.id === this.boxItem.id) {
      //     this.tagItem.boxItems.splice(index, 1);
      //   }
      // });
      // console.log( this.tagItem);
      // 修改数据，然后提交到数据库
      this.isShow=false;
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
    flex-wrap: nowrap;
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
// .title {
//   font-family: LiSu;
//   font-size: 16px;
// }
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


