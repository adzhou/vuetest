<template>
  <div class="rank">
    <div class="back" @click="$router.push('/')">返回</div>
    <div class="head">网站分类</div>
    <div class="categories">
      <div class="category"  @click="changeCategory('A类网站')">A类网站</div>
      <div class="category"  @click="changeCategory('B类网站')">B类网站</div>
      <div class="category"  @click="changeCategory('C类网站')">C类网站</div>
      <div class="category"  @click="changeCategory('D类网站')">D类网站</div>
    </div>
    <div class="content-container">
      <div class="site-item" v-for="(item, index) in siteArr" :key="index" :class="item.color" @click="goto(item.url)">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      siteArr:[],
      siteArrs: [
        {name: 'bilibili',category:'A类网站', url: 'https://www.bilibili.com', color: 'blue'},
        {name: '虎牙', category:'B类网站',url: 'https://www.huya.com', color: 'orange'},
        {name: '斗鱼', category:'C类网站',url: 'https://www.douyu.com', color: 'green'},
        {name: 'CSDN', category:'D类网站',url: 'https://www.csdn.com', color: 'purple'},
      ]
    }
  },
  methods: {
    goto(url) {
      window.open(url)
    },
    changeCategory(category) {
      this.siteArr = [];
      console.log(category);
      for(var index in this.siteArrs){
         var arr = this.siteArrs[index]
         console.log(JSON.stringify(arr));
         if(arr.category===category){
           console.log(category);
           this.siteArr.push(arr);
         }
      }
    }
  }
}
</script>

<style lang="less">
  .rank {
    // padding: 0 500px;
    .back {
      cursor: pointer;
    }
    .blue {
      background: #4e72b8;
    }
    .orange {
      background: #faa755;
    }
    .green {
      background: #00ae9d;
    }
    .purple {
      background: #694d9f;
    }
    .head {

    }
    .categories {
      display: flex;
      .category {
        flex: 1;
        background: #ccc;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
      .checked {
        background: #eee;
      }
    }
    .content-container {
      display: flex;
      flex-wrap: wrap;
      & .site-item {
        width: 230px;
        height: 130px;
        line-height: 130px;
        margin-bottom: 5px;
        cursor: pointer;
      }
    }
  }
</style>
