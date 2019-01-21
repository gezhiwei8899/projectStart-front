<template>
  <div class="col-sm-12 col-md-6">
    <h2>年假计算</h2>
    <div class="nianjia">
      一年按照366天计算，每30.5天加1.25天年假，每一年半清零上一年年假数据
    </div>
    <div>
      <div class="form-group artifactid-form-group">
        <label class="control-label">入职时间： </label>
        <v-date-picker v-model="entryTime" style="width:200px;display:inline-block" ></v-date-picker>
      </div>
      <div class="compute_vacation">
        <v-button type="primary" @click="commpute">计算年假</v-button>
      </div>
      <div class="form-group artifactid-form-group">
        <label class="control-label">带清零天数： </label>
        <v-input placeholder="" style="width:200px;display:inline-block" v-model="clearVacation"></v-input>
      </div>
      <div class="form-group artifactid-form-group">
        <label class="control-label">正常累计天数： </label>
        <v-input placeholder="" style="width:200px;display:inline-block" v-model="addingVacation"></v-input>
      </div>
      <div class="form-group artifactid-form-group">
        <label class="control-label">下次清零年假时间： </label>
        <v-input placeholder="" style="width:200px;display:inline-block" v-model="nextClearDay"></v-input>
      </div>
      <div class="form-group artifactid-form-group">
        <label class="control-label">下次增加时间： </label>
        <v-input placeholder="" style="width:200px;display:inline-block" v-model="nextAddDay"></v-input>
      </div>
    </div>
    <div class="line_duoduo">
      -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    </div>
    <h2>根据业务线 小组 查询 工号 姓名</h2>
    <div>
      <v-select :optionOnChange='true' placeholder="请选择业务线" style="width: 213px;height: 40px;font-size: 14px;"
                :data="lineOptions" @change="changeLine" id="select" class="search-text"></v-select>
      <v-select :optionOnChange='true' placeholder="请选择小组" style="width: 213px;height: 40px;font-size: 14px;"
                :data="groupOptions" @change="changeGroup" id="select" class="search-text"></v-select>
      <v-input v-model="searchUserName" placeholder="输入员工姓名"
               style="border-color:#EFF5F7;width: 220px;height: 40px;border-radius: 25px;font-size: 14px;"
               class="search-text"></v-input>

    </div>

    <v-button type="info"
              :style="{width:'140px',height:'40px',borderRadius:'25px',fontSize:'14px',marginLeft:'2.43vw'}"
              @click="searchData">搜索
    </v-button>

    <div class="form-group artifactid-form-group">
      <label class="control-label">工号： </label>
      <v-input placeholder="" style="width:200px;display:inline-block" v-model="jobNum" readOnly="true"></v-input>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        entryTime: '',
        clearVacation: 0,
        addingVacation: 0,
        nextClearDay: '',
        nextAddDay: '',

        lineOptions: [],
        groupOptions: [],
        searchBusinessLine: '',
        searchBusinessGroup: '',
        searchUserName: '',

        jobNum: ''

      }
    },
    created: function () {
      this.getSelectInfoLine();
    },
    components: {
    },
    methods: {

      commpute() {
        if (this.entryTime == null || this.entryTime === '') {
          alert("填写年假");
          return;
        }
        var date = new Date();
        if (this.entryTime > new Date()) {
          alert("入职时间超过当前时间");
          return;
        }
        let computeJson = {
          entryTime: this.entryTime
        };
        axios.post(requestPath + 'open/vacation/compute', computeJson).then(response => {
          this.clearVacation = response.data.data.clearVacation;
          this.addingVacation = response.data.data.addingVacation;
          this.nextClearDay = response.data.data.nextClearDay;
          this.nextAddDay = response.data.data.nextAddDay;
        }).catch(err => {
          this.clearVacation.clear();
          this.addingVacation.clear();
          this.nextClearDay.clear();
          this.nextAddDay.clear();
        })
      },
      //获取选择信息
      getSelectInfoLine: function () {
        var _this = this;
        axios.post(requestPath + 'open/listBusinessLine')
          .then(res => {
            if (res.data.data) {
              let arr = [];
              let result = res.data.data;

              for (var i = 0; i < result.length; i++) {
                let single = {value: 0, label: ''};
                single.value = i + 1;
                single.label = result[i];
                arr.push(single)
              }
              _this.lineOptions = arr;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      //获取选择信息
      getSelectInfoGroup: function () {
        var _this = this;
        axios.post(requestPath + 'open/listBusinessGroup', {
          searchBusinessLine: this.searchBusinessLine
        })
          .then(res => {
            if (res.data.data) {
              let arr = [];
              let result = res.data.data;

              for (var i = 0; i < result.length; i++) {
                let single = {value: 0, label: ''};
                single.value = i + 1;
                single.label = result[i];
                arr.push(single)
              }
              _this.groupOptions = arr;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      //业务线选择
      changeLine(val) {
        this.searchBusinessLine = val.label;
        this.getSelectInfoGroup();
      },
      changeGroup(val) {
        this.searchBusinessGroup = val.label;
      },
      //搜索
      searchData() {
        var _this = this;
        axios.post(requestPath + "open/vacation/jobNum", {
          searchUserName: this.searchUserName,
          searchBusinessLine: this.searchBusinessLine,
          searchBusinessGroup: this.searchBusinessGroup
        })
          .then(res => {
            if (res.data.data) {
              _this.jobNum = res.data.data.jobNum;
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .control-label {
    width: 150px;
    display: inline-block;
    text-align: right;
  }

  .nianjia {
    margin: 15px auto;
  }

  .form-group {
    margin: 10px auto;
  }

  .line_duoduo {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .search-text {
    margin: 1px 10px;
  }
</style>
