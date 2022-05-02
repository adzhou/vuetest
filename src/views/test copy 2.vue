<template>
  <div class="index">
    <div class="message-board-form-wrapper">
      <Divider></Divider>
      <Form :model="msgObj" :label-width="80">
        <FormItem label="用户名：">
            <Input v-model="msgObj.username" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="email：">
            <Input v-model="msgObj.email" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="发布信息：">
            <Input v-model="msgObj.message" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请说。。。"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="addMsgBoard">提交</Button>
            <!-- <Button style="margin-left: 8px">取消</Button> -->
        </FormItem>
      </Form>
    </div>

    <div class="message-board-list-wrapper">
          <Divider>内容如下：</Divider>
      <div class="message-board-wrapper"  v-for="(item,index) in reverseMsgs" :key="index">
        <div class="header-wrapper">
          <div class="user-email">{{item.email}}</div>
          <div class="operation-wrapper">
            <Button type="primary" style="display:none" class="operate-btn" @click="modifyMsgBoard(item)">edit</Button>
            <Button type="error" style="display:none" class="operate-btn" @click="confirmDeleteMsgBoard(item)">delete</Button>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="user-message">{{item.message}}</div>
          <div class="user-name">{{item.username}}</div>
          <div class="write-date">{{item.create_time}}</div>
        </div>
      </div>
    </div>


    <Modal
        v-model="modifyMsgBoardDialog"
        title="edit message board"
        @on-ok="confirmModifyMsgBoard">
        <Form :model="modifyMsgBoardObj" :label-width="80">
            <FormItem label="username">
                <Input v-model="modifyMsgBoardObj.username" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="email">
                <Input v-model="modifyMsgBoardObj.email" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <FormItem label="message">
                <Input v-model="modifyMsgBoardObj.message" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";



<script type="text/javascript">  
document.write(returnCitySN["cip"]+','+returnCitySN["cname"])  
</script>


export default {
  name: "test",
  data() {
    return {
      msgBoardList: [],
      msgObj: {
        username: "",
        email: "",
        message: "",
        create_time:""
      },
      modifyMsgBoardDialog: false,
      modifyMsgBoardObj: {
        username: "",
        email: "",
        message: ""
      }
    };
  },
  computed: {
        reverseMsgs() {
            return this.msgBoardList.reverse();
        }
  },
  methods: {
    ...mapActions({
      _getMsgBoardList: "getMsgBoardList",
      _addMsgBoard: "addMsgBoard",
      _modifyMsgBoard: "modifyMsgBoard",
      _deleteMsgBoard: "deleteMsgBoard",
    }),
    async getMsgBoardList() {
      const res = await this._getMsgBoardList();
      if (res.code == 0) {
        for(var item of res.data) {
          item.create_time= new Date(item.create_time).toLocaleString();
          this.msgBoardList.push(item);
        }
        this.msgBoardList=res.data;
        
      } else {
        this.$Message.error(res.msg);
      }
    },
    async addMsgBoard() {
      const res = await this._addMsgBoard({
        username: this.msgObj.username,
        email: this.msgObj.email,
        message: this.msgObj.message
      });
      if (res.code == 0) {
        this.$Message.success("留言成功");
        this.msgObj.username = "";
        this.msgObj.email = "";
        this.msgObj.message = "";
        this.getMsgBoardList();
      } else {
        this.$Message.error(res.msg);
      }
    },
    confirmDeleteMsgBoard(msgboard_info) {
      this.$Modal.confirm({
        title: "确定要删除",
        onOk: () => {
          this.deleteMsgBoard(msgboard_info.id);
        }
      });
    },
    async deleteMsgBoard(id) {
      const res = await this._deleteMsgBoard({
        id: id
      });
      if (res.code == 0) {
        this.$Message.success("删除成功");
        this.getMsgBoardList();
      } else {
        this.$Message.error(res.msg);
      }
    },
    modifyMsgBoard(msgboard_info) {
      this.modifyMsgBoardDialog = true;
      this.modifyMsgBoardObj.id = msgboard_info.id;
      this.modifyMsgBoardObj.username = msgboard_info.username;
      this.modifyMsgBoardObj.email = msgboard_info.email;
      this.modifyMsgBoardObj.message = msgboard_info.message;
    },
    async confirmModifyMsgBoard() {
      const res = await this._modifyMsgBoard({
        id: this.modifyMsgBoardObj.id,
        username: this.modifyMsgBoardObj.username,
        email: this.modifyMsgBoardObj.email,
        message: this.modifyMsgBoardObj.message
      });
      if (res.code == 0) {
        this.modifyMsgBoardDialog = false;
        this.$Message.success("修改成功");
        this.getMsgBoardList();
      } else {
        this.$Message.error(res.msg);
      }
    }
  },
  mounted() {
    this.getMsgBoardList();
  }
};
</script>

<style lang='less'>



.index {

  width: 800px;

  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  .message-board-list-wrapper {
    flex: 1;
    padding-right: 2px;
    // overflow-y: scroll;
    max-height: 400px;
    .message-board-wrapper {
      border: 1px solid #e8eaec;
      border-radius: 2px;
      padding: 2px;
      margin-bottom: 2px;
      .header-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-email {
          height: 20px;
          line-height: 20px;
          border-bottom: 1px solid #e8eaec;
          font-size: 12px;
                font-family: 隶书;
          font-weight: 600;
        }
      }
      .content-wrapper {
        .user-message {
          color: #975a84;
          font-size: 14px;
                font-family: 隶书;
          padding: 2px 0;
        }
        .user-name {
          text-align: right;
          font-size: 12px;
                font-family: 隶书;
          font-weight: 600;
        }
        .write-date {
          text-align: right;
          font-size: 12px;
                font-family: 隶书;
          font-weight: 600;
        }
      }
    }
  }
  .message-board-form-wrapper {
    height: auto;
    .ivu-form .ivu-form-item-label {
      font-size: 16px;
      font-family: 隶书;
      text-align: right;
      padding:10px 0px 10px 0px ;
      // margin :0px 0px 0px 0px;
    }
    .ivu-input {
      font-size: 14px; 
    }
  }
}
</style>
