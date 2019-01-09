<template>
  <div class="col-sm-12 col-md-6">
    <h2>Project Metadata</h2>
    <div class="form-group groupid-form-group">
      <label for="groupId" class="control-label">Group</label>
      <input tabindex="4" id="groupId" class="form-control" type="text" v-model="groupId" name="groupId">
    </div>
    <div class="form-group artifactid-form-group">
      <label for="artifactId" class="control-label">Artifact</label>
      <input tabindex="5" id="artifactId" class="form-control" type="text" v-model="artifact" name="artifactId">
    </div>
    <div class="form-group artifactid-form-group">
      <label for="mysqlUrl" class="control-label">数据库连接</label>
      <input tabindex="5" id="mysqlUrl" class="form-control" type="text" v-model="mysqlUrl" name="mysqlUrl">
    </div>
    <div class="form-group artifactid-form-group">
      <label for="mysqlUser" class="control-label">数据库用户</label>
      <input tabindex="5" id="mysqlUser" class="form-control" type="text" v-model="mysqlUser" name="mysqlUser">
    </div>
    <div class="form-group artifactid-form-group">
      <label for="mysqlPassword" class="control-label">数据库密码</label>
      <input tabindex="5" id="mysqlPassword" class="form-control" type="text" v-model="mysqlPassword" name="mysqlPassword">
    </div>
    <div>
      <button class="download" @click="downloadXyz">下载</button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'HelloWorld',
    data() {
      return {
        groupId: 'com.gezhiwei',
        artifact: 'demo',
        mysqlUrl: '10.10.10.1:3306',
        mysqlUser: 'root',
        mysqlPassword: 'admin'
      }
    },
    methods: {
      downloadXyz() {
        let dataJson = {
          groupId: this.groupId,
          artifactId: this.artifact,
          mysqlUrl: this.mysqlUrl,
          mysqlUser: this.mysqlUser,
          mysqlPassword: this.mysqlPassword
        };
        window.location.href = "http://localhost:8090/start/project?params=" + encodeURIComponent(JSON.stringify(dataJson));
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .download {
    margin-top: 60px;
    height: 35px;
    width: 100px;
  }
  .form-group {
    margin-top: 10px;
  }
</style>
