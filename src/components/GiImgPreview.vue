// http://photoswipe.com/
// http://photoswipe.com/documentation/api.html
<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div ref="pswp" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe.
      It's a separate element, as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
      <!-- don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">

        <div class="pswp__top-bar">

          <!--  Controls are self-explanatory. Order can be changed. -->
          <div class="pswp__counter"></div>

          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

          <button class="pswp__button pswp__button--share" title="Share"></button>

          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

          <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>

        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
        </button>

        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
        </button>

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import PhotoSwipe from "photoswipe/dist/photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
export default {
  name: "gi-img-preview",
  props: {
    type: String,
    srcList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      gallery: null,
      options: {
        index: 0,
        shareButtons: [
          {id:'download', label:'下载图片', url:'{{raw_image_url}}', download:true}
        ]
      },
      items: [
        {
          src: "https://placekitten.com/600/400",
          w: 600,
          h: 400
        },
        {
          src: "https://placekitten.com/1200/900",
          w: 1200,
          h: 900
        }
      ]
    };
  },
  methods: {
    show(index, dataArray) {
      console.log(this.gallery);
      this.gallery.init();
    }
  },
  mounted() {
    console.log(this.srcList);

    // Initializes and opens PhotoSwipe
    this.gallery = new PhotoSwipe(
      this.$refs.pswp,
      PhotoSwipeUI_Default,
      this.items,
      this.options
    );
  }
};
</script>

<style lang="less" scoped>
.pswp{
  z-index: 9999;
}
</style>

