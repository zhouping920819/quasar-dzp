//
import previewComponent from './preview.vue';
import PhotoSwipe from "photoswipe/dist/photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
//
let $preview = null;
let PhotoPreview = {
  install(Vue, opts) {
    // 创建"子类"方便挂载
    const Preview = Vue.extend(previewComponent);
    // 组件混入
    Preview.mixin({
      data() {
        return {
        };
      },
      methods: {
        parseThumbnailElements(arr) {
          let it = [];
          for(let i = 0, tmp; i < arr.length; i++) {
            tmp = {
              title: arr[i].attachname,
              src: arr[i].attachpath
            }
            tmp.w = 1200;
            tmp.h = 900;
            it.push(tmp);
          }
          return it;
        },
        openPhotoSwipe(index, data_arr) {
          let photoswipeInstance = null, options, items = [];
          // 
          options = {
            index: parseInt(index, 10) || 0,
            shareButtons: [
              {id:'download', label:'下载图片', url:'{{raw_image_url}}', download:true}
            ]
          };
          items = this.parseThumbnailElements(data_arr);
          // 实例
          photoswipeInstance = new PhotoSwipe(
            this.$refs.pswp,
            PhotoSwipeUI_Default,
            items,
            Object.assign(options, opts)
          );
          // init and open
          photoswipeInstance.init();
          // setTimeout(() => {
          //   photoswipeInstance.items.push({
          //     src: 'https://placekitten.com/600/400',
          //     w: 600,
          //     h: 400
          //   });
          // }, 100);
        }
      }
    });
    // 对外方法
    Vue.prototype.$preview = {
      show(i, arr) {
        // 挂载 body 对象上
        if(!$preview) {
          // 生成实例
          $preview = new Preview();
          $preview.$mount();// 手动创建一个未挂载的实例
          // 挂载
          document.querySelector('body').appendChild($preview.$el);
        }
        $preview.openPhotoSwipe(i, arr);
      }
    };
  }
};

export default ({ Vue }) => {
  Vue.use(PhotoPreview, {
    barsSize: {
      top: 0,
      bottom: 0
    },
    bgOpacity: 0.89,
  });
}
