<template>
  <div class="login-box">
    <div id="indexLizi"></div>
    <!-- 消除浏览器自动填充用户名密码 -->
    <div style="position: absolute;z-index: -1;">
      <q-input v-show="true" type='text' v-model="usernameTmp"></q-input>
      <q-input v-show="true" type='password' v-model="passwordTmp"></q-input>
    </div>
    <section class="full-height row justify-center">
      <!-- <div style="padding-bottom: 10px;">用户登录</div> -->
      <div class="column justify-center login-input-box">
        <q-input type="text" class="login-input-item text-lime" color="grey-6" autocomplete="off"
          v-model="user.username" :float-label="$t('账号或用户名')" :clearable="true" />
        <q-input type="password" class="login-input-item text-lime" color="grey-6" autocomplete="off"
          v-model="user.password" :float-label="$t('密码')" :clearable="true" />
        <q-btn class="full-width login-input-item" :loading="ajaxLoading" @click="loginBtnClick"
          color="secondary" :label="$t('登录')" >
          <span slot="loading">
            <q-spinner slot="loading" size="20px" />
            {{ $t('正在登录中') }}...
          </span>
        </q-btn>
      </div>
    </section>
  </div>
</template>

<script>
import THREE from "../utils/three/three";
let MD5 = require('md5')
export default {
  name: 'login-page',
  data() {
    return {
      ajaxLoading: false,
      usernameTmp: '',// 消除浏览器自动填充用户名密码
      passwordTmp: '',// 消除浏览器自动填充用户名密码
      user: {
        username: 'testadmin',
        password: '1123456'
      }
    };
  },
  methods: {
    // 动画
    liziInit() {
      var SCREEN_WIDTH = window.innerWidth;
      var SCREEN_HEIGHT = window.innerHeight;
      var SEPARATION = 90;
      var AMOUNTX = 50;
      var AMOUNTY = 50;
      var container;
      var particles, particle;
      var count;
      var camera;
      var scene;
      var renderer;
      var mouseX = 0;
      var mouseY = 0;
      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;
      init();
      this.interval = setInterval(loop, 1000 / 40);
      function init() {
        let prt = document.getElementById("indexLizi");
        prt.style.position = "absolute";
        prt.style.backgroundColor = '#141a48';
        container = document.createElement("div");
        container.style.position = 'relative';//"relative";
        container.style.top = "200px";
        prt.appendChild(container);
        // container = document.getElementById("indexLizi");
        // container.style.position = "absolute";
        // container.style.backgroundColor = '#141a48';
        camera = new THREE.Camera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
        camera.position.z = 1000;
        scene = new THREE.Scene();
        renderer = new THREE.CanvasRenderer();
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        particles = new Array();
        var i = 0;
        var material = new THREE.ParticleCircleMaterial(0x097bdb, 1);
        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++] = new THREE.Particle(material);
            particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2;
            particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2;
            scene.add(particle);
          }
        }
        count = 0;
        container.appendChild(renderer.domElement);
        document.addEventListener("mousemove", onDocumentMouseMove, false);
        document.addEventListener("touchmove", onDocumentTouchMove, false);
      }
      var mousemovetimer = null;
      function onMouseMove(event) {
        window.clearTimeout(mousemovetimer);
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
        mousemovetimer = null;
      }
      function onDocumentMouseMove(event) {
        if (!mousemovetimer)
          mousemovetimer = window.setTimeout(onMouseMove, 50, event);
      }
      function onDocumentTouchMove(event) {
        if (event.touches.length == 1) {
          event.preventDefault();
          mouseX = event.touches[0].pageX - windowHalfX;
          mouseY = event.touches[0].pageY - windowHalfY;
        }
      }
      function loop() {
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
        camera.position.y = 364;
        var i = 0;
        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++];
            particle.position.y =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50;
            particle.scale.x = particle.scale.y =
              (Math.sin((ix + count) * 0.3) + 1) * 2 +
              (Math.sin((iy + count) * 0.5) + 1) * 2;
          }
        }
        renderer.render(scene, camera);
        count += 0.1;
      }
    },
    // 登录按钮事件处理
    loginBtnClick(){
      this.ajaxLoading = true;
      if(!this.user.username || !this.user.password) {
        plus.nativeUI.toast('账号或密码不能为空', {});
        this.ajaxLoading = false;
        return;
      }
      this.$store.dispatch('RemoteLogin', {
        userName: this.user.username,
        passwd: MD5(this.user.password)
      }).then((result) => {
        // 提示消息
        this.$q.notify({
          message: result.msg || this.$t('登录成功'),
          type: 'positive',
          timeout: 500,
          position: 'center'
        });
        // 跳转界面
        this.$router.replace({
          name: 'home'
        });
      }).catch(err => {
        this.$q.notify({
          message: err.msg || this.$t('登录失败请重试') + '！',
          type: 'negative',
          position: 'center'
        });
      }).finally(() => {
        setTimeout(() => {
          this.ajaxLoading = false;
        }, 100);
      });
    }
  },
  mounted() {
    this.liziInit();// 初始化背景动画
  },
  beforeDestroy() {
    if (this.interval) clearInterval(this.interval);// 清除动画
  }
}
</script>

<style lang="less">
.login-box{
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.login-input-box{
  width: 80%;
   .login-input-item:not(:first-child){
    margin-top: 8px;

    &:last-child{
      margin-top: 12px;
    }
  }
}

.text-lime {
  input {
    color: #ffffff!important
  }
}

</style>
