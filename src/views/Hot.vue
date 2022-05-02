<template>
  <div class="hot">
    <div class="back" @click="$router.push('/')">返回</div>
    <div class="head">热搜榜</div>
    <div class="container">
      <div class="hot-search">
        <div class="hot-search-head">一天热搜</div>
        <div class="hot-search-container">
          <div class="hot-search-item" v-for="(item, index) in dailySearchArr" :key="index">
            <div class="number">{{index+1}}</div>
            <div class="name">{{item.name}}</div>
            <div class="search-times">{{item.times}}</div>
          </div>
        </div>
      </div>
      <div class="hot-search">
        <div class="hot-search-head">一周热搜</div>
        <div class="hot-search-container">
          <div class="hot-search-item" v-for="(item, index) in weeklySearchArr" :key="index">
            <div class="number">{{index+1}}</div>
            <div class="name">{{item.name}}</div>
            <div class="search-times">{{item.times}}</div>
          </div>
        </div>
      </div>
      <div class="hot-search">
        <div class="hot-search-head">一月热搜</div>
        <div class="hot-search-container">
          <div class="hot-search-item" v-for="(item, index) in monthlySearchArr" :key="index">
            <div class="number">{{index+1}}</div>
            <div class="name">{{item.name}}</div>
            <div class="search-times">{{item.times}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dailySearchArr: [
        {name: '中国东方航空股份有限公司', times: 3748},
        {name: '香格里拉国际饭店管理有限公司', times: 2207},
        {name: '上海东铁五金有限公司', times: 1461},
        {name: '上海安尚实业有限公司', times: 901},
        {name: '上海必金灯具有限公司', times: 865},
        {name: '上海长程实业有限公司', times: 455},
        {name: '上海颖擎贸易有限公司', times: 322},
        {name: '上海激光有限公司', times: 176},
        {name: '中国东方航空股份有限公司', times: 143}
      ],
      weeklySearchArr: [
        {name: '中国东方航空股份有限公司', times: 4748},
        {name: '香格里拉国际饭店管理有限公司', times: 3207},
        {name: '上海安尚实业有限公司', times: 1561},
        {name: '上海东铁五金有限公司', times: 1001},
        {name: '上海必金灯具有限公司', times: 865},
        {name: '上海长程实业有限公司', times: 565},
        {name: '上海激光有限公司', times: 422},
        {name: '上海颖擎贸易有限公司', times: 276},
        {name: '中国东方航空股份有限公司', times: 153}
      ],
      monthlySearchArr: [
        {name: '中国东方航空股份有限公司', times: 7748},
        {name: '香格里拉国际饭店管理有限公司', times: 5207},
        {name: '上海东铁五金有限公司', times: 4561},
        {name: '上海安尚实业有限公司', times: 3001},
        {name: '上海必金灯具有限公司', times: 1865},
        {name: '上海长程实业有限公司', times: 1565},
        {name: '上海激光有限公司', times: 622},
        {name: '上海颖擎贸易有限公司', times: 476},
        {name: '中国东方航空股份有限公司', times: 353}
      ]
    }
  }
}
</script>

<style lang="less">
  .hot {
    padding: 0 500px;
    .back {
      cursor: pointer;
    }
    .head {
      width: 100%;
      height: 50px;
      margin-top: 50px;
      border: 1px solid #ccc;
      border-bottom: 1px solid #a9802e;
      padding: 14px 0 0 50px;
      font-size: 16px;
      font-weight: bold;
      background: url(/icon/fa_09.png) 20px 18px no-repeat;
      text-align: left;
    }
    .container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .hot-search {
        width: 280px;
        border: 1px solid #e0e0e0;
        .hot-search-head {
          width: 100%;
          height: 80px;
          line-height: 80px;
          font-size: 18px;
          font-weight: bold;
          position: relative;
          border-bottom: 1px solid #e0e0e0;
          background: #f9f9f9 url(/static/icon/a1.png) 20px 20px no-repeat;
          text-align: center;
        }
        .hot-search-container {
          .hot-search-item {
            display: flex;
            align-items: center;
            height: 50px;
            font-size: 16px;
            .number, .name, .search-times {
              height: 21px;
              line-height: 21px;

            }
            .number {
              width: 30px;
              text-align: center;
            }
            .name {
              width: 182px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              margin-left: 10px;
              text-align: left;
            }
            .search-times {
              flex: 1;
              text-align: right;
              color: #c94207;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
</style>
