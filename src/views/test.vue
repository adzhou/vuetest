<template>
  <div class="container">
    <div v-for="(tagItem, index) in items" :key="index">
      <div class="box">
        <div class="box_header">
          <img :src="'../..' + tagItem.tagpic" alt="logo" />
          <span class="box_header_span">
            {{ tagItem.tag }}/{{ tagItem.tagext }}
          </span>
        </div>
        <div class="box_body">
          <div v-for="(boxItem, index) in tagItem.boxItems" :key="index">
            <div class="item" v-if="index < 6">
              <witem :boxItem="boxItem"></witem>
            </div>
            <div class="item" v-if="tagItem.showMore" else>
              <witem :boxItem="boxItem"></witem>
            </div>
          </div>
          <div
            class="item_more"
            @click="expandMore(tagItem)"
            v-if="tagItem.boxItems.length > 6"
          >
            <span>{{ tagItem.tagItemLabel }}</span>
          </div>
        </div>

        <!-- <div class="item">
            <el-button class="icon" type="primary" icon="el-icon-edit"
              >更多</el-button
            >
          </div> -->
      </div>
    </div>
  </div>
</template>


<script src="">
import witem from "./witem";

export default {
  name: "blocks",
  components: { witem },
  data() {
    return {
      //public文件夹路径
      publicPath: process.env.BASE_URL,
      ip: returnCitySN["cip"],

      tagItems: [
        {
          tag: "经济",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 0,
          showMore: false,
        },
        {
          tag: "新闻",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 10,
          showMore: false,
        },
        {
          tag: "财经",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 30,
          showMore: false,
        },
        {
          tag: "工具",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 12,
          showMore: false,
        },
        {
          tag: "分类1",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 1,
          showMore: false,
        },
        {
          tag: "分类2",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 1,
          showMore: false,
        },
        {
          tag: "分类3",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 1,
          showMore: false,
        },
        {
          tag: "分类4",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 1,
          showMore: false,
        },
        {
          tag: "分类5",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 1,
          showMore: false,
        },
        {
          tag: "分类6",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 1,
          showMore: false,
        },
        {
          tag: "分类7",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 1,
          showMore: false,
        },
        {
          tag: "分类8",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 1,
          showMore: false,
        },
        {
          tag: "分类9",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 1,
          showMore: false,
        },
        {
          tag: "分类10",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 1,
          showMore: false,
        },
        {
          tag: "分类11",
          tagext: "打折活动",
          tagpic: "/static/icon/logo.png",
          itemcount: 1,
          showMore: false,
        },
      ],
      boxItems: [
        {
          id: 1,
          name: "东方财富",
          namepic: "/static/icon/a1.png",
          tips: "东方财富是财经网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "http://www.eastmoney.com",
        },
        {
          id: 2,
          name: "百度",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "工具",
          url: "http://www.baidu.com",
        },
        {
          id: 3,
          name: "Bing",
          namepic: "/static/icon/a1.png",
          tips: "Bing是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "工具",
          url: "www.bing.com",
        },
        {
          id: 4,
          name: "网易",
          namepic: "/static/icon/a1.png",
          tips: "网易是新闻网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "新闻",
          url: "163.com",
        },
        {
          id: 5,
          name: "新浪",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "新闻",
          url: "https://sina.com",
        },
        {
          id: 6,
          name: "同花顺",
          namepic: "/static/icon/a1.png",
          tips: "同花顺是财经网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.10jqka.com.cn",
        },
        {
          id: 7,
          name: "雪球",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "http://www.xueqiu.com",
        },
        {
          id: 8,
          name: "通达信",
          namepic: "/static/icon/a1.png",
          tips: "通达信是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.tdx.com.cn/",
        },
        {
          id: 9,
          name: "财经网",
          namepic: "/static/icon/a1.png",
          tips: "网易是新闻网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "CAIJING.COM.CN",
        },
        {
          id: 10,
          name: "凤凰财经",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.ifeng.com/",
        },
        {
          id: 11,
          name: "东方财富",
          namepic: "/static/icon/a1.png",
          tips: "东方财富是财经网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "http://www.eastmoney.com",
        },
        {
          id: 12,
          name: "百度",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "工具",
          url: "http://www.baidu.com",
        },
        {
          id: 13,
          name: "Bing",
          namepic: "/static/icon/a1.png",
          tips: "Bing是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "工具",
          url: "www.bing.com",
        },
        {
          id: 14,
          name: "网易",
          namepic: "/static/icon/a1.png",
          tips: "网易是新闻网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "新闻",
          url: "163.com",
        },
        {
          id: 15,
          name: "新浪",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "新闻",
          url: "https://sina.com",
        },
        {
          id: 16,
          name: "同花顺",
          namepic: "/static/icon/a1.png",
          tips: "同花顺是财经网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.10jqka.com.cn",
        },
        {
          id: 17,
          name: "雪球",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "http://www.xueqiu.com",
        },
        {
          id: 18,
          name: "通达信",
          namepic: "/static/icon/a1.png",
          tips: "通达信是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.tdx.com.cn/",
        },
        {
          id: 19,
          name: "财经网",
          namepic: "/static/icon/a1.png",
          tips: "网易是新闻网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "CAIJING.COM.CN",
        },
        {
          id: 20,
          name: "凤凰财经",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.ifeng.com/",
        },
        {
          id: 1,
          name: "东方财富",
          namepic: "/static/icon/a1.png",
          tips: "东方财富是财经网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "http://www.eastmoney.com",
        },
        {
          id: 21,
          name: "百度",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "工具",
          url: "http://www.baidu.com",
        },
        {
          id: 22,
          name: "百度",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "工具",
          url: "http://www.baidu.com",
        },
        {
          id: 23,
          name: "Bing",
          namepic: "/static/icon/a1.png",
          tips: "Bing是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "工具",
          url: "www.bing.com",
        },
        {
          id: 24,
          name: "网易",
          namepic: "/static/icon/a1.png",
          tips: "网易是新闻网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "新闻",
          url: "163.com",
        },
        {
          id: 25,
          name: "新浪",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "新闻",
          url: "https://sina.com",
        },
        {
          id: 26,
          name: "同花顺",
          namepic: "/static/icon/a1.png",
          tips: "同花顺是财经网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.10jqka.com.cn",
        },
        {
          id: 27,
          name: "雪球",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "http://www.xueqiu.com",
        },
        {
          id: 28,
          name: "通达信",
          namepic: "/static/icon/a1.png",
          tips: "通达信是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.tdx.com.cn/",
        },
        {
          id: 29,
          name: "财经网",
          namepic: "/static/icon/a1.png",
          tips: "网易是新闻网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "CAIJING.COM.CN",
        },
        {
          id: 30,
          name: "凤凰财经",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.ifeng.com/",
        },
        {
          id: 1,
          name: "东方财富",
          namepic: "/static/icon/a1.png",
          tips: "东方财富是财经网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "http://www.eastmoney.com",
        },
        {
          id: 31,
          name: "百度",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "工具",
          url: "http://www.baidu.com",
        },
        {
          id: 32,
          name: "百度",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "工具",
          url: "http://www.baidu.com",
        },
        {
          id: 33,
          name: "Bing",
          namepic: "/static/icon/a1.png",
          tips: "Bing是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "工具",
          url: "www.bing.com",
        },
        {
          id: 34,
          name: "网易",
          namepic: "/static/icon/a1.png",
          tips: "网易是新闻网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "新闻",
          url: "163.com",
        },
        {
          id: 35,
          name: "新浪",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "新闻",
          url: "https://sina.com",
        },
        {
          id: 36,
          name: "同花顺",
          namepic: "/static/icon/a1.png",
          tips: "同花顺是财经网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.10jqka.com.cn",
        },
        {
          id: 37,
          name: "雪球",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "http://www.xueqiu.com",
        },
        {
          id: 38,
          name: "通达信",
          namepic: "/static/icon/a1.png",
          tips: "通达信是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.tdx.com.cn/",
        },
        {
          id: 39,
          name: "财经网",
          namepic: "/static/icon/a1.png",
          tips: "网易是新闻网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "CAIJING.COM.CN",
        },
        {
          id: 40,
          name: "凤凰财经",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.ifeng.com/",
        },
        {
          id: 41,
          name: "东方财富",
          namepic: "/static/icon/a1.png",
          tips: "东方财富是财经网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "http://www.eastmoney.com",
        },
        {
          id: 42,
          name: "百度",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "工具",
          url: "http://www.baidu.com",
        },
        {
          id: 43,
          name: "Bing",
          namepic: "/static/icon/a1.png",
          tips: "Bing是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "工具",
          url: "www.bing.com",
        },
        {
          id: 44,
          name: "网易",
          namepic: "/static/icon/a1.png",
          tips: "网易是新闻网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "新闻",
          url: "163.com",
        },
        {
          id: 45,
          name: "新浪",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "新闻",
          url: "https://sina.com",
        },
        {
          id: 46,
          name: "同花顺",
          namepic: "/static/icon/a1.png",
          tips: "同花顺是财经网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.10jqka.com.cn",
        },
        {
          id: 47,
          name: "雪球",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "http://www.xueqiu.com",
        },
        {
          id: 48,
          name: "通达信",
          namepic: "/static/icon/a1.png",
          tips: "通达信是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.tdx.com.cn/",
        },
        {
          id: 49,
          name: "财经网",
          namepic: "/static/icon/a1.png",
          tips: "网易是新闻网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "CAIJING.COM.CN",
        },
        {
          id: 50,
          name: "凤凰财经",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "财经",
          url: "https://www.ifeng.com/",
        },
        {
          id: 51,
          name: "东方财富",
          namepic: "/static/icon/a1.png",
          tips: "东方财富是财经网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "分类1",
          url: "http://www.eastmoney.com",
        },
        {
          id: 52,
          name: "百度",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "分类2",
          url: "http://www.baidu.com",
        },
        {
          id: 53,
          name: "Bing",
          namepic: "/static/icon/a1.png",
          tips: "Bing是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "分类3",
          url: "www.bing.com",
        },
        {
          id: 54,
          name: "网易",
          namepic: "/static/icon/a1.png",
          tips: "网易是新闻网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "分类4",
          url: "163.com",
        },
        {
          id: 55,
          name: "新浪",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "分类5",
          url: "https://sina.com",
        },
        {
          id: 56,
          name: "同花顺",
          namepic: "/static/icon/a1.png",
          tips: "同花顺是财经网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "分类6",
          url: "https://www.10jqka.com.cn",
        },
        {
          id: 57,
          name: "雪球",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "分类7",
          url: "http://www.xueqiu.com",
        },
        {
          id: 58,
          name: "通达信",
          namepic: "/static/icon/a1.png",
          tips: "通达信是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "分类8",
          url: "https://www.tdx.com.cn/",
        },
        {
          id: 59,
          name: "财经网",
          namepic: "/static/icon/a1.png",
          tips: "网易是新闻网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "分类9",
          url: "CAIJING.COM.CN",
        },
        {
          id: 60,
          name: "凤凰财经",
          namepic: "/static/icon/a1.png",
          tips: "百度是搜索网站!",
          tipspic: "/static/icon/fa_09.png",
          tag: "分类10",
          url: "https://www.ifeng.com/",
        },
      ],
    };
  },

  computed: {
    items: {
      get() {
        var items = [];
        var item = {};
        let me = this;
        me.tagItems.forEach(function (tagItem) {
          item = tagItem;
          item["boxItems"] = [];
          item["tagItemLabel"] = "更多..";
          item["showMore"] = false;

          me.boxItems.forEach(function (boxItem) {
            if (boxItem.tag == tagItem.tag) {
              item.boxItems.push(boxItem);
            }
          });
          if (item.boxItems.length > 0) {
            items.push(item);
          }
        });
        return items;
      },
    },
  },
  // watch: {
  //   'tagItems': {
  //     handler(newValue, oldValue) {
  //       // for (let i = 0; i < newValue.length; i++) {
  //       //   if (oldValue[i].showMore != newValue[i].showMore) {
  //       //     console.log(newValue);
  //       //   }
  //       // }
  //     },
  //     deep: true,
  //     // 立即，页面加载就执行一次
  //     immediate: true,
  //   },
  // },
  methods: {
    expandMore(tagItem) {
      if (tagItem.showMore == false) {
        tagItem.showMore = true;
        tagItem.tagItemLabel = "叠起..";
      } else {
        tagItem.showMore = false;
        tagItem.tagItemLabel = "更多..";
      }

      var x = 1;
      var y = 1000;
      var i=0;
      while (i++<100000000 ) {
        var a = Math.round(Math.random() * (y - x) + x);
        var b = Math.round(Math.random() * (y - x) + x);
        var c = a = Math.round(Math.random() * (y - x) + x);

        if (a / (b + c) + b / (a + c) + c / (a + b) == 4) {
          console.log(a + "OKOKOK" + b + "OKOKOKOK" + c);
          break;
        }

      }
    console.log("*********************");
    },
  },
  mounted() {
    // getUserIP((ip) => {
    //   this.ip = ip;
    // });
  },
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: rgb(255, 255, 255);

  width: 118 * 2px;
  height: auto;

  margin: 3px 3px 3px 3px;
  // box-shadow: 5px 10px #888888;
  .box_header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    // justify-content: space-around;

    width: 100%;
    height: auto;

    border-color: rgb(150, 3, 3);
    border-style: solid;
    border-width: 1px 1px 0px 8px;

    margin: 0px;
    padding: 0px;
    img {
      float: left;
      // padding-left:5px;
      margin-left: 5px;
      padding: 0px;
      margin-top: 5px;
      margin-bottom: 0px;
      width: 20px;
      height: 20px;
    }
    .box_header_span {
      // margin-top:0px;
      color: #7e0606;
      font-size: 20px;
      font-family: LiSu;
    }
  }
  .box_body {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: stretch;
    // align-content: stretch;

    border-style: solid dashed;
    border-width: 1px 1px 1px 1px;
    // border-block-width: thick;
    border-radius: 5px;

    height: 90%;
    width: 100%;
    .item {
      display: inline-block;
      // padding:0px;
      // margin:0px;

      padding-left: 4px;
      margin-left: 4px;
      padding-top: 3px;
      margin-top: 3px;
      width: 100px;
      height: 40px;
    }
    .item_more {
      cursor: pointer;
      background-color: #470303;
      color: white;
      padding-left: 3px;
      margin: 5px;
      width: 50px;
      height: 20px;
      display: inline-block;
      border-radius: 5px;

      font-family: lisu;
      font-size: 10px;
      box-shadow: rgba(255, 137, 137, 0.5) 1px 1px 1px;
    }
  }
}
</style>