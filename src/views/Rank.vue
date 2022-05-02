<template>
  <div class="rank">
    <div class="back" @click="$router.push('/')">返回</div>
    <div class="head">网站分类</div>
    <div class="categories">
      <div class="category" :class="{checked: index === 0}" @click="changeIndex(0)">A类网站</div>
      <div class="category" :class="{checked: index === 1}" @click="changeIndex(1)">B类网站</div>
      <div class="category" :class="{checked: index === 2}" @click="changeIndex(2)">C类网站</div>
      <div class="category" :class="{checked: index === 3}" @click="changeIndex(3)">D类网站</div>
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
      index: 0,
      siteArr: [
        {name: 'bilibili', url: 'https://www.bilibili.com', color: 'blue'},
        {name: '虎牙', url: 'https://www.huya.com', color: 'orange'},
        {name: '斗鱼', url: 'https://www.douyu.com', color: 'green'},
        {name: 'CSDN', url: 'https://www.csdn.com', color: 'purple'},
        {name: '知乎', url: 'https://www.zhihu.com', color: 'blue'},
      ],
      siteArrs: [
        [
          {name: 'bilibili', url: 'https://www.bilibili.com', color: 'blue'},
          {name: '虎牙', url: 'https://www.huya.com', color: 'orange'},
          {name: '斗鱼', url: 'https://www.douyu.com', color: 'green'},
          {name: 'CSDN', url: 'https://www.csdn.com', color: 'purple'},
          {name: '知乎', url: 'https://www.zhihu.com', color: 'blue'},
        ],
        [
          {name: 'github', url: 'https://github.com/', color: 'blue'},
          {name: 'gitee', url: 'https://gitee.com/', color: 'orange'},
          {name: '掘金', url: 'https://juejin.cn/', color: 'green'},
          {name: '博客园', url: 'https://www.cnblogs.com/', color: 'purple'},
          {name: '知乎', url: 'https://www.zhihu.com', color: 'blue'},
        ],
        [
          {name: 'bilibili', url: 'https://www.bilibili.com', color: 'blue'},
          {name: '虎牙', url: 'https://www.huya.com', color: 'orange'},
          {name: '掘金', url: 'https://juejin.cn/', color: 'green'},
          {name: 'CSDN', url: 'https://www.csdn.com', color: 'purple'},
          {name: '知乎', url: 'https://www.zhihu.com', color: 'blue'},
        ],
        [
          {name: 'bilibili', url: 'https://www.bilibili.com', color: 'blue'},
          {name: '虎牙', url: 'https://www.huya.com', color: 'orange'},
          {name: '博客园', url: 'https://www.cnblogs.com/', color: 'green'},
          {name: 'CSDN', url: 'https://www.csdn.com', color: 'purple'},
          {name: '知乎', url: 'https://www.zhihu.com', color: 'blue'},
        ],
      ]
    }
  },
  methods: {
    goto(url) {
      window.open(url)
    },
    changeIndex(newIndex) {
      this.index = newIndex
      this.siteArr = this.siteArrs[newIndex]
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
