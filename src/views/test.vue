<template>
  <div class="container">
    <div v-for="(tagItem, index) in items" :key="index">
      <div class="box" ref="box" :style="'width:' + tagItem.boxWidth">
        <div class="box_header">
          <img :src="'../..' + tagItem.tagpic" alt="logo" />
          <span class="box_header_span">
            {{ tagItem.tag }}/{{ tagItem.tagext }}
          </span>
        </div>
        <div class="box_body">
          <div v-for="(boxItem, index) in tagItem.boxItems" :key="index">
            <div
              class="item"
              v-if="index < 6"
              :style="'width:' + tagItem.maxItemWidth"
            >
              <witem :boxItem="boxItem" :tagItem="tagItem"></witem>
            </div>
            <div
              class="item"
              :style="'width:' + tagItem.maxItemWidth"
              v-if="tagItem.showMore"
              else
            >
              <witem :boxItem="boxItem" :tagItem="tagItem"></witem>
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
      </div>
    </div>

    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="Title"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.importance"
        placeholder="Imp"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option
          v-for="item in importanceOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="listQuery.type"
        placeholder="Type"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name + '(' + item.key + ')'"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        Search
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        Add
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        Export
      </el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left: 15px"
        @change="tableKey = tableKey + 1"
      >
        reviewer
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.timestamp | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" min-width="150px">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.title
          }}</span>
          <el-tag>{{ row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showReviewer"
        label="Reviewer"
        width="110px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span style="color: red">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Imp" width="80px">
        <template slot-scope="{ row }">
          <svg-icon
            v-for="n in +row.importance"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />
        </template>
      </el-table-column>
      <el-table-column label="Readings" align="center" width="95">
        <template slot-scope="{ row }">
          <span
            v-if="row.pageviews"
            class="link-type"
            @click="handleFetchPv(row.pageviews)"
            >{{ row.pageviews }}</span
          >
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" class-name="status-col" width="100">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button
            v-if="row.status != 'published'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 'published')"
          >
            Publish
          </el-button>
          <el-button
            v-if="row.status != 'draft'"
            size="mini"
            @click="handleModifyStatus(row, 'draft')"
          >
            Draft
          </el-button>
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="Type" prop="type">
          <el-select
            v-model="temp.type"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker
            v-model="temp.timestamp"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select
            v-model="temp.status"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top: 8px"
          />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> Cancel </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>

    <el-tooltip placement="top" content="tooltip">
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="50"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>


<script src="">
import witem from "./witem";
import BackToTop from "@/components/BackToTop";

import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle,
} from "@/api/article";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "blocks",
  components: { witem, BackToTop, Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
  },
  data() {
    return {
      //public文件夹路径
      publicPath: process.env.BASE_URL,
      ip: returnCitySN["cip"],

      // customizable button style, show/hide critical point, return position
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: "#e7eaf1", // 按钮的背景颜色 The background color of the button
      },

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
          url: "http://www.bing.com",
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

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" },
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" },
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change",
          },
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" },
        ],
      },
      downloadLoading: false,
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
          var boxWidth = 0;
          var maxItemWidth = 0;
          if (item.boxItems.length > 0) {
            items.push(item);

            //find each tagitem's boxwidth and maxItemWidth
            for (var i = 0; i < item.boxItems.length; i++) {
              if (me.strLen(item.boxItems[i].name) > maxItemWidth)
                maxItemWidth = me.strLen(item.boxItems[i].name);
              console.log("xxxxxxxxxxxxxxx");
              if (i + 1 >= item.boxItems.length) {
                var newLen = me.strLen(item.boxItems[i].name);
                if (newLen > boxWidth) boxWidth = newLen;
                break;
              } else {
                var newLen =
                  me.strLen(item.boxItems[i].name) +
                  me.strLen(item.boxItems[i + 1].name);
                if (newLen > boxWidth) boxWidth = newLen;
              }
            }
          }
          var _boxWidth = boxWidth * 17 + 35;
          if (_boxWidth < 200) _boxWidth = 200;
          item["boxWidth"] = _boxWidth + "px"; //px
          item["maxItemWidth"] = maxItemWidth * 15 + 28 + "px";
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
    created() {
      this.getList();
    },
    strLen(str) {
      var len = 0;
      for (var i = 0; i < str.length; i++) {
        var a = str.charAt(i);
        //使用的正则表达式
        if (a.match(/[^\x00-\xff]/gi) != null) {
          len += 2;
        } else {
          len += 1;
        }
      }
      return len;
    },
    expandMore(tagItem) {
      if (tagItem.showMore == false) {
        tagItem.showMore = true;
        tagItem.tagItemLabel = "叠起..";
      } else {
        tagItem.showMore = false;
        tagItem.tagItemLabel = "更多..";
      }
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success",
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: "",
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Update Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleDelete(row, index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000,
      });
      this.list.splice(index, 1);
    },
    handleFetchPv(pv) {
      fetchPv(pv).then((response) => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
  mounted() {},
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

  width: auto;
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
      width: auto;
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