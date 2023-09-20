<template>
  <meta charset="charset=utf-8" />
  <title style="font-size: 30px;color: #795da3">online_eCIS_prediction</title>
  <el-card style="border-radius: 10px;margin-left: 8rem;margin-right: 8rem;margin-top: 2rem">
    <div style="font-size: 20px;font-weight:bold;color: rgba(88,54,174,0.58);margin-left: 1rem">在线挖掘</div>
    <div>
      <el-card>
        <el-row>
          <input id="myInput1" type="file">
          <el-button class="but" @click="call1()">submit</el-button>
        </el-row>
      </el-card>
    </div>
    <div style="margin-left: 1rem">注意：请上传.faa格式文件</div>
    <span id="loading1" style="display: none;height: 1rem;margin-left: 1rem">正在计算，请耐心等待...</span>
    <span id="result1" style="height: 2rem;margin-left: 1rem"></span>
    <div style="font-size: 20px;font-weight:bold;color: rgba(88,54,174,0.58);margin-left: 1rem;margin-top: 3.5rem">在线查询</div>
    <div>
      <el-card>
        <el-row>
          <input id="myInput2" type="text" style="width: 15.8rem">
          <el-button class="but" @click="call2()">submit</el-button>
        </el-row>
      </el-card>
    </div>
    <div style="margin-left: 1rem">注意：请输入蛋白质序列</div>
    <span id="loading2" style="display: none;height: 1rem;margin-left: 1rem">正在查询，请耐心等待...</span>
    <span id="result2" style="height: 2rem;margin-left: 1rem"></span>
  </el-card>

</template>
  
<script  setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
const router = useRouter()
const route = useRoute()

const isProteinSequence = async(sequence) =>{
  const re = /^[ACDEFGHIKLMNPQRSTVWY]+$/i;
  return re.test(sequence);
}
const call1 = async () =>{
  let user_input = document.getElementById('myInput1').files[0];
  if(!user_input.name.endsWith('.faa')){
    alert("请上传一个后缀为.faa的文件");
    return;
  }
  let formData = new FormData();
  formData.append('user_input', user_input);
  document.getElementById('loading1').style.display = 'block';
  let response = await fetch('http://127.0.0.1:5000/dig', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    let data = await response.json();
    document.getElementById('result1').textContent = data.result;
    document.getElementById('loading1').style.display = 'none';
  } else {
    alert("HTTP-Error: " + response.status);
    document.getElementById('loading1').style.display = 'none';
  }
}

const call2 = async () =>{
  let user_input = document.getElementById('myInput2').value;
  // document.getElementById('result2').textContent = user_input;
  let body = {'user_input': user_input};
  // if(!await isProteinSequence(user_input)){
  //   alert("请输入正确的蛋白质序列");
  //   return;
  // }
  // let formData = new FormData();
  // formData.append('user_input', user_input);
  document.getElementById('loading2').style.display = 'block';
  let response = await fetch('http://127.0.0.1:5000/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(body)
  });
  if (response.ok) {
    let data = await response.json();
    document.getElementById('result2').textContent = data.result;
    document.getElementById('loading2').style.display = 'none';
  } else {
    alert("HTTP-Error: " + response.status);
    document.getElementById('loading2').style.display = 'none';
  }
}

</script>

<style scoped>
.but {
  color: #0086b3;
  margin-left: 8rem;
}
.but:hover {
 color: #795da3;
}
</style>
  