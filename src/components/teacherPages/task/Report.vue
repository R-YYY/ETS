<template>
  <div>
    <div>
      <div>实验目的：</div>
      <!--          <textarea rows="5" cols="108" id="purpose" name="message"></textarea>-->
      <el-input
          name="input"
          type="textarea"
          :autosize="true"
          placeholder="请输入内容"
          maxlength="1000"
          show-word-limit style="font-size: 19px">
      </el-input>
    </div>
    <div class="item">
      <div class="item-title">实验原理：</div>
      <!--        <textarea rows="5" cols="108" id="principle" name="message"></textarea>-->
      <el-input
          name="input"
          type="textarea"
          :autosize="true"
          placeholder="请输入内容"
          maxlength="1000"
          show-word-limit style="font-size: 19px">
      </el-input>
    </div>
    <div class="item">
      <div class="item-title">实验设备：</div>
      <!--        <textarea rows="5" cols="108" id="device" name="message"></textarea>-->
      <el-input
          name="input"
          type="textarea"
          :autosize="true"
          placeholder="请输入内容"
          maxlength="1000"
          show-word-limit style="font-size: 19px">
      </el-input>
    </div>
    <div class="item">
      <div class="item-title">实验步骤：</div>
      <!--        <textarea rows="5" cols="108" id="content" name="message"></textarea>-->
      <el-input
          name="input"
          type="textarea"
          :autosize="true"
          placeholder="请输入内容"
          maxlength="3000"
          show-word-limit style="font-size: 19px">
      </el-input>
    </div>
    <div class="item">
      <div class="item-title">实验结论：</div>
      <!--        <textarea rows="5" cols="108" id="summary" name="message"></textarea>-->
      <el-input
          name="input"
          type="textarea"
          :autosize="true"
          placeholder="请输入内容"
          maxlength="1000"
          show-word-limit style="font-size: 19px">
      </el-input>
    </div>
    <div class="button-area">
      <el-button type="primary" class="submit-button" style="font-size: 18px">暂时保存</el-button>
      <el-button type="primary" class="submit-button" style="font-size: 18px">确认提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Report"
}
</script>

<style scoped>

</style>