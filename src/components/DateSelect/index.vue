<template>
  <q-item class="bg-white" @click.native="timeModal = !timeModal">
    <q-item-main>
      <span>{{ $t('过滤时间') }}：</span>
      <span style="float:right;">
        {{ isAllTime ? $t('全部日期') : dateRange.map(t => $formatDate(t, 'YYYY-MM-DD')).join(' ~ ') }}
      </span>
    </q-item-main>
    <q-item-side right>
      <q-item-tile icon="navigate_next" color="green" />
    </q-item-side>
    <!-- 日期选择器，模态框 -->
    <q-modal v-model="timeModal" position="bottom" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <!-- 顶 -->
        <q-toolbar slot="header">
          <q-btn flat round dense v-close-overlay icon="keyboard_arrow_left" />
          <q-toolbar-title>{{ $t('条件过滤') }}</q-toolbar-title>
          <q-btn flat dense icon="create" :label="$t('确认修改')" @click="okSelect" />
          <!-- <q-btn flat round dense label="确认" size="16px" /> -->
        </q-toolbar>
        <!-- 脚 -->
        <q-toolbar slot="footer">
          <q-toolbar-title>
            {{ $t('当前生效结果') }}：
            {{ customTimeIs ? $t('全部日期') : dateRange.map(t => $formatDate(t, 'YYYY-MM-DD')).join(' ~ ') }}
          </q-toolbar-title>
        </q-toolbar>
        <!-- body -->
        <div class="layout-padding">
          <!-- 是否为全部日期 -->
          <q-toggle
            v-model="customTimeIs"
            color="secondary"
            :label="$t('查看全部日期') + '：'"
            :left-label="true"
            :true-value="true"
            :false-value="false"
          />
          <p>&nbsp;</p>
          <p class="caption">{{ $t('日期范围') }}：</p>
          <div class="row gutter-md">
            <div class="col-6">
              <q-datetime v-model="dateRange[0]" type="date" :disable="customTimeIs" />
            </div>
            <div class="col-6">
              <q-datetime v-model="dateRange[1]" type="date" :disable="customTimeIs" />
            </div>
          </div>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-item>
</template>

<script>
  export default {
    name: 'date-select',
    data() {
      return {
        timeModal: false,
        isAllTime: true,
        customTimeIs: true,
        dateRange: [
          Date.now() - 7 * 24 * 3600 * 1000,
          Date.now()
        ],
      };
    },
    methods: {
      okSelect() {
        if(this.isAllTime !== this.customTimeIs) {
          this.isAllTime = this.customTimeIs;
          // 触发时间事件
          this.$emit('date', this.isAllTime ? false : [
            this.$formatDate(this.dateRange[0], 'YYYY-MM-DD'),
            this.$formatDate(this.dateRange[1], 'YYYY-MM-DD')
          ]);
        }
        this.timeModal = false;
      }
    }
  }
</script>
